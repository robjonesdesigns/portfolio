# Portfolio Handoff

## Deployed
https://designedbyrob.com

## Stack
Astro 6 (SSG) + Tailwind v3. Zero React, zero Framer Motion.

## Doctrine
See `CLAUDE.md`, `VECTOR.md`, `HEURISTICS.md` in project root.

## Next priorities

### 1. APM media assets
- Icon system screenshot/video (five visual languages side by side)
- Filter interaction video (auto-scroll behavior in demo)
- Before/after for recreation section (Asset Health vs Plant Overview)
- APM demo walkthrough video for recreation section

### 2. Keytrn media mismatch
- "Designing for homebuyers: DetailView with sale type signals" currently shows the filter flow video. Swap for detail view screenshot.

### 3. Lede typography experiment
Try bumping `type-intro` to 20/28 on mobile, 24/32 on desktop for case study intros.

### 4. Doctrine drift
CLAUDE.md and ARCHITECTURE.md updated for session 25 changes. Run invest-doctrine to confirm SOUND after next code session.

### 5. CaseStudy.astro refactor
Move hardcoded "The problem" and "The work" h2s into processMedia data using sectionBreak pattern. Do after all case studies are content-complete.

## Recent shipped work

### Session 25 (2026-04-07)
- Design critic agent created (brutal design review with principles knowledge base)
- 14-finding design audit: animation system rewrite (progressive enhancement), metadata hierarchy, column dividers, bg-subtle token, touch targets, button focus ring
- APM case study full restructure: two-part narrative (Honeywell shipped vs recreation vision)
- Honeywell naming: Asset Health / Asset Details. Recreation naming: Plant Overview / Asset Inspection
- sectionBreak system added to processMedia for data-driven section headers
- SystemMap moved into processMedia flow under "What I'd build"
- Copy audit: voice consistency, repetition, spec-sheet rewrites
- Keytrn copy fix: clerk question count corrected to match PER-007 research
- VECTOR.md PreToolUse hook added to global settings

### Previous
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
