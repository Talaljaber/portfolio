import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { useSeo } from './hooks/useSeo'
import Home from './routes/Home'
import Services from './routes/Services'
import ProjectDetail from './routes/ProjectDetail'

/**
 * One continuous page at the root, plus two routes of their own. The legacy
 * section paths still resolve — now onto real scroll anchors rather than
 * chapter indices.
 */
function App() {
  useSeo()

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/projects/:id" element={<ProjectDetail />} />

      <Route path="/about" element={<Navigate to={{ pathname: '/', hash: '#about' }} replace />} />
      <Route path="/projects" element={<Navigate to={{ pathname: '/', hash: '#work' }} replace />} />
      <Route path="/skills" element={<Navigate to={{ pathname: '/', hash: '#skills' }} replace />} />
      <Route
        path="/experience"
        element={<Navigate to={{ pathname: '/', hash: '#experience' }} replace />}
      />
      <Route
        path="/achievements"
        element={<Navigate to={{ pathname: '/', hash: '#achievements' }} replace />}
      />
      <Route
        path="/contact"
        element={<Navigate to={{ pathname: '/', hash: '#contact' }} replace />}
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
