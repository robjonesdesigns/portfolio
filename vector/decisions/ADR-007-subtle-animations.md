# ADR-007: Subtle Scroll Animations Over Flashy Transitions

**Date:** 2026-03-25
**Status:** accepted
**Deciders:** Rob Jones

## Context

Animation can enhance or distract. Flashy page transitions and entrance effects draw attention to the portfolio's craft but can overwhelm the content and create accessibility issues (motion sensitivity, screen reader interference).

## Decision

Use Framer Motion for subtle slide-up animations triggered by scroll position. No flashy page transitions, no parallax, no bouncing elements. Each section animates independently with `whileInView`. Graceful, not performative.

## Consequences

- Content is never hidden from screen readers (no `initial={{ opacity: 0 }}` on heading containers)
- Animations feel natural to the scroll, not imposed on it
- Reduced motion preferences are respected
- The restraint itself signals design maturity: knowing when not to animate

## Alternatives Considered

- **No animation:** Considered, but the page felt flat and static without any motion.
- **Page transitions (exit/enter):** Too flashy. Adds load time perception. Breaks back-button expectations.
- **Parallax scrolling:** Accessibility nightmare. Motion sensitivity issues. Distracts from case study content.
