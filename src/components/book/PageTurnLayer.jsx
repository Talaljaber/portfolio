import React from 'react'
import { motion, useTransform } from 'framer-motion'

const DEG = Math.PI / 180

/**
 * The leaf that moves during a turn.
 *
 * It is hinged on the binding and runs 0° → -180° forwards, -180° → 0° back.
 * The sheet itself stays geometrically flat — bending it for real would mean
 * rendering the page once per strip — so the weight and curve are carried by
 * light instead: a fold shadow that deepens toward the binding, a specular
 * band that sweeps across the sheet as it passes upright, a bright edge that
 * reads as paper thickness, and a cast shadow whose width tracks the leaf's
 * projection onto the page beneath (∝ |cos θ|).
 */
export function PageTurnLayer({ progress, direction, mode = 'spread', front, back }) {
  const forward = direction === 'forward'
  const single = mode === 'single'

  const angle = useTransform(progress, (p) => (forward ? -180 * p : -180 * (1 - p)))

  // 0 at both ends, 1 as the sheet passes upright.
  const bend = useTransform(progress, (p) => Math.sin(Math.PI * p))

  // The sheet lifts off the block as it swings, then settles back down.
  const lift = useTransform(bend, (b) => b * (single ? 18 : 30))

  // Fold shading, deepest at the binding.
  const foldShade = useTransform(bend, (b) => 0.16 + b * 0.5)
  // Specular sweep travelling out from the binding.
  const glossPos = useTransform(progress, (p) => `${(forward ? p : 1 - p) * 100}%`)
  const glossOpacity = useTransform(bend, (b) => b * 0.34)

  // The back of the sheet is in shade until it comes to rest.
  const backShade = useTransform(progress, (p) => {
    const settle = forward ? p : 1 - p
    return Math.max(0, 0.62 - settle * 0.62) + Math.sin(Math.PI * p) * 0.24
  })

  // Cast shadow: as wide as the leaf's projection, strongest mid-swing.
  const projection = useTransform(angle, (deg) => Math.abs(Math.cos(deg * DEG)))
  const castOpacity = useTransform(bend, (b) => b * 0.92)

  // Single-page view: the leaf has nowhere to lie flat, so it settles into the
  // block of read pages rather than being cut off by the edge of the screen.
  const leafOpacity = useTransform(progress, (p) => {
    if (!single) return 1
    const settle = forward ? p : 1 - p
    return settle < 0.84 ? 1 : Math.max(0, 1 - (settle - 0.84) / 0.16)
  })
  const nearOpacity = useTransform(angle, (deg) => (Math.abs(deg) > 90 ? 0 : 1))
  const farOpacity = useTransform(angle, (deg) => (Math.abs(deg) > 90 ? 1 : 0))

  return (
    <>
      {/* shadow thrown onto the page the leaf is still covering */}
      <motion.span
        className={single ? 'leaf-cast leaf-cast--single' : 'leaf-cast leaf-cast--right'}
        style={{ opacity: castOpacity, scaleX: projection }}
        aria-hidden="true"
      >
        <motion.span className="leaf-cast__near" style={{ opacity: nearOpacity }} />
      </motion.span>

      {!single && (
        <motion.span
          className="leaf-cast leaf-cast--left"
          style={{ opacity: castOpacity, scaleX: projection }}
          aria-hidden="true"
        >
          <motion.span className="leaf-cast__far" style={{ opacity: farOpacity }} />
        </motion.span>
      )}

      {/* z keeps the leaf off the plane of the static pages so the 3D
          rendering context sorts it above them at every angle */}
      <motion.div
        className={single ? 'leaf leaf--single' : 'leaf'}
        style={{ rotateY: angle, z: lift, opacity: leafOpacity }}
        aria-hidden="true"
      >
        <div className="leaf__face leaf__face--front">
          {front}
          <motion.span
            className="leaf__fold leaf__fold--front"
            style={{ opacity: foldShade }}
          />
          <motion.span
            className="leaf__gloss"
            style={{ opacity: glossOpacity, backgroundPositionX: glossPos }}
          />
          <span className="leaf__edge leaf__edge--front" />
        </div>

        <div className="leaf__face leaf__face--back">
          {back}
          <motion.span className="leaf__fold leaf__fold--back" style={{ opacity: backShade }} />
          <span className="leaf__edge leaf__edge--back" />
        </div>
      </motion.div>
    </>
  )
}

export default PageTurnLayer
