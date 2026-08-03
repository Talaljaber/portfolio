import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { OG_IMAGE, SITE_URL, allRoutes } from '../src/lib/seo.js'
import { projects } from '../src/content/projects.js'

/**
 * Post-build SEO pass.
 *
 * The app is client-rendered, so every route was being served the same
 * index.html — one title, one description, and a canonical hardcoded to the
 * homepage, which told search engines the project pages were duplicates of it.
 *
 * Social crawlers (LinkedIn, WhatsApp, Slack, X) do not run JavaScript, so
 * fixing the tags at runtime is not enough on its own: a shared project link
 * would still preview as the homepage. This writes a real HTML file per route
 * with the correct tags baked in. Netlify serves a matching static file before
 * it applies the SPA redirect, so these win, and React still hydrates on top.
 */

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')

const template = readFileSync(join(dist, 'index.html'), 'utf8')
const routes = allRoutes()

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** Replace the content/href of one tag matched by an attribute selector. */
function replaceAttr(html, matcher, attr, value) {
  const re = new RegExp(`(<[^>]*${matcher}[^>]*\\s${attr}=")[^"]*(")`, 'i')
  if (!re.test(html)) throw new Error(`SEO: no tag matching ${matcher}`)
  return html.replace(re, `$1${esc(value)}$2`)
}

function projectJsonLd(project) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    url: `${SITE_URL}/projects/${project.id}`,
    dateCreated: project.year,
    creator: { '@type': 'Person', name: 'Talal Jaber', url: SITE_URL },
    keywords: project.technologies.join(', '),
    ...(project.repo ? { codeRepository: project.repo } : {}),
  }
}

let written = 0

for (const route of routes) {
  let html = template

  html = html.replace(/<title>[^<]*<\/title>/i, `<title>${esc(route.title)}</title>`)
  html = replaceAttr(html, 'name="title"', 'content', route.title)
  html = replaceAttr(html, 'name="description"', 'content', route.description)
  html = replaceAttr(html, 'rel="canonical"', 'href', `${SITE_URL}${route.path}`)

  html = replaceAttr(html, 'property="og:title"', 'content', route.title)
  html = replaceAttr(html, 'property="og:description"', 'content', route.description)
  html = replaceAttr(html, 'property="og:url"', 'content', `${SITE_URL}${route.path}`)
  html = replaceAttr(html, 'property="og:image"', 'content', OG_IMAGE)

  html = replaceAttr(html, 'property="twitter:title"', 'content', route.title)
  html = replaceAttr(html, 'property="twitter:description"', 'content', route.description)
  html = replaceAttr(html, 'property="twitter:url"', 'content', `${SITE_URL}${route.path}`)
  html = replaceAttr(html, 'property="twitter:image"', 'content', OG_IMAGE)

  // A project page describes a work, not the site as a whole.
  const project = projects.find((p) => `/projects/${p.id}` === route.path)
  if (project) {
    html = html.replace(
      '</head>',
      `  <script type="application/ld+json">\n${JSON.stringify(projectJsonLd(project), null, 2)}\n    </script>\n  </head>`,
    )
  }

  const out = route.path === '/' ? join(dist, 'index.html') : join(dist, route.path, 'index.html')
  mkdirSync(dirname(out), { recursive: true })
  writeFileSync(out, html)
  written += 1
}

/* ------------------------------------------------------------ sitemap.xml */

const today = new Date().toISOString().slice(0, 10)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.path === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${route.path === '/' ? '1.0' : '0.7'}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`

writeFileSync(join(dist, 'sitemap.xml'), sitemap)

/* ------------------------------------------------------------- robots.txt */

writeFileSync(
  join(dist, 'robots.txt'),
  `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`,
)

console.log(`SEO: ${written} routes prerendered, sitemap.xml + robots.txt written`)
