import { useEffect, useRef } from 'react'

/**
 * Page scroll as a 0–1 value in a ref.
 *
 * Deliberately a ref and not state: this updates on every scroll frame, and
 * putting it in state would re-render the whole tree ~60 times a second. The
 * 3D scene reads it inside useFrame, which is outside React's render cycle.
 */
export function useScrollProgress() {
  const progress = useRef(0)

  useEffect(() => {
    const read = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      progress.current = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
    }
    read()
    window.addEventListener('scroll', read, { passive: true })
    window.addEventListener('resize', read)
    return () => {
      window.removeEventListener('scroll', read)
      window.removeEventListener('resize', read)
    }
  }, [])

  return progress
}

export default useScrollProgress
