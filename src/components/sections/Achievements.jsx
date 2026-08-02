import React from 'react'
import { ArrowUpRight } from 'lucide-react'

import { achievements, press } from '../../content/achievements'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { Collapsible, Kicker, Reveal, SectionHeading } from '../ui'

/**
 * Featured recognitions as connected tiles, then the remainder as a compact
 * list. Connector marks reuse the node language from Experience so the two
 * areas read as parts of the same system.
 */
const featured = achievements.filter((a) => a.featured)
const rest = achievements.filter((a) => !a.featured)

function Tile({ item, compact }) {
  return (
    <article
      className={
        compact
          ? 'flex h-full flex-col px-4 py-5'
          : 'flex h-full flex-col p-[clamp(1.5rem,3vw,2.25rem)]'
      }
      style={{
        // Raised off the page rather than flush with it. These tiles were
        // painted in --bg, identical to the background, so the section read as
        // floating text with no edges.
        background: 'rgba(13,17,30,0.88)',
        borderLeft: '2px solid var(--accent)',
      }}
    >
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="block h-2 w-2 shrink-0"
          style={{ border: '1px solid var(--accent)', boxShadow: '0 0 10px -1px var(--accent)' }}
        />
        <Kicker as="span">{item.type}</Kicker>
        <span className="u-mono ml-auto">{item.date}</span>
      </div>

      <h3 className="u-heading mt-4 text-[clamp(1.05rem,1.7vw,1.3rem)]">{item.title}</h3>

      <p className="u-mono mt-2" style={{ color: 'var(--accent-bright)' }}>
        {item.organization}
      </p>

      {item.description &&
        (compact ? (
          <details className="group mt-2">
            <summary
              className="u-kicker cursor-pointer list-none marker:content-none"
              style={{ color: 'var(--accent-bright)' }}
            >
              <span className="group-open:hidden">+ Detail</span>
              <span className="hidden group-open:inline">− Less</span>
            </summary>
            <p className="u-body mt-2 text-sm">{item.description}</p>
          </details>
        ) : (
          <p className="u-body mt-4 text-sm">{item.description}</p>
        ))}

      {item.link && (
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost mt-auto pt-6"
        >
          {item.linkLabel ?? 'Read more'} <ArrowUpRight size={13} aria-hidden="true" />
        </a>
      )}
    </article>
  )
}

export default function Achievements() {
  const compact = useMediaQuery('(max-width: 1023px)')

  return (
    <section id="achievements" className="section">
      <div className="shell">
        <Reveal>
          <SectionHeading index="06" kicker="Recognition" title="Achievements">
            <p className="u-body">
              Milestones that reflect dedication, leadership, and continuous growth.
            </p>
          </SectionHeading>
        </Reveal>

        {compact ? (
          <ul className="flex flex-col gap-2">
            {featured.map((item) => (
              <li key={item.id}>
                <Tile item={item} compact />
              </li>
            ))}
          </ul>
        ) : (
          <div className="grid gap-px lab:grid-cols-2" style={{ background: 'var(--line)' }}>
            {featured.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.06} className="h-full">
                <Tile item={item} />
              </Reveal>
            ))}
          </div>
        )}

        <Reveal>
          <div className="mt-16 grid gap-12 lab:grid-cols-2">
            <Collapsible summary="Also" count={rest.length}>
              <ul className="flex flex-col">
                {rest.map((item) => (
                  <li
                    key={item.id}
                    className="flex flex-wrap items-baseline gap-x-4 border-b py-3 last:border-0"
                    style={{ borderColor: 'var(--line)' }}
                  >
                    <span className="text-sm" style={{ color: 'var(--ink)' }}>
                      {item.title}
                    </span>
                    <span className="u-mono ml-auto">{item.organization}</span>
                  </li>
                ))}
              </ul>
            </Collapsible>

            <Collapsible summary="In the press" count={press.length}>
              <ul className="flex flex-col gap-4">
                {press.map((item) => (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-2"
                    >
                      <span className="u-body text-sm group-hover:text-[var(--accent-bright)]">
                        {item.title}
                      </span>
                      <ArrowUpRight
                        size={13}
                        aria-hidden="true"
                        className="mt-1 shrink-0"
                        style={{ color: 'var(--accent)' }}
                      />
                    </a>
                    <span className="u-mono">{item.outlet}</span>
                  </li>
                ))}
              </ul>
            </Collapsible>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
