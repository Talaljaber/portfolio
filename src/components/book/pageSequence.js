import { spreads } from '../../content/book'

/**
 * The units the reader moves through.
 *
 * On a two-page spread that unit is the spread. On a single-page view it is
 * one printed page — except where a page carries more than a phone can hold at
 * a readable size, which it declares with `mobile`: a list of prop sets, one
 * per phone page. Splitting there is what keeps the type full-size instead of
 * letting the fit pass shrink a crowded page into illegibility.
 */

export const spreadSequence = spreads.map((spread, index) => ({
  key: spread.id,
  spreadIndex: index,
  side: 'spread',
  chapterId: spread.chapterId,
}))

function mobileUnitsFor(spread, index, side) {
  const descriptor = side === 'left' ? spread.left : spread.right
  const base = { spreadIndex: index, chapterId: spread.chapterId, side }
  const parts = descriptor?.mobile

  if (!parts?.length) return [{ ...base, key: `${spread.id}:${side}` }]

  return parts.map((pageProps, part) => ({
    ...base,
    key: `${spread.id}:${side}:${part}`,
    pageProps,
  }))
}

export const pageSequence = spreads.flatMap((spread, index) => {
  const pages = []
  // A purely decorative verso (the cover's) is not worth a swipe of its own.
  if (!spread.mobileSkipLeft) pages.push(...mobileUnitsFor(spread, index, 'left'))
  pages.push(...mobileUnitsFor(spread, index, 'right'))
  return pages
})

export function firstUnitOfChapter(sequence, chapterId) {
  const index = sequence.findIndex((unit) => unit.chapterId === chapterId)
  return index === -1 ? 0 : index
}

export function firstUnitOfSpread(sequence, spreadIndex) {
  const index = sequence.findIndex((unit) => unit.spreadIndex === spreadIndex)
  return index === -1 ? 0 : index
}
