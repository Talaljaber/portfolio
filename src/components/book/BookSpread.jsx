import React from 'react'

import { folioFor, getChapter, spreads } from '../../content/book'
import { PAGES } from './pages'
import BookPage from './BookPage'
import MobilePage from './MobilePage'

/**
 * Renders one page: the frame (paper, running head, folio) around the page
 * renderer named by the spread.
 *
 * It takes an explicit index rather than reading the current position because
 * the same call renders static pages and the faces of the turning leaf.
 */
export function SpreadPage({ index, side, container = 'page', pageProps }) {
  const spread = spreads[index]
  if (!spread) return null

  const descriptor = side === 'left' ? spread.left : spread.right
  const Render = descriptor && PAGES[descriptor.page]
  if (!Render) return null

  const chapter = getChapter(spread.chapterId)
  const chrome = spread.chrome !== false
  const folios = spread.folio === false ? null : folioFor(index)
  const folio = folios ? (side === 'right' ? folios.right : folios.left) : null

  // A phone page may carry a narrower slice of the same renderer's content.
  const content = (
    <Render
      spread={spread}
      chapter={chapter}
      side={side}
      pageProps={pageProps ?? descriptor.props ?? {}}
    />
  )
  const Frame = container === 'mobile' ? MobilePage : BookPage

  return (
    <Frame
      side={side}
      tone={spread.tone}
      surface={spread.surface}
      chrome={chrome}
      chapterTitle={chapter.title}
      folio={folio}
    >
      {content}
    </Frame>
  )
}

/** The blank verso of a leaf in the single-page view. */
export function BlankPage({ tone }) {
  return (
    <div className="mobile-page" data-tone={tone || undefined}>
      <span className="paper-grain" aria-hidden="true" />
    </div>
  )
}

export default SpreadPage
