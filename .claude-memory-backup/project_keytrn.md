---
name: Keytrn project status
description: Status and pending work for the Keytrn standalone project at ~/Documents/Dev/keytrn/
type: project
---

## Keytrn Project

Separate standalone project at `~/Documents/Dev/keytrn/` — Astro 6 + React + Tailwind v4 (not the portfolio).

This is a prototype/app design project with its own token system and component system.

### Stack
- Astro 6 minimal template
- React integration
- Tailwind v4 via `@tailwindcss/vite` (no tailwind.config.js — tokens in CSS @theme)

### Status
Scaffold complete. `src/styles/global.css` has full `@theme {}` token scaffold with all categories defined but **all values are empty placeholders** — waiting to be defined with the user.

### Pending: Define all design tokens
File: `src/styles/global.css`

Categories needing values filled in:
- `--font-sans`, `--font-display`, `--font-mono`
- `--color-brand`, `--color-brand-subtle`, `--color-brand-on`
- Neutrals: `--color-bg`, `--color-surface`, `--color-surface-raised`, `--color-border`, `--color-fg`, `--color-fg-secondary`, `--color-fg-disabled`
- Semantic: `--color-success`, `--color-warning`, `--color-error`, `--color-info`
- `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`
- `--shadow-sm`, `--shadow-md`, `--shadow-lg`

Start by asking: fonts, brand color, dark/light UI direction.
