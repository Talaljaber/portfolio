import React, { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

import { contentsChapters, folioFor, spreadsOfChapter } from '../../content/book'
import { siteConfig } from '../../content/site'
import { Ornament, Rule } from './editorial'

/**
 * The publication index. Editorial rather than app-drawer: numerals, thin
 * rules, generous spacing, and a page range against every chapter.
 */
export function ContentsIndex({ open, onClose, index, onGoTo, reducedMotion }) {
  const closeRef = useRef(null)
  const panelRef = useRef(null)

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onClose()
        return
      }
      // Keep the tab ring inside the drawer while it is open.
      if (event.key !== 'Tab' || !panelRef.current) return
      const focusable = panelRef.current.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown, true)
    return () => document.removeEventListener('keydown', onKeyDown, true)
  }, [open, onClose])

  const duration = reducedMotion ? 0.01 : 0.34

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="contents-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration }}
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            ref={panelRef}
            className="contents-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Contents"
            initial={{ x: reducedMotion ? 0 : '100%', opacity: reducedMotion ? 0 : 1 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: reducedMotion ? 0 : '100%', opacity: reducedMotion ? 0 : 1 }}
            transition={{ duration, ease: [0.42, 0.02, 0.16, 1] }}
          >
            <span className="paper-grain" aria-hidden="true" />

            <header className="relative z-[2] flex shrink-0 items-start justify-between gap-4 px-8 pt-8 pb-5">
              <div>
                <p className="u-kicker mb-1">Table of</p>
                <h2 className="u-display text-[2rem]">Contents</h2>
              </div>
              <button
                type="button"
                ref={closeRef}
                onClick={onClose}
                aria-label="Close contents"
                className="btn-ghost -mr-1 p-1"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </header>

            <div className="relative z-[2] px-8">
              <Rule double />
            </div>

            <div
              className="relative z-[2] min-h-0 flex-1 overflow-y-auto px-8 py-6"
              data-book-scroll
            >
              {/* One chapter is one spread, so the index is flat: seven rows,
                  each of which lands you on the section itself. */}
              <ol className="flex flex-col">
                {contentsChapters.map((chapter) => {
                  const entries = spreadsOfChapter(chapter.id)
                  const target = entries[0]
                  const active = entries.some((entry) => entry.index === index)

                  return (
                    <li key={chapter.id}>
                      <button
                        type="button"
                        onClick={() => onGoTo(target.index)}
                        aria-current={active ? 'true' : undefined}
                        className="flex w-full items-baseline gap-4 border-b border-[var(--border)] py-4 text-left transition-transform duration-200 hover:translate-x-1"
                      >
                        <span className="u-numeral w-7 shrink-0 text-[0.95rem]">
                          {chapter.numeral}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span
                            className="block font-book text-[1.45rem] leading-tight"
                            style={{ color: active ? 'var(--accent)' : 'var(--ink)' }}
                          >
                            {chapter.title}
                          </span>
                          <span className="u-note block">{target.label}</span>
                        </span>
                        <span className="u-mono shrink-0">{folioFor(target.index).left}</span>
                      </button>
                    </li>
                  )
                })}
              </ol>

              <Ornament className="mx-auto mt-10" width={60} />
            </div>

            <footer className="relative z-[2] shrink-0 px-8 pb-7 pt-4">
              <button type="button" onClick={() => onGoTo(0)} className="btn-ghost">
                ← Return to the cover
              </button>
              <p className="u-mono mt-3">{siteConfig.handle}</p>
            </footer>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ContentsIndex
