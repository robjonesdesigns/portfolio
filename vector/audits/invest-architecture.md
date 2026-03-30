# Architecture Audit

**Scope:** src/
**Doctrine source:** CLAUDE.md
**Date:** 2026-03-30 (rewritten -- previous audit 2026-03-21 was pre-Astro rewrite)
**Files scanned:** 17 source files (Astro, JS, CSS)

## Summary

Architecture health: **Excellent**

Complete rewrite from React + Framer Motion to pure Astro SSG (session 10, 2026-03-27). Zero React, zero client-side frameworks. All animations are CSS. Interactivity is vanilla JS. Token system fully adopted. No violations.

## Violations

None.

## Full Results

### CONTENT: PASS
- All project data centralized in src/data/projects.js
- No content hardcoded in components
- Sitemap page (sitemap.astro) is pure Astro, no hardcoded slugs

### TOKENS: PASS
- Zero hardcoded hex colors in components
- All colors via CSS custom properties (--bg, --fg, --accent, --surface, etc.)
- Dark mode via .dark class on html, variables swap in globals.css
- WorkEntry laptop-shell colors now use CSS variables in globals.css

### SIZE: PASS
All files under 400 lines except data and CSS token files (acceptable):

| File | Lines | Role |
|------|-------|------|
| src/data/projects.js | 461 | Project data (no logic) |
| src/styles/globals.css | 428 | Tokens, type classes, animations |
| src/components/case-study/CaseStudy.astro | 273 | Case study renderer |
| src/components/ui/WorkEntry.astro | ~200 | Project card |
| All others | <200 | |

### NAMING: PASS
- PascalCase for components, camelCase for variables
- File names match component purpose
- Consistent Tailwind class usage

### INLINE STYLES: PASS
- Inline styles are CSS custom property references (theme-aware, cannot be extracted without breaking maintainability)
- Zero hardcoded hex, rgba, or pixel values in inline styles
- All font sizes use type composition classes or Tailwind tokens

### IMPORTS: PASS
- No reverse import direction violations
- ui/ and data/ do not import from pages or sections
- Only import: ClientRouter from astro:transitions (used)

### ACCESSIBILITY: PASS
- data-animate-y on heading containers (VoiceOver safe)
- data-animate on non-heading content
- Skip link present
- Semantic HTML throughout (header, nav, main, article, section, footer)
- prefers-reduced-motion disables all animations
- Theme toggle is semantic button with aria-label

### SECURITY: PASS
- CSP headers in vercel.json (script-src, style-src, img-src, frame-ancestors)
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy restricts camera, microphone, geolocation
- Zero API keys or secrets in source

### PERFORMANCE: PASS
- Zero JavaScript frameworks shipped to browser
- ~30 lines vanilla JS total (theme, clipboard, scroll observer)
- Cabinet Grotesk self-hosted woff2, preloaded
- Cloudinary preconnect for video assets
- LazyVideo with IntersectionObserver (preload="none", rootMargin 600px)

### DEPENDENCIES: PASS
- 1 production dep (astro)
- 6 dev deps (eslint, autoprefixer, globals, postcss, tailwindcss, @eslint/js)
- Zero unused dependencies (cleaned 2026-03-30: removed 8 stale React/Storybook deps)

### GIT HYGIENE: PASS
- Clean semantic commit messages (prefix + description)
- No embarrassing messages
- Linear history, no force pushes

## Previous Audit (2026-03-21) -- Superseded

The previous audit flagged 5 medium violations in React components (SitemapPage.jsx, WorkEntry.jsx, Button.jsx). All of those files were deleted during the Astro rewrite (session 10). The entire React component tree, Storybook, and Framer Motion were removed. This audit replaces that one entirely.
