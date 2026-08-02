import React, { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

import { sampleCoreState } from './coreStates'

/**
 * The systems core: a tall cylindrical machine, not a sphere.
 *
 * Vertical architecture, bottom to top — a grounded base platform, a column of
 * nested glass chambers, metallic rings stacked along its height, six structural
 * struts, and a luminous cube suspended at the centre. Every ring turns at its
 * own rate and direction; nodes orbit on horizontal tracks; particles drift up
 * through the column.
 *
 * Built procedurally so each part animates independently and the whole thing
 * costs kilobytes rather than megabytes. Everything reads scroll from a ref
 * inside useFrame — nothing here triggers a React render.
 */

const ACCENT = new THREE.Color('#6366f1')
const BRIGHT = new THREE.Color('#818cf8')
const GLOW = new THREE.Color('#a5b4fc')
const CYAN = new THREE.Color('#22d3ee')
// Light enough that the key light reads as a highlight on metal rather than
// tinting the whole ring violet.
const STEEL = new THREE.Color('#c3cbdd')

const COLUMN_H = 3.4 // glass column height
const R_OUTER = 1.15 // outer ring radius

/* ------------------------------------------------------ luminous core cube */

const coreVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`

const coreFragment = /* glsl */ `
  uniform float uTime;
  uniform float uGlow;
  uniform vec3 uInner;
  uniform vec3 uRim;
  varying vec3 vNormal;
  varying vec3 vView;

  void main() {
    float facing = clamp(dot(normalize(vNormal), normalize(vView)), 0.0, 1.0);
    float centre = pow(facing, 2.0);
    float rim = pow(1.0 - facing, 1.6);
    float pulse = 0.86 + 0.14 * sin(uTime * 1.7);

    vec3 col = uInner * (0.4 + centre * 2.1) + uRim * rim * 1.7;
    col *= uGlow * pulse;

    gl_FragColor = vec4(col, clamp(centre * 0.85 + rim * 0.8 + 0.15, 0.0, 1.0));
  }
`

function CoreCube({ stateRef }) {
  const cube = useRef()
  const cage = useRef()

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uGlow: { value: 1 },
      uInner: { value: GLOW.clone() },
      uRim: { value: ACCENT.clone() },
    }),
    [],
  )

  useFrame((_, delta) => {
    uniforms.uTime.value += delta
    uniforms.uGlow.value = stateRef.current.glow
    if (cube.current) {
      cube.current.rotation.y += delta * 0.35
      cube.current.rotation.x += delta * 0.12
    }
    // The cage counter-rotates, so the core reads as two nested mechanisms.
    if (cage.current) cage.current.rotation.y -= delta * 0.22
  })

  return (
    <group>
      <mesh ref={cube}>
        <boxGeometry args={[0.34, 0.34, 0.34]} />
        <shaderMaterial
          uniforms={uniforms}
          vertexShader={coreVertex}
          fragmentShader={coreFragment}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Hexagonal containment cage around the cube */}
      <mesh ref={cage} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.62, 0.008, 6, 6]} />
        <meshBasicMaterial color={BRIGHT} transparent opacity={0.85} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.58, 0.006, 6, 6]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.5} />
      </mesh>

      {/* Two nested haloes stand in for a bloom pass: a tight bright one and a
          wide faint one. Far cheaper than postprocessing, and it is what stops
          the cube reading as a solid crystal instead of a light source. */}
      <mesh>
        <sphereGeometry args={[0.72, 16, 16]} />
        <meshBasicMaterial
          color={GLOW}
          transparent
          opacity={0.13}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.45, 16, 16]} />
        <meshBasicMaterial
          color={ACCENT}
          transparent
          opacity={0.05}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  )
}

/* ----------------------------------------------------------- glass column */

function GlassColumn({ quality }) {
  const glass = quality === 'high'

  return (
    <group>
      {/* Nested transparent chambers */}
      <mesh>
        <cylinderGeometry args={[0.78, 0.78, COLUMN_H, 48, 1, true]} />
        <meshPhysicalMaterial
          color="#3d4a7a"
          roughness={0.06}
          metalness={0.1}
          transmission={glass ? 0.95 : 0}
          thickness={0.5}
          transparent
          // Kept low: the column has to read as glass without hiding the core
          // cube suspended behind it.
          opacity={glass ? 0.14 : 0.08}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
      <mesh>
        <cylinderGeometry args={[0.52, 0.52, COLUMN_H * 0.92, 32, 1, true]} />
        <meshBasicMaterial
          color={ACCENT}
          transparent
          opacity={0.09}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Vertical light shaft up the middle of the column */}
      <mesh>
        <cylinderGeometry args={[0.028, 0.028, COLUMN_H * 0.98, 12]} />
        <meshBasicMaterial
          color={GLOW}
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

/* --------------------------------------------------------- structural ribs */

function Struts() {
  const count = 6
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const a = (i / count) * Math.PI * 2
        return { x: Math.cos(a) * 0.92, z: Math.sin(a) * 0.92, key: i }
      }),
    [],
  )

  return (
    <group>
      {items.map(({ x, z, key }) => (
        <mesh key={key} position={[x, 0, z]}>
          <boxGeometry args={[0.035, COLUMN_H * 0.96, 0.035]} />
          <meshStandardMaterial
            color={STEEL}
            metalness={0.95}
            roughness={0.28}
            emissive={ACCENT}
            emissiveIntensity={0.12}
          />
        </mesh>
      ))}
    </group>
  )
}

/* ------------------------------------------------------- stacked ring deck */

const RING_DEFS = [
  { y: -1.42, r: R_OUTER * 1.0, tube: 0.022, speed: 0.30, seg: 4 },
  { y: -0.92, r: R_OUTER * 0.86, tube: 0.014, speed: -0.44, seg: 3 },
  { y: -0.44, r: R_OUTER * 1.06, tube: 0.018, speed: 0.22, seg: 4 },
  { y: 0.0, r: R_OUTER * 1.24, tube: 0.026, speed: -0.16, seg: 6 },
  { y: 0.44, r: R_OUTER * 1.06, tube: 0.018, speed: 0.26, seg: 4 },
  { y: 0.92, r: R_OUTER * 0.86, tube: 0.014, speed: -0.38, seg: 3 },
  { y: 1.42, r: R_OUTER * 1.0, tube: 0.022, speed: 0.34, seg: 4 },
]

function StackedRings({ stateRef }) {
  const refs = useRef([])

  useFrame((_, delta) => {
    const { spread, flatten } = stateRef.current
    RING_DEFS.forEach((def, i) => {
      const ring = refs.current[i]
      if (!ring) return
      // Y, not Z: the rings lie flat, so only a spin about the vertical axis
      // turns them in place. Any other axis tips them out of the deck.
      ring.rotation.y += def.speed * delta
      // `flatten` pulls the deck apart vertically — the skills-area moment
      // where the machine opens up into separated layers.
      ring.position.y = def.y * (1 + flatten * 1.15) * spread
      ring.scale.setScalar(THREE.MathUtils.lerp(1, 1.18, flatten))
    })
  })

  return (
    <group>
      {RING_DEFS.map((def, i) => (
        <group
          key={def.y}
          ref={(el) => {
            refs.current[i] = el
          }}
          position={[0, def.y, 0]}
        >
          {/* Metallic ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[def.r, def.tube, 10, 64]} />
            <meshStandardMaterial
              color={STEEL}
              metalness={0.98}
              roughness={0.22}
              emissive={ACCENT}
              emissiveIntensity={0.03}
            />
          </mesh>
          {/* Emissive inner lip, so each deck reads as lit from within */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[def.r * 0.9, def.tube * 0.3, 6, 48]} />
            <meshBasicMaterial color={BRIGHT} transparent opacity={0.7} />
          </mesh>
          {/* Segment blocks around the ring */}
          {Array.from({ length: def.seg }, (_, s) => {
            const a = (s / def.seg) * Math.PI * 2
            return (
              <mesh
                key={s}
                position={[Math.cos(a) * def.r, 0, Math.sin(a) * def.r]}
                rotation={[0, -a, 0]}
              >
                <boxGeometry args={[0.14, def.tube * 2.6, 0.07]} />
                <meshStandardMaterial color={STEEL} metalness={0.9} roughness={0.3} />
              </mesh>
            )
          })}
        </group>
      ))}
    </group>
  )
}

/* -------------------------------------------------------------- base plate */

function Platform({ y, flip = false }) {
  return (
    <group position={[0, y, 0]} scale={[1, flip ? -1 : 1, 1]}>
      {/* Solid disc */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.34, 64]} />
        <meshStandardMaterial
          color="#0c1020"
          metalness={0.85}
          roughness={0.35}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Concentric rims */}
      {[1.34, 1.18, 0.98].map((r, i) => (
        <mesh key={r} rotation={[Math.PI / 2, 0, 0]} position={[0, i * 0.035, 0]}>
          <torusGeometry args={[r, 0.022 - i * 0.005, 8, 72]} />
          <meshStandardMaterial
            color={STEEL}
            metalness={0.95}
            roughness={0.25}
            emissive={ACCENT}
            emissiveIntensity={0.25}
          />
        </mesh>
      ))}
      {/* Emissive glow ring sitting on the plate */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.11, 0]}>
        <torusGeometry args={[1.08, 0.011, 6, 72]} />
        <meshBasicMaterial color={GLOW} transparent opacity={0.8} />
      </mesh>
    </group>
  )
}

/* ------------------------------------------------------------ orbit nodes */

function Nodes({ count, stateRef }) {
  const mesh = useRef()
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const orbits = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        radius: 1.45 + (i % 3) * 0.4,
        y: -1.6 + ((i * 7) % 9) * 0.4,
        speed: 0.18 + ((i * 31) % 9) * 0.03 * (i % 2 ? 1 : -1),
        phase: (i / count) * Math.PI * 2,
        size: 0.026 + ((i * 13) % 4) * 0.007,
      })),
    [count],
  )

  useFrame((state) => {
    if (!mesh.current) return
    const { spread } = stateRef.current
    const t = state.clock.elapsedTime

    orbits.forEach((orbit, i) => {
      const angle = orbit.phase + t * orbit.speed
      const r = orbit.radius * spread
      dummy.position.set(
        Math.cos(angle) * r,
        orbit.y * spread + Math.sin(t * 0.6 + orbit.phase) * 0.06,
        Math.sin(angle) * r,
      )
      dummy.scale.setScalar(orbit.size)
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color={GLOW} transparent opacity={0.95} />
    </instancedMesh>
  )
}

/* --------------------------------------------------------------- particles */

function Particles({ count }) {
  const points = useRef()

  const { geometry, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const s = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2
      const r = 0.35 + Math.random() * 1.5
      positions[i * 3] = Math.cos(a) * r
      positions[i * 3 + 1] = (Math.random() - 0.5) * COLUMN_H * 1.4
      positions[i * 3 + 2] = Math.sin(a) * r
      s[i] = 0.06 + Math.random() * 0.16
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return { geometry: g, speeds: s }
  }, [count])

  useFrame((_, delta) => {
    if (!points.current) return
    const pos = points.current.geometry.attributes.position
    const top = COLUMN_H * 0.7
    for (let i = 0; i < count; i++) {
      let y = pos.array[i * 3 + 1] + speeds[i] * delta
      if (y > top) y = -top
      pos.array[i * 3 + 1] = y
    }
    pos.needsUpdate = true
  })

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        color={GLOW}
        size={0.022}
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/* -------------------------------------------------------------- connectors */

function Connectors() {
  const lines = useRef()

  const geometry = useMemo(() => {
    const pts = []
    const spokes = 12
    for (let i = 0; i < spokes; i++) {
      const a = (i / spokes) * Math.PI * 2
      const r1 = 1.28
      const r2 = 1.75
      const y = -1.5 + (i % 5) * 0.75
      pts.push(
        new THREE.Vector3(Math.cos(a) * r1, y, Math.sin(a) * r1),
        new THREE.Vector3(Math.cos(a) * r2, y, Math.sin(a) * r2),
      )
    }
    return new THREE.BufferGeometry().setFromPoints(pts)
  }, [])

  useFrame((_, delta) => {
    if (lines.current) lines.current.rotation.y += delta * 0.06
  })

  return (
    <lineSegments ref={lines} geometry={geometry}>
      <lineBasicMaterial color={CYAN} transparent opacity={0.22} />
    </lineSegments>
  )
}

/* --------------------------------------------------------------- assembled */

export default function SystemsCore({ progressRef, pointerRef, quality, reducedMotion }) {
  const group = useRef()
  const state = useRef({ x: 2.5, y: 0, scale: 1, spread: 1, flatten: 0, spin: 0, glow: 1 })
  // The first frame places the machine outright. Easing in from the hardcoded
  // starting transform would otherwise be visible as a slide across the hero
  // on any device slow enough for the lerp to take real time.
  const placed = useRef(false)

  // Aspect, not pixel width: the question is whether the frame is wide enough
  // to hold the machine beside the copy, and aspect answers it without
  // depending on device pixel ratio or a separate media query.
  const aspect = useThree((s) => s.viewport.aspect)
  const compact = aspect < 1.25

  const nodeCount = quality === 'high' ? 26 : quality === 'medium' ? 16 : 9
  const particleCount = quality === 'high' ? 160 : quality === 'medium' ? 80 : 0

  useFrame((_, rawDelta) => {
    // A backgrounded tab returns one enormous delta; clamping stops the whole
    // machine from lurching on the frame the user comes back.
    const delta = Math.min(rawDelta, 0.05)
    const target = sampleCoreState(reducedMotion ? 0 : progressRef.current, state.current)
    const g = group.current
    if (!g) return

    // On a narrow viewport the horizontal offsets would push the machine off
    // the side, so it collapses to centre and sits behind the copy instead.
    const x = compact ? target.x * 0.1 : target.x
    const scale = target.scale * (compact ? 0.58 : 1)
    // Dropped below centre so it sits behind the calls to action rather than
    // behind the headline, which is the text that most needs the contrast.
    const y = compact ? target.y - 1.15 : target.y

    const ease = placed.current ? 0.06 : 1
    placed.current = true

    g.position.x = THREE.MathUtils.lerp(g.position.x, x, ease)
    g.position.y = THREE.MathUtils.lerp(g.position.y, y, ease)
    g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, scale, ease))

    if (reducedMotion) return

    // The machine stands upright and turns on its own axis; it never tumbles.
    g.rotation.y += delta * 0.09

    const p = pointerRef.current
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -p.y * 0.07, 0.05)
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, p.x * 0.025, 0.05)
    g.position.y += Math.sin(performance.now() * 0.0006) * 0.0014
  })

  return (
    <group ref={group} position={[2.5, 0, 0]} rotation={[0.12, 0, 0]}>
      <Platform y={-1.92} />
      <Platform y={1.92} flip />
      <GlassColumn quality={quality} />
      <Struts />
      <StackedRings stateRef={state} />
      <CoreCube stateRef={state} />
      <Nodes count={nodeCount} stateRef={state} />
      {particleCount > 0 && <Particles count={particleCount} />}
      {quality !== 'low' && <Connectors />}
    </group>
  )
}
