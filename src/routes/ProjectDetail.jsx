import React, { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, Github } from 'lucide-react'

import { getProjectById } from '../content/projects'
import Shell from '../components/layout/Shell'
import ProjectGlyph from '../components/graphics/ProjectGlyph'
import { DataList, Kicker, Reveal, TermRun } from '../components/ui'

/**
 * One project as a full case study on its own URL. This is the only
 * deep-linkable content on the site, so it keeps its route unchanged.
 */
export default function ProjectDetail() {
  const { id } = useParams()
  const project = getProjectById(id)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  if (!project) {
    return <Navigate to={{ pathname: '/', hash: '#work' }} replace />
  }

  return (
    <Shell tracked={false}>
      <article className="section-page pt-32">
        <div className="shell">
          <Reveal>
            <Link to={{ pathname: '/', hash: '#work' }} className="btn-ghost mb-10">
              <ArrowLeft size={13} aria-hidden="true" /> Back to work
            </Link>

            <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
              <Kicker as="span">{project.category}</Kicker>
              <span className="u-mono">{project.year}</span>
              <span className="u-mono">{project.status}</span>
            </div>

            <h1 className="u-display mt-5 text-[clamp(2rem,5vw,3.5rem)]">{project.title}</h1>

            <p className="mt-5 max-w-[55ch] text-[clamp(1.05rem,1.8vw,1.3rem)] leading-relaxed">
              {project.shortDescription}
            </p>
          </Reveal>

          <div className="mt-16 grid gap-14 lab:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
            <div>
              <Reveal>
                <Kicker className="mb-4">Overview</Kicker>
                <p className="u-body text-[clamp(1rem,1.5vw,1.1rem)]">{project.description}</p>
              </Reveal>

              {project.points?.length > 0 && (
                <Reveal delay={0.06}>
                  <div className="mt-12">
                    <Kicker className="mb-5">What I built</Kicker>
                    <ul className="flex flex-col gap-4">
                      {project.points.map((point) => (
                        <li key={point.slice(0, 40)} className="flex gap-4">
                          <span
                            aria-hidden="true"
                            className="mt-[0.7em] h-px w-4 shrink-0"
                            style={{ background: 'var(--accent)' }}
                          />
                          <span className="u-body">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              )}
            </div>

            <Reveal delay={0.1}>
              <aside className="panel bracket relative overflow-hidden p-[clamp(1.5rem,3vw,2rem)]">
                <span className="blueprint" aria-hidden="true" />

                <div className="relative mb-8 flex items-start justify-between gap-6">
                  <ProjectGlyph
                    category={project.category}
                    id={project.id}
                    size={160}
                    className="glyph shrink-0"
                  />
                  <span className="u-mono" style={{ color: 'var(--faint)' }}>
                    FIG.01
                  </span>
                </div>

                <Kicker className="mb-4">Specification</Kicker>
                <DataList
                  rows={[
                    ['Role', project.role],
                    ['Year', project.year],
                    ['Status', project.status],
                    ['Category', project.category],
                  ]}
                />

                <Kicker className="mb-3 mt-8">Built with</Kicker>
                <TermRun items={project.technologies} />

                {(project.link || project.repo) && (
                  <div className="mt-8 flex flex-col gap-3">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary justify-center"
                      >
                        Visit project <ArrowUpRight size={14} aria-hidden="true" />
                      </a>
                    )}
                    {project.repo && (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary justify-center"
                      >
                        <Github size={14} aria-hidden="true" /> Source code
                      </a>
                    )}
                  </div>
                )}
              </aside>
            </Reveal>
          </div>
        </div>
      </article>
    </Shell>
  )
}
