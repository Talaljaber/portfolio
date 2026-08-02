import React from 'react'
import { ArrowRight, Cloud, Code2, Globe, Layers } from 'lucide-react'

import { Kicker, Reveal } from '../ui'

/**
 * The composition from reference 1: label, name, headline, supporting copy,
 * two calls to action, capability labels, and a system strip.
 *
 * The right half is deliberately left open — that is where the 3D core mounts
 * in phase 5. Until then the background bloom fills it, and the layout is
 * already balanced rather than looking like something is missing.
 */

const capabilities = [
  { label: 'Full-Stack', Icon: Code2 },
  { label: 'AI', Icon: Globe },
  { label: 'Cloud', Icon: Cloud },
  { label: 'Systems', Icon: Layers },
]

export default function Hero() {
  return (
    <section id="hero" className="section-screen relative flex items-center pt-24">
      <div className="shell w-full">
        <div className="grid items-center gap-16 lab:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">
          <div>
            <Reveal>
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="inline-block h-2 w-2"
                  style={{ border: '1px solid var(--accent)' }}
                />
                <Kicker as="span" style={{ color: 'var(--accent-bright)' }}>
                  Software Engineer / AI Systems
                </Kicker>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="u-display mt-6 text-[clamp(2.25rem,4.6vw,4rem)]">
                Talal Jaber
                <span className="block" style={{ color: 'var(--accent-bright)' }}>
                  Building intelligent
                </span>
                <span className="block" style={{ color: 'var(--accent-bright)' }}>
                  digital products.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <span
                className="mt-7 block h-px w-12"
                style={{ background: 'var(--line-strong)' }}
                aria-hidden="true"
              />
              <p className="mt-5 max-w-[38ch] text-[clamp(0.95rem,1.3vw,1.05rem)] leading-relaxed">
                Software engineering, AI systems, and scalable web experiences.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#work" className="btn-primary">
                  View Projects <ArrowRight size={14} aria-hidden="true" />
                </a>
                <a href="#contact" className="btn-secondary">
                  Contact Me <ArrowRight size={14} aria-hidden="true" />
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.32}>
              <ul className="mt-9 flex flex-wrap gap-3">
                {capabilities.map(({ label, Icon }) => (
                  <li
                    key={label}
                    className="panel bracket flex items-center gap-2 px-4 py-2.5"
                  >
                    <Icon size={13} aria-hidden="true" style={{ color: 'var(--accent-bright)' }} />
                    <span className="u-mono" style={{ color: 'var(--text)' }}>
                      {label}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Reserved for the systems core. */}
          <div className="hidden lab:block" aria-hidden="true" />
        </div>

        <Reveal delay={0.4}>
          <SystemStrip />
        </Reveal>
      </div>
    </section>
  )
}

function SystemStrip() {
  const items = [
    { label: 'Location', value: 'Amman, Jordan', live: false },
    { label: 'Availability', value: 'Open to Work', live: true },
    { label: 'Status', value: 'Online', live: true },
  ]

  return (
    <div className="panel bracket mt-12 flex flex-col gap-px sm:flex-row sm:gap-0">
      {items.map((item, i) => (
        <div
          key={item.label}
          className="flex flex-1 items-center gap-3 px-5 py-4"
          style={{ borderLeft: i > 0 ? '1px solid var(--line)' : undefined }}
        >
          {item.live && (
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: 'var(--cyan)', boxShadow: '0 0 8px var(--cyan)' }}
            />
          )}
          <span className="u-kicker">{item.label}</span>
          <span className="u-mono ml-auto" style={{ color: 'var(--ink)' }}>
            {item.value}
          </span>
        </div>
      ))}
    </div>
  )
}
