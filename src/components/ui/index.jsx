import React from 'react'
import { motion } from 'framer-motion'

import { cn } from '../../lib/utils'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference'

/** Mono, uppercase, wide-tracked. Every technical label on the site. */
export function Kicker({ children, className, as: Tag = 'p', ...rest }) {
  return (
    <Tag className={cn('u-kicker', className)} {...rest}>
      {children}
    </Tag>
  )
}

export function Body({ children, className }) {
  return <p className={cn('u-body', className)}>{children}</p>
}

export function Hairline({ className }) {
  return <hr className={cn('hairline', className)} />
}

/** Translucent glass with corner brackets. Never an opaque box. */
export function Panel({ children, className, brackets = true, ...rest }) {
  return (
    <div className={cn('panel', brackets && 'bracket', className)} {...rest}>
      {children}
    </div>
  )
}

/** A run of terms separated by middots — skills, technologies. */
export function TermRun({ items, className }) {
  if (!items?.length) return null
  return (
    <p className={cn('u-mono leading-relaxed', className)}>
      {items.map((item, i) => (
        <React.Fragment key={item}>
          <span style={{ color: 'var(--text)' }}>{item}</span>
          {i < items.length - 1 && (
            <span aria-hidden="true" style={{ color: 'var(--faint)' }}>
              {' · '}
            </span>
          )}
        </React.Fragment>
      ))}
    </p>
  )
}

/**
 * One skill as a bordered chip. Chips beat a middot-separated run once a group
 * has more than a handful of entries: each item gets its own hit area and the
 * eye can land on one without parsing the separators.
 */
export function Chip({ children }) {
  return (
    <li
      className="px-3 py-1.5 font-mono text-[0.78rem] leading-none"
      style={{
        // A filled surface, not a hairline on transparent: the 3D scene sits
        // behind this text, so a chip has to carry its own contrast rather
        // than borrow it from whatever happens to be rendered underneath.
        background: 'rgba(16,21,36,0.92)',
        border: '1px solid var(--line-strong)',
        color: 'var(--ink)',
      }}
    >
      {children}
    </li>
  )
}

export function ChipList({ items, className }) {
  if (!items?.length) return null
  return (
    <ul className={cn('flex flex-wrap gap-1.5', className)}>
      {items.map((item) => (
        <Chip key={item}>{item}</Chip>
      ))}
    </ul>
  )
}

/**
 * Long blocks that stay open on desktop and fold away on small screens.
 *
 * Uses a native <details>, so the content is always in the DOM and always
 * findable by search and assistive tech — it is compressed, never removed.
 */
export function Collapsible({ summary, count, children, className }) {
  const wide = useMediaQuery('(min-width: 1024px)')

  if (wide) {
    return (
      <div className={className}>
        <Kicker className="mb-5">{summary}</Kicker>
        {children}
      </div>
    )
  }

  return (
    <details className={cn('group', className)}>
      <summary
        className="u-kicker flex cursor-pointer list-none items-center justify-between gap-4 border-y py-3.5 marker:content-none"
        style={{ borderColor: 'var(--line)' }}
      >
        <span>
          {summary}
          {count != null && <span style={{ color: 'var(--faint)' }}> · {count}</span>}
        </span>
        <span
          aria-hidden="true"
          className="transition-transform duration-200 group-open:rotate-45"
          style={{ color: 'var(--accent-bright)' }}
        >
          +
        </span>
      </summary>
      <div className="pt-5">{children}</div>
    </details>
  )
}

/** Label/value rows. Empty values drop out rather than rendering blanks. */
export function DataList({ rows, className }) {
  const kept = rows.filter(([, value]) => Boolean(value))
  if (!kept.length) return null
  return (
    <dl className={cn('flex flex-col', className)}>
      {kept.map(([label, value]) => (
        <div
          key={label}
          className="flex items-baseline justify-between gap-6 border-b py-2 last:border-0"
          style={{ borderColor: 'var(--line)' }}
        >
          <dt className="u-kicker shrink-0">{label}</dt>
          <dd className="text-right text-sm" style={{ color: 'var(--ink)' }}>
            {value}
          </dd>
        </div>
      ))}
    </dl>
  )
}

/** Numbered section header: rail-matched index, kicker, title. */
export function SectionHeading({ index, kicker, title, children, className }) {
  return (
    <header className={cn('mb-[clamp(3rem,6vh,5rem)]', className)}>
      <div className="flex items-baseline gap-4">
        {index && <span className="u-mono" style={{ color: 'var(--accent)' }}>{index}</span>}
        {kicker && <Kicker as="span">{kicker}</Kicker>}
      </div>
      <h2 className="u-display mt-4 text-[clamp(2rem,4.5vw,3.25rem)]">{title}</h2>
      {children && <div className="mt-4 max-w-[52ch]">{children}</div>}
    </header>
  )
}

/**
 * The site's one entrance animation: rise and fade, once, on enter.
 * Under reduced motion it renders plainly with no transform at all.
 */
export function Reveal({ children, delay = 0, className, as = 'div' }) {
  const reduced = useReducedMotionPreference()
  const Component = motion[as] ?? motion.div

  if (reduced) {
    const Plain = as
    return <Plain className={className}>{children}</Plain>
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  )
}
