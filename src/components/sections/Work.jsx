import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Github } from 'lucide-react'

import { projects } from '../../content/projects'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import ProjectGlyph from '../graphics/ProjectGlyph'
import { Collapsible, Kicker, Reveal, SectionHeading, TermRun } from '../ui'

/**
 * Case studies, not cards. No imagery by decision — the weight is carried by
 * scale, numbering and technical framing instead. The lead project takes a full
 * row; the rest share a grid below it.
 */

const featured = projects.filter((p) => p.featured).sort((a, b) => a.priority - b.priority)
const [lead, ...rest] = featured
const archive = projects.filter((p) => !p.featured)

export default function Work() {
  const compact = useMediaQuery('(max-width: 1023px)')

  return (
    <section id="work" className="section">
      <div className="shell">
        <Reveal>
          <SectionHeading index="02" kicker="Selected Work" title="Featured Projects">
            <p className="u-body">
              Real solutions to complex problems, from a national-award-winning startup to
              open-source developer tooling.
            </p>
          </SectionHeading>
        </Reveal>

        {lead && !compact && <LeadProject project={lead} />}

        {compact ? (
          // One screen means one list: the lead project joins the rows rather
          // than taking half the section as a full case-study panel.
          <ol className="mt-8 flex flex-col">
            {featured.map((project, i) => (
              <li key={project.id}>
                <CompactProject project={project} index={i + 1} lead={i === 0} />
              </li>
            ))}
          </ol>
        ) : (
          <div className="mt-12 grid gap-px lab:grid-cols-2" style={{ background: 'var(--line)' }}>
            {rest.map((project, i) => (
              <Reveal key={project.id} delay={i * 0.06} className="h-full bg-bg">
                <SecondaryProject project={project} index={i + 2} />
              </Reveal>
            ))}
            {/* The divider colour shows through any empty cell, so an odd count
                needs a filler or the grid ends on a visible grey box. */}
            {rest.length % 2 === 1 && (
              <div className="hidden lab:block" style={{ background: 'var(--bg)' }} aria-hidden="true" />
            )}
          </div>
        )}

        <Reveal>
          <ArchiveList items={archive} />
        </Reveal>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------- lead */

function LeadProject({ project }) {
  return (
    <Reveal>
      {/* Nearly opaque, unlike the site's other panels: the systems core passes
          behind this card and a translucent fill left the copy sitting on a
          moving, blurry background. */}
      <article
        className="bracket group relative overflow-hidden p-[clamp(1.5rem,4vw,3.5rem)]"
        style={{ background: 'rgba(9,12,22,0.94)', border: '1px solid var(--line)' }}
      >
        <span className="blueprint" aria-hidden="true" />

        <div className="relative grid gap-10 lab:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
          <div>
            <div className="flex items-baseline gap-4">
              <span className="u-mono" style={{ color: 'var(--accent)' }}>
                01
              </span>
              <Kicker as="span">{project.category}</Kicker>
            </div>

            <h3 className="u-heading mt-5 text-[clamp(1.75rem,3.5vw,2.75rem)]">
              {project.title.split('–')[0].trim()}
            </h3>

            <p className="mt-4 text-[clamp(1rem,1.5vw,1.15rem)] leading-relaxed">
              {project.shortDescription}
            </p>

            <p className="u-body mt-6">{project.description}</p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link to={`/projects/${project.id}`} className="btn-primary">
                View case study <ArrowRight size={14} aria-hidden="true" />
              </Link>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                >
                  Live site <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-8 lab:border-l lab:pl-10" style={{ borderColor: 'var(--line)' }}>
            <div className="flex items-start justify-between gap-6">
              <ProjectGlyph
                category={project.category}
                id={project.id}
                size={148}
                className="glyph shrink-0"
              />
              <span
                className="u-mono self-end"
                style={{ color: 'var(--faint)', writingMode: 'vertical-rl' }}
              >
                FIG.01
              </span>
            </div>

            <Detail label="Role" value={project.role} />
            <Detail label="Year" value={project.year} />
            <Detail label="Status" value={project.status} />
            <div>
              <Kicker className="mb-3">Built with</Kicker>
              <TermRun items={project.technologies} />
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  )
}

function Detail({ label, value }) {
  if (!value) return null
  return (
    <div>
      <Kicker className="mb-1.5">{label}</Kicker>
      <p className="text-sm" style={{ color: 'var(--ink)' }}>
        {value}
      </p>
    </div>
  )
}

/* -------------------------------------------------------------- secondary */

function SecondaryProject({ project, index }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden p-[clamp(1.5rem,3vw,2.5rem)] transition-colors duration-300">
      {/* Plate sits behind the copy, bled off the top-right corner. */}
      <ProjectGlyph
        category={project.category}
        id={project.id}
        size={132}
        frame={false}
        className="glyph pointer-events-none absolute -right-5 -top-4 opacity-[0.22]"
      />

      <div className="relative flex items-baseline gap-4">
        <span className="u-mono" style={{ color: 'var(--accent)' }}>
          {String(index).padStart(2, '0')}
        </span>
        <Kicker as="span">{project.category}</Kicker>
        <span className="u-mono ml-auto">{project.year}</span>
      </div>

      <h3 className="u-heading relative mt-4 text-[clamp(1.25rem,2vw,1.6rem)]">
        {project.title.split('–')[0].trim()}
      </h3>

      <p className="u-body relative mt-3 text-sm">{project.shortDescription}</p>

      <div className="mt-5">
        <TermRun items={project.technologies.slice(0, 4)} />
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-4 pt-7">
        <Link to={`/projects/${project.id}`} className="btn-ghost">
          Case study <ArrowRight size={13} aria-hidden="true" />
        </Link>
        {project.repo && (
          <a href={project.repo} target="_blank" rel="noopener noreferrer" className="btn-ghost">
            <Github size={13} aria-hidden="true" /> Source
          </a>
        )}
      </div>
    </article>
  )
}

/* --------------------------------------------------------- compact (mobile) */

/**
 * One project as a list row rather than a card.
 *
 * This replaced a swipe carousel on mobile. A carousel hides how many projects
 * there are and makes comparing them impossible; a list shows all six at once,
 * scans top to bottom like the rest of the page, and is shorter than the cards
 * it replaces. The whole row is the tap target.
 */
function CompactProject({ project, index, lead }) {
  return (
    <Link
      to={`/projects/${project.id}`}
      className="flex flex-col gap-1.5 border-t py-4"
      style={{
        borderColor: 'var(--line)',
        borderLeft: lead ? '2px solid var(--accent)' : undefined,
        paddingLeft: lead ? '0.75rem' : undefined,
      }}
    >
      <div className="flex gap-3.5">
        <ProjectGlyph
          category={project.category}
          id={project.id}
          size={46}
          frame={false}
          className="glyph mt-0.5 shrink-0"
        />

        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-3">
            <span className="u-mono" style={{ color: 'var(--accent)' }}>
              {String(index).padStart(2, '0')}
            </span>
            <h3 className="u-heading text-[1.05rem]">{project.title.split('–')[0].trim()}</h3>
            <ArrowUpRight
              size={13}
              aria-hidden="true"
              className="ml-auto shrink-0 self-center"
              style={{ color: 'var(--accent-bright)' }}
            />
          </div>

          <p className="u-body mt-1.5 text-sm">{project.shortDescription}</p>

          <div className="mt-1.5 flex flex-wrap items-baseline gap-x-3">
            <span className="u-kicker">{project.category}</span>
            <span className="u-mono">{project.year}</span>
            <span className="u-mono" style={{ color: 'var(--faint)' }}>
              {project.technologies.slice(0, 3).join(' · ')}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

/* ---------------------------------------------------------------- archive */

function ArchiveList({ items }) {
  if (!items.length) return null
  return (
    <Collapsible summary="Archive" count={items.length} className="mt-20">
      <ul>
        {items.map((project) => (
          <li key={project.id}>
            <Link
              to={`/projects/${project.id}`}
              className="group flex flex-wrap items-baseline gap-x-5 gap-y-1 border-b py-4 transition-colors duration-200"
              style={{ borderColor: 'var(--line)' }}
            >
              <span
                className="text-sm transition-colors duration-200 group-hover:text-[var(--accent-bright)]"
                style={{ color: 'var(--ink)' }}
              >
                {project.title.split('–')[0].trim()}
              </span>
              <span className="u-mono">{project.category}</span>
              <span className="u-mono ml-auto">{project.year}</span>
              <ArrowUpRight
                size={13}
                aria-hidden="true"
                className="opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                style={{ color: 'var(--accent-bright)' }}
              />
            </Link>
          </li>
        ))}
      </ul>
    </Collapsible>
  )
}
