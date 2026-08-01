import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'framer-motion'

import { useBookNavigation } from '../../hooks/useBookNavigation'
import { usePageTurnGesture } from '../../hooks/usePageTurnGesture'
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference'
import { useMediaQuery } from '../../hooks/useMediaQuery'

import { BookContext } from './BookContext'
import SpreadPage from './BookSpread'
import PageSlideLayer from './PageSlideLayer'
import ContentsIndex from './ContentsIndex'
import DetailSheet from './DetailSheet'
import { ContentsButton, EdgeControls, TouchNav } from './BookNavigation'
import Bookmarks from './Bookmarks'
import { pageSequence, spreadSequence } from './pageSequence'

const TURN_MS = 520
const COVER_TURN_MS = 620 // the board is heavier than a leaf
// Accelerate, then decelerate: 24% of the travel by a quarter of the time,
// 78% by half, the rest spent settling.
const TURN_EASE = [0.4, 0, 0.2, 1]

/** The book is the whole site; the two views differ enough to remount. */
export function BookShell() {
  const isMobile = useMediaQuery('(max-width: 1023px)')
  return <BookExperience key={isMobile ? 'single' : 'spread'} isMobile={isMobile} />
}

function BookExperience({ isMobile }) {
  const sequence = isMobile ? pageSequence : spreadSequence
  const nav = useBookNavigation(sequence)
  const reducedMotion = useReducedMotionPreference()

  const [contentsOpen, setContentsOpen] = useState(false)
  // { kind, id } — the entry whose full write-up is open over the book.
  const [detail, setDetail] = useState(null)

  const stageRef = useRef(null)
  const contentsButtonRef = useRef(null)

  const progress = useMotionValue(0)
  const veil = useMotionValue(0)

  const bookOpacity = useTransform(veil, [0, 1], [1, 0.2])
  const bookScale = useTransform(veil, [0, 1], [1, 0.986])

  const { transition, index, commitTransition, cancelTransition } = nav

  /* --------------------------------------------- nothing scrolls but pages */

  useEffect(() => {
    document.body.dataset.book = 'true'
    return () => {
      delete document.body.dataset.book
    }
  }, [])

  // While a sheet or the index is open, the book underneath is inert: no
  // scrolling reaches it and no gesture turns a page behind the overlay.
  useEffect(() => {
    const locked = contentsOpen || detail !== null
    if (!locked) {
      delete document.body.dataset.locked
      return undefined
    }
    document.body.dataset.locked = 'true'
    return () => {
      delete document.body.dataset.locked
    }
  }, [contentsOpen, detail])

  /* ------------------------------------------------------- page geometry */

  const moving =
    transition &&
    (transition.mode === 'turn' || transition.mode === 'drag' || transition.mode === 'return')

  // Either one resting page, or the pair that is sliding past each other.
  const frame = useMemo(
    () =>
      moving
        ? { resting: null, from: transition.from, to: transition.to, direction: transition.direction }
        : { resting: index, from: null, to: null, direction: null },
    [moving, transition, index],
  )

  /* ---------------------------------------------------------- animations */

  useEffect(() => {
    if (!transition) {
      progress.set(0)
      return undefined
    }
    if (transition.mode === 'drag') return undefined

    const touchesCover =
      sequence[transition.from]?.spreadIndex === 0 || sequence[transition.to]?.spreadIndex === 0
    const fullTurn = touchesCover ? COVER_TURN_MS : TURN_MS

    // A distant jump — and every move under reduced motion — settles with one
    // short fade instead of animating every page in between.
    if (transition.mode === 'jump' || reducedMotion) {
      const outMs = reducedMotion ? 100 : 190
      const inMs = reducedMotion ? 120 : 220
      const out = animate(veil, 1, {
        duration: outMs / 1000,
        ease: 'easeIn',
        onComplete: () => {
          commitTransition()
          animate(veil, 0, { duration: inMs / 1000, ease: 'easeOut' })
        },
      })
      return () => out.stop()
    }

    if (transition.mode === 'turn') {
      const remaining = Math.max(0.18, (1 - progress.get()) * (fullTurn / 1000))
      const controls = animate(progress, 1, {
        duration: remaining,
        ease: TURN_EASE,
        onComplete: commitTransition,
      })
      return () => controls.stop()
    }

    if (transition.mode === 'return') {
      const controls = animate(progress, 0, {
        duration: 0.32,
        ease: [0.3, 0, 0.2, 1],
        onComplete: cancelTransition,
      })
      return () => controls.stop()
    }

    return undefined
  }, [transition, reducedMotion, progress, veil, commitTransition, cancelTransition, sequence])

  /* --------------------------------------------- keep the book un-stuck */

  useEffect(() => {
    // A resize or a hidden tab mid-slide would otherwise freeze the pages.
    const settle = () => {
      if (!transition) return
      if (transition.mode === 'return') cancelTransition()
      else commitTransition()
    }
    const onVisibility = () => {
      if (document.hidden) settle()
    }
    window.addEventListener('resize', settle)
    window.addEventListener('orientationchange', settle)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      window.removeEventListener('resize', settle)
      window.removeEventListener('orientationchange', settle)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [transition, commitTransition, cancelTransition])

  /* ------------------------------------------------------------ actions */

  const goToSpread = useCallback(
    (spreadIndex) => {
      setContentsOpen(false)
      nav.goToSpread(spreadIndex)
    },
    [nav],
  )

  const goToChapter = useCallback(
    (chapterId) => {
      setContentsOpen(false)
      nav.goToChapter(chapterId)
    },
    [nav],
  )

  const closeContents = useCallback(() => {
    setContentsOpen(false)
    contentsButtonRef.current?.focus()
  }, [])

  const openDetail = useCallback((kind, id) => setDetail({ kind, id }), [])
  const closeDetail = useCallback(() => setDetail(null), [])

  /* ----------------------------------------------------------- gestures */

  const onDragStart = useCallback(
    (direction) => {
      if (reducedMotion) return false
      const started = nav.beginDrag(direction)
      if (started) progress.set(0)
      return started
    },
    [nav, progress, reducedMotion],
  )

  usePageTurnGesture({
    surfaceRef: stageRef,
    active: !contentsOpen && !detail,
    busy: nav.busy,
    allowDrag: isMobile && !reducedMotion,
    onNext: nav.next,
    onPrevious: nav.previous,
    onFirst: () => nav.goTo(0),
    onLast: () => nav.goTo(nav.lastIndex),
    onDragStart,
    onDragMove: useCallback((value) => progress.set(value), [progress]),
    onDragEnd: useCallback((complete) => nav.releaseDrag(complete), [nav]),
  })

  /* -------------------------------------------------------------- render */

  const api = useMemo(
    () => ({ goTo: goToSpread, goToChapter, openDetail, index: nav.unit.spreadIndex, isMobile }),
    [goToSpread, goToChapter, openDetail, nav.unit.spreadIndex, isMobile],
  )

  const renderUnit = useCallback(
    (sequenceIndex) => {
      const unit = sequence[sequenceIndex]
      if (!unit) return null
      return (
        <SpreadPage
          index={unit.spreadIndex}
          side={unit.side}
          pageProps={unit.pageProps}
          container={isMobile ? 'mobile' : 'page'}
        />
      )
    },
    [sequence, isMobile],
  )

  return (
    <BookContext.Provider value={api}>
      <a className="skip-link" href="#book-content">
        Skip to the book
      </a>

      <div className="book-stage" ref={stageRef}>
        <ContentsButton onOpen={() => setContentsOpen(true)} buttonRef={contentsButtonRef} />

        <main id="book-content" className="relative z-10 flex w-full justify-center">
          {isMobile ? (
            <SinglePageBook
              frame={frame}
              progress={progress}
              bookOpacity={bookOpacity}
              renderUnit={renderUnit}
              atStart={nav.atStart}
              atEnd={nav.atEnd}
              onNext={nav.next}
              onPrevious={nav.previous}
              activeChapterId={nav.chapter.id}
              onGoToChapter={goToChapter}
            />
          ) : (
            <SpreadBook
              frame={frame}
              progress={progress}
              bookOpacity={bookOpacity}
              bookScale={bookScale}
              sequence={sequence}
              atStart={nav.atStart}
              atEnd={nav.atEnd}
              onNext={nav.next}
              onPrevious={nav.previous}
              activeChapterId={nav.chapter.id}
              onGoToChapter={goToChapter}
            />
          )}
        </main>

        {isMobile && (
          <TouchNav
            position={index}
            total={nav.lastIndex + 1}
            atStart={nav.atStart}
            atEnd={nav.atEnd}
            onNext={nav.next}
            onPrevious={nav.previous}
          />
        )}

        <p className="sr-only" role="status" aria-live="polite">
          {nav.chapter.numeral ? `Chapter ${nav.chapter.numeral}, ` : ''}
          {nav.chapter.title}. {nav.spread.label}. Page {index + 1} of {nav.lastIndex + 1}.
        </p>
      </div>

      <ContentsIndex
        open={contentsOpen}
        onClose={closeContents}
        index={nav.unit.spreadIndex}
        onGoTo={goToSpread}
        reducedMotion={reducedMotion}
      />

      <DetailSheet detail={detail} onClose={closeDetail} reducedMotion={reducedMotion} />
    </BookContext.Provider>
  )
}

/* --------------------------------------------------------- two-page view */

function SpreadBook({
  frame,
  progress,
  bookOpacity,
  bookScale,
  sequence,
  atStart,
  atEnd,
  onNext,
  onPrevious,
  activeChapterId,
  onGoToChapter,
}) {
  const spread = (i) => {
    const index = sequence[i]?.spreadIndex ?? 0
    return (
      <div className="book-pages">
        <SpreadPage index={index} side="left" />
        <SpreadPage index={index} side="right" />
      </div>
    )
  }

  return (
    <div className="book-perspective">
      <motion.div className="book" style={{ opacity: bookOpacity, scale: bookScale }}>
        <span className="book-block" style={{ inset: '6px -7px -8px -7px' }} aria-hidden="true" />
        <span className="book-block" style={{ inset: '3px -4px -4px -4px' }} aria-hidden="true" />

        <div className="book-viewport">
          {frame.resting != null ? (
            spread(frame.resting)
          ) : (
            <PageSlideLayer
              progress={progress}
              direction={frame.direction}
              from={spread(frame.from)}
              to={spread(frame.to)}
            />
          )}
        </div>

        <span className="book-spine" aria-hidden="true" />
      </motion.div>

      <Bookmarks activeChapterId={activeChapterId} onGoToChapter={onGoToChapter} />
      <EdgeControls atStart={atStart} atEnd={atEnd} onNext={onNext} onPrevious={onPrevious} />
    </div>
  )
}

/* ------------------------------------------------------ single-page view */

function SinglePageBook({
  frame,
  progress,
  bookOpacity,
  renderUnit,
  atStart,
  atEnd,
  onNext,
  onPrevious,
  activeChapterId,
  onGoToChapter,
}) {
  return (
    <motion.div className="mobile-book" style={{ opacity: bookOpacity }}>
      {/* The pages already read, so the book visibly thickens as you go. */}
      <span className="mobile-stack" aria-hidden="true" />

      <div className="mobile-slot">
        {frame.resting != null ? (
          renderUnit(frame.resting)
        ) : (
          <PageSlideLayer
            progress={progress}
            direction={frame.direction}
            from={renderUnit(frame.from)}
            to={renderUnit(frame.to)}
          />
        )}
      </div>

      <Bookmarks activeChapterId={activeChapterId} onGoToChapter={onGoToChapter} />
      <EdgeControls atStart={atStart} atEnd={atEnd} onNext={onNext} onPrevious={onPrevious} />
    </motion.div>
  )
}

export default BookShell
