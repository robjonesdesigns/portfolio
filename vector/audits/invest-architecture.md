## Architecture Audit

**Scope:** `src/` (all source files)
**Doctrine source:** ARCHITECTURE.md (last updated 2026-03-21)
**Audit date:** 2026-03-21
**Files scanned:** ~60 source files across pages, components, data, styles, stories

---

### Violations

#### CONTENT — medium

- `src/components/pages/SitemapPage.jsx:30-34` — Project slugs and display names hardcoded as strings. Doctrine: "No content in components. All copy lives in src/data/projects.js." Fix: import `projects` from `../../data/projects` and derive the sitemap links from `project.slug`, `project.title`, and `project.company`.

#### TOKENS — medium

- `src/components/ui/WorkEntry.jsx:8` — `background: '#1c1c1e'` in SCREEN_SHELL. Intentionally fixed (laptop bezel hardware simulation, noted in comment) but hardcoded hex in a production component. Acceptable as a named exception — define `--laptop-bezel: #1c1c1e` in globals.css and reference it here, so it's documented rather than invisible.
- `src/components/ui/WorkEntry.jsx:9` — `rgba(255,255,255,0.09)` border on SCREEN_SHELL. Same context — laptop hardware simulation. Same fix: name it.
- `src/components/ui/WorkEntry.jsx:14` — `rgba(0,0,0,0.4)` drop shadow in SCREEN_SHADOW. Same context.
- `src/components/ui/WorkEntry.jsx:35` — `background: '#3d3d3d'` on camera dot. Same context.
- `src/components/ui/Button.jsx:22,24` — `rgba(10,13,18,0.05)` and `rgba(0,0,0,0.05)` for shadow/hover states. No shadow or hover-state tokens exist in the system. Either add `--shadow-button` and `--hover-overlay` to globals.css, or accept as one-off values with a comment.

#### SIZE — info

- `src/components/case-study/KeytrnPrototype.jsx` — 1,417 lines. Experimental prototype, not production. Acceptable as a self-contained file.
- `src/components/ui/NoHero.jsx` — 605 lines. Experimental/undeclared. Resolve status (keep or delete) before next architecture audit.
- `src/components/ui/PracticeHero.jsx` — 384 lines. Experimental/undeclared. Same.
- `src/components/experiments/RippleEffectOnPink.jsx` — 384 lines. Declared experimental layer, acceptable.
- `src/components/case-study/CaseStudy.jsx` — 292 lines. Production component slightly over the 200-line doctrine limit. Not urgent.
- `src/components/ui/RJLogo3D.jsx` — 262 lines. Production, slightly over limit. Not urgent.

---

### Clean

- No `initial={{ opacity: 0 }}` on heading containers — VoiceOver rule respected throughout.
- No `gap-space-*` / `p-space-*` Tailwind classes — spacing uses standard numeric scale as declared.
- Motion imports correct — `Navbar.jsx`, `Footer.jsx`, `ThemeToggle.jsx` all use `motion`, not `m`.
- No reverse import direction violations — `ui/` and `data/` do not import from pages or sections.
- All copy in section components (Hero, About) is site-level bio content, not project data — acceptable exception to the "no content in components" rule.

---

### Summary

- High: 0 | Medium: 5 | Low: 0 | Info: 6
- Architecture health: **NEEDS ATTENTION**

The portfolio is structurally sound. No heading-in-opacity violations, no import direction violations, no token system ignored. The medium findings are all cosmetic or low-risk: one real content violation in SitemapPage (fixable in 10 lines) and four WorkEntry laptop-shell colors that are intentional but undocumented. The info findings are all experimental/undeclared files that the doctrine audit already flagged.

---

### Recommended Actions

1. **Fix `SitemapPage.jsx:30-34`** — derive project links from `projects` array. One import, a `.map()`, and the hardcoded strings are gone. Ensures sitemap stays in sync if project slugs or titles ever change.

2. **Document the WorkEntry laptop-shell colors** — add four CSS custom properties to globals.css (`--laptop-bezel`, `--laptop-camera`, `--laptop-screen`, `--laptop-border`) so the hardcoded hex values in SCREEN_SHELL become named, intentional exceptions. This takes the TOKENS findings from "violation" to "documented decision."

3. **Resolve `NoHero.jsx` and `PracticeHero.jsx`** — these are the only undeclared production-layer files. Move to `src/components/experiments/` if keeping, or delete. Keeps `ui/` clean and the architecture audit accurate.
