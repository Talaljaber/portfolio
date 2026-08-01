import React from 'react'
import { ChevronLeft, ChevronRight, List } from 'lucide-react'

/**
 * The only persistent control: the contents button. Everything else the reader
 * needs — chapter, page number, section links — is printed on the pages
 * themselves or lives inside the contents index.
 */
export function ContentsButton({ onOpen, buttonRef }) {
  return (
    <div className="book-chrome pointer-events-auto absolute right-0 top-0 z-40 p-[clamp(0.9rem,2.4vw,1.8rem)]">
      <button
        type="button"
        ref={buttonRef}
        onClick={onOpen}
        className="chrome-icon-button"
        aria-haspopup="dialog"
      >
        <List size={13} aria-hidden="true" />
        Contents
      </button>
    </div>
  )
}

/** Hover affordances beside the page edges. Never the only way to navigate. */
export function EdgeControls({ atStart, atEnd, onNext, onPrevious }) {
  return (
    <>
      <button
        type="button"
        className="book-edge book-edge--prev book-chrome"
        onClick={onPrevious}
        disabled={atStart}
        aria-label="Previous page"
      >
        <ChevronLeft size={24} aria-hidden="true" />
      </button>
      <button
        type="button"
        className="book-edge book-edge--next book-chrome"
        onClick={onNext}
        disabled={atEnd}
        aria-label="Next page"
      >
        <ChevronRight size={24} aria-hidden="true" />
      </button>
    </>
  )
}

export default ContentsButton
