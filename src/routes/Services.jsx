import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import { services } from '../content/services'
import Shell from '../components/layout/Shell'
import { Kicker, Reveal, SectionHeading, TermRun } from '../components/ui'

/**
 * Freelance offerings, kept off the main page: the pricing is real and useful
 * for client leads, but it dilutes the engineering narrative a recruiter is
 * reading. Linked from Contact and the footer.
 */
export default function Services() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Shell tracked={false}>
      <div className="section-page pt-32">
        <div className="shell">
          <Reveal>
            <Link to="/" className="btn-ghost mb-10">
              <ArrowLeft size={13} aria-hidden="true" /> Back to portfolio
            </Link>

            <SectionHeading kicker="Freelance" title="Services">
              <p className="u-body">
                What I build for clients, and what each engagement typically involves. Timelines
                and prices are starting points — every project is scoped to the work.
              </p>
            </SectionHeading>
          </Reveal>

          <div className="flex flex-col">
            {services.map((service, i) => (
              <Reveal key={service.id} delay={Math.min(i, 4) * 0.05}>
                <article
                  className="grid gap-8 border-t py-[clamp(2rem,4vh,3rem)] lab:grid-cols-[minmax(0,0.4fr)_minmax(0,1fr)]"
                  style={{ borderColor: 'var(--line)' }}
                >
                  <div>
                    <span className="u-mono" style={{ color: 'var(--accent)' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h2 className="u-heading mt-3 text-[clamp(1.2rem,2.2vw,1.6rem)]">
                      {service.title}
                    </h2>
                    <p className="u-mono mt-4" style={{ color: 'var(--accent-bright)' }}>
                      {service.startingPrice}
                    </p>
                    <p className="u-mono mt-1">{service.timeline}</p>
                  </div>

                  <div>
                    <p className="u-body">{service.description}</p>

                    <div className="mt-7 grid gap-7 sm:grid-cols-2">
                      <div>
                        <Kicker className="mb-3">Includes</Kicker>
                        <ul className="flex flex-col gap-1.5">
                          {service.features.slice(0, 6).map((feature) => (
                            <li key={feature} className="flex gap-3">
                              <span
                                aria-hidden="true"
                                className="mt-[0.62em] h-px w-3 shrink-0"
                                style={{ background: 'var(--faint)' }}
                              />
                              <span className="u-body text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <Kicker className="mb-3">Built with</Kicker>
                        <TermRun items={service.technologies} />

                        <Kicker className="mb-3 mt-6">Ideal for</Kicker>
                        <ul className="flex flex-col gap-1.5">
                          {service.idealFor.map((item) => (
                            <li key={item} className="u-body text-sm">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {service.caseStudy && (
                      <p className="u-mono mt-6" style={{ color: 'var(--cyan)' }}>
                        Case study: {service.caseStudy}
                      </p>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-16">
              <Link to={{ pathname: '/', hash: '#contact' }} className="btn-primary">
                Start a project <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </Shell>
  )
}
