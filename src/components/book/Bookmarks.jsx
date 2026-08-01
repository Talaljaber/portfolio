import React from 'react'

import { navChapters, folioRangeOfChapter } from '../../content/book'

/**
 * Ribbon bookmarks down the fore-edge of the book, one per chapter.
 *
 * They are the physical answer to "I don't want to turn thirty pages to reach
 * Contact": the tab for the chapter you are in sits proud of the block, and
 * clicking any tab jumps straight there.
 */
export function Bookmarks({ activeChapterId, onGoToChapter }) {
  return (
    <nav className="book-marks" aria-label="Chapters">
      {navChapters.map((chapter) => {
        const range = folioRangeOfChapter(chapter.id)
        const active = chapter.id === activeChapterId

        return (
          <button
            key={chapter.id}
            type="button"
            className="book-mark"
            data-active={active ? 'true' : undefined}
            aria-current={active ? 'true' : undefined}
            onClick={() => onGoToChapter(chapter.id)}
            title={range ? `${chapter.title} — page ${range.from}` : chapter.title}
          >
            <span className="book-mark__numeral">{chapter.numeral}</span>
            <span className="book-mark__label">{chapter.short ?? chapter.title}</span>
          </button>
        )
      })}
    </nav>
  )
}

export default Bookmarks
