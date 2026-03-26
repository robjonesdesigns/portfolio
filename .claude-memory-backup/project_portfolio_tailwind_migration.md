---
name: Portfolio Tailwind v4 migration
description: Planned migration of portfolio from Tailwind v3 (PostCSS) to Tailwind v4 (Vite plugin + @theme CSS tokens)
type: project
---

## Portfolio → Tailwind v4 Migration

User decided to migrate the portfolio to Tailwind v4 for readability and consistency with the Keytrn project.

### Motivation
- Tokens in CSS (@theme) are more readable than split across tailwind.config.js + globals.css
- Native CSS variables visible in DevTools
- Consistency: both portfolio and Keytrn on same system

### Plan
1. Branch the portfolio repo
2. Swap `@tailwindcss/postcss` → `@tailwindcss/vite` in astro.config.mjs
3. Replace `@tailwind base/components/utilities` directives with `@import "tailwindcss"` in globals.css
4. Move all tailwind.config.js tokens into `@theme {}` block in globals.css
5. Run dev server, do visual audit of all pages for broken utilities (shadows, rings, spacing)
6. Fix anything broken before merging

### Status
Not started — user saving for tomorrow (2026-03-19, resuming 2026-03-20).
