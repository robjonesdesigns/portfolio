---
name: Portfolio strategic roadmap
description: 3-phase plan — Phase 1 job-ready portfolio, Phase 2 Storybook cleanup, Phase 3 separate design system doc site
type: project
---

# Strategic Roadmap — Portfolio → Storybook → Design System

## Phase 1 — Job-ready portfolio (do now)

### Keytrn case study
- [x] Cloudinary video hosting set up — all 4 videos live, URLs in projects.js
- [ ] Last screen recording still coming (user will drop on desktop) → add to case study
- [ ] UGA Business Law Clinic section — set `ugaContent` in `projects.js` (user provides content)

### Homepage
- [ ] Two asset cards below Keytrn laptop card — component interaction screenshots (user provides)

### Additional case studies (content in projects.js, images all null)
- [ ] **Aysa** — needs images/assets
- [ ] **Honeywell APM** — needs images/assets (potentially split into two case studies)
- [ ] **Honeywell Warehouse** — needs images/assets
- [ ] **Sinta** — needs images/assets

### General
- [x] All five WorkEntry + case study headlines shortened to 5-6 words
- [x] Accessibility fixes — aria-labels, no nested main, no div-in-button
- [x] SEO fixes — no opacity:0 in SSR, HTML sitemap page at /sitemap
- [x] Standards fixes — font URL encoding, valid HTML structure
- [ ] Final review: copy, layout, responsive, dark/light
- [ ] Figma hero design review (user will share URL)

---

## Phase 2 — Storybook cleanup (while job searching)

Flat MDX pages for components. Standard markdown tables, `<Canvas />` embeds, `<ArgTypes />` props.

### Components to document
- [x] Button, Badge, WorkEntry, ThemeToggle, Marquee, Navbar, PageTransition — MDX done
- [ ] Cursor — DELETED (no longer needed)
- [ ] HeroName, RJLogo3D — lower priority

---

## Phase 3 — Separate React design system doc site (longer term)

`/design-system` route in the portfolio. Real React app — tabs, sidebar nav, interactive token swatches.
Moves all Elements MDX content there. Storybook becomes pure dev tool.

---

## Key files
- `src/data/projects.js` — all project content, video URLs, case study copy
- `src/stories/*.mdx` — Elements docs (done) + component MDX docs (Phase 2, mostly done)
- `.storybook/preview.jsx` — sidebar sort order
- `public/images/*.mp4` — local only, gitignored (Cloudinary is live for Keytrn videos)
