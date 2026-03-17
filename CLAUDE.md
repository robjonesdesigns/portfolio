# Portfolio — Claude Context

Rob Jones. Product Designer. This is a personal portfolio site.

**Path:** `~/Documents/Dev/portfolio/`
**Dev server:** `npm run dev` → `http://localhost:4321/` (falls back to 4322, 4323 if port is in use)
**Stack:** Astro 6 (SSG) + React 19 islands + Tailwind CSS v3.4 + Framer Motion

---

## Design Tokens

### CSS Variables (dark mode via `.dark` on `<html>`)
| Variable | Light | Dark |
|---|---|---|
| `--bg` | `#fffbf5` (cream) | `#1c1a16` |
| `--fg` | `#222222` | `#fffbf5` |
| `--accent` | `#813746` (burgundy) | `#e36f86` (rose) |
| `--on-accent` | `#fffbf5` | `#1c1a16` |
| `--surface` | `#f7f3f5` | `#252220` |
| `--border` | `rgba(92,82,80,0.1)` | `rgba(176,168,158,0.1)` |
| `--fg-secondary` | `#6e6562` | `#c2bab0` |
| `--bg-subtle` | `#fdf8f2` | `#201e1a` |

### Tailwind Color Classes
`text-fg`, `text-fg-secondary`, `text-brand-primary`, `bg-brand-primary`, `text-on-accent`, `bg-surface`, `bg-subtle`, `border-token`, `border-token-strong`

---

## Typography System

### Font Families (`tailwind.config.js` → `fontFamily`)
| Tailwind class | Font | Source |
|---|---|---|
| `font-display` | Cabinet Grotesk | Fontshare CDN |
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
| `text-caption` | 12px | Captions |

### Type Composition Classes (`globals.css` → `@layer components`)
Use these everywhere — one class handles font, size, weight, and color.

**Display** (Cabinet Grotesk, bold, fluid clamp, `text-fg`):
```
type-display-2xl   type-display-xl   type-display-lg   type-display-md   type-display-sm
```

**Body** (Areal, 16px mobile → 20px desktop):
| Class | Color | Weight | Notes |
|---|---|---|---|
| `type-body` | `text-fg` | 400 | Body paragraphs |
| `type-label` | `text-fg-secondary` | 700 | Uppercase section labels |
| `type-link` | `text-brand-primary` | 400 | Inline links, opacity on hover |
| `type-badge` | `text-fg` | 400 | Metadata / tag text |
| `type-nav-link` | `text-fg` | 500 | Nav links — underline handled in component |

**Rule:** utilities always override composition classes. `type-body text-brand-primary` works as expected.

---

## Spacing — 4px/8px grid (`tailwind.config.js` → `spacing`)
| Token | px | Tailwind class |
|---|---|---|
| space-xs | 4px | `p-space-xs`, `gap-space-xs` |
| space-sm | 8px | `p-space-sm` |
| space-md | 16px | `p-space-md` |
| space-lg | 24px | `p-space-lg` |
| space-xl | 32px | `p-space-xl` |
| space-2xl | 48px | `p-space-2xl` |
| space-3xl | 64px | `p-space-3xl` |
| space-4xl | 96px | `p-space-4xl` |
| space-5xl | 128px | `p-space-5xl` |

---

## File Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx          Fixed top bar — logo, nav links, theme toggle
│   │   └── Footer.jsx          CTA + email copy + sitemap link
│   ├── sections/
│   │   ├── Hero.jsx            CircleLetters + eyebrow + marquee
│   │   ├── About.jsx
│   │   ├── Projects.jsx        WorkEntry list
│   │   └── Contact.jsx
│   ├── pages/
│   │   ├── ResumePage.jsx      Full resume page (Navbar + Footer included)
│   │   └── SitemapPage.jsx     Sitemap page (Navbar + Footer included)
│   ├── ui/
│   │   ├── WorkEntry.jsx       Project card — LaptopFrame or ImageGrid
│   │   ├── LazyVideo.jsx       IntersectionObserver lazy loader for videos
│   │   ├── CircleLetters.jsx   SVG circle-fill typography
│   │   ├── Badge.jsx
│   │   ├── Button.jsx
│   │   ├── PageTransition.jsx
│   │   ├── Marquee.jsx
│   │   └── ThemeToggle.jsx
│   └── case-study/
│       └── CaseStudy.jsx
├── data/
│   └── projects.js             All project content and case study data
├── pages/                      Astro pages — SSG routes
│   ├── index.astro             Home
│   ├── resume.astro
│   ├── sitemap.astro
│   └── projects/
│       └── [slug].astro        Dynamic case study route
├── hooks/
│   └── useTheme.js
├── layouts/
│   └── Layout.astro            HTML shell — head, meta, OG tags, font loading
└── styles/
    └── globals.css
```

---

## Routing

Astro file-based SSG routing.

```
/                  → index.astro → Home (Hero, About, Projects, Contact)
/resume            → resume.astro → ResumePage.jsx (client:load)
/sitemap           → sitemap.astro → SitemapPage.jsx (client:load)
/projects/:slug    → projects/[slug].astro → CaseStudy.jsx (client:load)
```

React components that need interactivity use `client:load`. Layout.astro handles all `<head>` — meta, OG tags, canonical, fonts.

---

## Project Data (`src/data/projects.js`)

Each project can include:
- `slug`, `title`, `company`, `year`, `tags`, `color`
- `headline`, `description`, `outcomes` — for WorkEntry card
- `images` (array, null slots ok), `video` — card media; `video` triggers LaptopFrame
- `image` — case study hero image
- `overview`, `problem`, `process`, `solution`, `outcome` — case study text
- `role`, `duration`, `team` — case study meta
- `processMedia` — array of `{ id, label, caption, video }` for case study process section
- `finalMedia` — `{ label, caption, video }` for case study solution section (defined in data but not currently rendered in CaseStudy.jsx)
- `designDecisions` — array of `{ title, problem, decision, why }` — renders a "Design decisions" section with Problem/Decision/Why for each entry; omit to hide
- `ugaContent` — omit to hide section; `null` for placeholder; string to show content

---

## Key Components

### WorkEntry.jsx
- `video` prop → renders `LaptopFrame` (laptop mockup with radial gradient wash)
- No `video` → renders `ImageGrid` (1/2/3+ image layouts)
- `LaptopFrame`: card bg `color-mix(in srgb, var(--fg) 6%, var(--surface))`, `overflow: hidden`, `translateY(30px)` cuts bottom

### LazyVideo.jsx
- `IntersectionObserver` with `rootMargin: '200px'`
- Sets `src` and `autoPlay` only when visible; `preload="none"` always
- Use everywhere instead of raw `<video>` tags

### CaseStudy.jsx
- `ProcessMediaCard` renders labeled video cards with captions
- `processMedia` array → multiple process cards
- `designDecisions` array → "Design decisions" section, each entry shows title + Problem/Decision/Why
- `finalMedia` → defined in data but not yet rendered in CaseStudy.jsx

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
- `h1` — Hero ("I'm Rob.")
- `h2` — Section headings: Work, About, Footer CTA
- `h3` — WorkEntry project titles

VoiceOver users navigate: `1` → hero, `2` → Work, `3` → cycle all project cards, `2` → About, `2` → Footer CTA.

### Framer Motion + VoiceOver
**Never set `initial={{ opacity: 0 }}` on an element that contains a heading.** VoiceOver quick nav cannot find headings inside invisible elements. Fix: animate `y` only on the outer wrapper, fade opacity on an inner `<m.div>` so the heading is always visible in the DOM.

Applied in:
- `Hero.jsx` — word spans use `initial={{ opacity: 1, y: 12 }}` (slide only, never hidden)
- `WorkEntry.jsx` — outer `<m.article>` slides (`y` only), inner `<m.div>` fades so `h3` is always findable

---

## Known Gotchas

- **`@apply` + fontSize tokens**: `@apply text-display-2xl` fails inside `@layer components` — write clamp values as plain CSS instead.
- **Tailwind hyphenated spacing**: `gap-space-4` never generates CSS in JIT. Use standard numeric scale (`gap-6`) or the `space-*` tokens defined in config.
- **Framer Motion + CSS transform conflict**: Don't put `transform: translateY()` inline on a `motion.*` element that also uses `whileHover={{ scale }}`. Wrap in a plain div for positioning.
- **Font timing**: Use `document.fonts.ready`, not `document.fonts.load()`.
- **CircleLetters hover**: Only animate `r` and `opacity` in keyframes — adding transform causes `forwards` fill to block the hover scale.
