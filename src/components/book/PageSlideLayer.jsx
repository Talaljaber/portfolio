import React from 'react'
import { motion, useTransform } from 'framer-motion'

/**
 * The page transition.
 *
 * Two sheets ride a single 0 → 1 progress value: the one you are leaving
 * travels out, the one you are going to travels in behind it. Nothing is
 * rotated in 3D and nothing is drawn twice — the outgoing page is the only
 * copy of itself on screen, which is what the old hinged leaf could not
 * promise, since it painted the same page on the leaf and under it.
 *
 * A drag maps straight onto progress, so the paper follows the finger.
 */
export function PageSlideLayer({ progress, direction, from, to }) {
  const forward = direction === 'forward'
  const sign = forward ? -1 : 1

  // Out: 0 → ±100%. In: ∓100% → 0. The incoming sheet travels a little less
  // than the outgoing one, so it reads as arriving from underneath.
  const outX = useTransform(progress, (p) => `${sign * p * 100}%`)
  const inX = useTransform(progress, (p) => `${-sign * (1 - p) * 82}%`)

  const outShade = useTransform(progress, (p) => p * 0.5)
  const inShade = useTransform(progress, (p) => (1 - p) * 0.42)

  return (
    <>
      <motion.div className="slide slide--in" style={{ x: inX }} aria-hidden="true">
        {to}
        <motion.span className="slide__shade" style={{ opacity: inShade }} />
      </motion.div>

      <motion.div className="slide slide--out" style={{ x: outX }} aria-hidden="true">
        {from}
        <motion.span className="slide__shade" style={{ opacity: outShade }} />
        <span className="slide__edge" />
      </motion.div>
    </>
  )
}

export default PageSlideLayer
