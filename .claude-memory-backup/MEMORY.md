# Claude Memory — Rob Jones

## Who
Rob Jones — Product Designer. Building a personal portfolio site.

## Active Project
**Portfolio site** — Astro 6 (SSG) + React 19 islands + Tailwind v3 (PostCSS) + Framer Motion
Location: `~/Documents/Dev/portfolio/`
Dev server: `http://localhost:4321/` (Astro default)
Details: → see `portfolio.md`

## Keytrn (Separate Product)
Standalone PropTech app — not the portfolio.
Location: `~/Documents/Dev/keytrn/`
Backlog: `~/Documents/Dev/keytrn/BACKLOG.md` — full task list including tabled items
Doctrine: `~/Documents/Dev/keytrn/VECTOR.md` — product doctrine, design principles, business model

### Research artifacts (all in `/vector/research/`)
Consumer side:
- Personas: 5 — PER-001 Dana (statewide, v0.2), PER-002 Marcus, PER-003 Carla, PER-004 Ray (Pittsburgh local, v0.2), PER-008 Derek (national out-of-state investor, new)
- Competitive: 7 consumer + 2 infrastructure (COMP-001 to COMP-010)
- JTBDs: 5 drafted (JTBD-001 to JTBD-005)
- Assumptions: 7 (ASM-001 to ASM-007)
- Interviews: 3 synthetic (INT-001 to INT-003)
Supply side (government portal):
- PER-005 (Tax Claim Bureau Director), PER-006 (Sheriff Sale Administrator), PER-007 (Tax Claim Clerk)
- JTBD-006/007/008/009 (county jobs)
- COMP-010 (county software landscape)
- ASM-008/009
- OUTREACH-001 (Westmoreland County call script)
- PORTAL-CONCEPTS-001 (portal feature set)
- DESK-RESEARCH-002 (supply side), DESK-RESEARCH-003 (consumer side)

### Key product insight (from competitive research)
PropStream is a pre-foreclosure OUTREACH tool (skip tracing, dialers, postcards) — NOT auction discovery.
Foreclosure.com ($39.80/mo) is the closest real competitor. No competitor understands PA's three-tier sale structure (upset/judicial/repository). That is Keytrn's core moat.

### Scraper backend (session 3 — 2026-03-24)
Live Supabase `listings` table with 240+ scraped records.
- CountySuite scraper: 14 PA counties, weekly GitHub Actions cron
- TribLIVE scraper: Westmoreland County
- RealAuction scraper: 6 counties (Butler, Fayette, Lancaster, Lebanon, Washington, York)
- WPRDC disabled: wrong data source (mortgage foreclosure filings, not active sale schedule)
- Allegheny County needs dedicated scraper at `sheriffalleghenycounty.com/sheriffs-sales/`
- Geocoding pipeline built (scrapers/geocode.js — Nominatim, free). Run manually: `gh workflow run scrape.yml --field scraper=geocode` or trigger via GitHub Actions UI

### Routing (session 3)
Two routes for detail pages:
- `/property/[id]` — static properties, integer ID, passed as Astro prop
- `/listing?id=uuid` — scraped listings, UUID, DetailScreen self-fetches from Supabase

### Government portal research (session 4 — 2026-03-24)
11 supply-side investiture docs written in `vector/research/`:
- PER-005 (Tax Claim Bureau Director), PER-006 (Sheriff Sale Administrator)
- JTBD-006/007/008/009 (county jobs: publish listings, manage bidders, reduce calls, morning dashboard routine)
- COMP-010 (county software landscape — CountySuite, Tyler, Bid4Assets, RealAuction, Excel)
- ASM-008 (counties adopt free tools), ASM-009 (portal free forever is viable)
- OUTREACH-001 (Westmoreland County playbook — full call script, 3 questions, follow-up sequence)
- PORTAL-CONCEPTS-001 (portal feature set, county dashboard design, build gate)

Key strategic decisions made (session 4):
- Portal is free for counties forever — revenue from consumer Pro subscriptions
- Do NOT contact counties until Tier 2 features (lien warnings, "what you inherit") are live
- Do NOT build the portal until after first county conversation
- First contact: Westmoreland County Tax Claim Bureau Director
- County dashboard hero metric: unsold rate (what Commissioners measure)

### Desk research completed (session 4 — 2026-03-24)
Two desk research agents ran. Key findings that change product strategy:

SUPPLY SIDE (DESK-RESEARCH-002):
- GSS-PA is the dominant Tax Claim Bureau back-office software for 20+ PA counties — the clerk works inside it all day. Portal CSV upload must match GSS-PA export format.
- palegalads.org — free statewide legal notice database; sheriff sale notices 21 days before sale; path to full 67-county coverage with one scraper
- WPRDC has a dedicated postponement feed (separate resource from the mortgage filings dataset we disabled) — re-enable specifically for this
- Westmoreland surcharge was proposed March 2025, not yet confirmed enacted — OUTREACH-001 corrected
- CCAP Technology CORE (2023) is the formal adoption path for counties — cooperative agreement, not full RFP
- Philadelphia resumed sheriff sales July 2024 after 3-year pause; 4,700 sales/yr pre-pandemic; uses Bid4Assets — Bid4Assets scraper now HIGH priority
- Rule 3129.2 is the correct legal citation (not "Title 45")

CONSUMER SIDE (DESK-RESEARCH-003):
- PA is the #1 fix-and-flip ROI state nationally (80.2% Q2 2024); Pittsburgh #1 metro (110.9%), Scranton #2 (112.5%)
- PA is 3rd highest state for completed foreclosures (2,828 in 2024, growing YoY)
- PA properties rescheduled 2.5x on average vs 1.72 nationally — postponement tracking is #1 feature priority
- IRS 120-day right of redemption confirmed — title companies won't insure during this window; must flag on listings
- Deposit requirements vary widely by county: Philadelphia $10k flat, most in-person counties 10% of winning bid
- Repository sale content is essentially uncontested SEO territory
- County landing pages (/county/[slug]) have zero competition statewide
- Philadelphia deed delay lawsuit active (Sept 2024) — 200+ day average auction-to-deed

### Session 5 completed (2026-03-25)
Built in this session:
- DetailScreen extracted: 1019 lines → 346 lines. Tab components in `src/components/screens/detail/`
- Geocoding pipeline: `scrapers/geocode.js` (Nominatim, free). Auto-runs after weekly scrape. Manual: `gh workflow run scrape.yml --field scraper=geocode`
- saleTypes.js: IRS 120-day title cloud + 9-month owner-occupied redemption added to upset + judicial checklists
- Smart search: all 67 PA counties in suggestions, live Supabase listings searched (not just static seed)
- Personas updated: PER-001 statewide, PER-004 Pittsburgh-specific, PER-008 national investor (new)

### Session 6 completed (2026-03-25)
Built in this session:
- Full design token system: `src/styles/tokens.js` — 11-step type scale, light+dark colors, composed text presets. Zero hardcoded fontFamily/fontSize/color hex across all 30+ components.
- Shared utils: `scores.js`, `price.js`, `navigate.js`, `statusConfig.js`
- UI primitives: `SectionHeader.jsx`, `InfoRow.jsx`
- Scraper helpers: `scrapers/lib/helpers.js` — shared parseDollar, parseStatus, extractDate, parseAddressLine
- palegalads.org scraper (`scrapers/palegalads.js`) — PDF-based, primary intake for all PA counties. Weighted scoring for sale type detection. 15 counties configured.
- Sale type colors reconciled: tokens.js is single source, saleTypes.js imports. Colors = risk signals (green=safe, amber=danger, teal=verify).
- Price copy: sale-type-aware labels + plain-language context on detail page
- Null fallbacks in detail tabs, Pro card cleanup, TribLIVE regex fix
- Old scrapers (CountySuite, TribLIVE, RealAuction) disabled from weekly cron — manual only until verified clean
- Geocode fix: was referencing nonexistent `created_at` column, now uses `scraped_at`
- Expired listing cleanup: auto-marks past-date listings, UI filters them out

Session 6 continued:
- Map pins fix: split useEffect so markers render after async Supabase load, auto-fit bounds
- PropertyCard: satellite only on main (save API costs), Street View on demo branch
- Street View: address-based camera heading for better property photos
- Price tooltip: info icon next to price, tooltip drops down on hover/tap
- Detail tabs: fixed field names (parcelId not parcel, defendant not owner), added case number/plaintiff/attorney/sale date/municipality
- BidChecklist moved out of Sale Info tab — always visible below tabs
- Carousel: Street View shows first, satellite second
- Demo branch: 30 polished listings, all Street View verified, pushed to Vercel production
- Portfolio case study: updated with 5 new design decisions (scraper strategy, municipality pilot, design system, enrichment pipeline, homebuyer-first UX). Updated problem/process/solution/outcome.
- Portfolio WorkEntry: videoGrid layout (desktop full-width, mobile in card), --media-bg and --media-border tokens
- Google Cloud: reduced to 2 APIs (Street View Static + Maps Static), daily quota set

### Keytrn next session — start here
1. Fix palegalads parser — ~7 listings have null address/city/zip, plaintiff null on all
2. Expand palegalads county list — only 15 of 67 configured
3. Add Tax Claim Bureau sections (upset/repository/private sales)
4. County landing pages (/county/[slug])
5. Accounts + Stripe
6. Switch Vercel production back to main when ready to go live with real data

## File Structure (Documents/)
```
Documents/
├── Dev/
│   └── portfolio/          ← active portfolio project
├── Design/
│   └── spacing-system.md   ← spacing documentation guide
├── Work/                   ← professional work files
├── Personal/               ← personal docs
└── Archive/                ← old/2021 work
```

## APM Dashboard (Portfolio Demo)
Unbranded recreation of Honeywell APM dashboards for portfolio.
Location: `~/Documents/Dev/apm-dashboard/`
Stack: React 19 + Recharts + Tailwind v4 + Vite
Dev server: `http://localhost:5173/`

### Doctrine (complete)
- VECTOR.md, CLAUDE.md, ARCHITECTURE.md (12-col grid, layout system, token rules)
- 9 ADRs: dark theme, desaturated colors, KPI borders, storytelling density, collapsible sidebar, fluid type, fault tree, screen naming, sidebar/notifications mutual exclusion
- INTERVIEW-001 (product walkthrough), INTERVIEW-002 (engineer decision flow, 10-step chain)
- DESK-RESEARCH-001 (dashboard design patterns), FIGMA-REVIEW-001 (gap analysis)
- INTERACTION-SPEC-001 (all hover/click/tooltip/transition specs)
- Architecture audit (health: POOR, tokens defined but not adopted)

### Screen names (ADR-008, portfolio-friendly)
Plant Overview, Asset Inspection, Root Cause Analysis, Trends, Work Orders, Investigations

### Figma SVGs on Desktop
Asset-Health.svg, Asset-Health-Dark-Theme.svg, Asset-Details.svg

### Next session -- START HERE
Full rebuild from audit findings. See IMPLEMENTATION-PLAN-001 Step 0.
Every component rewritten against: grid-12 system, type composition classes, token variables, even pixel values, 400-line file limit.
Rename files first (AssetHealth→PlantOverview, AssetDetails→AssetInspection).
Break oversized files into sub-components.
Then build missing screens (RootCauseAnalysis, WorkOrders, Investigations).
Direction: Rob's vision of what should have been, not what shipped.

## Key Preferences
- No emojis
- Concise responses
- No em dashes in copy (see `feedback_writing.md`)
- Spacing system: 4px/8px grid, 9 tokens (space-1=4px → space-9=128px)
- Tailwind custom spacing tokens with hyphenated keys (space-1 etc.) DO NOT generate JIT classes — use standard Tailwind numeric scale instead (see portfolio.md)

## Portfolio — Current Status
Site is live on Vercel. All pages built, accessible, SEO-clean.

### What's done
- Astro SSG migration complete — React islands with `client:load`
- All 5 projects in `projects.js` with full case study copy
- Keytrn case study fully built (3 process videos + final prototype, all on Cloudinary)
- All WorkEntry + case study headlines shortened to 5-6 words
- Accessibility: aria-labels, no nested main, valid HTML structure
- SEO: no opacity:0 in SSR (y-only Framer Motion animations), HTML sitemap at `/sitemap`
- Deleted: `Cursor.jsx`, `useCursor.js` (Rules of Hooks crash + not needed)
- Cloudinary: Cloud `dlqvgithx`, videos under `portfolio/` folder, URLs live in projects.js

### Video assets (local only, gitignored)
- `public/images/keytrn-demo.mp4`, `keytrn-notebooklm.mp4`, `keytrn-miro-ia.mp4`, `keytrn-figma-arch.mp4`
- `upload-videos.mjs` at project root (gitignored) — reuse when adding more

### Pending
- Last screen recording for Keytrn prototype (user will drop on desktop)
- Figma hero design review (user will share URL)
- Images/assets for Aysa, Honeywell APM, Honeywell Warehouse, Sinta case studies
- Two asset cards below Keytrn on homepage (component interaction screenshots — user provides)
- UGA Business Law Clinic section — set `ugaContent` in projects.js once content ready

## Roadmap
→ see `roadmap.md` — 3-phase plan (Phase 1: job-ready portfolio, Phase 2: Storybook cleanup, Phase 3: design system doc site)

## Case Study Interviews
→ see `interviews.md` — raw notes from Rob's interviews on each project. Use this to write accurate case study copy.
- Honeywell APM + Warehouse formally interviewed (2026-03-15)
- Aysa, Keytrn, Sinta: partial only — need formal interviews

## Pending Work
- `project_keytrn.md` — Keytrn standalone project, token scaffold ready, tokens need defining
- `project_portfolio_tailwind_migration.md` — Portfolio Tailwind v3→v4 migration plan, not started

## Job Search Tools (set up 2026-02-24)
- **Proficiently plugin** installed (`claude plugin list` shows v1.0.0 enabled)
  - NEW SESSION required to use — say "run proficiently setup" to onboard
  - Resume for setup: `~/Documents/Dev/portfolio/public/RobJonesResume.pdf`
  - Skills: job-search, tailor-resume, cover-letter, network-scan
- **LinkedIn (Composio)** connected — MCP server at `~/.local/share/mcp-servers/linkedin-composio.py`
  - API key in `~/.claude.json` under `mcpServers.linkedin`
  - Composio key: ak_P3y0UVTId9coj8SWGX4z (rotate at platform.composio.dev)
  - Actions: company lookup, profile info, create/delete posts
  - NOT useful for job search — use Proficiently for that
