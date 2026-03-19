---
project:
  name: portfolio
  description: Personal portfolio site for Rob Jones, Product Designer
  stage: development
  started: 2026-02-28
  repo: https://github.com/robjonesdesigns/portfolio.git
owner:
  name: Rob Jones
knowledge:
  research: ./vector/research/
  decisions: ./vector/decisions/
  audits: ./vector/audits/
---

# VECTOR — Portfolio

> Read this file first. It defines what this project is, who it is for, and why decisions are made the way they are. CLAUDE.md is the agent briefing. ARCHITECTURE.md is the technical spec.

---

## Core Relationship

This project is built in collaboration with Claude Code (Anthropic). The relationship is:

**Rob Jones is the operator. Claude is the contractor.**

Rob sets direction, makes taste calls, owns the content, and approves what ships. Claude handles implementation complexity — code, structure, debugging, copy refinement — and defers to Rob on vision and creative decisions.

Claude does not add features, refactor unprompted, or make "improvements" beyond what was asked. Rob does not need to explain why he wants something a particular way. Trust runs both directions.

---

## What This Project Is

A personal portfolio site for Rob Jones, a Product Designer with 4+ years of experience across enterprise SaaS (Honeywell) and early-stage startups. The site presents case studies, a resume, and contact information to hiring managers, recruiters, and product teams considering Rob for mid-level product design roles.

The site is also a demonstration of technical capability — Rob built it himself using Astro, React, Framer Motion, and Tailwind, which is uncommon for a product designer and worth noting.

---

## Target Audience

**Primary:** Hiring managers and recruiters at product companies evaluating Rob for UX/Product Designer roles (mid-level, $80-120k range).

**Secondary:** Founders and early-stage teams looking for a solo product designer who can move fast and own end-to-end design.

**Not for:** Other designers critiquing the code. Agency creative directors (different portfolio needed). Junior roles.

---

## Core Value Proposition

Rob's work is research-driven, systems-aware, and ships. The portfolio demonstrates:
- Primary research ownership (screeners, moderated sessions, affinity mapping)
- End-to-end product design (0→1 and enterprise SaaS)
- Architectural and systems thinking beyond typical designer scope
- Real outcomes (SUS scores, views, funding rounds, acquisitions)

---

## What This Is Not

- A design agency showcase
- A creative director portfolio (separate site planned for that)
- A developer portfolio
- A Framer or Webflow template

---

## Seven Principles

*These are Investiture defaults — universal principles for any project built with this framework.*

1. **Intent before implementation.** Understand what you are building and why before touching code. VECTOR.md exists so this question is always answered.

2. **Doctrine over memory.** What is written in VECTOR.md, CLAUDE.md, and ARCHITECTURE.md is authoritative. Do not rely on conversational context that will be lost between sessions.

3. **Reality over aspiration.** Document what the project actually is, not what it might become. Aspirational doctrine causes confusion and drift.

4. **Constraints are features.** The rules in ARCHITECTURE.md exist because someone learned something the hard way. Follow them before questioning them.

5. **Small surface, high confidence.** A smaller codebase with well-understood conventions is better than a large one with unclear ownership. Do not add complexity that does not serve the current goal.

6. **The operator's taste is law.** Claude implements. Rob decides. Disagreements are surfaced as options, not overrides.

7. **Ship and iterate.** The portfolio is a live product. Perfection is the enemy of progress. Get work out, get feedback, improve.

---

## Design Principles

1. **Process over polish.** Case studies show thinking, not just final screens. How a decision was made matters more than how it looks.

2. **Conversational but professional.** Copy reads like Rob explaining his work in an interview — direct, plain language, no corporate buzzwords, no em dashes.

3. **Accessibility is not optional.** WCAG AA minimum. VoiceOver-navigable. Framer Motion animations never hide headings from screen readers.

4. **Performance is respect.** Fast load times signal care. Videos are lazy-loaded. Fonts are non-blocking. Every asset has a reason to exist.

5. **The homepage is the product.** Final UI lives on the homepage as WorkEntry cards. Case studies are the process documentation behind it.

---

## Constraints

- **NDA:** Honeywell work cannot show real client data or branded screenshots. Assets must be de-branded recreations.
- **Equity/IP:** Keytrn designs are Rob's per UGA Business Law Clinic recommendation. Aysa work was done under informal equity arrangement — no formal IP assignment.
- **Font license:** Ogg is a trial font — one-off editorial use only, not for body copy or headings.
- **Videos:** Gitignored locally. All Keytrn videos hosted on Cloudinary (cloud: `dlqvgithx`).
- **Deployment:** Vercel free tier — static only, no server functions.

---

## Quality Gates

- WCAG AA on all pages (axe-core verified)
- No `initial={{ opacity: 0 }}` on elements containing headings (VoiceOver quick nav)
- No hardcoded colors outside CSS custom properties
- All copy reviewed for em dashes, AI-sounding phrasing, and passive voice before shipping
- Case study copy reviewed against interview notes in `memory/interviews.md` for accuracy

---

## Research Status

| Type | Location | Status |
|------|----------|--------|
| Project interviews | `~/.claude/projects/-Users-robjones/memory/interviews.md` | Keytrn complete, Honeywell complete, Aysa complete, Sinta complete |
| Personas | `./vector/research/personas/` | Not yet created |
| JTBD | `./vector/research/jtbd/` | Not yet created |
| Competitive | `./vector/research/competitive/` | Not yet created |
| Assumptions | `./vector/research/assumptions/` | Not yet created |
| Decisions | `./vector/decisions/` | Not yet created |
