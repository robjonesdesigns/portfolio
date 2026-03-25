# ADR-003: Dark Mode Support with System Preference Detection

**Date:** 2026-03-25
**Status:** accepted
**Deciders:** Rob Jones

## Context

Many design portfolios skip dark mode. It adds design and engineering work for a feature that may not affect hiring decisions directly.

## Decision

Support dark mode with automatic system preference detection and a manual toggle. The portfolio respects the user's OS setting on first load, then allows them to switch.

## Consequences

- Demonstrates systems thinking: one token system drives both themes cohesively
- Shows the portfolio visitor that Rob designs for both modes, not as an afterthought
- The toggle lets hiring managers see both versions, which is itself a portfolio artifact
- All color tokens have light and dark variants, enforced through CSS custom properties
- Burgundy (`#813746`) is not accessible on dark backgrounds, so dark mode uses rose (`#e36f86`) instead: same brand family, different value

## Alternatives Considered

- **Light only:** Simpler but misses the systems thinking signal.
- **Dark only:** Too niche. Most hiring managers default to light mode.
- **No toggle (system preference only):** Considered, but the toggle lets visitors deliberately compare both themes.
