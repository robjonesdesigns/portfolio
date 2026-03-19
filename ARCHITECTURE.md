# ARCHITECTURE.md

> Last Updated: 2026-03-18
> This file is the technical specification. Read VECTOR.md for philosophy. Read CLAUDE.md for agent briefing and component reference.

---

## Layer Map

| Layer | Location | Rule |
|-------|----------|------|
| SSG Routes | `src/pages/` | Astro files only. No logic. Pass data as props to React page components. |
| Page Components | `src/components/pages/` | Own `LazyMotion` + `MotionConfig` wrapper. Include Navbar + Footer. Full page shell. |
| Section Components | `src/components/sections/` | Always used inside a page component that owns `LazyMotion`. Use `m` (not `motion`). |
| Layout Components | `src/components/layout/` | Shared across all pages. Use `motion` (not `m`) — self-contained, no `LazyMotion` dependency. |
| UI Primitives | `src/components/ui/` | Shared building blocks. If used in layout components (Navbar, Footer), use `motion`. If used only inside page components, use `m`. |
| Case Study | `src/components/case-study/` | Feature component. Uses `m`. Always rendered inside `CaseStudyPage` which owns `LazyMotion`. |
| Data | `src/data/projects.js` | Single source of truth for all project content. No content in components. |
| Styles | `src/styles/globals.css` | Design tokens as CSS custom properties. Composition classes in `@layer components`. |
| Research | `vector/` | Investiture knowledge artifacts. Not shipped. |

---

## Import Direction

```
src/pages/
  └── imports → src/components/pages/
        └── imports → src/components/sections/
        └── imports → src/components/layout/
        └── imports → src/components/ui/
        └── imports → src/data/
src/components/layout/
  └── imports → src/components/ui/
src/components/case-study/
  └── imports → src/components/ui/
  └── imports → src/data/
```

Pages import page components. Page components import sections, layout, UI, and data. No reverse imports. Data layer imports nothing.

---

## Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Framework | Astro 6 (SSG) | Pre-renders all HTML at build time. Fast, SEO-clean, no server needed. |
| UI | React 19 islands (`client:load`) | Interactive components (animations, theme toggle) hydrate client-side. |
| Animation | Framer Motion 12 | `whileInView`, `animate`, spring physics. `m` + `LazyMotion` for bundle splitting. |
| Styling | Tailwind CSS v3.4 + PostCSS | Utility classes + custom design tokens. No CSS modules. |
| 3D | Three.js + React Three Fiber | Available for RJLogo3D. Not currently rendered in production. |
| Deployment | Vercel (static) | Auto-deploys from `main` branch. Runs `npm run build`. |
| Video CDN | Cloudinary (`dlqvgithx`) | Videos gitignored locally. Served via `f_auto,q_auto` for format/quality optimization. |
| Docs/Workshop | Storybook 10 | Component documentation. Not deployed. |

---

## Project Structure

```
portfolio/
├── src/
│   ├── pages/                  SSG routes (Astro)
│   │   ├── index.astro         Home → HomePage.jsx
│   │   ├── resume.astro        Resume → ResumePage.jsx
│   │   ├── sitemap.astro       Sitemap → SitemapPage.jsx
│   │   └── projects/
│   │       └── [slug].astro    Dynamic case study → CaseStudyPage.jsx
│   ├── components/
│   │   ├── pages/              Full page shells (own LazyMotion)
│   │   │   ├── HomePage.jsx
│   │   │   ├── ResumePage.jsx
│   │   │   ├── SitemapPage.jsx
│   │   │   └── CaseStudyPage.jsx
│   │   ├── sections/           Page sections (use m, need LazyMotion above)
│   │   │   ├── Hero.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Projects.jsx
│   │   │   └── Contact.jsx
│   │   ├── layout/             Shared shell (use motion, self-contained)
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Container.jsx
│   │   ├── ui/                 Primitives
│   │   │   ├── WorkEntry.jsx
│   │   │   ├── LazyVideo.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── ThemeToggle.jsx
│   │   │   ├── PageTransition.jsx
│   │   │   ├── Marquee.jsx
│   │   │   ├── CircleLetters.jsx
│   │   │   ├── RJLogo.jsx
│   │   │   └── RJLogo3D.jsx
│   │   └── case-study/
│   │       └── CaseStudy.jsx
│   ├── data/
│   │   └── projects.js         All project content and case study data
│   ├── hooks/
│   │   └── useTheme.js
│   ├── layouts/
│   │   └── Layout.astro        HTML shell — head, meta, fonts, OG tags
│   └── styles/
│       └── globals.css         Tokens + composition classes
├── public/
│   ├── fonts/                  Self-hosted: Areal, Ogg (trial)
│   ├── images/                 Static assets (videos gitignored)
│   └── RobJonesResume.pdf
├── vector/                     Investiture research artifacts
├── VECTOR.md                   Project doctrine
├── CLAUDE.md                   Agent briefing + component reference
├── ARCHITECTURE.md             This file
├── astro.config.mjs
├── tailwind.config.js
└── package.json
```

---

## Naming Conventions

- **Components:** PascalCase, `.jsx` — `WorkEntry.jsx`, `CaseStudy.jsx`
- **Hooks:** camelCase, `.js` — `useTheme.js`
- **Data files:** camelCase, `.js` — `projects.js`
- **Astro pages:** kebab-case or bracket notation — `[slug].astro`
- **CSS classes:** Tailwind utilities + composition classes prefixed `type-` — `type-body`, `type-display-lg`

---

## Styling Architecture

### Design Tokens (CSS Custom Properties)
All color tokens defined on `:root` and `.dark` in `globals.css`. Never hardcode hex values in components.

```
--bg, --fg, --accent, --on-accent, --surface, --border, --fg-secondary, --bg-subtle
```

### Tailwind Token Classes
`text-fg`, `text-fg-secondary`, `text-brand-primary`, `bg-brand-primary`, `text-on-accent`, `bg-surface`, `bg-subtle`, `border-token`

### Type Composition Classes
Defined in `@layer components` in `globals.css`. Use plain CSS — not `@apply` (fails with fontSize tokens in PostCSS).

```
type-display-2xl  type-display-xl  type-display-lg  type-display-md  type-display-sm
type-body  type-label  type-link  type-badge  type-nav-link
```

### Spacing
4px/8px grid. Standard Tailwind numeric scale (`gap-6`, `p-8`). Custom `space-*` tokens defined in `tailwind.config.js` DO NOT generate JIT classes — do not use `gap-space-4`.

---

## Animation Architecture

### Rule: `m` vs `motion`
- **`m`** — lightweight stub, requires `LazyMotion` provider above it in the tree. Use in section and feature components.
- **`motion`** (imported as `motion as m`) — self-contained, no provider needed. Use in `Navbar`, `Footer`, `ThemeToggle`.

### Rule: Never hide headings
Never set `initial={{ opacity: 0 }}` on an element that contains a heading. VoiceOver quick nav cannot find headings inside invisible elements.

Pattern: animate `y` on outer wrapper, fade opacity on inner div so heading is always in DOM at full opacity.

### Rule: No global stagger on whileInView
Each section animates independently with its own `whileInView`. A global stagger parent causes all content to depend on a single viewport trigger, creating hectic loading behavior.

### `LazyMotion` ownership
Page components (`pages/`) own the `LazyMotion` + `MotionConfig reducedMotion="user"` wrapper. Layout components (`layout/`) use `motion` directly and are self-contained.

---

## State Management

No global state library. State is local to components:
- `useTheme` hook — reads/writes `localStorage` + applies `.dark` class to `<html>`
- Passed as props: `theme` and `toggleTheme` from page component down to `Navbar` and `ThemeToggle`
- No Context, no Redux, no Zustand

---

## Data Architecture

All project content lives in `src/data/projects.js` as a single exported array. Components import and render from this array. No content in component files.

Case study fields: `slug`, `title`, `company`, `year`, `tags`, `headline`, `description`, `outcomes`, `intro`, `orientationNote`, `processMedia`, `keyInsight`, `designDecisions`, `reflection`, `ugaContent`, `metaProblem`, `role`, `duration`.

See `CLAUDE.md` for full field reference.

---

## What Not To Do

1. **No hardcoded colors.** Use CSS custom properties (`var(--accent)`) or Tailwind token classes (`text-brand-primary`). Never `#813746` in a component.

2. **No content in components.** All copy lives in `src/data/projects.js`. Components render data — they do not contain it.

3. **No `initial={{ opacity: 0 }}` on heading containers.** Breaks VoiceOver quick nav. Animate `y` on the outer wrapper instead.

4. **No global stagger parent on `whileInView` content.** Each section gets its own `whileInView`. See Animation Architecture above.

5. **No `m` in layout components.** `Navbar`, `Footer`, and `ThemeToggle` use `motion as m` — they must be self-contained without a `LazyMotion` provider.

6. **No `@apply` with fontSize tokens.** PostCSS cannot resolve custom `fontSize` tokens in `@apply` inside `@layer components`. Write plain CSS instead.

7. **No `gap-space-*` Tailwind classes.** Custom spacing tokens do not generate JIT classes. Use standard numeric scale (`gap-6`) or inline CSS.

---

## Development

- **Dev server:** `npm run dev` → `http://127.0.0.1:4321` (use 127.0.0.1 — localhost has IPv6 lag on macOS)
- **Cache issues:** `rm -rf .astro node_modules/.vite` then restart
- **Production preview:** `npm run build && npx astro preview`
- **Deploy:** Push to `main` → Vercel auto-builds

---

## Decisions

Architecture decisions are recorded in `/vector/decisions/`. See `ADR-000-template.md` for format.
