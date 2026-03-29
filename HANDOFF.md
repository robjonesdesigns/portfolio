# Portfolio Handoff -- Session 15 End

## START HERE
Case study outcomes rewritten. Project order updated. Theme toggle fixed. READMEs and ADRs updated across all three repos. View demo is a primary button. All pushed.

## Deployed
https://designedbyrob.com

## Next session priorities

### 1. APM case study assets
The "coming soon" placeholder looks unfinished. Depends on Asset Inspection screen being built in APM dashboard first.
- Asset Inspection processMedia image/video (id: asset-details-structure, currently "coming soon")
- Final Asset Inspection video (finalMedia, currently null)

### 2. `/design-system` route
Differentiator for technical hiring managers. Content in `.reference/` (old Storybook stories + MDX docs for Color, Typography, Spacing, etc.)

### 3. CSP hash-based script-src (backlog)
Any change to inline theme script requires hash update in `vercel.json`. No one will notice this.

## What was completed this session

### Session 13 (2026-03-28)
- APM case study link live with videos, before/after, research images
- CaseStudy.astro: processMedia with item.image, beforeAfter rendering, array format for process
- mobileCardColor per project, alternating mobile card positions

### Session 15 (2026-03-29)
- APM case study: section names updated (System Health, In Progress, Needs Action)
- APM case study: WCAG 2.1 AA accessibility paragraph in solution section
- Project order: APM, Keytrn, Warehouse, Aysa, Sinta
- "All Projects" nav link removed from case study footer
- "View demo" primary button (md size, matches resume Download PDF)
- Theme toggle fix: initThemeToggle() in astro:after-swap handler
- Smooth theme transition: color/background-color/border-color 0.3s on all elements
- Outcomes rewritten to reflect actual results, not scope
- GitHub link added to resume contact row
- README.md written
- 3 stale ADRs updated (002: self-hosted fonts, 006: zero React/Framer Motion, 007: CSS animations)
