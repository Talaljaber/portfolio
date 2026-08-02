import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Github, Linkedin, Mail, MessageCircle, Phone } from 'lucide-react'

import { contactIntro, contactMethods } from '../../content/contact'
import { siteConfig } from '../../content/site'
import { Kicker, Reveal, SectionHeading } from '../ui'

const icons = { whatsapp: MessageCircle, email: Mail, phone: Phone }

/**
 * The closing composition. Contact routes are direct links rather than a form:
 * there is no backend here, and a form that silently fails is worse than none.
 */
export default function Contact() {
  return (
    <section id="contact" className="section">
      <div className="shell">
        <Reveal>
          <SectionHeading index="07" kicker="Contact" title="Let's Build Something Great">
            <p className="u-body">{contactIntro}</p>
          </SectionHeading>
        </Reveal>

        <div className="grid gap-px lab:grid-cols-3" style={{ background: 'var(--line)' }}>
          {contactMethods.map((method, i) => {
            const Icon = icons[method.id] ?? Mail
            const external = !/^(mailto|tel):/.test(method.href)
            return (
              <Reveal key={method.id} delay={i * 0.06}>
                <a
                  href={method.href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  className="group flex h-full flex-col p-[clamp(1.5rem,3vw,2.25rem)] transition-colors duration-300"
                  style={{ background: 'var(--bg)' }}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={15} aria-hidden="true" style={{ color: 'var(--accent-bright)' }} />
                    <span className="text-sm" style={{ color: 'var(--ink)' }}>
                      {method.title}
                    </span>
                    {method.primary && (
                      <span
                        className="u-mono ml-auto px-2 py-0.5"
                        style={{ border: '1px solid var(--line-strong)', color: 'var(--cyan)' }}
                      >
                        Fastest
                      </span>
                    )}
                  </div>

                  <p
                    className="u-mono mt-4 text-[0.82rem] transition-colors duration-200 group-hover:text-[var(--accent-bright)]"
                    style={{ color: 'var(--text)' }}
                  >
                    {method.value}
                  </p>

                  <p className="u-body mt-auto pt-5 text-sm">{method.note}</p>
                </a>
              </Reveal>
            )
          })}
        </div>

        <Reveal>
          <div
            className="mt-16 flex flex-wrap items-center justify-between gap-8 border-t pt-10"
            style={{ borderColor: 'var(--line)' }}
          >
            <div className="flex flex-wrap gap-4">
              <a
                href={siteConfig.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <Github size={14} aria-hidden="true" /> GitHub
              </a>
              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <Linkedin size={14} aria-hidden="true" /> LinkedIn
              </a>
              <Link to="/services" className="btn-ghost">
                Freelance services <ArrowUpRight size={13} aria-hidden="true" />
              </Link>
            </div>

            <div className="text-right">
              <Kicker>Based in</Kicker>
              <p className="u-mono mt-1.5" style={{ color: 'var(--ink)' }}>
                Amman, Jordan
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
