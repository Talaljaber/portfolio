import React from 'react'
import { Download } from 'lucide-react'

import { siteConfig } from '../../content/site'
import { journeyParagraphs } from '../../content/about'
import { highlights } from '../../content/experience'
import { languages } from '../../content/skills'
import { Collapsible, Kicker, Reveal, SectionHeading } from '../ui'
import cv from '../../assets/talal.pdf'

/**
 * Bio plus the three verified highlights. The four generic "values" that used
 * to live in about.js are deliberately not here — every claim on this page is
 * one that can be checked.
 */
export default function About() {
  return (
    <section id="about" className="section">
      <div className="shell">
        <div className="grid gap-16 lab:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div>
            <Reveal>
              <SectionHeading index="05" kicker="About" title="About Me" />
            </Reveal>

            <Reveal delay={0.06}>
              <p className="u-body text-[clamp(1rem,1.5vw,1.12rem)]">{siteConfig.fullBio}</p>
              <p className="u-body mt-6">{siteConfig.secondBio}</p>
              <Collapsible summary="More about my approach" className="mt-6">
                {journeyParagraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="u-body mt-4 first:mt-0"
                    style={{ color: 'var(--muted)' }}
                  >
                    {paragraph}
                  </p>
                ))}
              </Collapsible>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-10">
                <a href={cv} download className="btn-secondary">
                  <Download size={14} aria-hidden="true" /> Download CV
                </a>
              </div>
            </Reveal>
          </div>

          <div className="flex flex-col gap-10">
            <Reveal delay={0.1}>
              <ul className="flex flex-col gap-px">
                {highlights.map((item) => (
                  <li
                    key={item.label}
                    className="panel bracket flex items-baseline gap-5 px-6 py-5"
                  >
                    <span
                      className="u-numeral shrink-0 text-[clamp(1.35rem,2.6vw,1.9rem)] leading-none"
                      style={{ color: 'var(--accent-bright)' }}
                    >
                      {item.value}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm" style={{ color: 'var(--ink)' }}>
                        {item.label}
                      </span>
                      <span className="u-mono mt-1 block">{item.sub}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.16}>
              <div>
                <Kicker className="mb-4">Languages</Kicker>
                <ul className="flex flex-col">
                  {languages.map((language) => (
                    <li
                      key={language.name}
                      className="flex items-baseline justify-between gap-4 border-b py-2.5 last:border-0"
                      style={{ borderColor: 'var(--line)' }}
                    >
                      <span className="text-sm" style={{ color: 'var(--ink)' }}>
                        {language.name}
                      </span>
                      <span className="u-mono">{language.level}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
