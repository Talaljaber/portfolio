import React from 'react'
import { cn } from '../../lib/utils'
import { siteConfig } from '../../content/site'
import FitToPage from './FitToPage'

/**
 * One portrait page. It holds exactly one page of content and never scrolls;
 * swiping turns it.
 */
export function MobilePage({
  tone,
  surface = 'paper',
  chapterTitle,
  folio,
  chrome = true,
  flow = false,
  children,
}) {
  const cloth = surface === 'cloth'

  return (
    <div
      className={cn('mobile-page', cloth && 'cover-cloth', flow && 'mobile-page--flow')}
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
        <header className="mobile-page__chrome mobile-page__chrome--head">
          <span className="u-kicker u-smallcaps">{chapterTitle}</span>
          <span className="u-mono">{siteConfig.handle}</span>
        </header>
      )}

      <div className="mobile-page__body">
        {flow ? children : <FitToPage>{children}</FitToPage>}
      </div>

      {chrome && folio != null && (
        <footer className="mobile-page__chrome">
          <span className="u-mono">{siteConfig.name}</span>
          <span className="u-numeral text-[0.78rem] tracking-[0.14em]">{folio}</span>
        </footer>
      )}
    </div>
  )
}

export default MobilePage
