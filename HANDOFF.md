# Portfolio Handoff -- Session 15 End

## START HERE
Case study outcomes rewritten. Project order updated (APM, Keytrn, Warehouse, Aysa, Sinta). Theme toggle fixed for ViewTransitions. READMEs written for all three repos. Portfolio ADRs updated.

## Deployed
https://designedbyrob.com

## What was completed since session 11

### Session 13 (2026-03-28)
- APM case study link live with videos, before/after, research images
- CaseStudy.astro: processMedia with item.image, beforeAfter rendering, array format for process
- mobileCardColor per project, alternating mobile card positions

### Session 15 (2026-03-29)
- APM case study: section names updated (System Health, In Progress, Needs Action)
- APM case study: WCAG 2.1 AA accessibility paragraph in solution section
- Project order: APM, Keytrn, Warehouse, Aysa, Sinta (strongest work first)
- "All Projects" nav link removed from case study footer (logo handles it)
- "View live site" changed to "View demo" primary button
- Theme toggle fix: initThemeToggle() in astro:after-swap handler
- Smooth theme transition: color/background-color/border-color 0.3s on all elements
- Outcomes rewritten to reflect actual results, not scope descriptions
- GitHub link added to resume contact row
- README.md written (was default Vite template)
- 3 stale ADRs updated (002: self-hosted fonts, 006: zero React/Framer Motion, 007: CSS animations)

## Pending
- `/design-system` route (use `.reference/` content)
- CSP hash-based script-src (backlog)
- Asset Inspection video/image for APM case study processMedia (id: asset-details-structure)
- Final Asset Inspection video for APM case study finalMedia

## Key files modified (session 15)
- `src/data/projects.js` -- outcomes, section names, project order, a11y paragraph
- `src/components/case-study/CaseStudy.astro` -- View demo button, removed All Projects link
- `src/layouts/Layout.astro` -- theme toggle rebind on ViewTransitions swap
- `src/styles/globals.css` -- smooth theme transition on all elements
- `src/pages/resume.astro` -- GitHub link
- `vector/decisions/ADR-002-typography-system.md` -- self-hosted fonts
- `vector/decisions/ADR-006-custom-build.md` -- zero React/Framer Motion
- `vector/decisions/ADR-007-subtle-animations.md` -- CSS animations, not Framer Motion
- `README.md` -- written from scratch
