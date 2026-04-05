# Portfolio Handoff

## Deployed
https://designedbyrob.com

## Stack
Astro 6 (SSG) + Tailwind v3. Zero React, zero Framer Motion.

## Doctrine
See `CLAUDE.md`, `VECTOR.md`, `HEURISTICS.md` in project root.

## Next priorities

### 1. Lede typography experiment
Try bumping `type-intro` to 20/28 on mobile, 24/32 on desktop for case study intros. Narrower width + larger type + tighter gap to heading = editorial lede pattern.

### 2. Visual review in browser
Walk through recent changes across all 3 case studies (portfolio, Keytrn, APM).

### 3. Missing media
See internal notes on missing media assets across case studies.

## Recent shipped work

### Portfolio
- Hero + about bio voice rewrite
- Resume updated (2021 freelance start, PDF)
- Mobile nav: animated hamburger, theme toggle always visible
- Case study nav: "All projects" link, stacks on mobile
- 404 page
- Clipboard init centralized in Layout.astro (ViewTransitions compatible)
- Theme toggle: clone+replace pattern for reliable first-load binding
- Style guide page (renamed from Design System):
  - type-meta, type-meta-bold, code base style
  - Accessibility grid (contrast pairings + implementation features)
  - Layout section (container, breakpoints, three-layer, spacing)
  - Viewport preview tool
  - Border token note
- System architecture map for APM case study (6 layers, K-101 running example)
- Case study component: liveUrlNote, conversations (Q&A cards), videoGrid, sectionLabel+label, editorial-hero decision treatment
- Design system: `.quote-card` classes, `type-link` font-size inherit fix
- Token refinement: surface to parchment (#f5f0e8), fg to dark chocolate (#1c1a16), noise overlay removed
- Custom domains: apm.designedbyrob.com, keytrn.designedbyrob.com

### Keytrn + APM case study updates
See each project's own repo for implementation details. Portfolio case study pages reference shipped features only.

## Previous sessions
See git log for full history.
