You are working directly inside my existing portfolio codebase.

I have attached two reference images (delivered alongside this prompt in the same message) that represent the visual direction I want. Treat them as the primary visual reference for the redesign, but do not copy them pixel-for-pixel. Adapt their design language into an original portfolio experience for Talal Jaber.

* **Reference 1 — hero close-up.** Defines the intended visual quality and material language at full fidelity: lighting, typography scale, glass and metal treatment, HUD detailing.
* **Reference 2 — full-page concept.** A low-fidelity overview of all seven areas, showing how one continuous environment carries from the hero down to contact. Use it for composition, section order, and layout intent — not for its rendering quality or its copy.

**Critical: the copy inside both mockups is placeholder text and much of it is factually wrong about me.** Reference 2 in particular invents a project ("CarCare"), invents metrics ("3+ Years of Experience", "15+ Projects Completed", "5+ Technologies Mastered"), invents an achievement ("Met His Royal Highness Prince Hussein"), and misdescribes a real project — it labels MedModelle an "AI-powered medical learning platform with intelligent content generation and adaptive paths", when the repository correctly records it as an e-commerce website built for a Jordan-based medical models client. Take **layout and visual language** from the mockups and **every word and number** from `src/content/*.js`. If a mockup element has no truthful content to fill it, change the element rather than inventing content for it.

Context you should verify rather than assume: the current site is a single-page "digital book" experience (React + Vite + Tailwind + Framer Motion), with all copy and project data living in `src/content/*.js`, and it deploys to Netlify. The book concept itself is up for replacement; the content is not.

## Current task: review and design proposal only

Do not modify the code yet.

First inspect the complete repository, including:

* Current architecture and dependencies
* Existing components
* Routes
* Content and project data
* Current animations and interactions
* Responsive behavior
* Accessibility and reduced-motion support
* Reusable assets and styles
* SEO setup (meta tags, structured data, social previews) and how it must survive the redesign
* Anything that can be preserved during the redesign

Then produce a detailed redesign and implementation proposal for review.

Wait for approval before making any code changes.

---

# Design direction

The new portfolio concept is:

## Interactive Systems Lab

The portfolio should feel like a premium, dark, technical digital laboratory created for a software engineer working across software engineering, AI, cloud systems, and scalable products.

Reference 1 defines the intended visual quality:

* Dark graphite and near-black environment
* Blue-violet illumination
* Premium technical interface
* Large clean typography
* Thin lines and precise borders
* Subtle HUD and data visualization details
* Glass, metal, and holographic materials
* A moving real-time 3D systems core
* Controlled cinematic lighting
* High visual depth
* Elegant engineering aesthetic

The final design should feel sophisticated and technically credible, not like a generic gaming, cyberpunk, or sci-fi template.

Avoid excessive neon, random terminal text, meaningless charts, fake code, visual clutter, and cheap glowing effects.

---

# One continuous website environment

The most important requirement is that the website must feel like one continuous experience.

It should not visually appear as several independent sections stacked beneath each other.

Avoid:

* Different background colors for every section
* Large gaps separating sections
* Repeated section containers
* Obvious rectangular section blocks
* A disconnected hero followed by a conventional portfolio
* Every section having its own isolated visual theme
* Card grids everywhere

The website can still use semantic sections internally for accessibility and navigation, but visually they must all exist inside the same digital laboratory environment.

The user should feel like they are moving deeper through one connected system while scrolling.

Use one persistent visual language throughout:

* Continuous dark background
* Perspective grid or spatial environment
* Ambient particles
* Blueprint lines
* Technical markers
* Light movement
* Shared 3D elements
* Connected paths and nodes
* Subtle depth layers
* Consistent typography
* Consistent border and interface language

Transitions between content areas should happen through movement, scale, lighting, camera position, object transformation, and content choreography—not by abruptly changing section backgrounds.

---

# Persistent 3D systems core

The glowing object in the references must become a real interactive 3D object, not a static image. Note that it is not a fixed shape across the two mockups: it reads as a layered cylindrical core in reference 1 and as a sphere of orbital rings in the hero of reference 2, then opens into stacked discs at the skills area. Design one object whose form can legitimately transform between those states rather than picking one and freezing it.

The object represents a central systems core or laboratory engine.

It should contain some combination of:

* A glowing central energy core
* Layered transparent chambers
* Metallic structures
* Rotating rings
* Orbiting nodes
* Fine connector lines
* Floating modules
* Holographic layers
* Controlled particle movement
* Reflections and refractions
* Pulsing internal light
* Different mechanical parts moving at different speeds

The object should feel engineered and purposeful.

Its motion should include:

* Slow idle rotation
* Multiple rings rotating independently
* Orbiting nodes or particles
* Subtle vertical floating
* A gentle core pulse
* Slight response to cursor movement
* Smooth orientation and position changes while scrolling
* Reduced or disabled movement when reduced-motion is enabled

The systems core should not exist only in the hero and then disappear without explanation.

It should help visually connect the whole portfolio.

As the user scrolls, it could:

* Begin as a complete systems core in the hero
* Rotate or move deeper into the scene
* Separate into modules near the projects area
* Highlight different layers while presenting skills
* Display more structured node connections around experience
* Stabilize or reassemble near the contact area

These transformations should remain subtle and premium. Do not create a game or force the user to navigate in 3D.

The content must always remain readable and usable independently of the 3D scene.

---

# Hero direction

Use reference 1 as the main composition reference, and the hero panel of reference 2 as a cross-check.

The desktop hero should approximately contain:

### Navigation

A minimal navigation containing:

* Work
* About
* Skills
* Experience
* Contact

The navigation may be fixed or floating. Its active state should respond to scroll position.

### Main introduction

Small technical label:

`SOFTWARE ENGINEER / AI SYSTEMS`

Name:

`Talal Jaber`

Main headline:

`Building intelligent digital products.`

Supporting copy:

`Software engineering, AI systems, and scalable web experiences.`

Primary calls to action:

* View Projects
* Contact Me

Capability labels:

* Full-Stack
* AI
* Cloud
* Systems

Optional small system information:

* Location: Amman, Jordan
* Availability: Open to Work
* Status: Online

Do not blindly include every interface element from the reference. Only include details that improve the composition and support the personal brand.

### 3D composition

The systems core should dominate the right portion on desktop while remaining visually balanced with the text.

The core should appear embedded inside the same environment as the interface rather than placed inside a visible rectangular canvas.

---

# Content hierarchy

The redesign should prioritize clarity and recruiter usability despite the immersive presentation.

Suggested content sequence:

1. Introduction
2. Selected projects
3. About and approach
4. Technical capabilities
5. Experience and leadership
6. Achievements and recognition
7. Contact

These should flow continuously without looking like isolated page sections.

## Layout intent per area, from reference 2

Reference 2 is divided into panels only so it can show the whole page at once. The real site must not have those divisions. Treat each panel as composition guidance:

* **Hero** — full-bleed, systems core centred-right, numbered rail down the left edge acting as a scroll-position indicator, capability pills and a location/availability/status strip beneath the calls to action.
* **Selected work** — one dominant featured project, then a row of smaller secondary entries, ending in a link to the full archive.
* **Skills** — the core opens into stacked horizontal layers, with fine connector lines running out to grouped skill columns. This is the clearest expression of "the skills area relates to the internal layers of the core," and it is worth building properly.
* **Experience** — a horizontal timeline with year markers and cards along it. Note the prompt's earlier caution about generic résumé timelines; if you keep this, make it feel like a system diagram rather than a CV.
* **About** — a portrait-scale figure rendered from particles or wireframe, set against the copy. Do not use a photograph.
* **Achievements** — tiles connected by constellation lines, reinforcing the node-and-connector language used elsewhere.
* **Contact** — closing composition with the core stabilised, contact routes, and a clear primary action.

The numbered left rail appears in every panel of reference 2. That is a good device for continuity: one persistent element that proves the whole page is a single environment. Consider carrying it throughout.

## Typography

Reference 2 specifies Inter for primary text and JetBrains Mono for technical and HUD detail. Adopt that pairing. The current site loads EB Garamond to serve the book concept; drop it, since a serif works against this direction.

## Selected projects

Projects should be the strongest part of the website after the hero.

Prioritize the strongest current projects found in the repository. The entries currently flagged `featured: true` in `src/content/projects.js` are DineLink, VibeSafe, MedModelle, OneSalt, and HydroSense — treat that flag as the starting point, and tell me if you think the ordering or the selection should change.

Note that AgentX is an employer in `src/content/experience.js`, not a project. It belongs in the experience area, not in selected projects.

Do not assume details that are not present in the repository.

Each selected project should feel like a short case study rather than a small generic card.

Present:

* Project name
* Problem
* What I built
* My role
* Key technologies
* Important result or capability
* Link to more detail

**Do not use project screenshots or imagery.** The repository has no project images, and I am not supplying any for now. Reference 2 shows a device mockup beside the lead project — ignore that element. Carry the visual weight typographically instead: scale, numbering, rules, technical framing, and the 3D core's own modules. Design it so imagery can be added later without a rewrite (leave the data shape and layout able to accept an optional visual), but ship it image-free.

Use large layouts and smooth transitions. Avoid presenting all important projects as equal cards in a standard grid. Reference 2's approach — one dominant featured project above a row of smaller secondary ones — is a good starting point.

Secondary projects may appear later in a smaller archive.

## Skills

Do not create a wall of technology logos.

Group skills meaningfully, based on the actual repository content:

* Software engineering fundamentals
* Frontend and backend
* AI and machine learning
* Cloud and deployment
* Architecture, systems, and tooling

The skills area could visually relate to internal layers or modules of the systems core.

## Experience and recognition

Present experience, leadership, startup work, awards, university representation, and important recognitions with clear hierarchy.

Avoid a generic résumé timeline if a more integrated technical visual system would work better.

---

# Motion and interaction principles

Motion should support hierarchy and continuity.

Use motion for:

* Text reveals
* Navigation states
* Project transitions
* Parallax depth
* Background movement
* 3D object transformation
* Cursor response
* Technical indicators
* Smooth content entrances

Do not animate every element.

Avoid:

* Excessive bouncing
* Long loading screens
* Forced intro sequences
* Scroll hijacking that makes navigation difficult
* Overly slow transitions
* Motion that delays access to content
* Custom cursors that reduce usability
* Large effects on every hover
* Constant strong bloom or flashing

Scrolling should remain intuitive.

Smooth scrolling may be used only if it remains responsive and does not damage accessibility or navigation.

---

# Responsive strategy

The mobile experience must be intentionally designed, not just a scaled-down desktop version.

On mobile:

* Content readability takes priority
* The 3D scene may be simplified
* Expensive effects should be reduced
* The systems core can appear behind or above the introduction
* Complex HUD labels may be removed
* Cursor-only interactions must have alternatives
* Touch scrolling must remain natural
* The page must not require landscape orientation
* Project content must remain easy to access
* Rendering should adapt to device capability

Consider using a lightweight fallback for weak devices if necessary.

---

# Performance expectations

The portfolio must remain practical and deployable.

Plan for:

* One primary WebGL canvas where possible
* Lazy loading
* Compressed models and textures
* Adaptive rendering quality
* Limited device pixel ratio
* Pausing unnecessary animations when offscreen
* Avoiding excessive post-processing
* Mobile fallbacks
* Reduced-motion support
* Proper cleanup of animation timelines and event listeners
* No unnecessary large dependencies
* Good Lighthouse performance where realistically possible

Do not sacrifice basic usability for visual effects.

---

# Technology decisions

You may add, remove, or replace libraries when justified.

Choose the tools based on the existing codebase and the required result.

Possible tools include, but are not limited to:

* Three.js
* React Three Fiber
* Drei
* GSAP
* ScrollTrigger
* Lenis
* React Three Postprocessing
* Theatre.js
* Spline
* glTF or GLB assets
* Custom shaders

Do not add libraries merely because they are listed here.

For each proposed dependency, explain:

* Why it is needed
* What responsibility it owns
* Whether an existing dependency already solves the problem
* Its effect on bundle size and performance
* Whether it should be introduced immediately or later

Clearly define ownership of animation responsibilities so multiple animation libraries do not conflict.

---

# What your review must include

Before editing code, provide:

## 1. Current-state assessment

Explain:

* What is worth preserving
* What should be removed
* What should be refactored
* What can be reused
* Main architectural risks
* Main UX risks
* Main performance risks

## 2. Proposed design system

Define:

* Color palette
* Typography direction
* Spacing principles
* Border and radius style
* Grid and layout system
* Lighting and glow rules
* Background treatment
* HUD and technical detail rules
* Button and navigation styling
* Project presentation style

## 3. Continuous-page concept

Explain exactly how the site will feel like one continuous environment.

Describe:

* Background behavior
* Scroll progression
* Transitions between content areas
* How the 3D object remains connected to the page
* How lighting and atmosphere evolve
* How content remains readable

## 4. 3D systems core plan

Describe:

* What the object looks like
* Whether it will be procedurally built or use a 3D model
* Its moving parts
* Materials
* Lighting
* Interactions
* Scroll states
* Mobile version
* Performance strategy
* Asset creation requirements

## 5. Page storyboard

Describe the visual experience from the first screen to the contact area.

For every stage include:

* Content shown
* Layout
* Background state
* 3D object state
* Motion behavior
* Transition into the next stage

## 6. Component architecture

Propose a clean component structure based on the repository you inspected.

Identify:

* Components to preserve
* Components to remove
* Components to refactor
* New components to introduce
* Shared layout components
* 3D scene architecture
* Animation coordination approach
* Content/data architecture — keep `src/content/*.js` as the single source of truth for copy and project data unless you explicitly propose and justify a migration
* Routing and URL strategy — what happens to the existing routes and deep links, and how anchors/URLs will map onto the continuous single-page experience

Do not create arbitrary abstractions.

## 7. Dependency proposal

List:

* Dependencies to keep
* Dependencies to add
* Dependencies to remove
* Reason for each decision

## 8. Implementation phases

Divide the work into safe phases.

For example:

1. Preserve content and remove obsolete experience architecture
2. Establish the design system and continuous layout
3. Build the static responsive portfolio
4. Add interface motion
5. Add the 3D systems core
6. Connect the core to scroll states
7. Optimize responsive behavior and performance
8. Accessibility, testing, and polish

Each phase should leave the website in a functional state.

## 9. Risks and tradeoffs

Be honest about:

* What may be too expensive
* What may perform poorly
* What should be simplified
* What may require Blender or another external asset tool
* What cannot be perfectly reproduced using only browser geometry
* What aspects of the reference should not be copied

## 10. Questions requiring my decision

Ask only questions that materially affect the design or implementation.

Do not ask about information that can be discovered from the repository.

---

# Deliverable format

Write the full proposal to a single markdown file named `PROPOSAL.md` at the repository root, then summarize its key decisions and open questions in your reply and end your turn. Making that one file is the only permitted write during this review.

---

# Important constraints

* Do not modify code during this review.
* Do not start implementation until I approve the proposal.
* Do not migrate frameworks without a strong technical reason.
* Do not discard existing portfolio content.
* Do not copy the reference images exactly.
* Do not use either reference image itself as the website background.
* Do not reproduce the panel divisions in reference 2 as real section boundaries. They exist only so the mockup can show the whole page in one frame, and reproducing them would defeat the continuous-environment requirement.
* Do not use any copy, statistic, project name, or achievement that appears in a mockup but not in the repository.
* Do not replace the 3D object with a video or static image.
* Do not make the entire website dependent on WebGL.
* Do not sacrifice mobile usability or accessibility.
* Do not regress SEO: keep meta tags, structured data, and social previews working, and keep the site crawlable without JavaScript-rendered 3D.
* Do not break the Netlify deployment (`netlify.toml` must remain valid for the final build).
* Do not introduce unnecessary dependencies.
* Do not invent achievements, project results, technologies, or experience.
* Do not keep the current concept merely because it already exists.
* Be willing to remove large parts of the current UI when they conflict with the new direction.

The final proposal should be specific to this repository and the attached reference images, not a generic redesign checklist.
