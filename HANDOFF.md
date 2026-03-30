# Portfolio Handoff -- Session 18 End

## START HERE
Three-layer layout, section shadows, navbar elevation, skills restructure, full copy pass across all 5 case studies. Design token cleanup planned (backlog).

## Deployed
https://designedbyrob.com

## Next session priorities

### 1. Design token consolidation
Tokens split across three places with redundancy. Plan:
- Move `bg-subtle`, `border-token`, `border-token-strong`, `media`, `media-light`, `media-border`, `media-border-light` into Tailwind config colors so Tailwind auto-generates all utility variants.
- Remove hand-written utilities that duplicate what Tailwind config already generates (`text-fg`, `text-fg-secondary`, `text-accent`, `bg-bg`, `bg-surface`, `bg-accent`).
- Keep in `@layer utilities`: only `shadow-section-down` / `shadow-section-up` (theme-aware compound shadows Tailwind can't generate).
- Keep in `@layer components`: all 11 `type-*` composition classes.
- Consider adding: z-index scale (`z-nav`, `z-overlay`, `z-modal`).
- End state: zero redundancy, all tokens in Tailwind config, utilities only for things Tailwind can't do.
- No HTML changes needed -- class names stay the same.

### 2. APM case study assets
Depends on Asset Inspection screen being built in APM dashboard.
- Asset Inspection processMedia image/video (id: asset-details-structure, currently "coming soon")
- Final Asset Inspection video (finalMedia, currently null)

### 3. `/design-system` route
Differentiator for technical hiring managers. Content in `.reference/` (old Storybook stories + MDX docs).

### 4. `--surface` color review
Current `#f7f3f5` has a cool/pink undertone that clashes with the warm palette. Used in navbar theme toggle, media containers, tertiary buttons. Needs a warmer replacement (e.g. `#f5f1eb`). Dark mode `#252220` is fine.

### 5. CSP hash-based script-src (backlog)
Any change to inline theme script requires hash update in `vercel.json`.

## What was completed this session (18)

### Three-layer layout system
- Consistent hero (`--bg`) / content (`bg-subtle`) / footer (`--bg`) sandwich on all pages.
- Case study and about heroes flipped from `bg-subtle` to `--bg`.
- Resume split into hero (name + contact + PDF button) and content section (`bg-subtle`).
- `shadow-section-down` and `shadow-section-up` utility classes (theme-aware: light 7% warm tint, dark 25% black).
- `relative z-10` on hero/footer so shadows paint above adjacent content sections.

### Navbar elevation
- Background switched from `--surface` to `--bg` (matches hero/footer dark frame).
- Border-bottom replaced with warm shadow (theme-aware dark override).
- Navbar is now the highest elevation layer in the visual hierarchy.

### Skills restructure
- Skills section removed from about page (about is the story, resume is credentials).
- Resume skills section: two columns -- "What I Use" (tools) and "What I Do" (methods + skills merged).
- Added to resume: React, Astro, Product Strategy, Interaction Design, Prototyping, Accessibility, Front-End Development.
- Renamed "Frameworks" to split across "Methods" and "Skills" categories.

### Full copy pass -- all 5 case studies
Headlines rewritten to ground recruiter in domain (what the product is), not process or metrics:
- **APM**: "Turning equipment data into decisions for reliability engineers"
- **Keytrn**: "Making foreclosure data accessible for the first time in Pennsylvania"
- **Warehouse**: "Two dashboards and a platform-wide usability audit for warehouse operations"
- **Aysa**: "Helping consumers see how ethically companies operate before they buy"
- **Sinta**: "Giving interviewers a way to capture structured data without breaking eye contact"

Outcomes rewritten to reflect actual deliverables:
- **APM**: Owned 3 shipped dashboards, contributed to 2 more. SUS low 70s to high 80s.
- **Keytrn**: Live product with real scraped data. Primary research across 20+ counties defined IA.
- **Warehouse**: Shipped Merge Dashboard and Homepage. Heuristic eval led to platform-wide UXQA.
- **Aysa**: 15,000+ views first rollout. Pitch deck used in $2.1M seed round outreach.
- **Sinta**: Founders pitched investors from designs. Five complete flows from zero existing screens.

### Sinta correction
- Removed unconfirmed acquisition/funding claims from headline, outcomes, and resume bullet.
- Per interview notes: no confirmed acquisition or VC raise. Founders pitched from designs, design agency later hired to continue the work.

### Case study hero
- Now renders all outcome bullets (was only showing first one).
- Matches WorkEntry card format.

### APM case study
- Problem rewritten: grounded in observation, not assumption.
- Outcome: names all 5 dashboards (3 owned, 2 contributed).

## Previous sessions
- Session 13: APM case study live with videos, before/after, research images
- Session 15: Outcomes rewritten, theme toggle fix, view demo button, GitHub link
