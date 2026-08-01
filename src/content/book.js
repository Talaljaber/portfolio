// The structure of the book: chapters, and the ordered list of spreads.
//
// Nothing here is portfolio *content* — it is the table of contents only.
// Every page names a renderer from the page registry and pulls its content
// from the existing content modules.
//
// The book is deliberately short. One chapter is one spread, so a reader
// reaches any section in at most seven turns — and every entry that has more
// to say opens it in a detail sheet rather than spending pages on it.

export const chapters = [
  { id: 'cover', title: 'Cover', numeral: null, inNav: false, inContents: false },
  { id: 'about', title: 'About', short: 'About', numeral: 'I', inNav: true, inContents: true },
  { id: 'skills', title: 'Skills', short: 'Skills', numeral: 'II', inNav: true, inContents: true },
  { id: 'projects', title: 'Projects', short: 'Projects', numeral: 'III', inNav: true, inContents: true },
  { id: 'experience', title: 'Experience', short: 'Experience', numeral: 'IV', inNav: true, inContents: true },
  { id: 'services', title: 'Services', short: 'Services', numeral: 'V', inNav: true, inContents: true },
  { id: 'achievements', title: 'Achievements', short: 'Awards', numeral: 'VI', inNav: true, inContents: true },
  { id: 'contact', title: 'Contact', short: 'Contact', numeral: 'VII', inNav: true, inContents: true },
]

export const spreads = [
  {
    id: 'cover',
    chapterId: 'cover',
    label: 'Cover',
    tone: 'dark',
    surface: 'cloth',
    chrome: false,
    folio: false,
    mobileSkipLeft: true,
    left: { page: 'coverVerso' },
    right: { page: 'coverRecto' },
  },
  {
    id: 'about',
    chapterId: 'about',
    label: 'Who I am',
    left: { page: 'profile' },
    right: { page: 'biography' },
  },
  {
    id: 'skills',
    chapterId: 'skills',
    label: 'What I work with',
    left: { page: 'skills', props: { column: 0 } },
    right: { page: 'skills', props: { column: 1 } },
  },
  {
    id: 'projects',
    chapterId: 'projects',
    label: 'Selected work',
    // A phone cannot hold five entries at a readable size, so it gets three
    // and then two. The desktop spread is unchanged.
    left: {
      page: 'projectList',
      props: { from: 0, to: 5 },
      mobile: [
        { from: 0, to: 3, head: true },
        { from: 3, to: 5 },
      ],
    },
    right: {
      page: 'projectList',
      props: { from: 5, to: 10 },
      mobile: [
        { from: 5, to: 8 },
        { from: 8, to: 10 },
      ],
    },
  },
  {
    id: 'experience',
    chapterId: 'experience',
    label: 'Roles & education',
    left: { page: 'roleList', props: { from: 0, to: 4 } },
    right: { page: 'roleList', props: { from: 4, to: 7, tail: true } },
  },
  {
    id: 'services',
    chapterId: 'services',
    label: 'What I can build for you',
    left: {
      page: 'serviceList',
      props: { from: 0, to: 3 },
      mobile: [
        { from: 0, to: 2, head: true },
        { from: 2, to: 3 },
      ],
    },
    right: {
      page: 'serviceList',
      props: { from: 3, to: 6, tail: true },
      mobile: [
        { from: 3, to: 5 },
        { from: 5, to: 6, tail: true },
      ],
    },
  },
  {
    id: 'achievements',
    chapterId: 'achievements',
    label: 'Awards & press',
    left: {
      page: 'achievementList',
      props: { from: 0, to: 9 },
      mobile: [
        { from: 0, to: 5, head: true },
        { from: 5, to: 9 },
      ],
    },
    right: {
      page: 'achievementList',
      props: { from: 9, to: 15, press: true },
      mobile: [
        { from: 9, to: 13 },
        { from: 13, to: 15, press: true },
      ],
    },
  },
  {
    id: 'contact',
    chapterId: 'contact',
    label: 'Get in touch',
    left: { page: 'contactRoutes' },
    right: { page: 'closing' },
  },
]

export const lastSpreadIndex = spreads.length - 1

export function getChapter(chapterId) {
  return chapters.find((c) => c.id === chapterId)
}

export function firstSpreadOfChapter(chapterId) {
  const index = spreads.findIndex((s) => s.chapterId === chapterId)
  return index === -1 ? 0 : index
}

/** Every spread in a chapter, with its position in the book. */
export function spreadsOfChapter(chapterId) {
  return spreads
    .map((spread, index) => ({ ...spread, index }))
    .filter((spread) => spread.chapterId === chapterId)
}

/** Page numbers printed at the outer lower corners of a spread. */
export function folioFor(spreadIndex) {
  return { left: spreadIndex * 2, right: spreadIndex * 2 + 1 }
}

/** The inclusive folio range of a chapter, for the contents index. */
export function folioRangeOfChapter(chapterId) {
  const owned = spreadsOfChapter(chapterId).filter((s) => s.folio !== false)
  if (!owned.length) return null
  return {
    from: folioFor(owned[0].index).left,
    to: folioFor(owned[owned.length - 1].index).right,
  }
}

export const navChapters = chapters.filter((c) => c.inNav)
export const contentsChapters = chapters.filter((c) => c.inContents)
