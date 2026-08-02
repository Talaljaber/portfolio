import { useEffect, useState } from 'react'

/**
 * Which section the reader is in. Uses one observer over all of them with a
 * band across the middle of the viewport, so the active state changes when a
 * section reaches reading position rather than when it first peeks in.
 */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const nodes = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!nodes.length) return undefined

    // Track ratios ourselves: with a narrow root margin, entries fire in an
    // order that does not reliably reflect which section dominates the band.
    const ratios = new Map()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.intersectionRatio)
        }
        let best = null
        let bestRatio = 0
        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) {
            best = id
            bestRatio = ratio
          }
        }
        if (best) setActive(best)
      },
      { rootMargin: '-35% 0px -35% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [ids])

  return active
}

export default useActiveSection
