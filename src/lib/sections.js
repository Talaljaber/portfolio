/**
 * The page's spine. The rail numbers every stop; the nav links only the five
 * a visitor would look for. Both read from here so they can never disagree.
 */
export const sections = [
  { id: 'hero', label: 'Intro', nav: false },
  { id: 'work', label: 'Work', nav: true },
  { id: 'skills', label: 'Skills', nav: true },
  { id: 'experience', label: 'Experience', nav: true },
  { id: 'about', label: 'About', nav: true },
  { id: 'achievements', label: 'Recognition', nav: false },
  { id: 'contact', label: 'Contact', nav: true },
]

export const navSections = sections.filter((s) => s.nav)
