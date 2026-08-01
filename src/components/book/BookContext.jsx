import { createContext, useContext } from 'react'

export const BookContext = createContext({
  goTo: () => {},
  goToChapter: () => {},
  /** Opens the detail sheet: openDetail('project', 'dinelink'). */
  openDetail: () => {},
  index: 0,
  isMobile: false,
})

export function useBook() {
  return useContext(BookContext)
}
