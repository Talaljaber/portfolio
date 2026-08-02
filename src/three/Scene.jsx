import React, { useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'

import { useDeviceCapability } from '../hooks/useDeviceCapability'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference'
import { useScrollProgress } from '../hooks/useScrollProgress'
import CoreHUD from '../components/layout/CoreHUD'
import SystemsCore from './SystemsCore'

/**
 * The one canvas on the site. Fixed behind all content, mounted once, never
 * unmounted. It sits above the CSS background layer and below the DOM, and it
 * never takes pointer events — the page must stay usable if this fails.
 */
export default function Scene() {
  const tier = useDeviceCapability()
  const compact = useMediaQuery('(max-width: 1023px)')
  const reducedMotion = useReducedMotionPreference()
  const progressRef = useScrollProgress()
  const pointerRef = useRef({ x: 0, y: 0 })
  const [visible, setVisible] = useState(true)
  const [failed, setFailed] = useState(false)
  // Mount after first paint so the canvas never competes with LCP.
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true))
    return () => cancelAnimationFrame(id)
  }, [])

  useEffect(() => {
    if (reducedMotion) return undefined
    const onMove = (event) => {
      pointerRef.current.x = (event.clientX / window.innerWidth) * 2 - 1
      pointerRef.current.y = (event.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [reducedMotion])

  // Stop rendering entirely in a hidden tab.
  useEffect(() => {
    const onVisibility = () => setVisible(!document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  if (tier === 'none' || failed || !ready) return <Fallback />

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1]"
      aria-hidden="true"
      // Narrow viewports put the copy directly over the core, so it dims to
      // keep body text at a readable contrast.
      style={{ opacity: compact ? 0.32 : 1 }}
    >
      <Canvas
        frameloop={visible ? 'always' : 'never'}
        dpr={tier === 'high' ? [1, 2] : [1, 1.5]}
        camera={{ position: [0, 0, 9.6], fov: 45 }}
        gl={{ antialias: tier !== 'low', alpha: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener('webglcontextlost', (event) => {
            // Losing the context mid-scroll would otherwise freeze a dead
            // canvas over the page; drop back to the CSS orb instead.
            event.preventDefault()
            setFailed(true)
          })
        }}
      >
        {/* Polished metal shows nothing without something to reflect, so the
            rig is a violet key, a cyan fill, a hard white rim to catch the
            ring edges, and a warm underlight bouncing off the base plate. */}
        <ambientLight intensity={0.55} />
        <pointLight position={[4, 3.5, 5]} intensity={90} color="#818cf8" distance={40} />
        <pointLight position={[-5, -1, 3]} intensity={40} color="#22d3ee" distance={30} />
        <pointLight position={[0, 0, 2.2]} intensity={26} color="#a5b4fc" distance={12} />
        <spotLight
          position={[-3, 6, -2]}
          angle={0.7}
          penumbra={0.8}
          intensity={120}
          color="#ffffff"
          distance={40}
        />
        <pointLight position={[0, -2.6, 1]} intensity={30} color="#6366f1" distance={14} />

        <SystemsCore
          progressRef={progressRef}
          pointerRef={pointerRef}
          quality={tier}
          reducedMotion={reducedMotion}
        />
      </Canvas>

      {!compact && <CoreHUD progressRef={progressRef} quality={tier} />}
    </div>
  )
}

/** Pure CSS stand-in: no WebGL, no JavaScript animation, same composition. */
function Fallback() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1]" aria-hidden="true">
      <div
        className="absolute right-[8%] top-1/2 hidden h-[38vh] w-[38vh] -translate-y-1/2 rounded-full lab:block"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(165,180,252,0.30) 0%, rgba(99,102,241,0.16) 38%, transparent 68%)',
        }}
      />
    </div>
  )
}
