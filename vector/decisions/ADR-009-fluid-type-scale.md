# ADR-009: Fluid Type Scale with clamp()

**Date:** 2026-03-25
**Status:** accepted
**Deciders:** Rob Jones

## Context

Responsive typography typically uses media query breakpoints that snap text sizes at specific viewport widths. This creates abrupt visual changes during resize and requires managing multiple size definitions per breakpoint.

## Decision

Use CSS `clamp()` for all display-level typography so headings scale smoothly across viewports. Body text uses a single responsive step at `md:` breakpoint (16px mobile, 20px desktop) since body text needs to be readable at specific sizes, not fluid.

## Consequences

- Headlines feel natural at every screen size, not just the breakpoints they were designed for
- No abrupt text size jumps during resize
- Slightly harder to predict exact text size at a given viewport width
- Body text remains fixed-step for readability (fluid body text can become too small or too large at extremes)

## Alternatives Considered

- **Fixed breakpoints for everything:** Standard approach, but headers looked wrong between breakpoints.
- **Fully fluid (including body):** Body text at 13px on small screens is unreadable. Fixed steps are safer.
- **Viewport units (vw):** Unpredictable without clamp bounds. clamp() gives the fluidity with guardrails.
