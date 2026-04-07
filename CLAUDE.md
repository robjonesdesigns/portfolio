# Portfolio — Claude Context

Rob Jones. Product Designer. This is a personal portfolio site.

**Path:** `~/Documents/Dev/portfolio/`
**Dev server:** `npm run dev` → `http://localhost:4321/` (falls back to 4322, 4323 if port is in use)
**Stack:** Astro 6 (SSG) + Tailwind CSS v3.4 — zero React, zero Framer Motion, zero client-side frameworks

**Doctrine:** `VECTOR.md`, `ARCHITECTURE.md`, `HANDOFF.md`, `HEURISTICS.md` (Nielsen's 10 heuristic evaluation reference)

---

## Zero Vector Principle

All code generation must adhere to VECTOR.md. Before writing code:
1. Read VECTOR.md to understand intent, audience, constraints, and design principles.
2. If a requested change conflicts with VECTOR.md, flag the conflict before writing code.
3. Move from intent to execution without intermediate mockups. VECTOR.md defines what to build and why. ARCHITECTURE.md defines how. Code is the output.

---

## Architecture

Pure Astro static site. Every component is `.astro`. All animations are CSS. Interactivity is vanilla JS in `<script>` tags. Zero framework JavaScript shipped to the browser.

### Layout.astro (shared shell)
- `<head>`: meta, OG tags, fonts, `<ClientRouter />` (Astro ViewTransitions)
- Theme init `<script is:inline>`: sets `.dark` on `<html>` before paint (FOUC prevention)
- `<Navbar />`: persistent across all pages, static HTML + vanilla JS theme toggle
- `<main><slot /></main>`: page content
- `<Footer />`: static HTML + vanilla JS clipboard copy
- Scripts: scroll observer (`data-animate` / `data-animate-y`), theme restore on navigation, system preference listener

### Animations
All animations are CSS. No JS animation libraries.

**Scroll animations** (`globals.css`):
- `data-animate` — fade-up (opacity 0→1 + translateY 16px→0), triggered by IntersectionObserver
- `data-animate-y` — translateY only, no opacity change. **Use on headings** so VoiceOver always finds them
- `data-animate-delay="1|2|3|4"` — stagger via `transition-delay`
- `.visible` class added by scroll observer when element enters viewport

**Hero entrance** (scoped `<style>` in `index.astro`):
- `.hero-headline` / `.hero-subtext` — CSS `@keyframes hero-in` with staggered delays

**Page transitions**: Astro `<ClientRouter />` with CSS `::view-transition-old/new(root)` keyframes

**Navbar enter**: CSS `@keyframes navbar-enter` on `.navbar-header`

**Reduced motion**: `@media (prefers-reduced-motion: reduce)` disables all animations

### Theme system
- Layout.astro `<script is:inline>` reads localStorage/system preference, sets `.dark` before paint
- Navbar.astro `<script>` binds click on `[data-theme-toggle]`, toggles `.dark` class + localStorage
- `astro:after-swap` event restores theme after ViewTransitions navigation
- System preference change listener in Layout.astro
- CSS variables in `globals.css` swap via `.dark` class on `<html>`
- ThemeToggle thumb: CSS `transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)` with `.dark .theme-thumb { transform: translateX(30px) }`

---

## Design Tokens

### CSS Variables (dark mode via `.dark` on `<html>`)
| Variable | Light | Dark |
|---|---|---|
| `--bg` | `#fffbf5` (cream) | `#1c1a16` |
| `--fg` | `#1c1a16` | `#fffbf5` |
| `--accent` | `#813746` (burgundy) | `#e36f86` (rose) |
| `--on-accent` | `#fffbf5` | `#1c1a16` |
| `--surface` | `#f5f0e8` | `#28251f` |
| `--border` | `rgba(92,82,80,0.1)` | `rgba(176,168,158,0.1)` |
| `--fg-secondary` | `#6e6562` | `#c2bab0` |
| `--bg-subtle` | `#fdf8f2` | `#201e1a` |

### Tailwind Color Classes
`text-fg`, `text-fg-secondary`, `text-brand-primary`, `bg-brand-primary`, `text-on-accent`, `bg-surface`, `bg-subtle`, `border-token`, `border-token-strong`

### Utility Classes
- `shadow-section-down` / `shadow-section-up` — theme-aware depth shadows. Requires `relative z-10`.
- `media-card` — tinted image/video container (color-mix bg, border, rounded-xl, overflow hidden)
- `list-reset` — strip list-style, padding, margin
- `border-token` / `border-token-strong` — theme-aware border colors

### Three-Layer Layout
Every page follows: hero (`--bg`) / content (`bg-subtle`) / footer (`--bg`). Shadow utilities create depth between layers. No border dividers.

---

## Typography System

### Font Families (`tailwind.config.js` → `fontFamily`)
| Tailwind class | Font | Source |
|---|---|---|
| `font-display` | Cabinet Grotesk | Self-hosted `/public/fonts/` |
| `font-body` | Areal | Local `/public/fonts/` |
| `font-editorial` | Ogg | Local `/public/fonts/` (trial) — one-off use only |

### Type Scale (`tailwind.config.js` → `fontSize`)
Display sizes use fluid `clamp()`. Body sizes are fixed with a responsive step at `md:`.

| Token | Size | Use |
|---|---|---|
| `text-display-2xl` | clamp(48–96px) | Hero h1 |
| `text-display-xl` | clamp(40–80px) | Section h2 |
| `text-display-lg` | clamp(32–60px) | CTA / editorial h2 |
| `text-display-md` | clamp(24–36px) | Card / component h3 |
| `text-display-sm` | clamp(20–24px) | Sub-headings |
| `text-body-lg` | 20px | Body text — desktop |
| `text-body` | 16px | Body text — mobile |
| `text-body-sm` | 14px | Small body |

### Type Composition Classes (`globals.css` → `@layer components`)
Use these everywhere — one class handles font, size, weight, and color.

**Display** (Cabinet Grotesk, bold, fluid clamp, `text-fg`):
```
type-display-2xl   type-display-xl   type-display-lg   type-display-md   type-display-sm
```

**Body** (Areal, 16px mobile → 20px desktop):
| Class | Color | Weight | Notes |
|---|---|---|---|
| `type-body` | `text-fg` | 400 | Body paragraphs — 16px mobile → 20px desktop |
| `type-intro` | `text-fg` | 400 | Opening paragraphs, key insights — always 20px, no step-down |
| `type-label` | `text-fg-secondary` | 700 | Uppercase section labels |
| `type-link` | `text-brand-primary` | 400 | Inline links, opacity on hover |
| `type-badge` | `text-fg` | 400 | Metadata / tag text |
| `type-nav-link` | `text-fg` | 500 | Nav links — underline handled in component |

**Rule:** utilities always override composition classes. `type-body text-brand-primary` works as expected.

---

## Spacing
Uses Tailwind's standard numeric scale on a 4px grid (`gap-2` = 8px, `gap-6` = 24px, etc.). No custom spacing tokens.

---

## File Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.astro          Fixed header — logo, nav links, theme toggle
│   │   ├── Footer.astro          CTA + email copy + sitemap link
│   │   └── Container.astro       Max-width wrapper (lg/md/sm)
│   ├── sections/
│   │   └── AboutContent.astro    Full about page content
│   ├── ui/
│   │   ├── WorkEntry.astro       Project card — LaptopFrame, VideoGrid, or ImageGrid
│   │   ├── LazyVideo.astro       IntersectionObserver lazy loader for videos
│   │   ├── Badge.astro           Metadata tag
│   │   └── Button.astro          Polymorphic button/link (primary/secondary/tertiary/link)
│   └── case-study/
│       ├── CaseStudy.astro       Full case study renderer
│       └── SystemMap.astro       System architecture flowchart (APM only)
├── data/
│   └── projects.js               All project content and case study data
├── pages/                         Astro file-based SSG routes
│   ├── index.astro               Home (Hero + Projects)
│   ├── about.astro
│   ├── resume.astro
│   ├── sitemap.astro
│   ├── design-system.astro         Style guide
│   ├── 404.astro                   Custom error page
│   └── projects/
│       └── [slug].astro          Dynamic case study route
├── layouts/
│   └── Layout.astro              HTML shell — head, meta, OG, fonts, Navbar, Footer, scripts
└── styles/
    └── globals.css               Tokens, type classes, animations, scrollbar
```

### Reference files (not part of build)
```
.reference/
├── stories/                      Old Storybook .stories.jsx files — patterns for future /design-system route
└── design-system-docs/           Old MDX docs (Color, Typography, Spacing, etc.)
```

---

## Routing

Astro file-based SSG routing with `<ClientRouter />` (ViewTransitions).

```
/                  → index.astro → Hero + Projects (WorkEntry cards)
/about             → about.astro → AboutContent.astro
/resume            → resume.astro → inline resume content
/sitemap           → sitemap.astro → inline sitemap
/design-system     → design-system.astro → style guide
/projects/:slug    → projects/[slug].astro → CaseStudy.astro
/404               → 404.astro → custom error page
```

All pages are pure Astro. Zero client-side hydration. Layout.astro handles all `<head>`, Navbar, Footer, and shared scripts.

---

## Project Data (`src/data/projects.js`)

Each project can include:
- `slug`, `title`, `company`, `year`, `tags`, `color`
- `headline`, `description`, `outcomes` — for WorkEntry card
- `images` (array, null slots ok), `video` — card media; `video` triggers LaptopFrame
- `videoGrid` — array of video URLs; triggers VideoGrid layout
- `image` — case study hero image
- `intro`, `problem`, `process`, `outcome` — case study text sections
- `role`, `duration`, `team` — case study meta
- `metaProblem` — short problem statement for meta strip
- `processMedia` — array of `{ id, label, caption, video, sectionLabel?, followedByInsight? }` for case study process section
  - `sectionLabel` — renders an h2 above the card (e.g. "Research", "Information Architecture")
  - `followedByInsight: true` — renders `keyInsight` callout after this card
- `keyInsight` — string; renders as left-border accent callout after the `followedByInsight` card
- `designDecisions` — array of `{ title, problem, decision, why }` — renders "Key design decisions" section; omit to hide
- `reflection` — string; renders as final section before nav
- `orientationNote` — string; renders below intro paragraph in muted color; use to orient readers about the product and point to homepage for final UI
- `ugaContent` — omit to hide section; `null` for placeholder; string to show content

---

## Key Components

### WorkEntry.astro
- `video` prop → renders LaptopFrame (laptop mockup with radial gradient wash from project color)
- `videoGrid` prop → renders VideoGrid (1/2/3+ raw videos, mobile detection for portrait framing)
- No video → renders ImageGrid (1/2/3+ image layouts with placeholder support)
- LaptopFrame: card bg `color-mix(in srgb, var(--fg) 6%, var(--surface))`, `overflow: hidden`, `translateY(30px)` cuts bottom
- Heading uses `data-animate-y` (VoiceOver safe), content uses `data-animate`

### LazyVideo.astro
- `data-lazy-video` attribute + inline `<script>` with IntersectionObserver
- Sets `src` and `autoplay` only when visible; `preload="none"` always
- `rootMargin: '600px'` for early loading
- Re-initializes on `astro:after-swap` for ViewTransitions

### CaseStudy.astro
- Renders hero (headline + meta strip), intro, problem, process, outcome sections
- `processMedia` array → ProcessMediaCard blocks with optional `sectionLabel` h2 and `keyInsight` callout
- `designDecisions` array → "Key design decisions" section; PROBLEM/DECISION/WHY use `type-label` class
- `orientationNote` → muted paragraph below intro
- `reflection` → section above nav
- Navigation: "All Projects" + "Next: [title]" links

### Navbar.astro
- Fixed header with CSS entrance animation (`@keyframes navbar-enter`)
- Logo: CSS `:hover { scale(1.1) }` `:active { rotate(180deg) scale(0.5) }`
- Active link detection via `Astro.url.pathname`
- Theme toggle: inline button with sun/moon SVGs and CSS-animated thumb

### Footer.astro
- CTA section + email copy button
- Clipboard via vanilla JS `navigator.clipboard.writeText()`
- "Copied" toast with CSS animation (`.copied-toast.show`)
- Copy pulse: CSS `@keyframes copy-pulse`

---

## Video Assets

Videos are gitignored (`public/images/*.mp4`, `public/images/*.mov`).
Keytrn videos hosted on Cloudinary (cloud: `dlqvgithx`, folder: `portfolio/`).

Local videos in `public/images/`:
- `keytrn-demo.mp4` — consumer app prototype
- `keytrn-notebooklm.mp4` — NotebookLM research session
- `keytrn-miro-ia.mp4` — Miro government portal IA
- `keytrn-figma-arch.mp4` — Figma platform architecture

**To convert screen recordings:** `avconvert` (macOS built-in, no ffmpeg needed).
Copy files to `/tmp` first if filename has spaces.

---

## Accessibility

### Heading hierarchy (VoiceOver quick nav: 1/2/3 keys)
- `h1` — Hero ("I'm Rob.") or page title
- `h2` — Section headings: Work, Footer CTA, case study sections
- `h3` — WorkEntry project titles, design decision titles

### Scroll animations + VoiceOver
**Never use `data-animate` (opacity: 0) on an element that contains a heading.** VoiceOver quick nav cannot find headings inside invisible elements. Use `data-animate-y` on heading containers (translateY only, always visible). Use `data-animate` on non-heading content within the same section.

Applied in:
- `index.astro` — h1 uses `data-animate-y`, subtext uses `data-animate`
- `WorkEntry.astro` — article uses `data-animate-y` (has h3), inner content div uses `data-animate`
- `CaseStudy.astro` — section h2s use `data-animate-y`, body text uses `data-animate`

---

## Performance

- Cabinet Grotesk self-hosted in `public/fonts/` (variable woff2)
- Ogg preloaded (hero "Rob" italic)
- Cloudinary preconnect in Layout.astro
- Use `http://127.0.0.1:4321` instead of `http://localhost` in dev — avoids macOS IPv6 resolution lag
- Dev server cache issues: fix with `rm -rf .astro node_modules/.vite` then restart
- Zero JavaScript frameworks shipped to browser
- Zero hydration — all pages are static HTML with CSS animations
- Only JS: ~30 lines vanilla (theme toggle, clipboard copy, scroll observer)

---

## Case Study Copy Rules

- **No em dashes** — use commas, colons, or periods instead
- **Statements over explanations**: "the design addressed it" not "the design could address it"
- **No hedging softeners**: avoid "the goal was", "this helped", "the idea was", "the plan was"
- **First person, active**: "I ran a moderated interview" not "research included a moderated interview"
- **No redundant labels**: when a `processMedia` item has `sectionLabel`, the card h3 label is suppressed — the h2 already names the section

---

## Known Gotchas

- **`@apply` + fontSize tokens**: `@apply text-display-2xl` fails inside `@layer components` — write clamp values as plain CSS instead.
- **Tailwind hyphenated spacing**: `gap-space-4` never generates CSS in JIT. Use standard numeric scale (`gap-6`) or the `space-*` tokens defined in config.
- **Font timing**: Use `document.fonts.ready`, not `document.fonts.load()`.
- **ViewTransitions + theme**: `astro:after-swap` must restore `.dark` class from localStorage — the swap replaces `<html>` and loses the class.
- **ViewTransitions + scroll observer**: `astro:after-swap` must re-initialize the IntersectionObserver to pick up new `data-animate` elements.
- **Navbar active state**: Uses `Astro.url.pathname` (server-rendered per page). No `transition:persist` — Navbar re-renders on each navigation so active state is always correct.
