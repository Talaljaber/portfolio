import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { chapters, spreads } from '../content/book'
import { firstUnitOfChapter, firstUnitOfSpread } from '../components/book/pageSequence'

function chapterIdFromHash(hash) {
  const id = (hash || '').replace(/^#/, '')
  return chapters.some((c) => c.id === id) ? id : null
}

/**
 * Where the book opens.
 *
 * At the cover, unless the URL names a chapter. Restoring the last spread
 * read was worse than it sounded: arriving at the site dropped you into the
 * middle of a book you had not opened yet.
 */
function initialIndex(sequence, hash) {
  const fromHash = chapterIdFromHash(hash)
  return fromHash ? firstUnitOfChapter(sequence, fromHash) : 0
}

/**
 * Owns which unit of the book is showing, the pending transition, and the URL.
 *
 * A "turn" is an adjacent move that gets the full page-turn animation.
 * A "jump" is a distant move that gets one short fade-and-settle instead of
 * animating every page in between.
 */
export function useBookNavigation(sequence) {
  const location = useLocation()
  const navigate = useNavigate()

  const last = sequence.length - 1

  const [index, setIndex] = useState(() => initialIndex(sequence, location.hash))
  const [transition, setTransition] = useState(null) // { from, to, direction, mode }

  const busy = transition !== null
  const busyRef = useRef(false)
  busyRef.current = busy

  const indexRef = useRef(index)
  indexRef.current = index

  const unit = sequence[index] ?? sequence[0]
  const spread = spreads[unit.spreadIndex]
  const chapter = useMemo(
    () => chapters.find((c) => c.id === unit.chapterId) ?? chapters[0],
    [unit.chapterId],
  )

  /* ---------------------------------------------------------------- moves */

  const goTo = useCallback(
    (target, { immediate = false } = {}) => {
      const to = Math.max(0, Math.min(last, target))
      const from = indexRef.current
      if (to === from || busyRef.current) return false

      if (immediate) {
        setIndex(to)
        return true
      }

      setTransition({
        from,
        to,
        direction: to > from ? 'forward' : 'backward',
        mode: Math.abs(to - from) === 1 ? 'turn' : 'jump',
      })
      return true
    },
    [last],
  )

  const next = useCallback(() => goTo(indexRef.current + 1), [goTo])
  const previous = useCallback(() => goTo(indexRef.current - 1), [goTo])

  const goToChapter = useCallback(
    (chapterId) => goTo(firstUnitOfChapter(sequence, chapterId)),
    [goTo, sequence],
  )

  const goToSpread = useCallback(
    (spreadIndex) => goTo(firstUnitOfSpread(sequence, spreadIndex)),
    [goTo, sequence],
  )

  const commitTransition = useCallback(() => {
    setTransition((current) => {
      if (current) setIndex(current.to)
      return null
    })
  }, [])

  const cancelTransition = useCallback(() => setTransition(null), [])

  /** Start a turn we will drive by hand from a drag rather than animate. */
  const beginDrag = useCallback(
    (direction) => {
      const from = indexRef.current
      const to = direction === 'forward' ? from + 1 : from - 1
      if (to < 0 || to > last || busyRef.current) return false
      setTransition({ from, to, direction, mode: 'drag' })
      return true
    },
    [last],
  )

  const releaseDrag = useCallback((complete) => {
    setTransition((current) =>
      current ? { ...current, mode: complete ? 'turn' : 'return' } : null,
    )
  }, [])

  /* ------------------------------------------------------------------ URL */

  // Hash -> book. Covers Back/Forward and deep links.
  useEffect(() => {
    const id = chapterIdFromHash(location.hash)
    if (!id) return
    if (sequence[indexRef.current]?.chapterId === id) return
    setTransition(null)
    setIndex(firstUnitOfChapter(sequence, id))
  }, [location.hash, sequence])

  // Book -> hash. Only chapter changes touch history, not every page turn.
  useEffect(() => {
    const desired = chapter.inNav ? `#${chapter.id}` : ''
    if (location.hash === desired) return
    navigate({ pathname: '/', hash: desired }, { replace: !chapter.inNav })
    // Reacts to the book moving; the effect above reacts to the URL moving.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapter.id])

  return {
    index,
    unit,
    spread,
    chapter,
    transition,
    busy,
    atStart: index === 0,
    atEnd: index === last,
    lastIndex: last,
    next,
    previous,
    goTo,
    goToChapter,
    goToSpread,
    beginDrag,
    releaseDrag,
    commitTransition,
    cancelTransition,
  }
}

export default useBookNavigation
