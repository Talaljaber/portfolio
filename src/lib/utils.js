import { clsx } from 'clsx'

/** Conditional class names. */
export function cn(...inputs) {
  return clsx(inputs)
}

/** One-off read of the motion preference, for non-React call sites. */
export function shouldReduceMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
