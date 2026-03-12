# Portfolio — Claude Context

Rob Jones. Product Designer. This is a personal portfolio site.

**Path:** `~/Documents/Dev/portfolio/`
**Dev server:** `npm run dev` → `http://localhost:5173/`
**Stack:** React 19, Vite 7, Tailwind CSS v3.4, Framer Motion 12, React Router v7

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
| `--border` | `rgba(34,34,34,0.1)` | `rgba(255,251,245,0.1)` |

### Tailwind Color Classes
`text-fg`, `bg-surface`, `text-brand-primary`, `bg-brand-primary`, `text-on-accent`

### Fonts
- `font-display` → Cabinet Grotesk (Fontshare CDN)
- `font-editorial` → Ogg (local, `/public/fonts/`)
- `font-body` → Areal (local, `/public/fonts/`)

### Spacing — 4px/8px grid
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

**CRITICAL:** Hyphenated keys like `gap-space-4` never generate CSS in Tailwind JIT.
Always use the numeric Tailwind value: `gap-6` (not `gap-space-4`).

---

## File Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx          floating pill → docked on scroll
│   │   └── Footer.jsx
│   ├── sections/
│   │   ├── Hero.jsx            CircleLetters + eyebrow + marquee
│   │   ├── About.jsx
│   │   ├── Projects.jsx        WorkEntry list
│   │   └── Contact.jsx
│   ├── ui/
│   │   ├── WorkEntry.jsx       project card with LaptopFrame or ImageGrid
│   │   ├── LazyVideo.jsx       IntersectionObserver lazy loader for videos
│   │   ├── CircleLetters.jsx   SVG circle-fill typography
│   │   ├── Badge.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── PageTransition.jsx
│   │   ├── Marquee.jsx
│   │   ├── ThemeToggle.jsx
│   │   └── Cursor.jsx
│   └── case-study/
│       └── CaseStudy.jsx
├── data/
│   └── projects.js             project data array
├── pages/
│   └── Resume.jsx
├── hooks/
│   ├── useTheme.js
│   └── useCursor.js
└── styles/
    └── globals.css
```

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
- `finalMedia` — `{ label, caption, video }` for case study solution section
- `ugaContent` — omit field to hide section; set `null` for placeholder text; set string to show content

---

## Key Components

### WorkEntry.jsx
- `video` prop → renders `LaptopFrame` (laptop mockup card with radial gradient wash)
- No `video` → renders `ImageGrid` (1/2/3+ image layouts)
- `LaptopFrame`: card bg `color-mix(in srgb, var(--fg) 6%, var(--surface))`, `overflow: hidden`, laptop screen only (no base), `translateY(30px)` cuts bottom

### LazyVideo.jsx
- `IntersectionObserver` with `rootMargin: '200px'`
- Sets `src` and `autoPlay` only when visible; `preload="none"` always
- Use everywhere instead of raw `<video>` tags

### CaseStudy.jsx
- `ProcessMediaCard` renders labeled video cards with captions
- `processMedia` array → multiple process cards
- `finalMedia` → single solution card

---

## Video Assets

Videos are gitignored (`public/images/*.mp4`, `public/images/*.mov`).
Not yet hosted remotely — stored locally only.

Current videos in `public/images/`:
- `keytrn-demo.mp4` — consumer app prototype (homepage + case study final)
- `keytrn-notebooklm.mp4` — NotebookLM research session
- `keytrn-miro-ia.mp4` — Miro government portal IA
- `keytrn-figma-arch.mp4` — Figma platform architecture

**To convert screen recordings:** `avconvert` (macOS built-in, no ffmpeg needed).
Copy files to `/tmp` first if filename has spaces.

---

## Routing

React Router v7. `vercel.json` has SPA rewrite rule.

```
/                  → Home (Hero, About, Projects, Contact)
/projects/:slug    → CaseStudy
/resume            → Resume
```

Nav links starting with `/#` use `<a>` + `handleAnchor`. Page routes use `<Link>`.

---

## Gitignore Notes

- `public/images/*.mp4` and `*.mov` — videos excluded
- `src/pages/KeytrnPrototype.jsx` — local-only prototype for screen recording

---

## Known Gotchas

- **Tailwind hyphenated keys**: `gap-space-4` never generates CSS. Use `gap-6`.
- **Framer Motion + CSS transform conflict**: Don't put `transform: translateY()` inline on a `motion.*` element that also uses `whileHover={{ scale }}`. Wrap in a plain div for positioning; let the motion element only handle scale.
- **Font timing**: Use `document.fonts.ready`, not `document.fonts.load()`.
- **CircleLetters hover**: Only animate `r` and `opacity` in keyframes — adding transform causes `forwards` fill to block the hover scale.
