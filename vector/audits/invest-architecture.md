## Architecture Audit

**Scope:** `src/` (all source files)
**Doctrine source:** ARCHITECTURE.md (last updated 2026-03-18)
**Files scanned:** ~60 source files across pages, components, data, styles, stories

---

### Violations

#### LAYER — medium

- `src/pages/_KeytrnPrototype.jsx` — React JSX file in the pages layer. Doctrine: "Astro files only. No logic." Underscore prefix excludes it from Astro routing but it still violates layer placement. Should be in `src/components/pages/` or a dedicated `src/prototypes/` directory.
- `src/pages/_Resume.jsx` — Same issue. React JSX component in the pages layer. Imports from `components/` and `layout/` correctly but is placed in the wrong layer.
- `src/pages/_Resume.stories.jsx` — Storybook story file in the pages layer. Stories belong in `src/stories/` with all other story files.

#### TOKENS — high

- `src/components/ui/WorkEntry.jsx:110-111` — `initial={{ opacity: 0 }}` on `m.div` that contains `h3` at line 117. Explicit doctrine violation: "Never set `initial={{ opacity: 0 }}` on an element that contains a heading. VoiceOver quick nav cannot find headings inside invisible elements." Fix: move opacity fade to a wrapper that does not contain the `h3`, or animate only `y` on the outer article.

#### TOKENS — medium

- `src/components/ui/WorkEntry.jsx:27` — `background: '#1c1c1e'` in LaptopFrame inline style. Hardcoded hex in a production component. No exact token match (laptop bezel is a hardware color, not a UI color) — acceptable to define a new CSS custom property `--laptop-bezel: #1c1c1e` in globals.css.
- `src/components/ui/WorkEntry.jsx:28` — `background: '#3d3d3d'` (camera dot). Same — candidate for `--laptop-camera`.
- `src/components/ui/WorkEntry.jsx:29` — `background: '#000'` (screen). Acceptable to use `#000` for a screen simulation, but could be `var(--laptop-screen, #000)` for explicitness.

#### TOKENS — low

- `src/stories/*.stories.jsx` (multiple files) — Hardcoded hex backgrounds (`#fffbf5`, `#1c1a16`, `#252220`, `#f7f3f5`) used as Storybook preview wrappers. These are not shipped. Lower priority than production components, but they reference token values by hex — if a token changes, stories drift silently. Consider using `var(--bg)` and `var(--surface)` in story wrappers.

---

### Summary

- High: 1 | Medium: 5 | Low: 1 | Info: 0
- Architecture health: NEEDS ATTENTION

---

### Priority Actions

1. **Fix `WorkEntry.jsx:110` — heading inside opacity:0 container.** This is the only accessibility violation in production. Move the `h3` outside the fading `m.div`, or restructure so opacity fades on an inner div that does not contain the heading. The outer `m.article` already animates `y` — the fix is to remove the opacity fade wrapper entirely.

2. **Move `src/pages/_Resume.jsx` and `_Resume.stories.jsx` out of the pages layer.** `_Resume.jsx` belongs in `src/components/pages/` (or delete it if `ResumePage.jsx` supersedes it). `_Resume.stories.jsx` belongs in `src/stories/`.

3. **Move `src/pages/_KeytrnPrototype.jsx` out of pages.** If it's an active reference prototype, move to `src/components/pages/` or create `src/prototypes/`. If it's done, archive it outside `src/` or delete it.
