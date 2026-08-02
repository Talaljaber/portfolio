import React from 'react'
import { ArrowUpRight } from 'lucide-react'

import { experience, education } from '../../content/experience'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { Kicker, Reveal, SectionHeading } from '../ui'

/**
 * A node graph rather than a résumé timeline: each role is a node on a spine
 * that reuses the core's connector language. On mobile the spine collapses to
 * a plain vertical list, which is the only pattern that stays readable at
 * phone widths with seven roles.
 */
/**
 * On mobile only the first bullet shows, with the rest behind a disclosure.
 * Seven roles at three bullets each is otherwise a very long scroll, and the
 * first bullet is the one that says what the role was.
 */
function Points({ points, compact }) {
  if (!points?.length) return null

  // On mobile every bullet folds away, leaving role, org and period — enough
  // to scan seven roles in one screen, with the detail one tap away.
  const shown = compact ? [] : points
  const hidden = compact ? points : []

  return (
    <>
      {shown.length > 0 && (
        <ul className="mt-4 flex flex-col gap-2">
          {shown.map((point) => (
            <Bullet key={point.slice(0, 40)} point={point} />
          ))}
        </ul>
      )}

      {hidden.length > 0 && (
        <details className="group mt-2">
          <summary
            className="u-kicker cursor-pointer list-none marker:content-none"
            style={{ color: 'var(--accent-bright)' }}
          >
            <span className="group-open:hidden">
              + {hidden.length} {hidden.length === 1 ? 'detail' : 'details'}
            </span>
            <span className="hidden group-open:inline">− Less</span>
          </summary>
          <ul className="mt-2 flex flex-col gap-2">
            {hidden.map((point) => (
              <Bullet key={point.slice(0, 40)} point={point} />
            ))}
          </ul>
        </details>
      )}
    </>
  )
}

function Bullet({ point }) {
  return (
    <li className="flex gap-3">
      <span
        aria-hidden="true"
        className="mt-[0.62em] h-px w-3 shrink-0"
        style={{ background: 'var(--faint)' }}
      />
      <span className="u-body text-sm">{point}</span>
    </li>
  )
}

export default function Experience() {
  const compact = useMediaQuery('(max-width: 1023px)')

  return (
    <section id="experience" className="section">
      <div className="shell">
        <Reveal>
          <SectionHeading index="04" kicker="Experience" title="Roles & Leadership">
            <p className="u-body">
              Building products, leading teams, and delivering impact across startups, community
              organisations, and client work.
            </p>
          </SectionHeading>
        </Reveal>

        <div className="relative">
          {/* The spine. Decorative — the list reads without it. */}
          <span
            aria-hidden="true"
            className="absolute left-[5px] top-2 hidden h-[calc(100%-1rem)] w-px lab:block"
            style={{
              background:
                'linear-gradient(to bottom, transparent, var(--line-strong) 8%, var(--line-strong) 92%, transparent)',
            }}
          />

          <ol className="flex flex-col gap-px">
            {experience.map((role, i) => (
              <Reveal key={role.id} delay={Math.min(i, 4) * 0.05}>
                <li className="relative lab:pl-12">
                  {/* Node */}
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-[1.9rem] hidden h-[11px] w-[11px] lab:block"
                    style={{
                      border: '1px solid var(--accent)',
                      background: 'var(--bg)',
                      boxShadow: '0 0 14px -2px var(--accent)',
                    }}
                  />

                  <div
                    className="border-t py-7 transition-colors duration-300"
                    style={{ borderColor: 'var(--line)' }}
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                      <h3 className="u-heading text-[clamp(1.1rem,1.9vw,1.4rem)]">{role.role}</h3>
                      <span className="u-mono">{role.period}</span>
                    </div>

                    <p className="mt-1.5 flex items-center gap-2 text-sm" style={{ color: 'var(--accent-bright)' }}>
                      {role.link ? (
                        <a
                          href={role.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="u-link inline-flex items-center gap-1"
                        >
                          {role.org}
                          <ArrowUpRight size={12} aria-hidden="true" />
                        </a>
                      ) : (
                        role.org
                      )}
                    </p>

                    <Points points={role.points} compact={compact} />
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal>
          <div
            className="mt-14 border-t pt-8"
            style={{ borderColor: 'var(--line-strong)' }}
          >
            <Kicker className="mb-3">Education</Kicker>
            <h3 className="u-heading text-[clamp(1.1rem,1.9vw,1.4rem)]">{education.degree}</h3>
            <p className="u-mono mt-2">
              {education.institution} · {education.period}
            </p>
            {education.note && <p className="u-body mt-3 text-sm">{education.note}</p>}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
