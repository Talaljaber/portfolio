import { useEffect, useState } from 'react'

/**
 * How much scene this device should be asked to draw.
 *
 *   'none'   — no WebGL at all; the caller renders a CSS fallback
 *   'low'    — phones: no transmission, no connectors, few nodes
 *   'medium' — tablets and weak laptops
 *   'high'   — everything
 *
 * Deliberately measured once on mount. Re-probing on resize would let a
 * window drag rebuild the whole scene mid-scroll.
 */
function probe() {
  if (typeof window === 'undefined') return 'none'

  const canvas = document.createElement('canvas')
  const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
  if (!gl) return 'none'

  // Release the probe context immediately — browsers cap concurrent contexts.
  const lose = gl.getExtension('WEBGL_lose_context')
  if (lose) lose.loseContext()

  const cores = navigator.hardwareConcurrency ?? 4
  const coarse = window.matchMedia('(pointer: coarse)').matches
  const narrow = window.innerWidth < 1024

  if (coarse || narrow || cores <= 4) return 'low'
  if (cores <= 8) return 'medium'
  return 'high'
}

export function useDeviceCapability() {
  const [tier, setTier] = useState('none')

  useEffect(() => {
    setTier(probe())
  }, [])

  return tier
}

export default useDeviceCapability
