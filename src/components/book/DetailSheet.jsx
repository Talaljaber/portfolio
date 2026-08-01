import React, { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Github, X } from 'lucide-react'

import { getProjectById } from '../../content/projects'
import { experience } from '../../content/experience'
import { services } from '../../content/services'
import { achievements, certificates } from '../../content/achievements'
import { Rule, SectionHeading, TermRun } from './editorial'

/**
 * The detail sheet.
 *
 * A page holds one page of content and never scrolls, so anything with more to
 * say — a project's full write-up, everything a role involved — is opened here
 * instead of costing the book another spread. It is the reason the book is
 * eight spreads rather than twenty-two.
 */

function Bullets({ items }) {
  if (!items?.length) return null
  return (
    <ul className="mt-2 flex flex-col gap-2">
      {items.map((point) => (
        <li key={point.slice(0, 30)} className="flex gap-3">
          <span className="mt-[0.5em] h-1 w-1 shrink-0 rounded-full" style={{ background: 'var(--accent)' }} aria-hidden="true" />
          <span className="u-note">{point}</span>
        </li>
      ))}
    </ul>
  )
}

function Facts({ rows }) {
  const kept = rows.filter(([, value]) => Boolean(value))
  if (!kept.length) return null
  return (
    <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-5 gap-y-1.5">
      {kept.map(([label, value]) => (
        <React.Fragment key={label}>
          <dt className="u-kicker pt-[0.2em]">{label}</dt>
          <dd className="u-note" style={{ color: 'var(--ink)' }}>
            {value}
          </dd>
        </React.Fragment>
      ))}
    </dl>
  )
}

/* -------------------------------------------------------------- resolvers */

function projectSheet(id) {
  const project = getProjectById(id)
  if (!project) return null
  return {
    kicker: project.category,
    title: project.title,
    standfirst: project.shortDescription,
    body: (
      <>
        <p className="u-note" style={{ color: 'var(--ink)' }}>
          {project.description}
        </p>
        <Bullets items={project.points} />
        <Facts
          rows={[
            ['Role', project.role],
            ['Year', project.year],
            ['Status', project.status],
          ]}
        />
        <div className="mt-5">
          <SectionHeading className="mb-1.5">Built with</SectionHeading>
          <TermRun items={project.technologies} />
        </div>
      </>
    ),
    actions: (
      <>
        {project.link && (
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Visit <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        )}
        {project.repo && (
          <a href={project.repo} target="_blank" rel="noopener noreferrer" className="btn-secondary">
            <Github size={14} aria-hidden="true" /> Source
          </a>
        )}
        <Link to={`/projects/${project.id}`} className="btn-ghost">
          Full entry
        </Link>
      </>
    ),
  }
}

function roleSheet(id) {
  const role = experience.find((entry) => entry.id === id)
  if (!role) return null
  return {
    kicker: role.period,
    title: role.role,
    standfirst: role.org,
    body: <Bullets items={role.points} />,
    actions: role.link ? (
      <a href={role.link} target="_blank" rel="noopener noreferrer" className="btn-primary">
        {role.org} <ArrowUpRight size={14} aria-hidden="true" />
      </a>
    ) : null,
  }
}

function serviceSheet(id) {
  const service = services.find((entry) => entry.id === id)
  if (!service) return null
  return {
    kicker: service.timeline,
    title: service.title,
    standfirst: service.shortDescription,
    body: (
      <>
        <p className="u-note" style={{ color: 'var(--ink)' }}>
          {service.description}
        </p>
        <div className="mt-5">
          <SectionHeading className="mb-1.5">What is included</SectionHeading>
          <Bullets items={service.features} />
        </div>
        {service.deliverables?.length > 0 && (
          <div className="mt-5">
            <SectionHeading className="mb-1.5">What you receive</SectionHeading>
            <Bullets items={service.deliverables} />
          </div>
        )}
        <div className="mt-5">
          <SectionHeading className="mb-1.5">Built with</SectionHeading>
          <TermRun items={service.technologies} />
        </div>
        <Facts
          rows={[
            ['Timeline', service.timeline],
            ['From', service.startingPrice],
          ]}
        />
      </>
    ),
    actions: (
      <a href="#contact" className="btn-primary">
        Start a project
      </a>
    ),
  }
}

function achievementSheet(id) {
  const item = achievements.find((entry) => entry.id === id)
  if (!item) return null
  return {
    kicker: item.date,
    title: item.title,
    standfirst: item.organization,
    body: item.description ? (
      <p className="u-note" style={{ color: 'var(--ink)' }}>
        {item.description}
      </p>
    ) : null,
    actions: item.link ? (
      <a href={item.link} target="_blank" rel="noopener noreferrer" className="btn-primary">
        {item.linkLabel ?? 'Read more'} <ArrowUpRight size={14} aria-hidden="true" />
      </a>
    ) : null,
  }
}

function certificatesSheet() {
  return {
    kicker: `${certificates.length} certificates`,
    title: 'Certificates & Training',
    standfirst: null,
    body: (
      <ul className="flex flex-col">
        {certificates.map((item) => (
          <li
            key={item.title}
            className="flex items-baseline justify-between gap-4 border-b border-[var(--border)] py-2.5 last:border-0"
          >
            <span>
              <span className="u-item-title block">{item.title}</span>
              <span className="u-kicker">{item.issuer}</span>
            </span>
            <span className="u-mono shrink-0">{item.year}</span>
          </li>
        ))}
      </ul>
    ),
    actions: null,
  }
}

const RESOLVERS = {
  project: projectSheet,
  role: roleSheet,
  service: serviceSheet,
  achievement: achievementSheet,
  certificates: certificatesSheet,
}

function resolveDetail(detail) {
  if (!detail) return null
  const resolve = RESOLVERS[detail.kind]
  return resolve ? resolve(detail.id) : null
}

/* ------------------------------------------------------------------ sheet */

export function DetailSheet({ detail, onClose, reducedMotion }) {
  const closeRef = useRef(null)
  const content = resolveDetail(detail)

  useEffect(() => {
    if (!content) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onClose()
      }
    }
    document.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => document.removeEventListener('keydown', onKey)
  }, [content, onClose])

  const duration = reducedMotion ? 0.01 : 0.26

  return (
    <AnimatePresence>
      {content && (
        <>
          <motion.div
            className="sheet-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration }}
            onClick={onClose}
          />
          <div className="sheet-layer">
            <motion.div
              className="sheet"
              role="dialog"
              aria-modal="true"
              aria-label={content.title}
              initial={{ opacity: 0, y: reducedMotion ? 0 : 18, scale: reducedMotion ? 1 : 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: reducedMotion ? 0 : 12, scale: reducedMotion ? 1 : 0.99 }}
              transition={{ duration, ease: [0.24, 0.6, 0.24, 1] }}
            >
              <span className="paper-grain" aria-hidden="true" />

              <header className="sheet__head">
                <div className="min-w-0 flex-1">
                  {content.kicker && <p className="u-kicker mb-2">{content.kicker}</p>}
                  <h2 className="u-display text-[clamp(1.5rem,3.4vw,2.1rem)]">{content.title}</h2>
                  {content.standfirst && (
                    <p className="u-note mt-2 italic" style={{ fontSize: '1.02em' }}>
                      {content.standfirst}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  ref={closeRef}
                  onClick={onClose}
                  className="sheet__close"
                  aria-label="Close"
                >
                  <X size={17} aria-hidden="true" />
                </button>
              </header>

              <div className="sheet__body">{content.body}</div>

              {content.actions && (
                <footer className="sheet__foot">
                  <Rule className="mb-4" />
                  <div className="flex flex-wrap gap-3">{content.actions}</div>
                </footer>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

export default DetailSheet
