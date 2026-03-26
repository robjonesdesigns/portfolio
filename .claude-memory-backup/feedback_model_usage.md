---
name: Model usage preference
description: Use Sonnet for implementation/coding, Opus for architecture and complex parsing logic
type: feedback
---

Use Sonnet for all implementation and coding work (file edits, component updates, applying patterns, mechanical refactors). Use Opus for scraper parsing logic, architectural decisions, research, and planning.

**Why:** Sonnet is faster for mechanical tasks. Opus is better for nuanced logic and design decisions.

**How to apply:** When spawning agents for code changes, set `model: "sonnet"`. Keep Opus for the main conversation and for agents doing research, parser development, or architectural planning.
