import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

function read() {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia(QUERY).matches
}

/**
 * Live preference, not a one-time read: the user can flip the OS setting while
 * the page is open and the book must respond without a reload.
 */
export function useReducedMotionPreference() {
  const [reduced, setReduced] = useState(read)

  useEffect(() => {
    if (!window.matchMedia) return
    const mql = window.matchMedia(QUERY)
    const onChange = (event) => setReduced(event.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return reduced
}

export default useReducedMotionPreference
