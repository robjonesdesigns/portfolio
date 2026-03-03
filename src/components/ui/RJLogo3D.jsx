import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js'

// ── Path data pulled from RJLogo.jsx ──────────────────────────────────────
const STEM_D = 'M0.5 33.5V3.5C0.5 1.56701 2.067 0 4 0C5.933 0 7.5 1.56701 7.5 3.5V33.5C7.5 35.433 5.933 37 4 37C2.067 37 0.5 35.433 0.5 33.5Z'
const BOWL_D = 'M29.7754 2.56878C25.5125 -0.215006 18.8015 -0.177577 14.8076 0.15553C12.8815 0.316169 11.5 1.96593 11.5 3.89868V4.46865C11.5 6.68091 13.2957 8.47306 15.508 8.46864L21.6104 8.45645C23.7893 8.4521 25.558 10.2172 25.558 12.3962C25.558 14.572 23.7941 16.3359 21.6183 16.3359H15.5C13.2909 16.3359 11.5 18.1267 11.5 20.3359V20.9626C11.5 22.8609 12.834 24.4924 14.7203 24.7057C19.1322 25.2045 26.9855 25.4831 31.1812 21.9732C37.92 16.3359 36.2508 6.79733 29.7754 2.56878Z'

// SVG viewBox "0 -2 36 41" → y spans -2 to 39, center = (18, 18.5)
const CX = 18
const CY = 18.5

// Dot circle in SVG: center (30.5, 32) radius ≈ 5
// After flip + center: x = 30.5-18 = 12.5, y = -32+18.5 = -13.5
const SPHERE_POS     = [12.5, -13.5, 1.25]
const SPHERE_R       = 5
// Start position: sphere begins near the stalk's right edge (~x = -12)
// Stalk right edge in world space: SVG x=7.5 → 7.5–18 = –10.5, plus bevel 0.25 = –10.25
// Sphere center = stalk edge + sphere radius = –10.25 + 5 = –5.25 (just touching)
const SPHERE_START_X = -5.25

const EXTRUDE = {
  depth:          2.5,
  bevelEnabled:   true,
  bevelThickness: 0.35,
  bevelSize:      0.25,
  bevelSegments:  3,
}

function makeExtrudedGeo(pathD) {
  const loader = new SVGLoader()
  const { paths } = loader.parse(
    `<svg xmlns="http://www.w3.org/2000/svg"><path d="${pathD}"/></svg>`
  )
  const shapes = SVGLoader.createShapes(paths[0])
  const geo = new THREE.ExtrudeGeometry(shapes, EXTRUDE)
  // Flip Y (SVG y-down → Three.js y-up) and center on origin
  const m = new THREE.Matrix4().makeScale(1, -1, 1)
  m.setPosition(-CX, CY, 0)
  geo.applyMatrix4(m)
  return geo
}

// ── Inner scene — lives inside <Canvas> ───────────────────────────────────
function Scene({ accent, fg }) {
  const parallaxRef   = useRef()
  const kickRef       = useRef()   // wraps letterforms for kick rotation
  const sphereGrpRef  = useRef()   // wraps sphere meshes for animated position
  const target        = useRef({ x: 0, y: 0 })
  const anim          = useRef({
    time:    0,
    sphereX: SPHERE_START_X,
    sphereVel: 0,
    kicked:  false,
    phase:   1,   // 1 = friction travel, 2 = spring settle
  })
  const { camera, size } = useThree()
  const prevFov = useRef(45)

  const stemGeo  = useMemo(() => makeExtrudedGeo(STEM_D), [])
  const bowlGeo  = useMemo(() => makeExtrudedGeo(BOWL_D), [])
  const stemEdge = useMemo(() => new THREE.EdgesGeometry(stemGeo, 12), [stemGeo])
  const bowlEdge = useMemo(() => new THREE.EdgesGeometry(bowlGeo, 12), [bowlGeo])

  const fillMat = useMemo(() => new THREE.MeshBasicMaterial({
    color:       new THREE.Color(accent),
    transparent: true,
    opacity:     0.12,
    side:        THREE.DoubleSide,
  }), [accent])

  const edgeMat = useMemo(() => new THREE.LineBasicMaterial({
    color:       new THREE.Color(accent),
    transparent: true,
    opacity:     0.85,
  }), [accent])

  const sphereFill = useMemo(() => new THREE.MeshBasicMaterial({
    color:       new THREE.Color(fg),
    transparent: true,
    opacity:     0.15,
    side:        THREE.DoubleSide,
  }), [fg])

  const sphereWire = useMemo(() => new THREE.MeshBasicMaterial({
    color:       new THREE.Color(fg),
    wireframe:   true,
    transparent: true,
    opacity:     0.38,
  }), [fg])

  // Mouse parallax — listen on window so pointer-events-none on container is fine
  useEffect(() => {
    const onMove = (e) => {
      // Only apply parallax when cursor is over the right half of the viewport
      // (where the logo lives) — prevents visual artefacts when hovering the name
      if (e.clientX < window.innerWidth * 0.5) return
      target.current.x = (e.clientY / window.innerHeight - 0.5) * 0.15
      target.current.y = (e.clientX / window.innerWidth  - 0.5) * 0.2
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame((_, delta) => {
    // ── Adaptive fov — keep all geometry in frame at any aspect ratio.
    const aspect = size.width / size.height
    if (aspect > 0) {
      const targetFov = Math.min(80, Math.max(45, 2 * Math.atan(0.32 / aspect) * (180 / Math.PI)))
      if (Math.abs(targetFov - prevFov.current) > 0.01) {
        camera.fov = targetFov
        camera.updateProjectionMatrix()
        prevFov.current = targetFov
      }
    }

    // ── Load animation ────────────────────────────────────────────────────
    const dt  = Math.min(delta, 0.05)   // cap for tab-background catch-up
    const adt = dt * 0.5                // half-speed animation scale
    anim.current.time += adt
    const t = anim.current.time

    // Stalk kick: wind-up → swing → spring back
    if (kickRef.current) {
      let kickAngle = 0
      if (t < 0.25) {
        // wind-up: lean slightly left
        kickAngle = -0.04 * (t / 0.25)
      } else if (t < 0.42) {
        // kick: swing right past vertical
        const p = (t - 0.25) / 0.17
        kickAngle = -0.04 + 0.17 * p
      } else {
        // exponential spring back to 0
        kickAngle = 0.13 * Math.exp(-9 * (t - 0.42))
      }
      kickRef.current.rotation.z = kickAngle
    }

    // Give sphere its initial impulse at the moment of kick contact
    if (!anim.current.kicked && t >= 0.42) {
      anim.current.sphereVel = 73
      anim.current.kicked    = true
    }

    // Sphere physics — two phases:
    //   Phase 1: rolling friction decelerates the sphere toward target
    //   Phase 2: underdamped spring rocks it back and forth until settled
    if (anim.current.kicked && sphereGrpRef.current) {
      const targetX = SPHERE_POS[0]
      let { sphereX, sphereVel, phase } = anim.current

      if (phase === 1) {
        // Rolling friction: exponential velocity decay
        sphereVel -= 4 * sphereVel * adt
        sphereX   += sphereVel * adt
        // Hand off to spring the moment sphere reaches the target
        if (sphereX >= targetX) anim.current.phase = 2
      } else {
        // Spring settle: overshoot → rock → damp
        const settled = Math.abs(sphereX - targetX) < 0.05 && Math.abs(sphereVel) < 0.05
        if (!settled) {
          const force = 60 * (targetX - sphereX) - 5 * sphereVel
          sphereVel += force * adt
          sphereX   += sphereVel * adt
        } else {
          sphereX   = targetX
          sphereVel = 0
        }
      }

      anim.current.sphereX   = sphereX
      anim.current.sphereVel = sphereVel
      sphereGrpRef.current.position.x = sphereX
      // Roll: sphere travels right → spins clockwise → negative z rotation
      sphereGrpRef.current.rotation.z = -(sphereX - SPHERE_START_X) / SPHERE_R
    }

    // ── Mouse parallax ────────────────────────────────────────────────────
    if (!parallaxRef.current) return
    const r = parallaxRef.current.rotation
    r.x += (target.current.x - r.x) * 0.05
    r.y += (target.current.y - r.y) * 0.05
  })

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 20, 10]} intensity={1.2} />

      {/* Base tilt: makes the logo appear to lie flat on a ground plane */}
      {/* position Y lifts the scene so the rendered content centres in the canvas */}
      <group rotation={[-Math.PI / 3, 0, 0]} scale={0.44} position={[0, 2.5, 0]}>

        {/* Parallax layer: subtle mouse-driven rotation */}
        <group ref={parallaxRef}>

          {/* Letterforms — grouped so the kick rotation affects both */}
          <group ref={kickRef}>
            <mesh geometry={stemGeo} material={fillMat} />
            <lineSegments geometry={stemEdge} material={edgeMat} />
            <mesh geometry={bowlGeo} material={fillMat} />
            <lineSegments geometry={bowlEdge} material={edgeMat} />
          </group>

          {/* Sphere — starts near stalk, spring-rolls to final position */}
          <group
            ref={sphereGrpRef}
            position={[SPHERE_START_X, SPHERE_POS[1], SPHERE_POS[2]]}
          >
            <mesh material={sphereFill}>
              <sphereGeometry args={[SPHERE_R, 32, 24]} />
            </mesh>
            <mesh material={sphereWire}>
              <sphereGeometry args={[SPHERE_R + 0.05, 14, 10]} />
            </mesh>
          </group>

        </group>
      </group>
    </>
  )
}

// ── Public component ───────────────────────────────────────────────────────
export default function RJLogo3D({ className = '' }) {
  const [colors, setColors] = useState({ accent: '#813746', fg: '#222222' })

  useEffect(() => {
    const read = () => {
      const s = getComputedStyle(document.documentElement)
      setColors({
        accent: s.getPropertyValue('--accent').trim() || '#813746',
        fg:     s.getPropertyValue('--fg').trim()     || '#222222',
      })
    }

    read()

    // Re-read whenever the theme class on <html> changes
    const observer = new MutationObserver(read)
    observer.observe(document.documentElement, {
      attributes:      true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className={className} style={{ overflow: 'hidden' }} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 15, 25], fov: 45, near: 0.1, far: 500 }}
        gl={{ alpha: true, antialias: true }}
        style={{ width: '100%', height: '100%', background: 'transparent', pointerEvents: 'none' }}
      >
        <Scene accent={colors.accent} fg={colors.fg} />
      </Canvas>
    </div>
  )
}
