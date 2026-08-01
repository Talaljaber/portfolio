import React from 'react'
import {
  ArrowUpRight,
  Download,
  Github,
  Linkedin,
  Mail,
  MessageCircle,
  Phone,
} from 'lucide-react'

import { siteConfig } from '../../content/site'
import { journeyParagraphs } from '../../content/about'
import { education, experience, highlights } from '../../content/experience'
import { languages, skillTiers } from '../../content/skills'
import { projects } from '../../content/projects'
import { services } from '../../content/services'
import { achievements, certificates, press } from '../../content/achievements'
import { contactIntro, contactMethods } from '../../content/contact'
import { Body, Kicker, Ornament, Rule, SectionHeading, TermRun } from './editorial'
import { useBook } from './BookContext'
import cvFile from '../../assets/talal.pdf'

/**
 * Every page of the book, by name. `content/book.js` composes them into
 * spreads. Each renderer fills a whole page — there is no scrolling, so a page
 * either holds its content or hands the rest to the detail sheet.
 *
 * Two habits keep the pages honest: nothing uses `justify-between` to spread a
 * short list over the full height (that is what made pages read as half empty),
 * and any entry with more to say is a button, not another page.
 */


/* ============================================================ page heading */

function PageTitle({ children, note }) {
  return (
    <div className="mb-[var(--lead-2)] shrink-0">
      <h2 className="u-display text-[clamp(1.6rem,min(5.2cqi,4vh),2.5rem)]">{children}</h2>
      {note && <p className="u-kicker mt-2">{note}</p>}
      <Rule double className="mt-[var(--lead-2)]" />
    </div>
  )
}

/** A clickable row. The row is the button — the label just makes that plain. */
function Entry({ onClick, ariaLabel, cta = 'Details', children }) {
  return (
    <li>
      <button type="button" className="entry" onClick={onClick} aria-label={ariaLabel}>
        <span className="entry__main">{children}</span>
        <span className="entry__cta" aria-hidden="true">
          {cta}
        </span>
      </button>
    </li>
  )
}

/* ============================================================ front matter */

const CoverVerso = () => (
  <div className="flex h-full flex-col justify-between">
    <span className="u-mono">{siteConfig.handle}</span>
    <div className="flex justify-center">
      <Ornament width={54} />
    </div>
    <span className="u-mono">{siteConfig.location}</span>
  </div>
)

const CoverRecto = () => (
  <div className="flex h-full flex-col items-center justify-center text-center">
    <div className="w-full max-w-[88%]">
      <Rule double className="mb-7" />
      <p className="u-kicker u-smallcaps mb-6" style={{ color: 'var(--gold)' }}>
        Portfolio
      </p>
      <h1
        className="u-display cover-foil text-[clamp(2.4rem,min(8.3cqi,7.6vh),5rem)]"
        style={{ lineHeight: 1.06 }}
      >
        {siteConfig.name}
      </h1>
      <p
        className="mt-4 font-book text-[clamp(1.15rem,min(3.8cqi,2.9vh),1.6rem)] italic"
        style={{ color: 'var(--cover-ink)', opacity: 0.84 }}
      >
        {siteConfig.title}
      </p>
      <Ornament className="mx-auto my-7" width={92} />
      <Rule double />
      <p className="u-note mt-7" style={{ color: 'var(--muted)' }}>
        Scroll, swipe or use the ribbons down the edge to move through the book.
      </p>
    </div>
  </div>
)

/* ================================================================== about */

const Profile = () => {
  const { goToChapter, openDetail } = useBook()

  return (
    <div className="flex h-full flex-col">
      <PageTitle note={siteConfig.location}>{siteConfig.name}</PageTitle>

      <p className="u-lede">{siteConfig.title}</p>

      <div className="mt-[var(--lead-3)]">
        <SectionHeading className="mb-2">Highlights</SectionHeading>
        <ul className="flex flex-col gap-[var(--lead-2)]">
          {highlights.map((item) => (
            <li key={item.label} className="flex items-baseline gap-4">
              <span className="u-numeral shrink-0 text-[clamp(1.5rem,min(5cqi,3.8vh),2.3rem)] leading-none">
                {item.value}
              </span>
              <span className="min-w-0">
                <span className="u-item-title block">{item.label}</span>
                <span className="u-note">{item.sub}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-[var(--lead-3)]">
        <SectionHeading className="mb-2">Studying</SectionHeading>
        <p className="u-item-title">{education.degree}</p>
        <p className="u-note">
          {education.institution} · {education.period}
        </p>
      </div>

      <div className="mt-[var(--lead-3)]">
        <SectionHeading className="mb-2">Languages</SectionHeading>
        <ul className="flex flex-col gap-1">
          {languages.map((language) => (
            <li key={language.name} className="flex items-baseline justify-between gap-4">
              <span className="u-item-title">{language.name}</span>
              <span className="u-note">{language.level}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto flex flex-wrap gap-3 pt-[var(--lead-3)]">
        <button type="button" className="btn-primary" onClick={() => goToChapter('projects')}>
          See the work
        </button>
        <button
          type="button"
          className="btn-secondary"
          onClick={() => openDetail('certificates')}
        >
          {certificates.length} certificates
        </button>
      </div>
    </div>
  )
}

const Biography = () => (
  <div className="flex h-full flex-col">
    <PageTitle>About Me</PageTitle>

    <Body dropCap>{siteConfig.fullBio}</Body>
    <Body className="mt-[var(--lead-2)]">{siteConfig.secondBio}</Body>
    <Body className="mt-[var(--lead-2)]" muted>
      {journeyParagraphs[0]}
    </Body>
    <Body className="mt-[var(--lead-2)]" muted>
      {journeyParagraphs[1]}
    </Body>

    <Ornament className="mt-auto pt-[var(--lead-3)]" width={60} />
  </div>
)

/* ================================================================= skills */

/** Every skill in the book, split across the two pages of one spread. */
const SKILL_COLUMNS = [[skillTiers[0]], [skillTiers[1], skillTiers[2]]]

/** The column's groups, flattened, each still knowing which tier it came from. */
const columnGroups = (column) =>
  (SKILL_COLUMNS[column] ?? []).flatMap((tier) =>
    tier.groups.map((group) => ({ ...group, tier: tier.title })),
  )

const Skills = ({ pageProps }) => {
  const { column, from = 0, to, head } = pageProps
  const groups = columnGroups(column).slice(from, to)

  return (
    <div className="flex h-full flex-col">
      {(head ?? column === 0) && <PageTitle note="Everything I build with">Skills</PageTitle>}

      <div className="flex flex-col gap-[var(--lead-2)]">
        {groups.map((group, i) => (
          <div key={group.label}>
            {/* the tier's name, printed once above its first group on the page */}
            {group.tier !== groups[i - 1]?.tier && (
              <SectionHeading
                className="mb-[var(--lead-2)] mt-[var(--lead-2)] first:mt-0"
                style={{ color: 'var(--accent)' }}
              >
                {group.tier}
              </SectionHeading>
            )}
            <p className="u-group-label">{group.label}</p>
            <TermRun items={group.items} />
          </div>
        ))}
      </div>
    </div>
  )
}

/* =============================================================== projects */

const ProjectList = ({ pageProps }) => {
  const { from, to, head } = pageProps
  const { openDetail } = useBook()

  return (
    <div className="flex h-full flex-col">
      {(head ?? from === 0) && (
        <PageTitle note={`${projects.length} projects · tap any entry to read it`}>
          Projects
        </PageTitle>
      )}

      <ul className="flex flex-col">
        {projects.slice(from, to).map((project, i) => (
          <Entry
            key={project.id}
            onClick={() => openDetail('project', project.id)}
            ariaLabel={`Read about ${project.title}`}
          >
            <span className="flex items-baseline gap-3">
              <span className="u-numeral shrink-0 text-[0.8rem]">
                {String(from + i + 1).padStart(2, '0')}
              </span>
              <span className="min-w-0">
                <span className="u-item-title entry__title block">{project.title}</span>
                <span className="u-note mt-0.5 block">{project.shortDescription}</span>
                <span className="mt-1 flex flex-wrap items-baseline gap-x-3">
                  <span className="u-kicker">{project.category}</span>
                  <span className="u-mono">{project.year}</span>
                  <span className="u-mono">{project.status}</span>
                </span>
              </span>
            </span>
          </Entry>
        ))}
      </ul>
    </div>
  )
}

/* ============================================================= experience */

const RoleList = ({ pageProps }) => {
  const { from, to, tail, head } = pageProps
  const { openDetail } = useBook()

  return (
    <div className="flex h-full flex-col">
      {(head ?? from === 0) && (
        <PageTitle note={`${experience.length} roles · tap any entry to read it`}>
          Experience
        </PageTitle>
      )}

      <ul className="flex flex-col">
        {experience.slice(from, to).map((role) => (
          <Entry
            key={role.id}
            onClick={() => openDetail('role', role.id)}
            ariaLabel={`Read about ${role.role} at ${role.org}`}
          >
            <span className="flex flex-wrap items-baseline justify-between gap-x-4">
              <span className="u-item-title entry__title">{role.role}</span>
              <span className="u-mono">{role.period}</span>
            </span>
            <span className="u-org mt-0.5 block">{role.org}</span>
            <span className="u-note entry__clamp mt-1 block">{role.points[0]}</span>
          </Entry>
        ))}
      </ul>

      {tail && (
        <div className="mt-auto pt-[var(--lead-3)]">
          <Rule className="mb-[var(--lead-2)]" />
          <SectionHeading className="mb-2">Education</SectionHeading>
          <p className="u-item-title">{education.degree}</p>
          <p className="u-note">
            {education.institution} · {education.period}
          </p>
          <p className="u-note mt-1">{education.note}</p>
        </div>
      )}
    </div>
  )
}

/* =============================================================== services */

const ServiceList = ({ pageProps }) => {
  const { from, to, tail, head } = pageProps
  const { openDetail, goToChapter } = useBook()

  return (
    <div className="flex h-full flex-col">
      {(head ?? from === 0) && (
        <PageTitle note={`${services.length} services · tap any entry to read it`}>
          Services
        </PageTitle>
      )}

      <ul className="flex flex-col">
        {services.slice(from, to).map((service, i) => (
          <Entry
            key={service.id}
            onClick={() => openDetail('service', service.id)}
            ariaLabel={`Read about ${service.title}`}
          >
            <span className="flex items-baseline gap-3">
              <span className="u-numeral shrink-0 text-[0.8rem]">
                {String(from + i + 1).padStart(2, '0')}
              </span>
              <span className="min-w-0">
                <span className="u-item-title entry__title block">{service.title}</span>
                <span className="u-note mt-0.5 block">{service.shortDescription}</span>
                <span className="u-note mt-1 block" style={{ color: 'var(--faint)' }}>
                  {service.features.slice(0, 4).join(' · ')}
                </span>
                <span className="mt-1 flex flex-wrap items-baseline gap-x-4">
                  <span className="u-mono">{service.timeline}</span>
                  <span className="u-numeral text-[0.95rem]">{service.startingPrice}</span>
                </span>
              </span>
            </span>
          </Entry>
        ))}
      </ul>

      {tail && (
        <div className="mt-auto pt-[var(--lead-3)]">
          <Rule className="mb-[var(--lead-2)]" />
          <p className="u-note">
            Timelines and prices are starting points; every engagement is scoped to the work.
          </p>
          <button
            type="button"
            className="btn-primary mt-[var(--lead-2)]"
            onClick={() => goToChapter('contact')}
          >
            Start a project
          </button>
        </div>
      )}
    </div>
  )
}

/* =========================================================== achievements */

const AchievementList = ({ pageProps }) => {
  const { from, to, press: withPress, head } = pageProps
  const { openDetail } = useBook()

  return (
    <div className="flex h-full flex-col">
      {(head ?? from === 0) && (
        <PageTitle note={`${achievements.length} entries · tap any entry to read it`}>
          Achievements
        </PageTitle>
      )}

      <ul className="flex flex-col">
        {achievements.slice(from, to).map((item) => (
          <Entry
            key={item.id}
            onClick={() => openDetail('achievement', item.id)}
            ariaLabel={`Read about ${item.title}`}
            cta={item.link ? 'Link' : 'Details'}
          >
            <span className="u-item-title entry__title block">{item.title}</span>
            <span className="mt-0.5 flex flex-wrap items-baseline gap-x-3">
              <span className="u-kicker">{item.organization}</span>
              <span className="u-mono">{item.date}</span>
            </span>
          </Entry>
        ))}
      </ul>

      {withPress && (
        <div className="mt-auto pt-[var(--lead-3)]">
          <Rule className="mb-[var(--lead-2)]" />
          <SectionHeading className="mb-2">In the press</SectionHeading>
          <ul className="flex flex-col gap-[var(--lead-1)]">
            {press.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="u-link u-note"
                  style={{ color: 'var(--accent)' }}
                >
                  {item.title}
                </a>
                <span className="u-kicker ml-2">{item.outlet}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

/* ================================================================ contact */

const METHOD_ICON = { whatsapp: MessageCircle, email: Mail, phone: Phone }

const ContactRoutes = () => (
  <div className="flex h-full flex-col">
    <PageTitle note="Available for work">Get in Touch</PageTitle>

    <p className="u-lede">{contactIntro}</p>

    <ul className="mt-[var(--lead-3)] flex flex-col">
      {contactMethods.map((method) => {
        const Icon = METHOD_ICON[method.id] ?? Mail
        const external = !/^(mailto|tel):/.test(method.href)

        return (
          <li key={method.id} className="border-b border-[var(--border)] py-[var(--lead-2)] last:border-0">
            <a
              href={method.href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              className="flex items-start gap-3 transition-transform duration-200 hover:translate-x-1"
            >
              <Icon
                size={16}
                aria-hidden="true"
                className="mt-1 shrink-0"
                style={{ color: 'var(--accent)' }}
              />
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-baseline gap-x-3">
                  <span className="u-item-title">{method.title}</span>
                  {method.primary && <span className="u-kicker">Recommended</span>}
                </span>
                <span className="u-link u-note mt-0.5 block" style={{ color: 'var(--accent)' }}>
                  {method.value}
                </span>
                <span className="u-note mt-0.5 block">{method.note}</span>
              </span>
            </a>
          </li>
        )
      })}
    </ul>

    <div className="mt-auto pt-[var(--lead-3)]">
      <Rule className="mb-[var(--lead-2)]" />
      <SectionHeading className="mb-[var(--lead-2)]">Elsewhere</SectionHeading>
      <div className="flex flex-wrap gap-3">
        <a href={cvFile} download className="btn-primary">
          <Download size={14} aria-hidden="true" /> Download CV
        </a>
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
      </div>
    </div>
  </div>
)

/** The end plate. Deliberately centred and quiet — the book is over. */
const Closing = () => {
  const { goTo, goToChapter } = useBook()

  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <Ornament className="mx-auto mb-[var(--lead-3)]" width={80} />

      <Kicker className="mb-3">The end</Kicker>
      <h2 className="u-display text-[clamp(1.9rem,min(6cqi,4.6vh),2.9rem)]">
        Thank you for reading
      </h2>
      <p className="u-lede mt-3" style={{ maxWidth: '30ch' }}>
        {siteConfig.name} · {siteConfig.title}
      </p>

      <Rule className="my-[var(--lead-3)] w-28" />

      <p className="u-note" style={{ maxWidth: '38ch' }}>
        Set in EB Garamond and Inter. Built with React, Vite and Tailwind CSS.
      </p>
      <p className="u-mono mt-3">{siteConfig.seo.url.replace(/^https?:\/\//, '')}</p>

      <div className="mt-[var(--lead-4)] flex flex-wrap justify-center gap-3">
        <a
          href={siteConfig.socials.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          <MessageCircle size={14} aria-hidden="true" /> Say hello
          <ArrowUpRight size={13} aria-hidden="true" />
        </a>
        <button type="button" onClick={() => goToChapter('projects')} className="btn-secondary">
          Back to the work
        </button>
      </div>

      <button type="button" onClick={() => goTo(0)} className="btn-ghost mt-[var(--lead-3)]">
        ← Back to the cover
      </button>
    </div>
  )
}

/* =============================================================== registry */

/** Keys match the `page` names used in content/book.js. */
export const PAGES = {
  coverVerso: CoverVerso,
  coverRecto: CoverRecto,
  profile: Profile,
  biography: Biography,
  skills: Skills,
  projectList: ProjectList,
  roleList: RoleList,
  serviceList: ServiceList,
  achievementList: AchievementList,
  contactRoutes: ContactRoutes,
  closing: Closing,
}

export default PAGES
