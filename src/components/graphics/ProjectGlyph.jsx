import React from 'react'

/**
 * A schematic plate per project — line art, drawn rather than photographed.
 *
 * There are no project screenshots in this repository, so without something
 * here every card is pure typography and they all look identical. Each glyph is
 * a different mechanism (gear train, orbital, signal trace, node graph, layer
 * stack, circuit) chosen from the project's category, so a card is recognisable
 * before you read it.
 *
 * Deliberately geometry, not decoration: everything is constructed from real
 * coordinates on a 120-unit grid, with a blueprint frame, tick marks and
 * dimension rules — the vocabulary of a technical drawing.
 *
 * Motion is CSS-only and stops entirely under prefers-reduced-motion, which the
 * global rule in base.css already enforces.
 */

const S = 120
const C = S / 2

/* --------------------------------------------------------------- mechanisms */

function Gear({ teeth = 14, r = 34, depth = 7 }) {
  return (
    <g className="glyph-spin">
      {Array.from({ length: teeth }, (_, i) => {
        const a = (i / teeth) * Math.PI * 2
        const x = C + Math.cos(a) * (r + depth / 2)
        const y = C + Math.sin(a) * (r + depth / 2)
        return (
          <rect
            key={i}
            x={x - 3}
            y={y - depth / 2}
            width="6"
            height={depth}
            transform={`rotate(${(a * 180) / Math.PI} ${x} ${y})`}
          />
        )
      })}
      <circle cx={C} cy={C} r={r} />
      <circle cx={C} cy={C} r={r - 9} />
      <circle cx={C} cy={C} r="7" />
      {Array.from({ length: 6 }, (_, i) => {
        const a = (i / 6) * Math.PI * 2
        return (
          <line
            key={i}
            x1={C + Math.cos(a) * 8}
            y1={C + Math.sin(a) * 8}
            x2={C + Math.cos(a) * (r - 10)}
            y2={C + Math.sin(a) * (r - 10)}
          />
        )
      })}
    </g>
  )
}

function Orbital() {
  return (
    <g>
      {[0, 60, 120].map((deg, i) => (
        <ellipse
          key={deg}
          cx={C}
          cy={C}
          rx="40"
          ry="15"
          transform={`rotate(${deg} ${C} ${C})`}
          className={i === 1 ? 'glyph-spin-slow' : undefined}
          style={{ transformOrigin: `${C}px ${C}px` }}
        />
      ))}
      <circle cx={C} cy={C} r="8" className="glyph-fill" />
      {[0, 60, 120].map((deg) => {
        const a = (deg * Math.PI) / 180
        return (
          <circle
            key={deg}
            cx={C + Math.cos(a) * 40}
            cy={C + Math.sin(a) * 15}
            r="3"
            className="glyph-fill"
          />
        )
      })}
    </g>
  )
}

function Signal() {
  const pts = Array.from({ length: 61 }, (_, i) => {
    const x = 18 + i
    const t = i / 60
    const y = C - Math.sin(t * Math.PI * 4) * 22 * (1 - t * 0.55)
    return `${x},${y.toFixed(1)}`
  }).join(' ')

  return (
    <g>
      <line x1="18" y1={C} x2="102" y2={C} className="glyph-faint" />
      {Array.from({ length: 9 }, (_, i) => (
        <line key={i} x1={18 + i * 10.5} y1={C - 3} x2={18 + i * 10.5} y2={C + 3} className="glyph-faint" />
      ))}
      <polyline points={pts} className="glyph-trace" />
      <line x1="18" y1="30" x2="18" y2="90" className="glyph-faint" />
    </g>
  )
}

function NodeGraph() {
  const nodes = [
    [C, 26],
    [92, 50],
    [80, 90],
    [40, 90],
    [28, 50],
    [C, C],
  ]
  const edges = [
    [0, 5], [1, 5], [2, 5], [3, 5], [4, 5],
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 0],
  ]
  return (
    <g>
      {edges.map(([a, b], i) => (
        <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} />
      ))}
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 5 ? 7 : 4} className="glyph-fill" />
      ))}
    </g>
  )
}

function LayerStack() {
  return (
    <g>
      {[0, 1, 2, 3].map((i) => {
        const y = 34 + i * 16
        return (
          <g key={i}>
            <path d={`M${C} ${y - 9} L92 ${y} L${C} ${y + 9} L28 ${y} Z`} />
            <line x1="28" y1={y} x2="28" y2={y + 6} className="glyph-faint" />
            <line x1="92" y1={y} x2="92" y2={y + 6} className="glyph-faint" />
          </g>
        )
      })}
    </g>
  )
}

function Circuit() {
  return (
    <g>
      <rect x="44" y="44" width="32" height="32" />
      <rect x="52" y="52" width="16" height="16" className="glyph-faint" />
      {[0, 1, 2, 3].map((side) =>
        [0, 1, 2].map((i) => {
          const off = 52 + i * 8
          const long = 22
          const common = { key: `${side}-${i}`, className: 'glyph-trace' }
          if (side === 0) return <line {...common} x1={off} y1="44" x2={off} y2={44 - long} />
          if (side === 1) return <line {...common} x1={off} y1="76" x2={off} y2={76 + long} />
          if (side === 2) return <line {...common} x1="44" y1={off} x2={44 - long} y2={off} />
          return <line {...common} x1="76" y1={off} x2={76 + long} y2={off} />
        }),
      )}
      {[22, 98].map((v) => (
        <g key={v}>
          <circle cx={v} cy={C} r="2.5" className="glyph-fill" />
          <circle cx={C} cy={v} r="2.5" className="glyph-fill" />
        </g>
      ))}
    </g>
  )
}

/* ------------------------------------------------------------------ picker */

const BY_CATEGORY = {
  Startup: NodeGraph,
  'Developer Tools': Gear,
  'Fintech / Mobile': Circuit,
  'E-Commerce': LayerStack,
  'IoT / ML': Signal,
  'ML / Full-Stack': Orbital,
  'Computer Vision': Orbital,
  'Full-Stack': LayerStack,
  Dashboard: Signal,
  'Restaurant Tech': NodeGraph,
}

const FALLBACKS = [Gear, Orbital, Signal, NodeGraph, LayerStack, Circuit]

/** Stable hash so a project without a mapped category still always draws the same glyph. */
function pick(category, id) {
  if (BY_CATEGORY[category]) return BY_CATEGORY[category]
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0
  return FALLBACKS[h % FALLBACKS.length]
}

export default function ProjectGlyph({ category, id = '', size = 120, frame = true, className }) {
  const Mechanism = pick(category, id)

  return (
    <svg
      viewBox={`0 0 ${S} ${S}`}
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="square"
    >
      {frame && (
        <g className="glyph-faint">
          {/* Corner brackets and edge ticks: the drawing's frame, not a box. */}
          <path d="M2 12 L2 2 L12 2" />
          <path d="M108 2 L118 2 L118 12" />
          <path d="M118 108 L118 118 L108 118" />
          <path d="M12 118 L2 118 L2 108" />
          <line x1={C} y1="2" x2={C} y2="7" />
          <line x1={C} y1="113" x2={C} y2="118" />
          <line x1="2" y1={C} x2="7" y2={C} />
          <line x1="113" y1={C} x2="118" y2={C} />
        </g>
      )}
      <Mechanism />
    </svg>
  )
}
