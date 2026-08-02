import React from 'react'

/**
 * The single environment layer. Fixed, full-viewport, behind everything, and
 * mounted exactly once for the whole page — no section ever paints its own
 * background, which is what stops the site reading as stacked blocks.
 *
 * Three pieces, none of which change colour as you scroll. Only the 3D core
 * (phase 5) and the lighting will evolve.
 */
export default function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      {/* Violet bloom, upper right, falling away to near-black. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 78% 8%, rgba(99,102,241,0.20) 0%, rgba(99,102,241,0.06) 35%, transparent 68%), radial-gradient(45% 55% at 72% 48%, rgba(129,140,248,0.13) 0%, transparent 70%), radial-gradient(80% 60% at 10% 100%, rgba(34,211,238,0.05) 0%, transparent 60%)',
        }}
      />

      {/* Perspective floor grid. Pure CSS: no canvas, no paint cost on scroll. */}
      <div
        className="absolute inset-x-0 bottom-0 h-[55vh] opacity-[0.5]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(120,140,190,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(120,140,190,0.10) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          transform: 'perspective(340px) rotateX(58deg)',
          transformOrigin: 'bottom center',
          maskImage: 'linear-gradient(to bottom, transparent, #000 55%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, #000 55%)',
        }}
      />

      {/* Vignette, to keep the edges from feeling open. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(100% 100% at 50% 50%, transparent 55%, rgba(5,6,10,0.75) 100%)',
        }}
      />
    </div>
  )
}
