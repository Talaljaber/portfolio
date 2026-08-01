import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, List } from 'lucide-react'

const HINT_KEY = 'book:swiped'

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

/**
 * The touch reader's controls: a fixed bar with the page count and a step
 * either way.
 *
 * Swiping is the nicer gesture, but nothing on a page announces it, so on a
 * phone the book would just sit there. This makes turning visible, and the
 * hint above it teaches the swipe once and then gets out of the way.
 */
export function TouchNav({ position, total, atStart, atEnd, onNext, onPrevious }) {
  const [hinted, setHinted] = useState(() => {
    try {
      return sessionStorage.getItem(HINT_KEY) === 'true'
    } catch {
      return false
    }
  })

  // The hint has done its job the moment the reader moves, however they moved.
  // Measured against where they came in, not against page one — arriving on a
  // deep link is not the same as having learned the gesture.
  const arrivedAt = useRef(position)
  useEffect(() => {
    if (hinted || position === arrivedAt.current) return
    setHinted(true)
    try {
      sessionStorage.setItem(HINT_KEY, 'true')
    } catch {
      /* non-fatal */
    }
  }, [position, hinted])

  return (
    <div className="touch-nav book-chrome">
      <AnimatePresence>
        {!hinted && (
          <motion.p
            className="swipe-hint"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.4, delay: 0.7 }}
          >
            <span className="swipe-hint__sweep" aria-hidden="true" />
            Swipe to turn the page
          </motion.p>
        )}
      </AnimatePresence>

      <div className="touch-nav__bar">
        <button
          type="button"
          className="touch-nav__step"
          onClick={onPrevious}
          disabled={atStart}
          aria-label="Previous page"
        >
          <ChevronLeft size={20} aria-hidden="true" />
        </button>
        <span className="touch-nav__count" aria-hidden="true">
          {position + 1} / {total}
        </span>
        <button
          type="button"
          className="touch-nav__step"
          onClick={onNext}
          disabled={atEnd}
          aria-label="Next page"
        >
          <ChevronRight size={20} aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

export default ContentsButton
