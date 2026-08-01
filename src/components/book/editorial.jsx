import React from 'react'
import { cn } from '../../lib/utils'

/* Small shared typographic pieces. Everything the spreads are built from
   lives here so the editorial voice stays consistent across chapters. */

export function Kicker({ children, className }) {
  return <p className={cn('u-kicker', className)}>{children}</p>
}

export function DisplayTitle({ children, className }) {
  return <h2 className={cn('u-display text-[clamp(2.01rem,min(7.08cqi,5.31vh),3.07rem)]', className)}>{children}</h2>
}

export function Body({ children, className, dropCap = false, muted = false }) {
  return (
    <p className={cn('u-body', muted && 'u-body--muted', dropCap && 'u-dropcap', className)}>
      {children}
    </p>
  )
}

export function Rule({ className, double = false }) {
  return <hr className={cn(double ? 'u-rule--double' : 'u-rule', className)} />
}

/** A printer's lozenge — the one piece of ornament the book allows itself. */
export function Ornament({ className, width = 74 }) {
  return (
    <svg
      viewBox="0 0 74 10"
      width={width}
      height={(width / 74) * 10}
      aria-hidden="true"
      className={cn('block', className)}
      style={{ stroke: 'var(--rule-strong)', fill: 'var(--rule-strong)' }}
    >
      <line x1="0" y1="5" x2="26" y2="5" strokeWidth="1" />
      <path d="M37 0.5 L41.5 5 L37 9.5 L32.5 5 Z" strokeWidth="0.6" />
      <line x1="48" y1="5" x2="74" y2="5" strokeWidth="1" />
    </svg>
  )
}

export function Numeral({ children, className }) {
  return <span className={cn('u-numeral', className)}>{children}</span>
}

/** Technologies etc. set as a running line rather than a row of pills. */
export function TermRun({ items, className }) {
  if (!items?.length) return null
  return (
    <p className={cn('u-note', className)}>
      {items.map((item, i) => (
        <React.Fragment key={item}>
          <span style={{ color: 'var(--ink)' }}>{item}</span>
          {i < items.length - 1 && <span aria-hidden="true"> · </span>}
        </React.Fragment>
      ))}
    </p>
  )
}

/** Honest marker for media the repository does not contain yet. */
export function NeedsAsset({ children }) {
  return (
    <p className="u-mono not-italic" style={{ color: 'var(--faint)' }}>
      [NEEDS: {children}]
    </p>
  )
}

/**
 * The main column of a page. A page never scrolls — content is divided across
 * more spreads instead — so this only claims the remaining height.
 */
export function PageFlow({ children, className }) {
  return <div className={cn('flex min-h-0 flex-1 flex-col', className)}>{children}</div>
}

export function SectionHeading({ children, className, style }) {
  return (
    <h3
      className={cn('font-ui text-[0.7rem] font-semibold uppercase tracking-[0.2em]', className)}
      style={{ color: 'var(--muted)', ...style }}
    >
      {children}
    </h3>
  )
}

/** Label / value rows used by the specification panels. */
export function DataList({ rows }) {
  return (
    <dl className="flex flex-col">
      {rows
        .filter(([, value]) => Boolean(value))
        .map(([label, value]) => (
          <div
            key={label}
            className="flex items-baseline justify-between gap-4 border-b border-[var(--border)] py-1.5 last:border-0"
          >
            <dt className="u-kicker shrink-0">{label}</dt>
            <dd className="text-right font-book text-[clamp(1.03rem,min(2.24cqi,1.68vh),1.14rem)] leading-snug">
              {value}
            </dd>
          </div>
        ))}
    </dl>
  )
}
