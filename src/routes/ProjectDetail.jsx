import React, { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'

import { getProjectById } from '../content/projects'
import { siteConfig } from '../content/site'
import {
  Body,
  DataList,
  Kicker,
  Ornament,
  Rule,
  SectionHeading,
  TermRun,
} from '../components/book/editorial'

/**
 * A single project set as a leaf pulled from the book: same paper, same
 * typography, but a normal scrolling page with its own URL.
 */
const ProjectDetail = () => {
  const { id } = useParams()
  const project = getProjectById(id)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  if (!project) {
    return <Navigate to={{ pathname: '/', hash: '#projects' }} replace />
  }

  return (
    <div className="min-h-screen px-[clamp(1rem,5vw,3rem)] py-[clamp(2rem,6vh,4rem)]">
      <article className="mobile-page mobile-page--flow mx-auto" style={{ maxWidth: '58rem' }}>
        <span className="paper-grain" aria-hidden="true" />

        <header className="mobile-page__chrome mobile-page__chrome--head">
          <Link to={{ pathname: '/', hash: '#projects' }} className="btn-ghost">
            <ArrowLeft size={13} aria-hidden="true" /> Back to the book
          </Link>
          <span className="u-mono">{siteConfig.handle}</span>
        </header>

        <div className="mobile-page__body">
          <Kicker className="mb-3">{project.category}</Kicker>

          <h1 className="u-display text-[clamp(1.9rem,5vw,3rem)]">{project.title}</h1>

          <p
            className="mt-3 font-book text-[clamp(1rem,2vw,1.24rem)] italic leading-snug"
            style={{ color: 'var(--muted)' }}
          >
            {project.shortDescription}
          </p>

          <Rule double className="my-7" />

          <Body dropCap>{project.description}</Body>

          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <div>
              <SectionHeading className="mb-3">Specification</SectionHeading>
              <DataList
                rows={[
                  ['Role', project.role],
                  ['Year', project.year],
                  ['Status', project.status],
                  ['Category', project.category],
                ]}
              />
            </div>

            <div>
              <SectionHeading className="mb-3">Built with</SectionHeading>
              <TermRun items={project.technologies} />
            </div>
          </div>

          {project.link && (
            <div className="mt-10">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Visit the project <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </div>
          )}

          <Ornament className="mx-auto mt-12" width={64} />
        </div>

        <footer className="mobile-page__chrome">
          <span className="u-mono">{siteConfig.name}</span>
          <Link to={{ pathname: '/', hash: '#projects' }} className="btn-ghost">
            Index of work
          </Link>
        </footer>
      </article>
    </div>
  )
}

export default ProjectDetail
