import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

import { navSections } from '../../lib/sections'
import { siteConfig } from '../../content/site'

const Mark = () => (
  <svg viewBox="0 0 64 64" width="26" height="26" aria-hidden="true" fill="none">
    <path
      d="M32 8 L53 20 L53 44 L32 56 L11 44 L11 20 Z"
      stroke="var(--accent)"
      strokeWidth="3"
      strokeLinejoin="round"
    />
    <circle cx="32" cy="32" r="6" fill="var(--accent-glow)" />
  </svg>
)

/**
 * On the home page a section link is a plain anchor — native, instant, no
 * router churn. From any other route the same link has to travel home first,
 * so it becomes a router Link and Home's hash effect does the scrolling.
 */
function SectionLink({ id, atHome, className, style, onClick, children }) {
  if (atHome) {
    return (
      <a href={`#${id}`} className={className} style={style} onClick={onClick}>
        {children}
      </a>
    )
  }
  return (
    <Link
      to={{ pathname: '/', hash: `#${id}` }}
      className={className}
      style={style}
      onClick={onClick}
    >
      {children}
    </Link>
  )
}

export default function Nav({ active }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const atHome = useLocation().pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // A menu open over a scrolling page is a trap on touch.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className="fixed inset-x-0 top-0 z-40 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(5,6,10,0.72)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: `1px solid ${scrolled ? 'var(--line)' : 'transparent'}`,
      }}
    >
      <div className="shell flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Mark />
          <span className="text-sm font-medium tracking-tight" style={{ color: 'var(--ink)' }}>
            {siteConfig.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lab:flex" aria-label="Sections">
          {navSections.map((section) => (
            <SectionLink
              key={section.id}
              id={section.id}
              atHome={atHome}
              className="u-kicker transition-colors duration-200"
              style={{
                color: active === section.id ? 'var(--accent-bright)' : 'var(--muted)',
              }}
            >
              {section.label}
            </SectionLink>
          ))}
        </nav>

        <button
          type="button"
          className="lab:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          style={{ color: 'var(--ink)' }}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div
          className="lab:hidden"
          style={{ background: 'rgba(5,6,10,0.97)', borderTop: '1px solid var(--line)' }}
        >
          <nav className="shell flex flex-col py-6" aria-label="Sections">
            {navSections.map((section) => (
              <SectionLink
                key={section.id}
                id={section.id}
                atHome={atHome}
                onClick={() => setOpen(false)}
                className="u-kicker border-b py-4 last:border-0"
                style={{
                  borderColor: 'var(--line)',
                  color: active === section.id ? 'var(--accent-bright)' : 'var(--text)',
                }}
              >
                {section.label}
              </SectionLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
