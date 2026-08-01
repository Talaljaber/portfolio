import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import BookShell from './components/book/BookShell'
import ProjectDetail from './routes/ProjectDetail'

/**
 * The book is the site. The old section routes are kept as redirects into the
 * matching chapter so existing links and bookmarks still resolve, and the
 * project-detail route stays a page of its own.
 */
function App() {
  return (
    <Routes>
      <Route path="/" element={<BookShell />} />
      <Route path="/projects/:id" element={<ProjectDetail />} />

      <Route path="/about" element={<Navigate to={{ pathname: '/', hash: '#about' }} replace />} />
      <Route
        path="/projects"
        element={<Navigate to={{ pathname: '/', hash: '#projects' }} replace />}
      />
      <Route
        path="/services"
        element={<Navigate to={{ pathname: '/', hash: '#services' }} replace />}
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
