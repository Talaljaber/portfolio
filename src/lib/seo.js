// Explicit extensions: this module is imported by scripts/seo.mjs under plain
// Node at build time, which does not resolve extensionless paths the way Vite does.
import { projects } from '../content/projects.js'
import { siteConfig } from '../content/site.js'

/**
 * Per-route metadata, in one place.
 *
 * Deliberately free of React and JSX so the build script can import it
 * directly: the same function that sets tags at runtime also writes the static
 * HTML, which is the only way the two can't drift apart.
 */

export const SITE_URL = siteConfig.seo.url
export const OG_IMAGE = `${SITE_URL}/images/og-image.png`

const DEFAULT = {
  path: '/',
  title: 'Talal Jaber — Software Engineer & AI Systems | Founder of DineLink',
  description:
    'Talal Jaber is a software engineer and Computer Engineering student at the German Jordanian University, building AI systems, full-stack products and scalable web experiences. Founder of DineLink and a Top 100 global innovator at Falling Walls Berlin.',
}

const SERVICES = {
  path: '/services',
  title: 'Freelance Services — Web, E-Commerce & Backend | Talal Jaber',
  description:
    'Custom web development, e-commerce platforms, restaurant technology, backend APIs, DevOps and workflow automation. Built with React, Next.js, NestJS and PostgreSQL, delivered end to end.',
}

/** Trim to a length search results will actually show, without cutting mid-word. */
function clamp(text, max = 158) {
  if (text.length <= max) return text
  return `${text.slice(0, text.lastIndexOf(' ', max - 1))}…`
}

function projectMeta(project) {
  return {
    path: `/projects/${project.id}`,
    title: `${project.title} | Talal Jaber`,
    description: clamp(`${project.shortDescription}. ${project.description}`),
  }
}

/** Every indexable route. Drives the sitemap and the prerender pass. */
export function allRoutes() {
  return [DEFAULT, SERVICES, ...projects.map(projectMeta)]
}

/** Metadata for one pathname; falls back to the site default. */
export function metaForPath(pathname) {
  const clean = pathname.replace(/\/+$/, '') || '/'
  if (clean === '/') return { ...DEFAULT, canonical: `${SITE_URL}/` }

  const match = allRoutes().find((route) => route.path === clean)
  if (match) return { ...match, canonical: `${SITE_URL}${match.path}` }

  // Unknown paths redirect to the root, so they must point their canonical
  // there too rather than claiming to be a page of their own.
  return { ...DEFAULT, canonical: `${SITE_URL}/`, noindex: true }
}
