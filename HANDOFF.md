# Portfolio Handoff -- Session 18 End

## START HERE
Three-layer layout system, section depth shadows, APM case study copy updates. Design token cleanup planned (backlog).

## Deployed
https://designedbyrob.com

## Next session priorities

### 1. Design token consolidation
Tokens are split across three places with some redundancy. Plan:
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

### 4. CSP hash-based script-src (backlog)
Any change to inline theme script requires hash update in `vercel.json`.

## What was completed this session (18)

### Three-layer layout system
- Consistent hero (`--bg`) / content (`bg-subtle`) / footer (`--bg`) sandwich on all pages.
- Case study and about heroes flipped from `bg-subtle` to `--bg`.
- Resume split into hero (name + contact + PDF button) and content section (`bg-subtle`).
- `shadow-section-down` and `shadow-section-up` utility classes replace border dividers.
- Theme-aware shadow opacity: light 7% warm tint, dark 25% black.
- `relative z-10` on hero/footer so shadows paint above adjacent content sections.

### APM case study copy
- Headline: "Turning equipment data into decisions for reliability engineers" (was repeating SUS scores from outcomes).
- Problem: "Engineers couldn't quickly see what was failing, why, or what to do next." (was an assumption).
- Outcome: names all three shipped dashboards (Plant Overview, Asset Inspection, compressor performance).

## Previous sessions
- Session 13: APM case study live with videos, before/after, research images
- Session 15: Outcomes rewritten, theme toggle fix, view demo button, GitHub link
