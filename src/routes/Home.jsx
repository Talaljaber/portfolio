import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import Shell from '../components/layout/Shell'
import Hero from '../components/sections/Hero'
import Work from '../components/sections/Work'
import Skills from '../components/sections/Skills'
import Experience from '../components/sections/Experience'
import About from '../components/sections/About'
import Achievements from '../components/sections/Achievements'
import Contact from '../components/sections/Contact'

export default function Home() {
  const { hash } = useLocation()

  // Arriving on /#work from a redirect happens before the sections exist, so
  // the browser's own anchor handling misses. Scroll once they are mounted.
  useEffect(() => {
    if (!hash) return
    const target = document.getElementById(hash.slice(1))
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [hash])

  return (
    <Shell>
      <Hero />
      <Work />
      <Skills />
      <Experience />
      <About />
      <Achievements />
      <Contact />
    </Shell>
  )
}
