import { useEffect, useRef } from 'react'

const WHEEL_THRESHOLD = 42 // accumulated px before a gesture counts as intent
const IMMEDIATE_LOCK_MS = 320 // covers the frames before `busy` propagates
const MOMENTUM_GAP_MS = 130 // a quiet gap this long ends a trackpad flick
const SWIPE_DISTANCE_RATIO = 0.14 // a thumb-flick is shorter than you think
const SWIPE_VELOCITY = 0.35 // px per ms
const AXIS_LOCK_RATIO = 1.15

/** Wheel deltas arrive in px, lines or pages depending on the device. */
function normalizeDelta(event) {
  if (event.deltaMode === 1) return event.deltaY * 16
  if (event.deltaMode === 2) return event.deltaY * window.innerHeight
  return event.deltaY
}

/** The nearest ancestor that opted into consuming scroll, if any. */
function findScrollArea(node) {
  let el = node instanceof Element ? node : null
  while (el && el !== document.body) {
    if (el.dataset && el.dataset.bookScroll !== undefined) return el
    el = el.parentElement
  }
  return null
}

function scrollAreaConsumes(target, delta) {
  const el = findScrollArea(target)
  if (!el) return false
  const max = el.scrollHeight - el.clientHeight
  if (max <= 1) return false
  return delta > 0 ? el.scrollTop < max - 1 : el.scrollTop > 1
}

function isTypingTarget(target) {
  if (!(target instanceof Element)) return false
  if (target.isContentEditable) return true
  return ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)
}

/**
 * Turns wheel, keyboard and touch input into page-turn intent.
 *
 * The document does not scroll — the book fills the viewport — so a wheel
 * gesture always means "turn a page", never "scroll". The only exception is a
 * region that opted in via `data-book-scroll` (the contents drawer).
 */
export function usePageTurnGesture({
  surfaceRef,
  active,
  busy,
  allowDrag = true,
  onNext,
  onPrevious,
  onFirst,
  onLast,
  onDragStart,
  onDragMove,
  onDragEnd,
}) {
  const live = useRef({})
  live.current = {
    active,
    busy,
    allowDrag,
    onNext,
    onPrevious,
    onFirst,
    onLast,
    onDragStart,
    onDragMove,
    onDragEnd,
  }

  const accum = useRef(0)
  const lastWheelAt = useRef(0)
  const lockedUntil = useRef(0)
  const inMomentum = useRef(false)

  /* ------------------------------------------------------------ wheel */

  useEffect(() => {
    const onWheel = (event) => {
      const s = live.current
      if (!s.active) return

      const delta = normalizeDelta(event)
      if (delta === 0) return
      if (scrollAreaConsumes(event.target, delta)) return

      event.preventDefault()

      const now = performance.now()
      const gap = now - lastWheelAt.current
      lastWheelAt.current = now

      if (s.busy || now < lockedUntil.current) {
        accum.current = 0
        inMomentum.current = true
        return
      }

      // Swallow the tail of a flick until the input actually goes quiet.
      if (inMomentum.current) {
        if (gap < MOMENTUM_GAP_MS) {
          accum.current = 0
          return
        }
        inMomentum.current = false
      }

      if (accum.current !== 0 && Math.sign(accum.current) !== Math.sign(delta)) {
        accum.current = 0
      }
      accum.current += delta

      if (Math.abs(accum.current) < WHEEL_THRESHOLD) return

      accum.current = 0
      inMomentum.current = true
      lockedUntil.current = now + IMMEDIATE_LOCK_MS
      if (delta > 0) s.onNext?.()
      else s.onPrevious?.()
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [])

  /* --------------------------------------------------------- keyboard */

  useEffect(() => {
    const onKeyDown = (event) => {
      const s = live.current
      if (!s.active || isTypingTarget(event.target)) return
      if (event.metaKey || event.ctrlKey || event.altKey) return

      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case 'PageDown':
          event.preventDefault()
          s.onNext?.()
          break
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
          event.preventDefault()
          s.onPrevious?.()
          break
        case ' ':
        case 'Spacebar':
          event.preventDefault()
          if (event.shiftKey) s.onPrevious?.()
          else s.onNext?.()
          break
        case 'Home':
          event.preventDefault()
          s.onFirst?.()
          break
        case 'End':
          event.preventDefault()
          s.onLast?.()
          break
        default:
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  /* ------------------------------------------------------------ touch */

  useEffect(() => {
    const surface = surfaceRef?.current
    if (!surface) return

    let startX = 0
    let startY = 0
    let startAt = 0
    let axis = null // null | 'x' | 'y'
    let dragging = false
    let tracking = false
    let width = 1

    const reset = () => {
      axis = null
      dragging = false
      tracking = false
    }

    const onTouchStart = (event) => {
      if (event.touches.length !== 1) return
      const s = live.current
      if (!s.active || s.busy) return
      startX = event.touches[0].clientX
      startY = event.touches[0].clientY
      startAt = performance.now()
      width = surface.getBoundingClientRect().width || 1
      axis = null
      dragging = false
      tracking = true
    }

    const onTouchMove = (event) => {
      const s = live.current
      if (!tracking || !s.active || event.touches.length !== 1) return

      const dx = event.touches[0].clientX - startX
      const dy = event.touches[0].clientY - startY

      if (axis === null) {
        if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return
        // Diagonal drift must not steal a deliberate vertical gesture.
        axis = Math.abs(dx) > Math.abs(dy) * AXIS_LOCK_RATIO ? 'x' : 'y'
        if (axis === 'x' && !s.busy && s.allowDrag) {
          dragging = s.onDragStart?.(dx < 0 ? 'forward' : 'backward') === true
        }
      }

      if (axis !== 'x') return
      event.preventDefault()
      if (!dragging) return

      s.onDragMove?.(Math.min(1, Math.max(0, Math.abs(dx) / width)))
    }

    const onTouchEnd = (event) => {
      const s = live.current
      if (!tracking) return

      const endX = event.changedTouches?.[0]?.clientX ?? startX
      const endY = event.changedTouches?.[0]?.clientY ?? startY
      const dx = endX - startX
      const dy = endY - startY
      const elapsed = Math.max(1, performance.now() - startAt)
      const velocity = Math.abs(dx) / elapsed
      const passed = Math.abs(dx) > width * SWIPE_DISTANCE_RATIO || velocity > SWIPE_VELOCITY

      if (dragging) {
        s.onDragEnd?.(passed)
      } else if (passed && Math.abs(dx) > Math.abs(dy) && !s.busy) {
        // Reached without a resolved axis when the browser delivered no
        // touchmove at all — a flick still has to turn the page.
        if (dx < 0) s.onNext?.()
        else s.onPrevious?.()
      }
      reset()
    }

    const onTouchCancel = () => {
      // The browser took the gesture: put the leaf back rather than commit it.
      if (dragging) live.current.onDragEnd?.(false)
      reset()
    }

    surface.addEventListener('touchstart', onTouchStart, { passive: true })
    surface.addEventListener('touchmove', onTouchMove, { passive: false })
    surface.addEventListener('touchend', onTouchEnd)
    surface.addEventListener('touchcancel', onTouchCancel)

    return () => {
      surface.removeEventListener('touchstart', onTouchStart)
      surface.removeEventListener('touchmove', onTouchMove)
      surface.removeEventListener('touchend', onTouchEnd)
      surface.removeEventListener('touchcancel', onTouchCancel)
    }
  }, [surfaceRef])
}

export default usePageTurnGesture
