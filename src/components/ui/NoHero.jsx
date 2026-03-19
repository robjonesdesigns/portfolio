import { useEffect, useRef } from 'react'

const SIM_W = 512
const SIM_H = 288

// ── Timing (ms) ──────────────────────────────────────────────────────────────
const T_CALM      =  4000   // calm water with drain visible
const T_DRAIN     = 10000   // vortex drains the scene
const T_GLITCH    = 10000   // glitch / signal corruption
const T_SILENCE   =  3000   // black silence
// Then NO appears and stays

// ── Shaders ──────────────────────────────────────────────────────────────────

const VERT = `#version 300 es
in vec2 pos;
out vec2 vUv;
void main() {
  vUv = pos * 0.5 + 0.5;
  gl_Position = vec4(pos, 0.0, 1.0);
}`

// Wave sim: RGBA16F velocity integration + radial drain force
const SIM_FRAG = `#version 300 es
precision highp float;
uniform sampler2D uCurr;
uniform vec2  uTexel;
uniform vec2  uMouse;
uniform float uStrength;
uniform float uRadius;
uniform float uAspect;
uniform vec2  uDrain;        // drain center in UV space
uniform float uDrainStrength; // 0 = off, ramps to 1
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
  h = mix(h, 0.5, 0.02);

  // Mouse disturbance
  vec2 diff = vUv - uMouse;
  diff.x *= uAspect;
  float dist = length(diff);
  if (dist < uRadius) {
    float t = 1.0 - dist / uRadius;
    h += uStrength * t * t;
  }

  // Drain vortex: inward radial pull + spiral tangential component
  if (uDrainStrength > 0.0) {
    vec2 toDrain = uDrain - vUv;
    toDrain.x *= uAspect;
    float d = length(toDrain);
    if (d > 0.001) {
      vec2 radial     = normalize(toDrain);
      vec2 tangential = vec2(-radial.y, radial.x);
      float falloff   = uDrainStrength / (d * 12.0 + 0.5);
      vec2 force      = (radial * 0.7 + tangential * 0.3) * falloff;
      h += force.x * 0.015;
      vel += force.y * 0.008;
    }
  }

  // Absorbing boundary
  float edge = min(min(vUv.x, 1.0 - vUv.x), min(vUv.y, 1.0 - vUv.y));
  float fade = smoothstep(0.0, 0.08, edge);
  h   = mix(0.5, h,   fade);
  vel = mix(0.0, vel, fade);

  fragColor = vec4(clamp(h, 0.0, 1.0), clamp(vel + 0.5, 0.0, 1.0), 0.0, 1.0);
}`

// Display: refract bg through wave surface
const DRAW_FRAG = `#version 300 es
precision highp float;
uniform sampler2D uHeight;
uniform sampler2D uBg;
uniform vec2  uTexel;
uniform float uPerturbance;
uniform float uDrainPull;    // warps UV toward drain center as scene drains
uniform vec2  uDrain;
uniform float uAlpha;        // fade out during transition
in vec2 vUv;
out vec4 fragColor;
void main() {
  float hL = texture(uHeight, vUv - vec2(uTexel.x, 0.0)).r - 0.5;
  float hR = texture(uHeight, vUv + vec2(uTexel.x, 0.0)).r - 0.5;
  float hU = texture(uHeight, vUv + vec2(0.0, uTexel.y)).r - 0.5;
  float hD = texture(uHeight, vUv - vec2(0.0, uTexel.y)).r - 0.5;
  float gx = hR - hL;
  float gy = hU - hD;

  // Additional UV pull toward drain during drain phase
  vec2 toDrain = uDrain - vUv;
  vec2 refractUV = vUv + vec2(gx, gy) * uPerturbance + toDrain * uDrainPull;
  refractUV = clamp(refractUV, 0.001, 0.999);

  vec4 color = texture(uBg, refractUV);
  float grad = length(vec2(gx, gy));
  float fresnel = clamp(grad * 3.5, 0.0, 1.0);
  color.rgb = mix(color.rgb, vec3(1.0), fresnel * 0.6);
  color.rgb *= uAlpha;
  fragColor = vec4(color.rgb, 1.0);
}`

// Glitch pass: RGB channel split + block displacement + noise
const GLITCH_FRAG = `#version 300 es
precision highp float;
uniform sampler2D uFrame;  // last rendered hero frame
uniform float uTime;
uniform float uIntensity;  // 0-1 ramps up over glitch phase
in vec2 vUv;
out vec4 fragColor;

float rand(vec2 co) {
  return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  float t       = uTime;
  float intense = uIntensity;

  // Block displacement: divide screen into horizontal slabs, offset randomly
  float blockSize = mix(0.05, 0.15, rand(vec2(floor(t * 8.0), 0.0)));
  float row       = floor(vUv.y / blockSize);
  float rowRand   = rand(vec2(row, floor(t * 12.0)));
  float blockShift = (rowRand - 0.5) * intense * 0.15;

  vec2 uv = vec2(vUv.x + blockShift, vUv.y);

  // RGB channel split
  float split = intense * 0.03 * rand(vec2(floor(t * 20.0), 1.0));
  float r = texture(uFrame, clamp(uv + vec2( split, 0.0), 0.001, 0.999)).r;
  float g = texture(uFrame, clamp(uv,                     0.001, 0.999)).g;
  float b = texture(uFrame, clamp(uv + vec2(-split, 0.0), 0.001, 0.999)).b;

  vec3 color = vec3(r, g, b);

  // Scan line flicker
  float scanline = sin(vUv.y * 800.0 + t * 30.0) * 0.04 * intense;
  color += scanline;

  // Random white flash blocks
  float flashRand = rand(vec2(floor(vUv.y * 20.0), floor(t * 15.0)));
  if (flashRand > (1.0 - intense * 0.3)) {
    color = mix(color, vec3(1.0), rand(vec2(vUv.y, t)));
  }

  // Bleed-through: previous frame bleeds pink at edges of glitch
  float bleed = rand(vec2(floor(t * 6.0), floor(vUv.y * 10.0)));
  if (bleed > 0.92) color = mix(color, vec3(0.94, 0.72, 0.8), 0.6);

  fragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}`

// ── Component ────────────────────────────────────────────────────────────────

export default function NoHero() {
  const glRef  = useRef(null)
  const bgRef  = useRef(null)

  useEffect(() => {
    const glCanvas = glRef.current
    const bgCanvas = bgRef.current
    const ctx      = bgCanvas.getContext('2d')
    const gl       = glCanvas.getContext('webgl2', { alpha: false, preserveDrawingBuffer: true })
    if (!gl) return

    // ── compile helpers ───────────────────────────────────────────────────
    const mkShader = (type, src) => {
      const s = gl.createShader(type)
      gl.shaderSource(s, src); gl.compileShader(s)
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(s)); return null
      }
      return s
    }
    const mkProg = (vs, fs) => {
      const p = gl.createProgram()
      gl.attachShader(p, mkShader(gl.VERTEX_SHADER, vs))
      gl.attachShader(p, mkShader(gl.FRAGMENT_SHADER, fs))
      gl.linkProgram(p)
      if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(p)); return null
      }
      return p
    }

    const simProg    = mkProg(VERT, SIM_FRAG)
    const drawProg   = mkProg(VERT, DRAW_FRAG)
    const glitchProg = mkProg(VERT, GLITCH_FRAG)
    if (!simProg || !drawProg || !glitchProg) return

    // ── quad ─────────────────────────────────────────────────────────────
    const quad = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, quad)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW)
    const bindQuad = (prog) => {
      const loc = gl.getAttribLocation(prog, 'pos')
      gl.enableVertexAttribArray(loc)
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
    }

    // ── ping-pong sim textures ────────────────────────────────────────────
    const halfExt = gl.getExtension('EXT_color_buffer_half_float')
    const useHalf = !!halfExt
    const mkTex = () => {
      const t = gl.createTexture()
      gl.bindTexture(gl.TEXTURE_2D, t)
      if (useHalf) {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, SIM_W, SIM_H, 0, gl.RGBA, gl.HALF_FLOAT, null)
      } else {
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
      if (useHalf) { gl.clearColor(0.5,0.5,0.0,1.0); gl.clear(gl.COLOR_BUFFER_BIT) }
      gl.bindFramebuffer(gl.FRAMEBUFFER, null)
      return f
    }
    const htexs = [mkTex(), mkTex()]
    const fbos  = htexs.map(mkFBO)

    // ── glitch capture texture (snapshot of last hero frame) ──────────────
    const glitchTex = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, glitchTex)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)

    // ── background texture ────────────────────────────────────────────────
    const bgTex = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, bgTex)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)

    // ── uniforms ──────────────────────────────────────────────────────────
    const simU = {
      uCurr:         gl.getUniformLocation(simProg, 'uCurr'),
      uTexel:        gl.getUniformLocation(simProg, 'uTexel'),
      uMouse:        gl.getUniformLocation(simProg, 'uMouse'),
      uStrength:     gl.getUniformLocation(simProg, 'uStrength'),
      uRadius:       gl.getUniformLocation(simProg, 'uRadius'),
      uAspect:       gl.getUniformLocation(simProg, 'uAspect'),
      uDrain:        gl.getUniformLocation(simProg, 'uDrain'),
      uDrainStrength:gl.getUniformLocation(simProg, 'uDrainStrength'),
    }
    const drawU = {
      uHeight:      gl.getUniformLocation(drawProg, 'uHeight'),
      uBg:          gl.getUniformLocation(drawProg, 'uBg'),
      uTexel:       gl.getUniformLocation(drawProg, 'uTexel'),
      uPerturbance: gl.getUniformLocation(drawProg, 'uPerturbance'),
      uDrainPull:   gl.getUniformLocation(drawProg, 'uDrainPull'),
      uDrain:       gl.getUniformLocation(drawProg, 'uDrain'),
      uAlpha:       gl.getUniformLocation(drawProg, 'uAlpha'),
    }
    const glitchU = {
      uFrame:    gl.getUniformLocation(glitchProg, 'uFrame'),
      uTime:     gl.getUniformLocation(glitchProg, 'uTime'),
      uIntensity:gl.getUniformLocation(glitchProg, 'uIntensity'),
    }

    gl.useProgram(simProg)
    gl.uniform2f(simU.uTexel, 1/SIM_W, 1/SIM_H)
    gl.uniform1f(simU.uRadius, 0.06)
    gl.uniform2f(simU.uMouse, -1, -1)
    gl.uniform1f(simU.uStrength, 0)
    gl.uniform2f(simU.uDrain, 0.5, 0.5)
    gl.uniform1f(simU.uDrainStrength, 0)

    gl.useProgram(drawProg)
    gl.uniform2f(drawU.uTexel, 1/SIM_W, 1/SIM_H)
    gl.uniform1f(drawU.uPerturbance, 0.35)
    gl.uniform2f(drawU.uDrain, 0.5, 0.5)
    gl.uniform1f(drawU.uDrainPull, 0)
    gl.uniform1f(drawU.uAlpha, 1.0)

    // ── load drain image ──────────────────────────────────────────────────
    let drainImg = null
    const img = new Image()
    img.onload = () => { drainImg = img; uploadBg() }
    img.src = '/images/kitchen-drain.jpg'

    // ── draw background scene ─────────────────────────────────────────────
    // phase: 'hero' | 'drain' | 'no'
    let currentPhase = 'hero'

    const drawBg = (phase = 'hero') => {
      const W = bgCanvas.width
      const H = bgCanvas.height

      if (phase === 'no') {
        // Act 3: near-black + blood red NO
        ctx.fillStyle = '#0d0d0d'
        ctx.fillRect(0, 0, W, H)

        const PROBE   = 100
        const targetW = W * 0.96
        ctx.letterSpacing = '0px'
        ctx.font = `900 ${PROBE}px 'Cabinet Grotesk', sans-serif`
        const noSize = PROBE * targetW / ctx.measureText('NO').width
        ctx.font = `900 ${noSize}px 'Cabinet Grotesk', sans-serif`
        const mN = ctx.measureText('NO')
        const noH = mN.actualBoundingBoxAscent + mN.actualBoundingBoxDescent
        const baseline = (H - noH) * 0.5 + mN.actualBoundingBoxAscent

        ctx.textAlign    = 'left'
        ctx.textBaseline = 'alphabetic'
        ctx.fillStyle    = '#c0141a'
        ctx.fillText('NO', W * 0.5 - targetW * 0.5, baseline)
        return
      }

      // Act 1 + 2: pink hero with GRACEFUL / LOVING / DESIGN + drain circle
      ctx.fillStyle = '#f0b8cc'
      ctx.fillRect(0, 0, W, H)

      // Draw drain circle — centered in viewport
      if (drainImg) {
        const drainR = Math.min(W, H) * 0.22  // 22% of smallest dimension
        const cx = W * 0.5
        const cy = H * 0.5
        ctx.save()
        ctx.beginPath()
        ctx.arc(cx, cy, drainR, 0, Math.PI * 2)
        ctx.clip()
        // Scale image to fill the circle, cropping to the drain center
        const imgAspect = drainImg.naturalWidth / drainImg.naturalHeight
        let sw, sh, sx, sy
        if (imgAspect > 1) {
          sh = drainImg.naturalHeight; sw = sh
          sx = (drainImg.naturalWidth - sw) * 0.5; sy = 0
        } else {
          sw = drainImg.naturalWidth; sh = sw
          sx = 0; sy = (drainImg.naturalHeight - sh) * 0.38  // drain sits slightly low
        }
        ctx.drawImage(drainImg, sx, sy, sw, sh, cx - drainR, cy - drainR, drainR * 2, drainR * 2)
        ctx.restore()
      }

      // Typography: GRACEFUL / LOVING / DESIGN
      const PROBE   = 100
      const targetW = W * 0.96
      ctx.letterSpacing = '0px'

      ctx.font = `900 ${PROBE}px 'Cabinet Grotesk', sans-serif`
      const gracefulSize = PROBE * targetW / ctx.measureText('GRACEFUL').width
      const lovingSize   = PROBE * targetW / ctx.measureText('LOVING').width
      const designSize   = PROBE * targetW / ctx.measureText('DESIGN').width

      ctx.font = `900 ${gracefulSize}px 'Cabinet Grotesk', sans-serif`
      const mG      = ctx.measureText('GRACEFUL')
      const prefixG = ctx.measureText('GRACE').width - ctx.measureText('E').width

      ctx.font = `900 ${lovingSize}px 'Cabinet Grotesk', sans-serif`
      const mL      = ctx.measureText('LOVING')
      const prefixL = ctx.measureText('LOVI').width - ctx.measureText('I').width

      ctx.font = `900 ${designSize}px 'Cabinet Grotesk', sans-serif`
      const mD      = ctx.measureText('DESIGN')
      const prefixD = ctx.measureText('DESI').width - ctx.measureText('I').width

      const wordLeft = W * 0.5 - targetW * 0.5
      const shiftG   = prefixL - prefixG
      const shiftD   = prefixL - prefixD

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

    const uploadBg = (phase = 'hero') => {
      drawBg(phase)
      gl.bindTexture(gl.TEXTURE_2D, bgTex)
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, bgCanvas)
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false)
    }

    // ── resize ────────────────────────────────────────────────────────────
    const resize = () => {
      const W = window.innerWidth
      const H = window.innerHeight
      glCanvas.width  = W; glCanvas.height = H
      bgCanvas.width  = W; bgCanvas.height = H
      gl.useProgram(simProg)
      gl.uniform1f(simU.uAspect, W / H)
      uploadBg(currentPhase)
    }
    resize()
    window.addEventListener('resize', resize)
    document.fonts.ready.then(() => uploadBg(currentPhase))

    // ── mouse ─────────────────────────────────────────────────────────────
    let mx = -1, my = -1, mStr = 0
    const onMove = (e) => {
      mx = e.clientX / window.innerWidth
      my = 1 - e.clientY / window.innerHeight
      mStr = 0.3
    }
    window.addEventListener('mousemove', onMove)

    // ── state ─────────────────────────────────────────────────────────────
    let phase      = 'calm'   // calm → drain → glitch → silence → no
    let phaseStart = performance.now()
    let idx = 0, raf, alive = true
    let drainStrength = 0
    let drainPull     = 0
    let sceneAlpha    = 1.0
    let glitchTime    = 0

    // ── render loop ───────────────────────────────────────────────────────
    const loop = (now) => {
      if (!alive) return
      const elapsed = now - phaseStart

      // ── phase transitions ─────────────────────────────────────────────
      if (phase === 'calm' && elapsed > T_CALM) {
        phase = 'drain'; phaseStart = now
      }

      if (phase === 'drain') {
        const p = Math.min(elapsed / T_DRAIN, 1.0)
        // ease in: slow start, accelerate
        drainStrength = p * p * p * 2.0
        drainPull     = p * p * 0.4
        sceneAlpha    = 1.0 - Math.max(0, (p - 0.7) / 0.3)  // fade last 30%

        if (elapsed > T_DRAIN) {
          // Capture last rendered frame into glitchTex before switching
          gl.bindTexture(gl.TEXTURE_2D, glitchTex)
          gl.copyTexImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 0, 0, glCanvas.width, glCanvas.height, 0)
          phase = 'glitch'; phaseStart = now
          glitchTime = 0
        }
      }

      if (phase === 'glitch') {
        glitchTime = elapsed / 1000.0
        if (elapsed > T_GLITCH) {
          phase = 'silence'; phaseStart = now
        }
      }

      if (phase === 'silence' && elapsed > T_SILENCE) {
        phase = 'no'; phaseStart = now
        currentPhase = 'no'
        uploadBg('no')
        drainStrength = 0; drainPull = 0; sceneAlpha = 1.0
      }

      // ── glitch phase: skip sim, just render glitch shader ─────────────
      if (phase === 'glitch') {
        const intensity = Math.min(elapsed / (T_GLITCH * 0.3), 1.0)
        gl.bindBuffer(gl.ARRAY_BUFFER, quad)
        gl.useProgram(glitchProg)
        bindQuad(glitchProg)
        gl.activeTexture(gl.TEXTURE0)
        gl.bindTexture(gl.TEXTURE_2D, glitchTex)
        gl.uniform1i(glitchU.uFrame, 0)
        gl.uniform1f(glitchU.uTime, glitchTime)
        gl.uniform1f(glitchU.uIntensity, intensity)
        gl.bindFramebuffer(gl.FRAMEBUFFER, null)
        gl.viewport(0, 0, glCanvas.width, glCanvas.height)
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
        idx = (idx + 1) % 2
        raf = requestAnimationFrame(loop)
        return
      }

      // ── silence phase: black screen ───────────────────────────────────
      if (phase === 'silence') {
        gl.bindFramebuffer(gl.FRAMEBUFFER, null)
        gl.viewport(0, 0, glCanvas.width, glCanvas.height)
        gl.clearColor(0, 0, 0, 1)
        gl.clear(gl.COLOR_BUFFER_BIT)
        raf = requestAnimationFrame(loop)
        return
      }

      // ── sim pass ──────────────────────────────────────────────────────
      const curr = idx % 2
      const next = (idx + 1) % 2

      gl.useProgram(simProg)
      gl.bindBuffer(gl.ARRAY_BUFFER, quad)
      bindQuad(simProg)
      gl.activeTexture(gl.TEXTURE0)
      gl.bindTexture(gl.TEXTURE_2D, htexs[curr])
      gl.uniform1i(simU.uCurr, 0)
      gl.uniform2f(simU.uMouse, mx, my)
      gl.uniform1f(simU.uStrength, mStr)
      gl.uniform1f(simU.uDrainStrength, drainStrength)
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbos[next])
      gl.viewport(0, 0, SIM_W, SIM_H)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      mStr = 0

      // ── display pass ──────────────────────────────────────────────────
      gl.useProgram(drawProg)
      gl.bindBuffer(gl.ARRAY_BUFFER, quad)
      bindQuad(drawProg)
      gl.activeTexture(gl.TEXTURE0)
      gl.bindTexture(gl.TEXTURE_2D, htexs[next])
      gl.uniform1i(drawU.uHeight, 0)
      gl.activeTexture(gl.TEXTURE1)
      gl.bindTexture(gl.TEXTURE_2D, bgTex)
      gl.uniform1i(drawU.uBg, 1)
      gl.uniform1f(drawU.uDrainPull, drainPull)
      gl.uniform1f(drawU.uAlpha, sceneAlpha)
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
      window.removeEventListener('resize', resize)
      htexs.forEach(t => gl.deleteTexture(t))
      fbos.forEach(f => gl.deleteFramebuffer(f))
      gl.deleteTexture(bgTex)
      gl.deleteTexture(glitchTex)
      gl.deleteBuffer(quad)
      gl.deleteProgram(simProg)
      gl.deleteProgram(drawProg)
      gl.deleteProgram(glitchProg)
    }
  }, [])

  return (
    <section style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', background: '#0d0d0d' }}>
      <canvas ref={bgRef} style={{ display: 'none' }} />
      <canvas ref={glRef} style={{ display: 'block', width: '100%', height: '100%' }} />
    </section>
  )
}
