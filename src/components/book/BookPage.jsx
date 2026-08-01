import React from 'react'
import { cn } from '../../lib/utils'
import { siteConfig } from '../../content/site'
import FitToPage from './FitToPage'

/**
 * One printed page: paper surface, running head, folio, and the spread's
 * content between them. The spread layouts never draw their own chrome.
 */
export function BookPage({
  side,
  tone,
  surface = 'paper',
  chapterTitle,
  folio,
  chrome = true,
  children,
}) {
  const isLeft = side === 'left'
  const cloth = surface === 'cloth'

  return (
    <div
      className={cn('page', cloth && 'cover-cloth')}
      data-side={side}
      data-tone={tone || undefined}
    >
      {cloth ? (
        <span className="cloth-weave" aria-hidden="true" />
      ) : (
        <>
          <span className="paper-stain" aria-hidden="true" />
          <span className="paper-grain" aria-hidden="true" />
        </>
      )}

      {chrome && (
        <header
          className="page-chrome flex shrink-0 items-baseline justify-between pb-3"
          style={{ borderBottom: '1px solid var(--rule)' }}
        >
          <span className="u-kicker u-smallcaps">
            {isLeft ? siteConfig.name : chapterTitle}
          </span>
          <span className="u-mono" aria-hidden="true">
            {isLeft ? '·' : siteConfig.handle}
          </span>
        </header>
      )}

      <div className={cn('page-body flex min-h-0 flex-1 flex-col', chrome && 'pt-6')}>
        <FitToPage>{children}</FitToPage>
      </div>

      {chrome && folio != null && (
        <footer className={cn('page-chrome shrink-0 pt-3', isLeft ? 'text-left' : 'text-right')}>
          <span className="u-numeral text-[0.82rem] tracking-[0.14em]">{folio}</span>
        </footer>
      )}
    </div>
  )
}

export default BookPage
