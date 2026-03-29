# ADR-002: Three-Font Typography System

**Date:** 2026-03-25
**Status:** accepted
**Deciders:** Rob Jones

## Context

Most portfolios use one or two fonts. Three is unusual and risks visual noise. Each font needed a clear role and a reason to exist.

## Decision

Three fonts, each with a distinct purpose:

**Cabinet Grotesk (display/headings):** A grotesk with distinctive shapes that creates visual appeal on its own. Chosen for the way it pairs with Areal: the geometric structure of a grotesk next to a neo-grotesk body creates contrast without conflict.

**Areal (body text):** Discovered through the 99% Invisible podcast. Areal includes an am dash (not an em dash): a character that looks like an em dash but with serifs, one going down on one end and the other going up. It is a deliberate statement about human touch, since the em dash has become a signal of AI-generated text. Compared to Arial (the Windows system font that defined early screen readability), Areal is slightly more spacious and modern, closer to Lato. Created by Dynamo. The choice carries a lineage: Arial as one of the original computer fonts for readability, Areal as its modern successor with a human signature baked in.

**Ogg (editorial accent, trial font):** Based on a typeface created by a designer named Ogg using pen nibs, white-out, and hand tools. The italic forms and wingdings are delicate and distinctive. Used sparingly (one-off editorial moments only, per license). The shapes of the R and b in "Rob" create an almost reversible visual balance. Adds a human, crafted quality that the other two fonts (both geometric) do not carry.

## Consequences

- Three fonts requires careful hierarchy to avoid visual noise: display, body, and accent roles are strict
- Cabinet Grotesk self-hosted in `/public/fonts/` (variable woff2)
- Areal is self-hosted in `/public/fonts/`
- Ogg is a trial font, restricted to one-off use
- The am dash in Areal is a conversation starter in interviews

## Alternatives Considered

- **Single font (Inter, DM Sans):** Safe but generic. No personality.
- **Two fonts (display + body):** Considered, but Ogg added a human quality that the two geometric fonts lacked.
- **Arial as body:** Too associated with default/lazy typography. Areal carries the readability lineage without the baggage.
