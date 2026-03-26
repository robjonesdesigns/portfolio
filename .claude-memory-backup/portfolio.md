---
name: Portfolio project full reference
description: Stack, tokens, file structure, components, gotchas — full technical reference for the portfolio site
type: project
---

# Portfolio Project — Full Reference

## Location & Stack
- **Path:** `~/Documents/Dev/portfolio/`
- **Dev server:** `npm run dev` → `http://localhost:4321/` (Astro default)
- **Stack:** Astro 6 (SSG) + React 19 islands (`client:load`), Vite, Tailwind CSS v3.4 via PostCSS, Framer Motion 12
- **Routing:** Astro file-based routing (`src/pages/`), React Router removed
- **Deployed:** Vercel, auto-deploys from `main` on GitHub

## Architecture — Astro Islands
- Astro handles static HTML generation; React components mount as islands with `client:load`
- Each page component is self-contained (Navbar, Footer, content all inside the React island)
- Children cannot be passed from Astro to React islands — each page component includes its full shell
- `src/layouts/Layout.astro` — base HTML shell, imports `globals.css`, sets meta/OG tags
- `src/pages/*.astro` — thin wrappers that import the React page component

## Design Tokens

### Colors (CSS variables + Tailwind classes)
| Token | Light | Dark |
|---|---|---|
| `--bg` | `#fffbf5` (cream) | `#1c1a16` |
| `--fg` | `#222222` | `#fffbf5` |
| `--accent` | `#813746` (burgundy) | `#e36f86` (rose) |
| `--on-accent` | `#fffbf5` | `#1c1a16` |
| `--surface` | `#f7f3f5` | `#252220` |
| `--border` | `rgba(34,34,34,0.1)` | `rgba(255,251,245,0.1)` |

Dark mode via `.dark` class on `<html>` (manual toggle + OS detection).

### Tailwind color classes
`text-fg`, `bg-surface`, `text-brand-primary`, `bg-brand-primary`, `text-on-accent`

### Fonts
- `font-display` → Cabinet Grotesk (Fontshare CDN, non-blocking load)
- `font-editorial` → Ogg (local trial .otf files in `/public/fonts/`)
- `font-body` → Areal (local, `/public/fonts/`)

### Spacing System — 4px/8px grid
| Token | px | Tailwind |
|---|---|---|
| space-1 | 4px | `1` |
| space-2 | 8px | `2` |
| space-3 | 16px | `4` |
| space-4 | 24px | `6` |
| space-5 | 32px | `8` |
| space-6 | 48px | `12` |
| space-7 | 64px | `16` |
| space-8 | 96px | `24` |
| space-9 | 128px | `32` |

**CRITICAL:** Hyphenated keys like `gap-space-4` never generate Tailwind JIT CSS. Always use numeric value (`gap-6`).

---

## File Structure
```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx          floating pill → docked header on scroll
│   │   └── Footer.jsx          CTA + email copy + sitemap link
│   ├── sections/
│   │   ├── Hero.jsx            CircleLetters name + eyebrow + marquee
│   │   ├── About.jsx           split layout, headshot + skills chips
│   │   ├── Projects.jsx        WorkEntry list
│   │   └── Contact.jsx
│   ├── pages/
│   │   ├── HomePage.jsx        full home page shell
│   │   ├── ResumePage.jsx      full resume page shell
│   │   └── CaseStudyPage.jsx   wraps CaseStudy.jsx
│   ├── ui/
│   │   ├── WorkEntry.jsx       project card (LaptopFrame or ImageGrid)
│   │   ├── LazyVideo.jsx       IntersectionObserver lazy loader for videos
│   │   ├── CircleLetters.jsx   SVG circle-fill typography
│   │   ├── Badge.jsx
│   │   ├── Button.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── PageTransition.jsx
│   │   ├── Marquee.jsx
│   │   └── ThemeToggle.jsx     suppressHydrationWarning, span not div inside button
│   └── case-study/
│       └── CaseStudy.jsx
├── hooks/
│   └── useTheme.js             OS detection + localStorage
├── data/
│   └── projects.js             project data array (source of truth for all content)
├── pages/                      Astro file-based routes
│   ├── index.astro
│   ├── resume.astro
│   ├── sitemap.astro           HTML sitemap (for SEO/crawlers)
│   └── projects/
│       └── [slug].astro        dynamic case study routes
└── styles/
    └── globals.css             CSS variables, font-face, base styles, noise overlay
```

**Deleted:** `Cursor.jsx`, `useCursor.js` — removed entirely (Rules of Hooks violation + not needed)

---

## Key Components

### WorkEntry.jsx
- `video` prop → `LaptopFrame` (laptop mockup with radial gradient wash from project color)
- No `video` → `ImageGrid` (1/2/3+ image layouts with aspect-ratio slots)
- Placeholder text uses `text-body md:text-body-lg` (same as body text, not caption)

### LazyVideo.jsx
- `IntersectionObserver` with `rootMargin: '200px'`
- Sets `src` and `autoPlay` only when visible; `preload="none"` always
- Use everywhere instead of raw `<video>` tags

### CaseStudy.jsx
- `ProcessMediaCard` — labeled video cards with captions
- `fadeUp` variant: `hidden: { y: 24 }` — NO opacity (text always visible to crawlers)
- `processMedia` array → multiple process cards
- `ugaContent` field: omit = hide section, `null` = placeholder text, string = show content

### ThemeToggle.jsx
- `suppressHydrationWarning` on the button — server/client theme mismatch is expected
- Uses `<span display:block>` for the thumb, not `<div>` (div invalid inside button)

---

## Framer Motion / SSR — Critical Rules
- **Never use `initial={{ opacity: 0 }}`** on content that needs to be crawler-visible
- Use `y`-only animations for headings and body text: `hidden: { y: 24 }`, `show: { y: 0 }`
- `opacity: 0` in `initial` gets rendered into static HTML by Astro → invisible to Google
- Above-fold headings use `slideUp` variant (y-only). All case study text uses y-only fadeUp.

---

## Navbar.jsx — Floating pill → docked morph
Framer Motion animates left/right/top/borderRadius/height on scroll.
Margin breakpoints: xl=300, md=60, default=16.

---

## Tailwind — PostCSS only (no @astrojs/tailwind)
`@astrojs/tailwind` is incompatible with Astro 6 (only supports up to v5). Removed.
Tailwind works via existing `postcss.config.js` — no integration needed.

---

## Video Assets — Cloudinary (done)
- Cloud: `dlqvgithx` — videos under `portfolio/` folder
- All video URLs in `projects.js` point to Cloudinary CDN
- `.env` at project root has credentials (gitignored)
- `upload-videos.mjs` at project root (gitignored) — reuse when adding more videos
- Local copies still in `public/images/` (gitignored): `keytrn-demo.mp4`, `keytrn-notebooklm.mp4`, `keytrn-miro-ia.mp4`, `keytrn-figma-arch.mp4`

---

## Sitemap
- `/sitemap` — HTML sitemap page at `src/pages/sitemap.astro`
- Lists all pages + 5 case studies
- Footer links to it

---

## Known Gotchas
- **Tailwind hyphenated keys**: `gap-space-4` never generates CSS. Use `gap-6`.
- **Framer Motion opacity in SSR**: `initial={{ opacity: 0 }}` bakes invisible text into static HTML. Use y-only animations.
- **ThemeToggle hydration**: Server always renders light theme; suppress the warning, don't try to fix it server-side.
- **Astro + React islands**: Can't pass children from Astro to React island. Each page component is a complete shell.
- **Font URL encoding**: Fontshare URL uses `f%5B%5D=` (not `f[]=`) to pass W3C validation.
- **`<div>` inside `<button>`**: W3C error — use `<span style={{ display: 'block' }}>` instead.

---

## Resume Page — /resume
- File: `src/components/pages/ResumePage.jsx`
- PDF: `public/RobJonesResume.pdf`
- Contact: robjonesdesigns@gmail.com · 470-382-0603 · LinkedIn: robjonesdesigner
- Sections: Experience (Honeywell + Freelance), Education, Skills (Tools + Frameworks)
- Download button has `aria-label="Download Rob Jones resume as PDF"`
- LinkedIn link has `aria-label="LinkedIn profile (opens in new tab)"`

---

## Storybook
- Run: `npm run storybook` from portfolio dir
- Config: `.storybook/preview.jsx` + `.storybook/main.js`
- Stories: `src/stories/` (Design System MDX) + `src/components/ui/*.stories.jsx`
- All Elements MDX docs done (Color, Typography, Spacing, Themes, Motion, Logo)
- Component MDX docs done: Button, Badge, WorkEntry, ThemeToggle, Marquee, Navbar, PageTransition
