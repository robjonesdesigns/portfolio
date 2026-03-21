import { useEffect, useRef } from 'react'

// ── Simulation grid ──────────────────────────────────────────────────────────
const SIM_W = 512
const SIM_H = 288

// ── Shaders ──────────────────────────────────────────────────────────────────

const VERT = `#version 300 es
in vec2 pos;
out vec2 vUv;
void main() {
  vUv = pos * 0.5 + 0.5;
  gl_Position = vec4(pos, 0.0, 1.0);
}`

// Velocity integration: R = height (0.5 = rest), G = velocity (0.5 = zero)
// Absorbing boundary: 8% border fades height/velocity back to rest so waves
// cannot reflect off edges and build up screen-wide interference noise.
const SIM_FRAG = `#version 300 es
precision highp float;
uniform sampler2D uCurr;
uniform vec2  uTexel;
uniform vec2  uMouse;
uniform float uStrength;
uniform float uRadius;
uniform float uAspect;
in vec2 vUv;
out vec4 fragColor;
void main() {
  float h   = texture(uCurr, vUv).r;
  float vel = texture(uCurr, vUv).g - 0.5;
  float lh  = texture(uCurr, vUv - vec2(uTexel.x, 0.0)).r;
  float rh  = texture(uCurr, vUv + vec2(uTexel.x, 0.0)).r;
  float uh  = texture(uCurr, vUv + vec2(0.0, uTexel.y)).r;
  float dh  = texture(uCurr, vUv - vec2(0.0, uTexel.y)).r;
  float avg = (lh + rh + uh + dh) * 0.25;
  vel += (avg - h) * 2.0;
  vel *= 0.96;
  h = h + vel;
  // Blend h back toward rest — ensures pixels return to exactly 0.5
  // so residual gradients don't permanently distort letters
  h = mix(h, 0.5, 0.02);
  // Mouse / touch disturbance
  vec2 diff = vUv - uMouse;
  diff.x *= uAspect;
  float dist = length(diff);
  if (dist < uRadius) {
    float t = 1.0 - dist / uRadius;
    h += uStrength * t * t;
  }
  // Absorbing boundary — kills waves before they can bounce off edges
  float edge = min(min(vUv.x, 1.0 - vUv.x), min(vUv.y, 1.0 - vUv.y));
  float fade = smoothstep(0.0, 0.08, edge);
  h   = mix(0.5, h,   fade);
  vel = mix(0.0, vel, fade);
  fragColor = vec4(h, vel + 0.5, 0.0, 1.0);
}`

// Display: decode height gradient → refract background UV → Fresnel rim
const DRAW_FRAG = `#version 300 es
precision highp float;
uniform sampler2D uHeight;
uniform sampler2D uBg;
uniform vec2  uTexel;
uniform float uPerturbance;
in vec2 vUv;
out vec4 fragColor;
void main() {
  float hL = texture(uHeight, vUv - vec2(uTexel.x, 0.0)).r - 0.5;
  float hR = texture(uHeight, vUv + vec2(uTexel.x, 0.0)).r - 0.5;
  float hU = texture(uHeight, vUv + vec2(0.0, uTexel.y)).r - 0.5;
  float hD = texture(uHeight, vUv - vec2(0.0, uTexel.y)).r - 0.5;
  float gx = hR - hL;
  float gy = hU - hD;
  vec2 refractUV = clamp(vUv + vec2(gx, gy) * uPerturbance, 0.001, 0.999);
  vec4 color = texture(uBg, refractUV);
  float grad = length(vec2(gx, gy));
  float fresnel = clamp(grad * 3.5, 0.0, 1.0);
  color.rgb = mix(color.rgb, vec3(1.0), fresnel * 0.6);
  fragColor = vec4(color.rgb, 1.0);
}`

// ── Component ────────────────────────────────────────────────────────────────

export default function RippleEffectOnPink() {
  const glRef = useRef(null)
  const bgRef = useRef(null)

  useEffect(() => {
    const glCanvas = glRef.current
    const bgCanvas = bgRef.current
    const ctx      = bgCanvas.getContext('2d')

    const gl = glCanvas.getContext('webgl2', { alpha: false })
    if (!gl) return

    // ── compile helpers ───────────────────────────────────────────────────
    const mkShader = (type, src) => {
      const s = gl.createShader(type)
      gl.shaderSource(s, src)
      gl.compileShader(s)
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error('Shader error:', gl.getShaderInfoLog(s)); return null
      }
      return s
    }
    const mkProg = (vs, fs) => {
      const p = gl.createProgram()
      gl.attachShader(p, mkShader(gl.VERTEX_SHADER, vs))
      gl.attachShader(p, mkShader(gl.FRAGMENT_SHADER, fs))
      gl.linkProgram(p)
      if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
        console.error('Program error:', gl.getProgramInfoLog(p)); return null
      }
      return p
    }

    const simProg  = mkProg(VERT, SIM_FRAG)
    const drawProg = mkProg(VERT, DRAW_FRAG)
    if (!simProg || !drawProg) return

    // ── fullscreen quad ───────────────────────────────────────────────────
    const quad = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, quad)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW)
    const bindQuad = (prog) => {
      const loc = gl.getAttribLocation(prog, 'pos')
      gl.enableVertexAttribArray(loc)
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
    }

    // ── Ping-pong textures: try RGBA16F first (avoids RGBA8 quantization
    //    drift that kills the sim after ~5 seconds), fall back to RGBA8 ───
    const halfExt = gl.getExtension('EXT_color_buffer_half_float')
    const useHalf = !!halfExt

    const mkTex = () => {
      const t = gl.createTexture()
      gl.bindTexture(gl.TEXTURE_2D, t)
      if (useHalf) {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, SIM_W, SIM_H, 0, gl.RGBA, gl.HALF_FLOAT, null)
      } else {
        // RGBA8: initialise to rest (h=128/255≈0.5, vel=128/255≈0.5)
        const init = new Uint8Array(SIM_W * SIM_H * 4)
        for (let i = 0; i < init.length; i += 4) { init[i] = 128; init[i+1] = 128 }
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, SIM_W, SIM_H, 0, gl.RGBA, gl.UNSIGNED_BYTE, init)
      }
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      return t
    }
    const mkFBO = (tex) => {
      const f = gl.createFramebuffer()
      gl.bindFramebuffer(gl.FRAMEBUFFER, f)
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0)
      if (useHalf) {
        // Clear RGBA16F FBO to rest state: h=0.5, vel=0.0 (stored as 0.5)
        gl.clearColor(0.5, 0.5, 0.0, 1.0)
        gl.clear(gl.COLOR_BUFFER_BIT)
      }
      gl.bindFramebuffer(gl.FRAMEBUFFER, null)
      return f
    }
    const htexs = [mkTex(), mkTex()]
    const fbos  = htexs.map(mkFBO)

    // ── Background RGBA texture ───────────────────────────────────────────
    const bgTex = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, bgTex)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)

    // ── Uniforms ──────────────────────────────────────────────────────────
    const simU = {
      uCurr:     gl.getUniformLocation(simProg, 'uCurr'),
      uTexel:    gl.getUniformLocation(simProg, 'uTexel'),
      uMouse:    gl.getUniformLocation(simProg, 'uMouse'),
      uStrength: gl.getUniformLocation(simProg, 'uStrength'),
      uRadius:   gl.getUniformLocation(simProg, 'uRadius'),
      uAspect:   gl.getUniformLocation(simProg, 'uAspect'),
    }
    const drawU = {
      uHeight:      gl.getUniformLocation(drawProg, 'uHeight'),
      uBg:          gl.getUniformLocation(drawProg, 'uBg'),
      uTexel:       gl.getUniformLocation(drawProg, 'uTexel'),
      uPerturbance: gl.getUniformLocation(drawProg, 'uPerturbance'),
    }

    gl.useProgram(simProg)
    gl.uniform2f(simU.uTexel,  1 / SIM_W, 1 / SIM_H)
    gl.uniform1f(simU.uRadius, 0.06)
    gl.uniform2f(simU.uMouse, -1, -1)
    gl.uniform1f(simU.uStrength, 0)

    gl.useProgram(drawProg)
    gl.uniform2f(drawU.uTexel, 1 / SIM_W, 1 / SIM_H)
    gl.uniform1f(drawU.uPerturbance, 0.35)

    // ── Draw background scene ─────────────────────────────────────────────
    const drawBg = () => {
      const W = bgCanvas.width
      const H = bgCanvas.height

      ctx.fillStyle = '#f0b8cc'
      ctx.fillRect(0, 0, W, H)

      const PROBE   = 100
      const targetW = W * 0.96
      ctx.letterSpacing = '0px'

      ctx.font = `900 ${PROBE}px 'Cabinet Grotesk', sans-serif`
      const gracefulSize = PROBE * targetW / ctx.measureText('GRACEFUL').width
      const lovingSize   = PROBE * targetW / ctx.measureText('LOVING').width
      const designSize   = PROBE * targetW / ctx.measureText('DESIGN').width

      // Measure bounding boxes and prefix widths at final font sizes.
      // Use measureText(prefix + target).width - measureText(target).width
      // so the final kerning pair (e.g. V→I, S→I, C→E) is included in the measurement.
      ctx.font = `900 ${gracefulSize}px 'Cabinet Grotesk', sans-serif`
      const mG      = ctx.measureText('GRACEFUL')
      const prefixG = ctx.measureText('GRACE').width - ctx.measureText('E').width

      ctx.font = `900 ${lovingSize}px 'Cabinet Grotesk', sans-serif`
      const mL      = ctx.measureText('LOVING')
      const prefixL = ctx.measureText('LOVI').width - ctx.measureText('I').width

      ctx.font = `900 ${designSize}px 'Cabinet Grotesk', sans-serif`
      const mD      = ctx.measureText('DESIGN')
      const prefixD = ctx.measureText('DESI').width - ctx.measureText('I').width

      // Left edge of each word when drawn centered
      const wordLeft = W * 0.5 - targetW * 0.5

      // LOVING's I is the alignment anchor. Shift GRACEFUL and DESIGN so their
      // target stems land at the same screen-x as LOVING's I.
      const shiftG = prefixL - prefixG
      const shiftD = prefixL - prefixD

      // Total visual height = sum of rendered pixel heights + 2px gaps
      const totalH =
        mG.actualBoundingBoxAscent + mG.actualBoundingBoxDescent + 1 +
        mL.actualBoundingBoxAscent + mL.actualBoundingBoxDescent + 1 +
        mD.actualBoundingBoxAscent + mD.actualBoundingBoxDescent

      let baseline = (H - totalH) * 0.5 + mG.actualBoundingBoxAscent

      ctx.textAlign    = 'left'
      ctx.textBaseline = 'alphabetic'
      ctx.fillStyle    = '#b4ff50'

      ctx.font = `900 ${gracefulSize}px 'Cabinet Grotesk', sans-serif`
      ctx.fillText('GRACEFUL', wordLeft + shiftG, baseline)
      baseline += mG.actualBoundingBoxDescent + 1 + mL.actualBoundingBoxAscent

      ctx.font = `900 ${lovingSize}px 'Cabinet Grotesk', sans-serif`
      ctx.fillText('LOVING', wordLeft, baseline)
      baseline += mL.actualBoundingBoxDescent + 1 + mD.actualBoundingBoxAscent

      ctx.font = `900 ${designSize}px 'Cabinet Grotesk', sans-serif`
      ctx.fillText('DESIGN', wordLeft + shiftD, baseline)
    }

    const uploadBg = () => {
      drawBg()
      gl.bindTexture(gl.TEXTURE_2D, bgTex)
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, bgCanvas)
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false)
    }

    // ── Resize ────────────────────────────────────────────────────────────
    const resize = () => {
      const W = window.innerWidth
      const H = window.innerHeight
      glCanvas.width  = W
      glCanvas.height = H
      bgCanvas.width  = W
      bgCanvas.height = H
      gl.useProgram(simProg)
      gl.uniform1f(simU.uAspect, W / H)
      uploadBg()
    }
    resize()
    window.addEventListener('resize', resize)
    document.fonts.ready.then(uploadBg)

    // ── Mouse / touch ─────────────────────────────────────────────────────
    let mx = -1, my = -1, mStr = 0

    const onMove = (e) => {
      mx   = e.clientX / window.innerWidth
      my   = 1 - e.clientY / window.innerHeight
      mStr = 0.3
    }
    const onTouch = (e) => {
      const t = e.touches[0]
      if (!t) return
      mx   = t.clientX / window.innerWidth
      my   = 1 - t.clientY / window.innerHeight
      mStr = 0.3
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('touchmove', onTouch, { passive: true })

    // ── Render loop ───────────────────────────────────────────────────────
    let idx = 0, raf, alive = true

    const loop = () => {
      if (!alive) return

      const curr = idx % 2
      const next = (idx + 1) % 2

      // Simulation pass
      gl.useProgram(simProg)
      gl.bindBuffer(gl.ARRAY_BUFFER, quad)
      bindQuad(simProg)

      gl.activeTexture(gl.TEXTURE0)
      gl.bindTexture(gl.TEXTURE_2D, htexs[curr])
      gl.uniform1i(simU.uCurr, 0)
      gl.uniform2f(simU.uMouse, mx, my)
      gl.uniform1f(simU.uStrength, mStr)

      gl.bindFramebuffer(gl.FRAMEBUFFER, fbos[next])
      gl.viewport(0, 0, SIM_W, SIM_H)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

      mStr = 0

      // Display pass
      gl.useProgram(drawProg)
      gl.bindBuffer(gl.ARRAY_BUFFER, quad)
      bindQuad(drawProg)

      gl.activeTexture(gl.TEXTURE0)
      gl.bindTexture(gl.TEXTURE_2D, htexs[next])
      gl.uniform1i(drawU.uHeight, 0)

      gl.activeTexture(gl.TEXTURE1)
      gl.bindTexture(gl.TEXTURE_2D, bgTex)
      gl.uniform1i(drawU.uBg, 1)

      gl.bindFramebuffer(gl.FRAMEBUFFER, null)
      gl.viewport(0, 0, glCanvas.width, glCanvas.height)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

      idx = (idx + 1) % 2
      raf = requestAnimationFrame(loop)
    }

    const startTimer = setTimeout(() => {
      if (alive) raf = requestAnimationFrame(loop)
    }, 0)

    return () => {
      alive = false
      clearTimeout(startTimer)
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onTouch)
      window.removeEventListener('resize', resize)
      htexs.forEach(t => gl.deleteTexture(t))
      fbos.forEach(f  => gl.deleteFramebuffer(f))
      gl.deleteTexture(bgTex)
      gl.deleteBuffer(quad)
      gl.deleteProgram(simProg)
      gl.deleteProgram(drawProg)
    }
  }, [])

  return (
    <section style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      <canvas ref={bgRef} style={{ display: 'none' }} />
      <canvas ref={glRef} style={{ display: 'block', width: '100%', height: '100vh' }} />
    </section>
  )
}
