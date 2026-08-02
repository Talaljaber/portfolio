import React from 'react'

import { skillGroups } from '../../content/skills'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { ChipList, Reveal, SectionHeading } from '../ui'

/**
 * Seven groups, chips rather than middot runs.
 *
 * Desktop lays them out as a two-column grid. Mobile uses an accordion — seven
 * tappable rows, each opening to its chips. This replaced a swipe carousel:
 * horizontal scrolling hides how much is there, gives no sense of the whole
 * list, and fights the page's own vertical scroll. An accordion shows every
 * group name at once and costs about one screen.
 */
export default function Skills() {
  const compact = useMediaQuery('(max-width: 1023px)')

  return (
    <section id="skills" className="section">
      <div className="shell">
        <Reveal>
          <SectionHeading index="03" kicker="Technical Systems" title="Skills & Technologies">
            <p className="u-body">
              The languages, frameworks, and practices I build with day to day.
            </p>
          </SectionHeading>
        </Reveal>

        {compact ? <Accordion /> : <Grid />}
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------- desktop */

function Grid() {
  return (
    <div className="grid gap-x-14 gap-y-12 lab:grid-cols-2">
      {skillGroups.map((group, i) => (
        <Reveal key={group.id} delay={Math.min(i, 4) * 0.05}>
          <div className="border-t pt-7" style={{ borderColor: 'var(--line)' }}>
            <div className="mb-4 flex items-baseline gap-3">
              <span className="u-mono" style={{ color: 'var(--accent)' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="u-heading text-[clamp(1.05rem,1.7vw,1.3rem)]">{group.label}</h3>
              <span className="u-mono ml-auto" style={{ color: 'var(--faint)' }}>
                {group.items.length}
              </span>
            </div>
            <ChipList items={group.items} />
          </div>
        </Reveal>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ mobile */

function Accordion() {
  return (
    <ul className="flex flex-col">
      {skillGroups.map((group, i) => (
        <li key={group.id}>
          {/* Native <details>: content stays in the DOM for find-in-page and
              screen readers even while collapsed. */}
          <details className="group border-t" style={{ borderColor: 'var(--line)' }}>
            <summary className="flex cursor-pointer list-none items-center gap-3 py-4 marker:content-none">
              <span className="u-mono" style={{ color: 'var(--accent)' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="u-heading text-[1.02rem]">{group.label}</span>
              <span className="u-mono ml-auto" style={{ color: 'var(--faint)' }}>
                {group.items.length}
              </span>
              <span
                aria-hidden="true"
                className="text-lg leading-none transition-transform duration-200 group-open:rotate-45"
                style={{ color: 'var(--accent-bright)' }}
              >
                +
              </span>
            </summary>
            <div className="pb-5">
              <ChipList items={group.items} />
            </div>
          </details>
        </li>
      ))}
    </ul>
  )
}
