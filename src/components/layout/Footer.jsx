import React from 'react'
import { Link } from 'react-router-dom'

import { siteConfig } from '../../content/site'

export default function Footer() {
  return (
    <footer className="relative z-10 border-t" style={{ borderColor: 'var(--line)' }}>
      <div className="shell flex flex-wrap items-center justify-between gap-4 py-8">
        <p className="u-mono">
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
        <div className="flex gap-6">
          <Link to="/services" className="u-mono hover:text-[var(--accent-bright)]">
            Services
          </Link>
          <a
            href={siteConfig.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="u-mono hover:text-[var(--accent-bright)]"
          >
            GitHub
          </a>
          <a
            href={siteConfig.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="u-mono hover:text-[var(--accent-bright)]"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  )
}
