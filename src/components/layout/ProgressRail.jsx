import React from 'react'

import { sections } from '../../lib/sections'

/**
 * The continuity thread. One fixed element, present from the first pixel to
 * the last, tracking position. Because it is physically the same DOM node for
 * the entire scroll, the page cannot help but read as a single environment.
 *
 * Hidden below 1024px, where the viewport cannot spare the width.
 */
export default function ProgressRail({ active }) {
  return (
    <nav
      className="fixed left-0 top-0 z-30 hidden h-screen w-[var(--rail-w)] flex-col items-center justify-center gap-3 lab:flex"
      aria-label="Section progress"
    >
      {sections.map((section, i) => {
        const isActive = section.id === active
        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="group flex items-center gap-2 transition-opacity duration-300"
            style={{ opacity: isActive ? 1 : 0.35 }}
          >
            <span
              className="u-mono text-[0.62rem] transition-colors duration-300"
              style={{ color: isActive ? 'var(--accent-bright)' : 'var(--muted)' }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <span
              className="block h-px transition-all duration-300"
              style={{
                width: isActive ? '14px' : '6px',
                background: isActive ? 'var(--accent-bright)' : 'var(--faint)',
              }}
            />
            <span className="sr-only">{section.label}</span>
          </a>
        )
      })}
    </nav>
  )
}
