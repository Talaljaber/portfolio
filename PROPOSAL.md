# Redesign proposal — Interactive Systems Lab

Prepared against the repository at `main` (3f30792) and the two reference images.
**No code has been changed.** This document is for review.

---

## 0. What I found, in one paragraph

The repository is a React 19 / Vite 7 / Tailwind 3 single-page app whose entire UI is a
"digital book": 5,484 lines of source, of which roughly 3,100 lines exist only to make
paper behave like paper — page-turn gestures, spread geometry, fit-to-page scaling, a
1,463-line `book.css`. Underneath that is something genuinely valuable and completely
independent of the book: nine content modules in `src/content/` holding your CV,
transcribed verbatim and explicitly annotated as not-invented. The redesign is therefore
much less risky than it looks. The content survives untouched; the presentation layer is
replaced almost entirely. Current build output is 425 KB of JavaScript and 37 KB of CSS.

---

## 1. Current-state assessment

### Worth preserving

**`src/content/*.js` — all nine files, essentially unchanged.** This is the real asset.
`projects.js`, `experience.js`, `achievements.js`, `skills.js`, `services.js`, `site.js`,
`about.js`, `contact.js`. Every file carries a header comment stating it was transcribed
from the CV and that nothing is invented. Two files need small additive changes (an
optional `image` field on projects for later, a `summary` field for the case-study layout);
nothing needs removing.

**`useMediaQuery` and `useReducedMotionPreference`.** Both are correct, small, and
framework-agnostic. `useReducedMotionPreference` in particular subscribes to live changes
rather than reading once, which is the right behaviour and is exactly what the 3D scene
will need. Keep both as-is.

**The real statistics in `site.js`.** `stats` holds four honest numbers — 9+ freelance
projects, top-100 global innovator, 15+ technologies, 5+ awards. Reference 2 invents
different ones ("3+ Years of Experience", "15+ Projects Completed", "5+ Technologies
Mastered"). Use the real four; they are stronger and they are true.

**The SEO block in `index.html`.** Extensive and well-formed: full Open Graph, Twitter
cards, geographic tags, canonical URL, and three JSON-LD blocks. It needs corrections
(below) but it must not be lost in the rebuild.

**The `DetailSheet` pattern, not its styling.** 300 lines that resolve a `{kind, id}` pair
into a titled overlay for a project, role, service, or achievement. The new design needs
exactly this — a case-study overlay — and the resolver logic transfers directly.

**`editorial.jsx`'s component vocabulary.** `Kicker`, `SectionHeading`, `TermRun`,
`DataList`, `Rule` are the right *primitives*, wrongly dressed. A `Kicker` in a serif book
becomes a mono HUD label in the lab; the API is unchanged. `Ornament` and `Body`'s
drop-cap are book-only and go.

### Should be removed

| File | Lines | Why |
|---|---|---|
| `book.css` | 1,463 | Paper grain, spine shadows, cover boards, foil. Nothing survives the change of medium. |
| `pages.jsx` | 592 | Chapter renderers built around fixed-height, non-scrolling pages. |
| `BookShell.jsx` | 397 | Page-turn orchestration; the new site scrolls. |
| `usePageTurnGesture` | 272 | Horizontal swipe-to-turn. Actively harmful in a vertical-scroll design. |
| `useBookNavigation` | 160 | Page/spread index state machine. No equivalent concept. |
| `ContentsIndex` | 152 | A table of contents is a book affordance; the new site has persistent navigation. |
| `BookNavigation`, `Bookmarks`, `BookSpread`, `BookPage`, `MobilePage`, `PageSlideLayer`, `FitToPage`, `pageSequence`, `BookContext` | ~380 | All book geometry and chrome. |

That is roughly 3,400 lines deleted. This is the "be willing to remove large parts of the
current UI" case, and it applies cleanly.

**`FitToPage` deserves a specific note.** It binary-searches a scale factor to shrink
content until it fits a fixed-height page. It is clever, and it is the single strongest
argument for abandoning the book: content that must be mechanically shrunk to fit is
content the medium is fighting. Vertical scroll removes the problem rather than solving it.

### Should be refactored

**`ProjectDetail.jsx` (`/projects/:id`).** Keep the route and its URL — it is the only
deep-linkable content in the site and it is good for SEO. Restyle it into the lab language
and expand it into the fuller case study the prompt asks for.

**`App.jsx` routing.** The five legacy redirects (`/about`, `/projects`, `/services`,
`/achievements`, `/contact` → hash on `/`) become *more* correct in a scrolling design,
not less: the hashes will finally correspond to real scroll anchors. Keep them.

**`tailwind.config.js`.** Structure is right — semantic names mapped to CSS custom
properties. The values change (warm paper palette → graphite/violet) and the serif families
go, but the pattern stays.

### Bugs and inaccuracies found during inspection

These are pre-existing and worth fixing during the rebuild:

1. **Five referenced assets do not exist.** `index.html` links `/favicon-32x32.png`,
   `/favicon-16x16.png`, `/apple-touch-icon.png`, and `/browserconfig.xml`; the JSON-LD
   references `/images/avatar.jpg`. `public/` contains only `portfolio.svg`,
   `site.webmanifest`, and `images/og-image.png`. All five are 404s today.
2. **`site.js` has the wrong OG path.** `seo.image` is `/og-image.png`; the file is at
   `/images/og-image.png`.
3. **The JSON-LD `knowsAbout` array lists MongoDB and GraphQL.** Neither appears anywhere
   in `skills.js`. Per your own no-invention rule these should come out.
4. **`theme-color` is `#16120e`** — the book's warm brown-black. Must become graphite.
5. **`WebSite` JSON-LD has `dateModified: 2025-01-01`**, which is stale and understates
   how current the site is.
6. **`about.js` `values` and `journeyParagraphs`** read as generic filler ("Clean Code",
   "User-Centric", "Innovation", "Results-Driven") next to the specificity of the rest of
   your content. I would not carry `values` into the new About area. Flagging rather than
   deciding — see question Q3.

### Risks

**Architectural.** The main one is coupling the DOM and the WebGL scene through React
state. If scroll progress flows through `useState`, every scroll frame re-renders the
component tree and the site will stutter badly. Mitigation is in §6: scroll progress lives
in a `MotionValue` and a ref, never in state, and the 3D scene reads it inside `useFrame`.

**UX.** Two. First, the reference's beauty is concentrated in the hero, and there is a real
risk the remaining six areas feel like a conventional portfolio bolted onto a spectacular
opening — which is precisely what your "one continuous environment" requirement exists to
prevent. Second, without project imagery the projects area must carry its weight
typographically or it will read as thin.

**Performance.** Three.js is the largest dependency this project will have ever had
(§7). A mid-range Android phone rendering a glass-and-bloom core at devicePixelRatio 3
will drop frames and drain battery. The mobile strategy in §4 is not a nice-to-have.

---

## 2. Proposed design system

### Colour

Sampled from the references, expressed as CSS custom properties on `:root`, consumed
through Tailwind exactly as the current config does.

| Token | Value | Role |
|---|---|---|
| `--bg` | `#05060a` | Page base, near-black with a blue bias |
| `--bg-raised` | `#0a0d16` | Depth layers, subtle panels |
| `--surface` | `rgba(18,22,36,0.55)` | Glass fills, always translucent |
| `--ink` | `#e8ecf7` | Primary text |
| `--text` | `#a8b2c9` | Body text |
| `--muted` | `#6b7690` | Secondary and captions |
| `--faint` | `#3a4258` | Tertiary, disabled |
| `--line` | `rgba(120,140,190,0.14)` | Hairline borders |
| `--line-strong` | `rgba(140,160,210,0.28)` | Emphasised borders |
| `--accent` | `#6366f1` | Primary violet — buttons, links, active states |
| `--accent-bright` | `#818cf8` | Hover, highlights |
| `--accent-glow` | `#a5b4fc` | Light emission, core illumination |
| `--cyan` | `#22d3ee` | Sparingly — live indicators only |

One accent hue with three intensities, plus a single cyan reserved for "this is live"
signals (the Online dot, availability). Restricting cyan to one meaning is what keeps this
from reading as a gaming template.

### Typography

Inter for everything readable, JetBrains Mono for everything technical, per reference 2.
EB Garamond is dropped, and with it the serif entries in `tailwind.config.js`.

- Display: Inter, 600, tight tracking (`-0.03em`), `clamp(2.5rem, 6vw, 5rem)`
- Headings: Inter, 500–600, `-0.02em`
- Body: Inter, 400, `1.65` line-height, capped at `65ch`
- HUD labels: JetBrains Mono, 400, `0.7rem`, uppercase, `0.18em` tracking
- Numerals and data: JetBrains Mono, tabular figures

Both load from Google Fonts, replacing the current two-family request — no net increase in
font payload.

### Spacing, borders, grid

An 8px base scale. Vertical rhythm is deliberately generous — areas separated by
`clamp(8rem, 15vh, 14rem)` — because in a continuous environment the *space* is what
separates content, since backgrounds no longer can.

Borders are 1px and low-opacity by default. **Radius is 0 to 2px, never more.** Rounded
corners are the fastest way to lose the engineered feeling, and the references have none.
Corner brackets — short L-shaped rules at panel corners rather than a closed rectangle —
carry the technical language without drawing boxes, which matters because closed
rectangles are exactly what the continuity requirement forbids.

A 12-column grid at 1440px, `clamp`-based gutters, with the numbered rail from reference 2
occupying a fixed 48px left margin at all sizes above 1024px.

### Light and glow

Glow is emitted by the 3D scene, not painted onto DOM elements. DOM glow is limited to a
single subtle `box-shadow` on primary buttons and focus rings. No text-shadow, no filter
blur on text. This is the main discipline separating "premium technical" from "cheap neon".

### Background

One fixed full-viewport layer behind all content, composed of three stacked pieces that
never change colour, only intensity: a static CSS radial gradient (violet bloom top-right,
falling to near-black bottom-left); a perspective grid drawn once to a canvas and
translated with scroll; and the WebGL canvas itself. Content scrolls over this. There is
no per-section background at any point in the page — that is the mechanical guarantee
behind §3.

---

## 3. Continuous-page concept

The requirement is that the site read as one environment. Five mechanisms enforce it:

**One background, zero section backgrounds.** Every content area is transparent. The
fixed background layer described above is the only thing painting the page. This is
enforced structurally: no `<section>` gets a `background` property. If it never exists, it
can never drift back in.

**The numbered rail as a continuity thread.** Reference 2 shows a numbered rail in every
panel, and it is the single best idea in the concept. One fixed element, pinned to the left
edge for the entire scroll, its active index tracking position. It is physically the same
DOM node from first pixel to last, so the page cannot help but feel singular.

**Overlapping transitions.** Areas overlap in scroll space rather than abutting. As one
area's content fades and rises out at 90% progress, the next is already entering at 10%.
There is no scroll position at which exactly one area is visible and nothing else is
happening, which is what makes stacked sections feel stacked.

**The core as connective tissue.** The 3D object is present throughout at varying prominence
and never disappears without cause. Because it is one continuously-rendered object whose
transform is driven by a single scroll value, it is literally impossible for it to feel
discontinuous. Full plan in §4.

**Lighting evolution instead of background change.** Atmosphere changes by moving light,
not by swapping colour. The scene's key light drifts from upper-right (hero) through
overhead (skills) to low and frontal (contact), and ambient intensity falls roughly 30%
across the page. The palette never changes; the illumination does. This gives the sense of
descending deeper into a facility while the environment stays recognisably one place.

**Readability.** All text sits in DOM above the canvas, never in WebGL. Where text overlaps
the core, a wide low-opacity radial scrim sits between them. Contrast targets AA at minimum
for body text, and the site is fully readable with WebGL disabled.

---

## 4. The 3D systems core

### Form

> **REVISED 2026-08-02** after design review. The first build read as an atom or orbital
> sphere, which was rejected. The object is now a **tall cylindrical machine** on a
> grounded base — vertical architecture, not radial.

Procedurally built, not a loaded model. Roughly 600 lines of R3F across eight parts:

1. **Core cube** — a small box on a custom fresnel shader, counter-rotating hexagonal
   containment cage, wrapped in two nested additive haloes that stand in for a bloom pass
2. **Glass column** — nested open-ended cylinders, `MeshPhysicalMaterial` with transmission,
   plus a thin emissive light shaft up the axis
3. **Ring deck** — seven metallic `TorusGeometry` rings stacked along the column's height,
   each spinning about the vertical axis at its own rate and direction, with segment blocks
   around each rim
4. **Struts** — six structural ribs running the column's height
5. **Platforms** — a grounded base plate and a mirrored top cap, each with concentric
   metallic rims and an emissive glow ring
6. **Nodes** — up to 26 spheres on horizontal orbital tracks, one `InstancedMesh`
7. **Particles** — up to 160 points drifting upward through the column, recycled at the top
8. **Connectors** — radial `LineSegments` spokes at intervals

The DOM HUD panels around it (`CoreHUD`) show **only real values** — scroll depth, the
active stage, the render tier, live rotation, and Amman's actual coordinates. The mockup's
figures ("8.42 TB/s", "PROCESSING 98.7%") are invented, and the no-invention rule applies
to decoration as much as to content.

**Why procedural rather than a GLB.** The object must transform between distinctly
different states — a layered cylinder, a ring-sphere, a stack of separated discs — and
those are parametric changes to procedural geometry but would require either morph targets
or several separate meshes in an authored model. Procedural also costs a few KB against a
few MB, needs no Blender, and lets you tune anything by changing a number. **No external
asset tool is required for this project.** That is a deliberate recommendation, not a
limitation.

### Motion

Idle: continuous slow rotation (~0.1 rad/s), independent per ring; vertical float on a
6-second sine; core emissive pulse on a 4-second sine; nodes orbiting at varied radii.

Cursor: the whole assembly tilts up to ~8° toward the pointer, damped with `lerp` at
roughly 0.05 per frame so it trails the cursor rather than snapping. Disabled on touch.

Scroll: one normalised 0–1 value drives camera position, core scale, ring separation, and
node dispersal. Six keyframed states, interpolated — see the storyboard in §5.

Reduced motion: all idle animation stops, the core renders in its hero state, cursor
response is disabled, and scroll only cross-fades. The scene still renders — it is not
blanked — it simply holds still.

### Materials and lighting

Physical materials on the chambers, a custom `ShaderMaterial` on the core (fresnel rim plus
animated noise), standard material on the rings, basic on the instanced nodes. Three lights
only: a violet key, a dim cyan fill, and an ambient. No environment map — the reflections
that matter come from the emissive core itself.

**No postprocessing in the initial build.** Bloom is the obvious temptation and the single
biggest cost on mobile GPUs. The emissive-material glow is sufficient; if bloom proves
necessary after the site is running, it can be added desktop-only behind a capability check.

### Mobile

Below 1024px: node count drops from 24 to 8, connectors are removed entirely, chambers
reduce from two to one, transmission is disabled (it is the most expensive material
feature), `dpr` is capped at 1.5, and the core sits behind the hero copy at reduced opacity
rather than beside it. Below a measured performance floor — or when WebGL is unavailable —
the canvas is replaced by a static CSS gradient orb, and nothing else about the page
changes.

### Performance strategy

One canvas for the whole page, mounted once, never unmounted. `frameloop="demand"` is *not*
suitable (there is constant idle animation), so instead the loop pauses via
`IntersectionObserver` when the canvas is fully offscreen and on `visibilitychange`.
`dpr={[1, 2]}` on desktop, `[1, 1.5]` on mobile. Geometries and materials created once and
memoised. The canvas is lazy-mounted after first paint so it never blocks LCP.

---

## 5. Page storyboard

| # | Area | Content | Layout | Core state | Motion | Into next |
|---|---|---|---|---|---|---|
| 1 | Hero | Label, name, headline, sub, 2 CTAs, 4 capability pills, location/availability/status | Copy left 6 cols, core right | Assembled, centred right, rings rotating, camera at z=8 | Staggered text reveal, 60ms apart | Core drifts right and back; copy rises and fades |
| 2 | Selected work | 5 featured projects — DineLink, VibeSafe, MedModelle, OneSalt, HydroSense | One dominant, then 4 smaller; archive link | Recedes to background, dims to ~40% | Each entry rises on enter; hover lifts a hairline | Core advances and begins separating |
| 3 | Skills | 3 tiers, 10 groups from `skills.js` | Core centre, skill columns flanking with connector lines | **Opens into stacked horizontal discs** — one per tier, separating vertically | Connector lines draw on scroll; active group brightens its disc | Discs reassemble into a vertical column |
| 4 | Experience | 7 roles + education | Horizontal timeline, year markers | Compresses to a vertical spine behind the timeline | Cards enter along the timeline axis | Spine contracts back to a sphere |
| 5 | About | `fullBio`, `secondBio`, the 4 real stats, CV download | Copy left, particle figure right | Sheds nodes that reform into the figure | Particle drift; numerals count up once | Particles return to orbit |
| 6 | Achievements | 4 featured + press links | Tiles joined by constellation lines | Nodes disperse wide, connectors bright | Lines draw between tiles on enter | Nodes converge |
| 7 | Contact | 3 routes, socials, availability | Centred, core behind | **Reassembles fully, brightest state**, camera pushes in | Final reveal, pulse settles | — |

The skills area (3) is the most valuable and most novel moment — it is where the core stops
being decoration and starts explaining something. The About particle figure (5) is the most
expensive relative to its payoff; it is the first thing I would cut under time pressure.

---

## 6. Component architecture

```
src/
  content/          UNCHANGED — nine files, the source of truth
  hooks/
    useMediaQuery.js              KEEP as-is
    useReducedMotionPreference.js KEEP as-is
    useScrollProgress.js          NEW — one MotionValue + ref, page-wide
    useDeviceCapability.js        NEW — tier detection, decides 3D fidelity
  three/
    SystemsCore.jsx     NEW — the object, composed of the five parts below
    Core.jsx  Rings.jsx  Nodes.jsx  Chambers.jsx  Connectors.jsx
    Scene.jsx           NEW — canvas, lights, camera rig
    coreStates.js       NEW — the six keyframes from §5, plain data
  components/
    layout/    Shell.jsx  Nav.jsx  ProgressRail.jsx  Background.jsx
    ui/        Kicker.jsx  Panel.jsx  Button.jsx  DataList.jsx  TermRun.jsx
    sections/  Hero  Work  Skills  Experience  About  Achievements  Contact
    CaseStudySheet.jsx  REFACTORED from DetailSheet — resolvers kept
  routes/
    Home.jsx            NEW — composes the seven sections
    ProjectDetail.jsx   REFACTORED — same URL, new styling
```

**Animation ownership, explicitly.** Framer Motion owns every DOM animation — reveals, nav
states, overlays — and it is already a dependency at v12, whose `useScroll`/`useTransform`
are sufficient for all of it. R3F's `useFrame` owns everything inside the canvas. The
single bridge between them is `useScrollProgress`, which writes to both a `MotionValue`
(read by DOM) and a plain ref (read by `useFrame`). **Scroll progress never enters React
state, and the two systems never animate the same property.** That rule is what prevents
the class of jank this architecture is otherwise prone to.

**Routing.** `/` renders `Home`; `/projects/:id` keeps its own URL; the five legacy
redirects stay and finally point at real scroll anchors. Each section carries its `id`, so
`/#projects` and friends resolve by native anchor scrolling.

---

## 7. Dependencies

**Keep:** `react`, `react-dom` (19.1.1), `react-router-dom` (routing + deep links),
`framer-motion` (already present, owns all DOM motion), `clsx`, `tailwindcss`, `vite`.

**Add — two packages:**

| Package | ~gzip | Responsibility | Why nothing existing covers it |
|---|---|---|---|
| `three` | ~150 KB | WebGL rendering, geometry, materials | Nothing in the project touches WebGL |
| `@react-three/fiber` | ~15 KB | React reconciler for three | Manual three lifecycle in React is error-prone; this is the smallest correct bridge |

**Add conditionally:** `@react-three/drei` *only* if `shaderMaterial` and `Instances` prove
worth it — it is tree-shakeable, so cost is per-import, but it is easy to lean on
accidentally. Decide during phase 5, not now.

**Explicitly not adding:**

- **GSAP + ScrollTrigger** (~50 KB) — Framer Motion 12 already does this, and running two
  animation libraries is exactly the conflict the prompt warns about.
- **`@react-three/postprocessing`** (~40 KB) — see §4; bloom is the main mobile risk.
- **Theatre.js** — a studio-based authoring tool for a six-keyframe sequence that fits in
  one data file. Large, and solves a problem this project doesn't have.
- **Spline** — hosted-runtime dependency, larger payload, and gives away the per-part
  animation control this design needs.
- **Lenis** (~3 KB) — genuinely nice, genuinely optional. Revisit in phase 7 only if native
  scroll feels insufficient; it is small enough to add late without disruption.

**Remove:** `lucide-react` is currently a full dependency for a handful of icons. Keep it
if the new design uses 10+ icons; otherwise inline SVGs and drop it. Decide in phase 3.

**Net effect:** roughly +165 KB gzipped, against a current 425 KB uncompressed bundle. This
is a real cost and the honest justification is that a WebGL centrepiece is the entire point
of the brief. It is bounded by lazy-mounting the canvas after first paint, so it does not
affect LCP.

---

## 8. Implementation phases

> **STATUS 2026-08-02.** Phases 1–6 are built and verified: the static continuous page,
> DOM motion, the procedural systems core, and its scroll choreography. Lint clean,
> production build passing, core rendering in a real browser. Phases 7–8 (mobile fidelity
> tuning on real devices, accessibility audit, OG image) remain.
>
> **Correction to §7's estimate.** three + fiber added ~246 KB gzipped, not the ~165 KB
> predicted. The main bundle is held at 128 KB gzipped by lazy-loading `Scene` into its own
> 245 KB chunk, so the page paints and is readable before any 3D code is fetched — but the
> total transfer for a full desktop visit is meaningfully larger than proposed.

Each phase ends with a deployable site.

1. **Scaffold and preserve.** Add `PROPOSAL.md` decisions to the repo; create the new
   directory structure; leave the book running. No deletions. *Site unchanged.*
2. **Design system.** New CSS custom properties, Tailwind config, fonts swapped to
   Inter + JetBrains Mono, `theme-color` corrected, the five missing favicon assets
   generated. *Site still the book, now on the new palette.*
3. **Static continuous page.** Build all seven sections with real content from
   `src/content/`, fully responsive, zero motion, zero WebGL. Switch `/` to `Home`.
   Delete the book. **This is the highest-value phase — at the end of it the portfolio is
   already better than what exists, with no 3D risk taken.**
4. **DOM motion.** Framer Motion reveals, nav active states, the progress rail,
   `CaseStudySheet`, `prefers-reduced-motion` throughout.
5. **The core.** Canvas, lights, the five geometry parts, idle animation, cursor response.
   Desktop only initially.
6. **Scroll choreography.** `useScrollProgress`, the six keyframes, the skills-layer
   opening, lighting evolution.
7. **Responsive and performance.** Capability tiers, mobile fidelity reduction, the
   non-WebGL fallback, offscreen pausing, dpr caps, Lighthouse pass.
8. **Accessibility, SEO, polish.** Keyboard navigation, focus management, contrast audit,
   JSON-LD corrections, a regenerated OG image, cross-browser and real-device testing.

Phases 1–4 carry almost no risk. Phase 3 is the point of no return for the book, and
deliberately lands before any 3D work so the site is never in a broken intermediate state.

---

## 9. Risks and trade-offs

**Honest cost assessment.** The 3D core is roughly 40% of the total effort for roughly 20%
of the recruiter value. It is worth building because it is the brief, but phases 1–4 deliver
most of the practical benefit, and if the project stalls after phase 4 you still have a
significantly better portfolio than today.

**What will perform worst.** Transmission and refraction on the chambers. They are the
single most expensive material feature in three.js and the first thing disabled on mobile.
The reference's glass depth is achievable on desktop and is not fully achievable on a
mid-range phone. Reference 1's rendering quality is a raytraced still; a real-time
60fps browser scene will not match it exactly, and the design should not be judged against
it pixel-for-pixel.

**What should be simplified.** The About particle figure — highest cost-to-value ratio in
the storyboard. The experience timeline is also at risk of becoming a generic CV timeline
in disguise; if it does, a node-graph would serve better.

**What should not be copied from the references.** The panel divisions in reference 2 (they
defeat the entire continuity requirement); the device mockup beside the lead project (no
imagery for now); and every word of copy in both images, for the reasons in §0 and the
prompt — particularly the MedModelle mislabel, which describes a project you did not build.

**No external asset tooling is needed.** No Blender, no glTF pipeline, no textures. Worth
stating plainly since the prompt asks about it.

---

## 10. Questions needing your decision

> **DECIDED 2026-08-02.** Q1 → own route at `/services`. Q2 → node-graph on desktop,
> vertical list on mobile. Q3 → cut the four values. Q4 → assumed unchanged
> (`talalportfolio.netlify.app`); say so if that is wrong. Build proceeding from phase 1.


**Q1 — Services.** `services.js` is 340 lines with pricing (from 350–900 JD), timelines,
and deliverables for six offerings. The prompt's seven-area hierarchy has no place for it,
and pricing sits awkwardly beside a recruiter-focused portfolio. Drop it, give it its own
route at `/services`, or fold it into contact? *My recommendation: its own route, linked
from contact — it is valuable for freelance leads but dilutes the engineering narrative on
the main page.*

**Q2 — Experience timeline.** Reference 2 shows a horizontal timeline, but your prompt
cautions against generic résumé timelines. Horizontal timelines are also the weakest
pattern on mobile. Keep it horizontal, go vertical, or use a node-graph tied to the core's
connector language? *My recommendation: node-graph on desktop, vertical list on mobile.*

**Q3 — `about.js` values.** The four values ("Clean Code", "User-Centric", "Innovation",
"Results-Driven") are noticeably more generic than everything else in your content, which
is specific and verifiable. Keep them, cut them, or rewrite them? *My recommendation: cut.
The About area is stronger with `fullBio`, `secondBio`, and the four real stats.*

**Q4 — Deployment.** Any change to the site once it stops looking like a book, or does it
keep deploying to `talalportfolio.netlify.app` at the same URL? Affects canonical tags and
whether the OG image needs regenerating against a new domain.

---

*End of proposal. No code has been modified. Awaiting approval before phase 1.*
