# ADR-006: Custom Build (Astro + React) Over Design Tools

**Date:** 2026-03-25
**Status:** accepted
**Deciders:** Rob Jones

## Context

Design portfolios are commonly built with Framer, Webflow, Squarespace, or templates. These tools are fast but limit control over accessibility, performance, and code quality. Rob wanted complete control and wanted to learn systems-level code, not just screen-level design.

## Decision

Build the portfolio from scratch using Astro 6 (SSG), React 19 (islands), Tailwind CSS v3, and Framer Motion. No drag-and-drop. No design tool export. Production code written by the designer.

## Consequences

- Complete control over HTML structure, accessibility (WCAG AA, VoiceOver-navigable), and performance
- Demonstrates technical capability that most product designers do not have
- A strong differentiator for founder audiences (PER-002) who value designers that can ship without engineers
- The portfolio site itself becomes a design artifact and craft signal (PER-003)
- Higher maintenance cost than a managed platform
- Astro SSG means fast static pages with React interactivity only where needed

## Alternatives Considered

- **Framer:** Fast, beautiful, but limited control over accessibility and HTML structure.
- **Webflow:** Good for marketing sites, but the code export is messy and hard to maintain.
- **Squarespace/template:** Would not demonstrate technical capability. Looks generic.
- **Next.js:** Considered, but Astro's SSG-first approach with React islands is lighter and faster for a portfolio.
