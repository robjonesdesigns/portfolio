# ADR-001: Warm Cream Palette Over White

**Date:** 2026-03-25
**Status:** accepted
**Deciders:** Rob Jones

## Context

The portfolio needed a background color that set the right tone: calming, professional, and luxurious without being sterile. Initial research explored pink as a brand direction. Findings from the drunk-tank pink study (Baker-Miller Pink) showed the original calming claims were debunked: the color actually increased agitation, and the research carried sexist assumptions about pink as emasculating. Pink also carries cultural weight from Trans and Gay rights movements that added unintended heaviness to the brand.

Orange and auburn are proven calming tones, but a coworker had already chosen auburn as their brand. Maroon/burgundy became the accent color instead: warm, calm, a touch of luxury. Pink is still a personal favorite (Rob wears a pink hat daily, visible in his portfolio photo), so the brand needed to complement that.

## Decision

Use `#fffbf5` (warm cream) as the page background instead of pure white. The cream softens the contrast with the burgundy accent (`#813746`), making the palette feel luxurious and easier to read. Pure white with burgundy was too stark and too strong. The cream melts with the maroon.

The palette is also cohesive with Rob's photo: pink hat, cream sweater, warm black leather jacket. Brand and personal presentation are unified.

## Consequences

- The warm tone differentiates the portfolio from the majority of white-background design portfolios
- Text contrast ratios remain AA compliant (verified)
- Dark mode uses `#1c1a16` (warm dark) to maintain the same warmth, not a cold gray
- All surface and background tokens carry the warm undertone consistently

## Alternatives Considered

- **Pure white (`#ffffff`):** Too stark with burgundy. Felt clinical, not calming.
- **Pastel pink:** Debunked calming claims, cultural heaviness, risk of not reading as professional.
- **Auburn/orange background:** Proven calming, but already taken by a coworker's brand.
