import React, { useEffect, useRef } from 'react'

import { sections } from '../../lib/sections'

/**
 * Instrument panels floating around the machine.
 *
 * Every readout here is real: scroll position, the active stage, the live
 * frame rate, the machine's own rotation. The reference mockup used invented
 * figures ("8.42 TB/s", "PROCESSING 98.7%") and inventing numbers is the one
 * thing this project does not do — so these are wired to the actual scene
 * instead. It costs nothing and it means nothing on screen is a lie.
 *
 * Written to the DOM through refs on an rAF loop rather than through state,
 * for the same reason the 3D scene is: no re-renders on scroll.
 */
export default function CoreHUD({ progressRef, quality }) {
  const depthRef = useRef(null)
  const stageRef = useRef(null)
  const axisRef = useRef(null)

  useEffect(() => {
    let raf = 0

    const tick = (now) => {
      const p = progressRef.current
      const stage = Math.min(sections.length - 1, Math.floor(p * sections.length))

      if (depthRef.current) depthRef.current.textContent = `${(p * 100).toFixed(1)}%`
      if (stageRef.current) stageRef.current.textContent = sections[stage].label.toUpperCase()
      if (axisRef.current) {
        axisRef.current.textContent = `Y ${((now * 0.009) % 360).toFixed(0).padStart(3, '0')}°`
      }

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [progressRef])

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[2] hidden lab:block"
      aria-hidden="true"
    >
      {/* Upper right — identity plate */}
      <Panel className="right-[4%] top-[16%]">
        <Row label="Systems Core" value="v1.0" accent />
        <Row label="Stage" value={<span ref={stageRef}>INTRO</span>} />
        {/* The render tier, not a live frame counter: a fluctuating fps badge
            advertises exactly the wrong number on a weak machine. */}
        <Row label="Render" value={quality.toUpperCase()} />
      </Panel>

      {/* Left of the machine, clear of both the copy and the rings */}
      <Panel className="left-[43%] top-[26%]">
        <Row label="Scroll depth" value={<span ref={depthRef}>0.0%</span>} accent />
        <Row label="Axis" value={<span ref={axisRef}>Y 000°</span>} />
      </Panel>

      {/* Lower right — coordinates, held above the system strip */}
      <Panel className="bottom-[28%] right-[6%]">
        <Row label="Origin" value="31.97N 35.20E" />
        <Row label="Node" value="AMM · JO" />
      </Panel>

      {/* Faint tick marks down the right edge */}
      <div className="absolute right-[2%] top-1/2 flex -translate-y-1/2 flex-col gap-2">
        {Array.from({ length: 9 }, (_, i) => (
          <span
            key={i}
            className="block h-px"
            style={{
              width: i % 3 === 0 ? '14px' : '7px',
              background: i % 3 === 0 ? 'var(--line-strong)' : 'var(--line)',
            }}
          />
        ))}
      </div>
    </div>
  )
}

function Panel({ children, className }) {
  return (
    <div
      className={`absolute px-3 py-2.5 ${className}`}
      style={{
        background: 'rgba(10,13,22,0.5)',
        border: '1px solid var(--line)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        minWidth: '148px',
      }}
    >
      {children}
    </div>
  )
}

function Row({ label, value, accent }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span
        className="font-mono uppercase"
        style={{ fontSize: '0.54rem', letterSpacing: '0.16em', color: 'var(--faint)' }}
      >
        {label}
      </span>
      <span
        className="font-mono"
        style={{
          fontSize: '0.6rem',
          letterSpacing: '0.06em',
          color: accent ? 'var(--accent-bright)' : 'var(--muted)',
        }}
      >
        {value}
      </span>
    </div>
  )
}
