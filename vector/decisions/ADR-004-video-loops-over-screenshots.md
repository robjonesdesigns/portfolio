# ADR-004: Video Loops Over Static Screenshots on Homepage

**Date:** 2026-03-25
**Status:** accepted
**Deciders:** Rob Jones

## Context

Most design portfolios headline projects with a company name and a static screenshot or mockup. The homepage becomes a grid of thumbnails that show what was designed but not how it works or behaves.

## Decision

Use looping video recordings on homepage WorkEntry cards instead of static screenshots. Headline each project with an action or outcome, not the company name.

Inspired by a coworker's portfolio that used video loops. The approach shows deliberate interaction design: full flows, not just screen handoffs. A recruiter or hiring manager can skim the homepage and understand every product, its problems, its outcomes, and see the actual interactions without clicking into a single case study.

## Consequences

- The homepage tells a complete story without requiring clicks
- Videos are lazy-loaded (IntersectionObserver) to protect performance
- Larger asset footprint than static images (mitigated by Cloudinary hosting with auto-format)
- Videos must loop cleanly and play silently
- Each project's video must demonstrate interaction quality, not just visual design

## Alternatives Considered

- **Static screenshots:** Show one moment, not a flow. Miss the interaction design signal.
- **Figma prototype embeds:** Slow to load, inconsistent rendering, breaks on mobile.
- **Laptop frame mockups:** Used initially, then removed for Keytrn in favor of raw video. The mockup added visual noise without adding information.
