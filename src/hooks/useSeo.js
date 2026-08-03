import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { OG_IMAGE, metaForPath } from '../lib/seo'

function setTag(selector, attr, value) {
  const el = document.head.querySelector(selector)
  if (el) el.setAttribute(attr, value)
}

/**
 * Keeps the document head in step with the route.
 *
 * The prerendered HTML already carries the right tags on first load; this is
 * what fixes them after a client-side navigation, when no new document is
 * fetched and the head would otherwise still describe the previous page.
 */
export function useSeo() {
  const { pathname } = useLocation()

  useEffect(() => {
    const meta = metaForPath(pathname)

    document.title = meta.title
    setTag('meta[name="title"]', 'content', meta.title)
    setTag('meta[name="description"]', 'content', meta.description)
    setTag('link[rel="canonical"]', 'href', meta.canonical)

    setTag('meta[property="og:title"]', 'content', meta.title)
    setTag('meta[property="og:description"]', 'content', meta.description)
    setTag('meta[property="og:url"]', 'content', meta.canonical)
    setTag('meta[property="og:image"]', 'content', OG_IMAGE)

    setTag('meta[property="twitter:title"]', 'content', meta.title)
    setTag('meta[property="twitter:description"]', 'content', meta.description)
    setTag('meta[property="twitter:url"]', 'content', meta.canonical)
    setTag('meta[property="twitter:image"]', 'content', OG_IMAGE)

    setTag('meta[name="robots"]', 'content', meta.noindex ? 'noindex, follow' : 'index, follow')
  }, [pathname])
}

export default useSeo
