# ARCHITECTURE.md

> Last Updated: 2026-04-05
> This file is the technical specification. Read VECTOR.md for philosophy. Read CLAUDE.md for agent briefing and component reference.

---

## Layer Map

| Layer | Location | Rule |
|-------|----------|------|
| SSG Routes | `src/pages/` | Astro files only. Minimal logic. Pass data as props to components. |
| Sections | `src/components/sections/` | Page-level content blocks. Used inside page routes. |
| Layout | `src/components/layout/` | Shared shell components (Navbar, Footer, Container). Present on every page. |
| UI Primitives | `src/components/ui/` | Reusable building blocks (WorkEntry, Button, Badge, LazyVideo). No page-specific logic. |
| Case Study | `src/components/case-study/` | Feature components for case study rendering. CaseStudy.astro is the main renderer. SystemMap.astro is APM-only. |
| Data | `src/data/projects.js` | Single source of truth for all project content. No content in components. |
| Styles | `src/styles/globals.css` | Design tokens as CSS custom properties. Composition classes in `@layer components`. |
| Layouts | `src/layouts/Layout.astro` | HTML shell: head, meta, OG tags, fonts, Navbar, Footer, shared scripts. |
| Research | `vector/` | Investiture knowledge artifacts. Not shipped. |

---

## Import Direction

```
src/pages/
  └── imports → src/layouts/Layout.astro
  └── imports → src/components/sections/
  └── imports → src/components/case-study/
  └── imports → src/data/
src/layouts/Layout.astro
  └── imports → src/components/layout/ (Navbar, Footer)
src/components/case-study/
  └── imports → src/components/ui/
  └── imports → src/data/
src/components/sections/
  └── imports → src/components/ui/
src/components/layout/
  └── imports → src/components/ui/
```

Pages import layouts and sections. Layouts import layout components. Sections and case study import UI primitives and data. No reverse imports. Data layer imports nothing.

---

## Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Framework | Astro 6 (SSG) | Pre-renders all HTML at build time. Fast, SEO-clean, no server needed. |
| Styling | Tailwind CSS v3.4 + PostCSS | Utility classes + custom design tokens. No CSS modules. |
| Animation | CSS only | Scroll animations via IntersectionObserver, page transitions via ViewTransitions, entrance keyframes. Zero JS animation libraries. |
| Interactivity | Vanilla JS | ~30 lines total: theme toggle, clipboard copy, scroll observer. All in `<script>` tags. |
| Deployment | Vercel (static) | Auto-deploys from `main` branch. Runs `npm run build`. |
| Video CDN | Cloudinary (`dlqvgithx`) | Videos gitignored locally. Served via `f_auto,q_auto` for format/quality optimization. |

Zero framework JavaScript shipped to the browser. No React, no hydration, no client-side routing.

---

## Project Structure

```
portfolio/
├── src/
│   ├── pages/                  SSG routes (Astro)
│   │   ├── index.astro                 Home (Hero + Projects)
│   │   ├── about.astro                 About page
│   │   ├── resume.astro                Resume
│   │   ├── sitemap.astro               Sitemap
│   │   ├── design-system.astro         Style guide
│   │   ├── 404.astro                   Custom error page
│   │   └── projects/
│   │       └── [slug].astro            Dynamic case study route
│   ├── components/
│   │   ├── sections/
│   │   │   └── AboutContent.astro      Full about page content
│   │   ├── layout/
│   │   │   ├── Navbar.astro            Fixed header, nav links, theme toggle
│   │   │   ├── Footer.astro            CTA + email copy + sitemap link
│   │   │   └── Container.astro         Max-width wrapper (lg/md/sm)
│   │   ├── ui/
│   │   │   ├── WorkEntry.astro         Project card (LaptopFrame, VideoGrid, or ImageGrid)
│   │   │   ├── LazyVideo.astro         IntersectionObserver lazy loader for videos
│   │   │   ├── Badge.astro             Metadata tag
│   │   │   └── Button.astro            Polymorphic button/link (primary/secondary/tertiary/link)
│   │   └── case-study/
│   │       ├── CaseStudy.astro         Full case study renderer
│   │       └── SystemMap.astro         System architecture flowchart (APM only)
│   ├── data/
│   │   └── projects.js                 All project content and case study data
│   ├── layouts/
│   │   └── Layout.astro                HTML shell: head, meta, OG, fonts, Navbar, Footer, scripts
│   └── styles/
│       └── globals.css                 Tokens, type classes, animations, scrollbar
├── public/
│   ├── fonts/                          Self-hosted: Cabinet Grotesk, Areal, Ogg (trial)
│   ├── images/                         Static assets (videos gitignored)
│   └── RobJonesResume.pdf
├── .reference/
│   ├── stories/                        Old Storybook stories (patterns for reference)
│   └── design-system-docs/             Old MDX docs (Color, Typography, Spacing, etc.)
├── vector/                             Investiture research artifacts
│   ├── audits/
│   ├── decisions/
│   ├── research/
│   └── schemas/                        Investiture JSON schema definitions
├── VECTOR.md                           Project doctrine
├── CLAUDE.md                           Agent briefing + component reference
├── ARCHITECTURE.md                     This file
├── HANDOFF.md                          Session handoff notes
├── HEURISTICS.md                       Nielsen's 10 heuristic evaluation reference
├── astro.config.mjs
├── tailwind.config.js
└── package.json
```

---

## Naming Conventions

| File type | Casing | Example |
|-----------|--------|---------|
| Astro components | PascalCase, `.astro` | `WorkEntry.astro`, `CaseStudy.astro` |
| Astro pages | kebab-case or bracket notation, `.astro` | `design-system.astro`, `[slug].astro` |
| Data files | camelCase, `.js` | `projects.js` |
| CSS classes | Tailwind utilities + composition classes prefixed `type-` | `type-body`, `type-display-lg` |

---

## Styling Architecture

### Design Tokens (CSS Custom Properties)
All color tokens defined on `:root` and `.dark` in `globals.css`. Never hardcode hex values in components.

```
--bg, --fg, --accent, --on-accent, --surface, --border, --fg-secondary, --bg-subtle

/* Interactive states */
--accent-hover, --accent-bg-10, --accent-ring

/* Component tokens */
--hover-overlay   (tertiary button hover, flips light/dark via .dark)
--shadow-button   (primary button shadow)

/* Laptop mockup, intentionally theme-independent hardware colors */
--laptop-bezel, --laptop-border, --laptop-camera, --laptop-shadow
```

### Tailwind Token Classes
`text-fg`, `text-fg-secondary`, `text-brand-primary`, `bg-brand-primary`, `text-on-accent`, `bg-surface`, `bg-subtle`, `border-token`

### Type Composition Classes
Defined in `@layer components` in `globals.css`. Use plain CSS, not `@apply` (fails with fontSize tokens in PostCSS).

```
type-display-2xl  type-display-xl  type-display-lg  type-display-md  type-display-sm
type-body  type-intro  type-label  type-link  type-badge  type-nav-link
```

### Spacing
4px/8px grid. Standard Tailwind numeric scale (`gap-6`, `p-8`). Custom `space-*` tokens defined in `tailwind.config.js` DO NOT generate JIT classes. Do not use `gap-space-4`.

---

## Animation Architecture

All animations are CSS. No JS animation libraries.

### Scroll Animations (`globals.css`)
- Elements start visible. Observer adds `.will-animate` to hide below-fold elements, then `.visible` to reveal on scroll. True progressive enhancement: if observer fails, content stays visible.
- `data-animate` — fade-up (opacity 0 to 1 + translateY 16px to 0) via `.will-animate` to `.visible` transition
- `data-animate-y` — translateY only, no opacity change. **Use on headings** so VoiceOver always finds them
- `data-animate-delay="1|2|3|4"` — stagger via `transition-delay`
- In-viewport elements get immediate reveal via double-rAF (paint hidden state, then transition to visible)

### Hero Entrance (scoped in `index.astro`)
- `.hero-headline` / `.hero-subtext` — CSS `@keyframes hero-in` with staggered delays

### Page Transitions
- Astro `<ClientRouter />` with CSS `::view-transition-old/new(root)` keyframes

### Navbar
- CSS `@keyframes navbar-enter` on `.navbar-header`

### Reduced Motion
- `@media (prefers-reduced-motion: reduce)` disables all animations

### Rule: Never hide headings
Never set `opacity: 0` on an element that contains a heading. VoiceOver quick nav cannot find headings inside invisible elements. Use `data-animate-y` (translateY only) on heading containers.

---

## Theme System

- `Layout.astro` inline `<script is:inline>` reads localStorage/system preference, sets `.dark` before paint (FOUC prevention)
- `Navbar.astro` `<script>` binds click on `[data-theme-toggle]`, toggles `.dark` class + localStorage
- `astro:after-swap` event restores theme after ViewTransitions navigation
- System preference change listener in `Layout.astro`
- CSS variables in `globals.css` swap via `.dark` class on `<html>`

---

## Data Architecture

All project content lives in `src/data/projects.js` as a single exported array. Components import and render from this array. No content in component files.

See `CLAUDE.md` for full field reference.

---

## What Not To Do

1. **No hardcoded colors.** Use CSS custom properties (`var(--accent)`) or Tailwind token classes (`text-brand-primary`). Never `#813746` in a component.

2. **No content in components.** All copy lives in `src/data/projects.js`. Components render data, they do not contain it.

3. **No `opacity: 0` on heading containers.** Breaks VoiceOver quick nav. Use `data-animate-y` (translateY only) on elements containing headings.

4. **No `@apply` with fontSize tokens.** PostCSS cannot resolve custom `fontSize` tokens in `@apply` inside `@layer components`. Write plain CSS instead.

5. **No `gap-space-*` Tailwind classes.** Custom spacing tokens do not generate JIT classes. Use standard numeric scale (`gap-6`) or inline CSS.

6. **No framework JavaScript.** No React, no Svelte, no client-side hydration. All interactivity is vanilla JS in `<script>` tags.

---

## Development

- **Dev server:** `npm run dev` → `http://127.0.0.1:4321` (use 127.0.0.1, localhost has IPv6 lag on macOS)
- **Cache issues:** `rm -rf .astro node_modules/.vite` then restart
- **Production preview:** `npm run build && npx astro preview`
- **Deploy:** Push to `main` → Vercel auto-builds

---

## Decisions

Architecture decisions are recorded in `/vector/decisions/`. See `ADR-000-template.md` for format.
