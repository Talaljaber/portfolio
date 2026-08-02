import React, { Suspense, lazy } from 'react'

import { sections } from '../../lib/sections'
import { useActiveSection } from '../../hooks/useActiveSection'
import Background from './Background'
import Footer from './Footer'
import Nav from './Nav'
import ProgressRail from './ProgressRail'

// three.js is by far the largest thing on the site. Splitting it into its own
// chunk keeps it out of the critical path: the page paints and is readable
// before the canvas code is even fetched.
const Scene = lazy(() => import('../../three/Scene'))

/**
 * Everything that persists across the whole page: the one background layer,
 * the nav, and the rail. Sections mount inside as transparent children — none
 * of them paints a background, which is what keeps the site one environment.
 */
// Stable identities: the observer effect keys on this array, so a fresh one
// per render would tear down and rebuild the observer on every render.
const ALL_IDS = sections.map((s) => s.id)
const NO_IDS = []

export default function Shell({ children, tracked = true }) {
  const ids = tracked ? ALL_IDS : NO_IDS
  const active = useActiveSection(ids)

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Background />
      {/* The core only choreographs against the seven-section scroll, so the
          sub-routes get the environment without it. */}
      {tracked && (
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      )}
      <Nav active={tracked ? active : null} />
      {tracked && <ProgressRail active={active} />}

      <main id="main" className="relative z-10">
        {children}
      </main>

      <Footer />
    </>
  )
}
