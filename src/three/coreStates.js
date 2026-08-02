/**
 * The six scroll states from the storyboard, as plain data.
 *
 * One entry per content area; the core interpolates between neighbours as the
 * page scrolls. Keeping these as numbers in a file — rather than an animation
 * library's timeline — means the whole choreography can be re-tuned by editing
 * values, with no tooling involved.
 *
 *   x, y      position, in world units (positive x is right of centre)
 *   scale     overall size
 *   spread    how far the rings separate from the core
 *   flatten   0 = spherical rings, 1 = stacked horizontal discs
 *   spin      accumulated rotation offset, radians
 *   glow      core emission strength
 */
export const coreStates = [
  // 1 · Hero — assembled, right of the copy, fully lit
  { x: 2.3, y: 0.0, scale: 1.0, spread: 1.0, flatten: 0.0, spin: 0.0, glow: 1.0 },
  // 2 · Work — recedes and dims so the case studies lead
  { x: 2.9, y: 0.3, scale: 0.72, spread: 1.15, flatten: 0.0, spin: 0.6, glow: 0.45 },
  // 3 · Skills — opens into stacked discs. Held out to the right and dimmed:
  // at x 0 the machine sat directly behind the densest text on the page.
  { x: 3.1, y: 0.0, scale: 0.85, spread: 1.7, flatten: 1.0, spin: 1.2, glow: 0.5 },
  // 4 · Experience — compresses to a vertical spine behind the timeline
  { x: -2.6, y: 0.0, scale: 0.8, spread: 0.75, flatten: 0.35, spin: 1.9, glow: 0.5 },
  // 5 · About / Recognition — nodes disperse wide
  { x: 2.4, y: -0.2, scale: 0.85, spread: 1.9, flatten: 0.15, spin: 2.6, glow: 0.6 },
  // 6 · Contact — reassembled and brightest, but still off-axis so the closing
  // copy and the contact routes stay clean
  { x: 2.6, y: 0.0, scale: 1.1, spread: 0.9, flatten: 0.0, spin: 3.3, glow: 1.0 },
]

const lerp = (a, b, t) => a + (b - a) * t

/** Sample the keyframe track at 0–1. */
export function sampleCoreState(progress, out) {
  const last = coreStates.length - 1
  const scaled = Math.min(Math.max(progress, 0), 1) * last
  const i = Math.min(Math.floor(scaled), last - 1)
  const t = scaled - i
  // Smoothstep between keyframes — linear reads mechanical at these speeds.
  const e = t * t * (3 - 2 * t)

  const a = coreStates[i]
  const b = coreStates[i + 1]

  out.x = lerp(a.x, b.x, e)
  out.y = lerp(a.y, b.y, e)
  out.scale = lerp(a.scale, b.scale, e)
  out.spread = lerp(a.spread, b.spread, e)
  out.flatten = lerp(a.flatten, b.flatten, e)
  out.spin = lerp(a.spin, b.spin, e)
  out.glow = lerp(a.glow, b.glow, e)
  return out
}
