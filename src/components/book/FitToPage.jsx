import React, { useCallback, useLayoutEffect, useRef, useState } from 'react'

const MIN_SCALE = 0.7

/**
 * Guarantees a page never clips.
 *
 * A page does not scroll, so content that is a little too tall for a short
 * window would simply be lost. This measures the laid-out height and, only
 * when it exceeds the page, scales the whole block down the way a printer
 * would set a page in slightly smaller type.
 *
 * The inner block is widened by 1/scale so that after scaling it still fills
 * the page edge to edge. That widening is why one measuring pass is not
 * enough: laying out wider makes text wrap less, so the block ends up much
 * shorter than the pass predicted and the page is left with a band of empty
 * paper at the foot. So we search for the largest scale that actually fits at
 * the width it will be laid out at, which keeps the type as big as the page
 * allows and the page as full as the content allows.
 */
export function FitToPage({ children }) {
  const outerRef = useRef(null)
  const innerRef = useRef(null)
  const [scale, setScale] = useState(1)

  const measure = useCallback(() => {
    const outer = outerRef.current
    const inner = innerRef.current
    if (!outer || !inner) return

    const available = outer.clientHeight
    if (available <= 0) return

    const previous = inner.style.cssText

    // The height this block would occupy on the page at a given scale.
    const heightAt = (candidate) => {
      inner.style.transform = 'none'
      inner.style.width = `${100 / candidate}%`
      return inner.scrollHeight * candidate
    }

    let next = 1
    if (heightAt(1) > available) {
      // Effective height falls as the scale falls, so a handful of bisections
      // lands within a percent of the largest scale that fits.
      let low = MIN_SCALE
      let high = 1
      for (let i = 0; i < 7; i += 1) {
        const mid = (low + high) / 2
        if (heightAt(mid) <= available) low = mid
        else high = mid
      }
      next = low
    }

    inner.style.cssText = previous
    setScale((current) => (Math.abs(current - next) > 0.004 ? next : current))
  }, [])

  useLayoutEffect(() => {
    measure()

    const observer = new ResizeObserver(measure)
    if (outerRef.current) observer.observe(outerRef.current)

    // Web fonts land after first paint and change every measurement.
    let cancelled = false
    document.fonts?.ready.then(() => {
      if (!cancelled) measure()
    }).catch(() => {})

    return () => {
      cancelled = true
      observer.disconnect()
    }
  }, [measure, children])

  return (
    <div ref={outerRef} className="fit-outer" data-fit={scale < 1 ? scale.toFixed(2) : undefined}>
      <div
        ref={innerRef}
        className="fit-inner"
        style={
          scale < 1
            ? { transform: `scale(${scale})`, width: `${100 / scale}%` }
            : undefined
        }
      >
        {children}
      </div>
    </div>
  )
}

export default FitToPage
