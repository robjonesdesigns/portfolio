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

### 2. Investiture skills build
- 12 skills specced in `investiture_skills_roadmap.md`
- Start with invest-voice and invest-a11y (universal), then project-specific

### 3. Keytrn design system overhaul
- Detail page, portal, AskKeytrn still need work

### 4. Lede typography experiment
Try bumping `type-intro` to 20/28 on mobile, 24/32 on desktop for case study intros.

### 5. Missing media assets
Portfolio still needs several media captures for case studies.

## Recent shipped work

### Session 26 (2026-04-07/08)
- Co-author attribution removed from all 3 repos (portfolio, keytrn, apm-dashboard) via git filter-branch + commit-msg hooks
- Full color system overhaul with depth model: surface lighter than bg-subtle in both themes (cards float above sections)
  - Light: --bg #fffbf5, --surface #f5eee0, --bg-subtle #e8e2d6
  - Dark: --bg #1c1a16, --bg-subtle #26231d, --surface #302c24
  - fg-secondary hue realigned from red-brown to amber (#6e6562 -> #6b6459)
  - Border and media-bg hues aligned to amber family in both themes
  - Hover overlay: warm palette fg at 10% opacity
- Quote card simplification: question uses var(--surface), response uses color-mix(accent 5%, surface)
- Dead tokens removed: laptop mockup (4 tokens), media-bg-light, media-border-light
- LaptopFrame block removed from WorkEntry (unused)
- Accessibility cards in style guide updated with correct hex values and ratios (18 cards)
- Copy fix: "Most hit AAA" -> "All primary text hits AAA"
- Sitemap skip link added for screen reader navigation
- Design critic agent upgraded: RISD protocol, subtractive evaluation, "never validate" rule, expanded color theory forensics
- design-principles.md expanded: undertone forensics, hue drift analysis, depth model rules, Rams/Tufte subtractive lens

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
