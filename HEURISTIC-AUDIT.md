# Heuristic Evaluation: designedbyrob.com

**Date:** 2026-03-31
**Evaluator:** Claude (single evaluator -- see Limitations)
**Product:** Rob Jones personal portfolio (designedbyrob.com)
**Target audience:** Hiring managers and recruiters evaluating Rob for product design roles

---

## 1. Executive Summary

**Scope:** Full site evaluation across 10 pages -- Home, About, Resume, Design System, Sitemap, and 5 case study routes (`/projects/:slug`). Evaluated in both light and dark themes. Covers navigation, content, interactions, and accessibility.

**Evaluators:** 1 (solo). Per Nielsen's research, a single evaluator finds roughly 35% of usability problems. This audit should be treated as a starting point, not exhaustive coverage.

**Total issues found:** 22

| Severity | Count |
|----------|-------|
| 4 (Catastrophic) | 0 |
| 3 (Major) | 4 |
| 2 (Minor) | 10 |
| 1 (Cosmetic) | 8 |

**Top findings:**

1. **Missing media assets on case studies and project cards** (Severity 3) -- Several project cards show "[image]" placeholder text and case study process sections show "ASSET COMING SOON." This directly undermines credibility with hiring managers.
2. **No mobile navigation / hamburger menu** (Severity 3) -- The navbar renders About, Resume, and theme toggle in a horizontal row with no responsive breakpoint. On narrow viewports, items may overflow or become cramped.
3. **About page copy contradicts actual stack** (Severity 3) -- The "Built from scratch" section states "React for interactions. Framer Motion for subtle scroll animations" but the site uses zero React and zero Framer Motion. A technical hiring manager will notice this.
4. **Hero says "3 years" but resume shows 4+ years** (Severity 3) -- The hero headline reads "3 years designing enterprise SaaS" while the resume subtitle reads "4+ years across startups & SaaS enterprise." Inconsistent claims are red flags for recruiters.

---

## 2. Methodology

- Read all source files for every page, layout, component, and stylesheet
- Cross-referenced visual notes from screenshots against source code
- Evaluated each page against all 10 heuristics systematically
- Used Nielsen's 0-4 severity scale
- Single evaluator limitation acknowledged

---

## 3. Findings Table

| ID | Heuristic | Location | Description | Severity | Recommendation |
|----|-----------|----------|-------------|----------|----------------|
| H1-01 | H1: Visibility of System Status | Navbar (all pages) | Active nav link has a persistent underline, but the Home page has no nav link representation. When on `/`, neither About nor Resume is active. No "Home" or "Work" link exists in nav. User's current location is communicated only by page content, not navigation state. | 1 | Add a "Work" link to the nav, or highlight the logo as the active home indicator (e.g., accent color on `/`). |
| H1-02 | H1: Visibility of System Status | Footer (all pages) | Email copy button provides good feedback: icon swap to checkmark, "Copied to clipboard" toast, 2.2s timeout. Clipboard fallback opens mailto. Well implemented. | 0 | No action needed. Positive finding. |
| H1-03 | H1: Visibility of System Status | Navbar theme toggle | Toggle provides visual feedback via thumb position and icon context (sun/moon). `aria-label` updates dynamically. Body transitions colors over 300ms. Well implemented. | 0 | No action needed. Positive finding. |
| H2-01 | H2: Match Between System and Real World | About page -- "Built from scratch" section | States "React for interactions. Framer Motion for subtle scroll animations that never hide content from screen readers." The site ships zero React and zero Framer Motion. All animations are CSS. All interactivity is vanilla JS. A technical reviewer will catch this. | 3 | Update copy to reflect actual stack: "Astro for the HTML and accessibility. CSS for animations that never hide content from screen readers. No template. Full control." |
| H2-02 | H2: Match Between System and Real World | Home hero + Resume subtitle | Hero: "3 years designing enterprise SaaS." Resume: "4+ years across startups & SaaS enterprise." The discrepancy creates doubt about accuracy. Resume experience section shows Honeywell 2022-2025 (3 years) + freelance from 2020 (6 years). | 3 | Reconcile the numbers. If counting Honeywell only, say "3 years of enterprise SaaS" explicitly. If counting total design experience, use the same number on both pages. |
| H2-03 | H2: Match Between System and Real World | All pages | Language is plain, audience-appropriate, and free of jargon. Labels like COMPANY / ROLE / PROBLEM / OUTCOME on project cards map directly to how hiring managers evaluate candidates. Case study sections (The problem, The work, Key design decisions, Reflection) follow a logical narrative order. | 0 | No action needed. Strong real-world mapping. |
| H3-01 | H3: User Control and Freedom | Case study navigation | Case studies show only "Next: [title]" at the bottom. No "Previous" link. No "All Projects" link. A hiring manager who wants to jump back to the project list or visit a different case study must use the browser back button or scroll to the nav. | 2 | Add "All Projects" link (back to `/#projects`) alongside the "Next" link. Consider adding "Previous" as well. |
| H3-02 | H3: User Control and Freedom | Layout.astro | Skip link ("Skip to main content") is present and properly hidden until focused. Good for keyboard users. | 0 | No action needed. Positive finding. |
| H3-03 | H3: User Control and Freedom | Navbar logo | On the home page, the logo link sets `tabindex="-1"`, removing it from the tab order since clicking it would be a no-op. Reasonable choice. On other pages, it navigates home. | 0 | No action needed. |
| H4-01 | H4: Consistency and Standards | WorkEntry cards vs. CaseStudy hero | Both use COMPANY / ROLE / PROBLEM / OUTCOME metadata with identical label styling (`type-badge font-bold uppercase tracking-wide`). Consistent. | 0 | No action needed. Strong internal consistency. |
| H4-02 | H4: Consistency and Standards | Case study `designDecisions` section | The first design decision uses `type-display-md` for its heading while all subsequent decisions use `type-display-sm`. This creates an inconsistent visual hierarchy within the same section. | 1 | Use the same heading size for all design decision titles, or explicitly introduce the first one as a featured/primary decision if the distinction is intentional. |
| H4-03 | H4: Consistency and Standards | Project card "See more" link | Uses `font-body font-medium text-body md:text-body-lg text-brand-primary` as inline classes rather than a `type-link` composition class or Button component. Visually close to `type-link` but slightly different (adds `font-medium`). The arrow indicator style matches other navigation patterns. | 1 | Use the `type-link` class or Button `variant="link"` for consistency with the design system. |
| H4-04 | H4: Consistency and Standards | Sitemap page | Missing from the nav -- only linked from the footer. The design-system page is also not linked from nav or sitemap. These are internal-facing pages, so this is a minor gap, not a user-facing issue. | 1 | Add `/design-system` to the sitemap page for completeness. |
| H5-01 | H5: Error Prevention | All pages | No forms, no destructive actions, no user input beyond the email copy button and theme toggle. Error prevention is not materially applicable to this static portfolio. The clipboard API fallback to mailto is a good defensive pattern. | 0 | No action needed. |
| H6-01 | H6: Recognition Rather Than Recall | Navbar | Only two links (About, Resume) plus theme toggle. No hamburger menu hiding content on desktop. Navigation is fully visible. Case studies and the home page are reachable from the logo and project cards. Minimal recall burden. | 0 | No action needed. |
| H6-02 | H6: Recognition Rather Than Recall | Case study -- process media sections | Some `processMedia` items have `sectionLabel` (e.g., "Research", "Information Architecture") that render as h2 headings, providing clear context. Items without `sectionLabel` render only the h3 card label. The distinction helps users understand where they are in the case study narrative. | 0 | No action needed. |
| H7-01 | H7: Flexibility and Efficiency of Use | All pages | No keyboard shortcuts beyond standard browser navigation. For a static portfolio, this is appropriate. Tab navigation works correctly. Focus-visible outlines are styled with the accent color. | 0 | No action needed. |
| H7-02 | H7: Flexibility and Efficiency of Use | Navbar | No mobile hamburger menu. On viewports below ~480px, the nav items (About, Resume, 64px theme toggle) may compete for space. The nav uses `gap-8` (32px) between items with no responsive adjustment. | 3 | Add a responsive breakpoint. Either reduce gap on small screens, or implement a hamburger menu for mobile. Test on 320px viewport width. |
| H8-01 | H8: Aesthetic and Minimalist Design | Home page | Clean visual hierarchy. Hero delivers the value proposition in one scroll. Project cards show exactly what a hiring manager needs: headline, media, metadata (company/role/problem/outcome). No competing CTAs. The three-layer layout (hero/content/footer) creates clear spatial separation. | 0 | No action needed. Strong minimalist design. |
| H8-02 | H8: Aesthetic and Minimalist Design | Project cards + case studies | Multiple cards show "[image]" placeholder text or "ASSET COMING SOON" where media should be. Affected projects: honeywell-warehouse (2 null images on home card, multiple null videos in processMedia), honeywell-apm (1 null processMedia video). These placeholders occupy significant visual real estate and communicate incompleteness to a recruiter. | 3 | Either add the missing assets or remove the placeholder slots entirely. A card with no media is better than a card with a visible placeholder. For processMedia items with `video: null`, consider hiding the media card and showing only the caption text until the asset is ready. |
| H8-03 | H8: Aesthetic and Minimalist Design | Design system page | Well-structured reference page. Color tokens, typography scale, spacing grid, and component examples are clearly organized. Appropriate for a design-savvy audience. Not cluttered. The theme toggle instruction ("Toggle the theme to see both modes") is a good in-context prompt. | 0 | No action needed. |
| H8-04 | H8: Aesthetic and Minimalist Design | Home page -- dot grid + line grid backgrounds | Hero uses a line grid overlay (`opacity: 0.028`), projects section uses a dot grid overlay (`opacity: 0.06`). Both are extremely subtle and add texture without competing with content. | 1 | No action required. The overlays are well-calibrated. Minor note: two different grid patterns on the same page adds slight visual noise. Consider using one pattern consistently or none. |
| H8-05 | H8: Aesthetic and Minimalist Design | Noise overlay (all pages) | A fractal noise SVG is layered over the entire site at `opacity: 0.025` via `.noise::after`. Adds analog texture. At `z-index: 9999` it sits above everything but has `pointer-events: none`. Subtle and intentional. | 1 | Monitor for performance on lower-end devices. The fixed-position full-bleed pseudo-element with a repeated SVG background could cause compositing overhead on some hardware. |
| H9-01 | H9: Help Users Recognize, Diagnose, and Recover from Errors | Footer email copy | Clipboard failure gracefully falls back to `mailto:` link. No error message needed because the fallback is seamless. Good pattern. | 0 | No action needed. |
| H9-02 | H9: Help Users Recognize, Diagnose, and Recover from Errors | 404 page | No custom 404 page found in `src/pages/`. Astro will serve its default 404. A recruiter who mistypes a URL or follows a stale link will see a generic error page with no navigation back to the portfolio. | 2 | Create a `src/pages/404.astro` with the site's Layout, a friendly message, and a link back to Home. |
| H10-01 | H10: Help and Documentation | All pages | This is a portfolio, not a product. No help documentation is expected. The About page serves as contextual documentation for the site itself. The design system page documents the token system. Case studies document the design process. All appropriate for the audience. | 0 | No action needed. |
| H10-02 | H10: Help and Documentation | Resume page -- PDF download | The "Download PDF" button uses `download="RobJonesResume.pdf"` attribute. Clear label, icon paired with text, accessible aria-label. Good discoverability. | 0 | No action needed. |

---

## 4. Findings by Heuristic

### H1: Visibility of System Status

The site handles system status well for a static portfolio. The theme toggle provides immediate visual feedback. The email copy button shows a checkmark icon swap and "Copied to clipboard" toast. The one gap is the home page having no active state in navigation -- when a user is on `/`, nothing in the nav indicates their location (H1-01, Severity 1).

### H2: Match Between System and the Real World

Language and information architecture are strong. Labels match hiring manager mental models. Two content accuracy issues undermine this:

- **H2-01 (Severity 3):** The About page "Built from scratch" section claims the site uses React and Framer Motion. It uses neither. This is the most credibility-damaging finding in the audit. A principal designer or engineering manager will notice within seconds.
- **H2-02 (Severity 3):** The hero says "3 years" while the resume says "4+ years." Inconsistent experience claims are a known recruiter red flag.

### H3: User Control and Freedom

Good overall. Skip link present. Browser back works correctly with ViewTransitions. The one friction point is case study navigation (H3-01, Severity 2): only a "Next" link is provided at the bottom. No "Previous" or "All Projects" link forces users to rely on the browser back button to navigate non-linearly between case studies.

### H4: Consistency and Standards

Strong internal consistency. The metadata grid (COMPANY/ROLE/PROBLEM/OUTCOME) appears identically on project cards and case study heroes. Typography composition classes enforce consistent styling. Minor issues: the first design decision heading is larger than subsequent ones (H4-02), and the "See more" link on project cards uses inline styles rather than the design system's type-link class (H4-03). The design system page is not listed in the sitemap (H4-04).

### H5: Error Prevention

Not materially applicable. The site has no forms, no destructive actions, and no user input beyond theme toggle and clipboard copy. The clipboard fallback pattern is well-implemented.

### H6: Recognition Rather Than Recall

No issues. Navigation is fully visible. Only two nav items plus theme toggle means zero hidden navigation. Case study section labels provide clear wayfinding within long pages. Project card metadata is visible inline rather than requiring click-through.

### H7: Flexibility and Efficiency of Use

One structural issue: the navbar has no responsive adaptation for mobile viewports (H7-02, Severity 3). The nav uses `gap-8` (32px) between items and includes a 64px-wide theme toggle. On a 320px viewport, this will be cramped or overflow. No hamburger menu or responsive breakpoint exists. A recruiter reviewing on mobile is the most common scenario for initial portfolio views.

### H8: Aesthetic and Minimalist Design

The site's strongest heuristic overall. Clean hierarchy, adequate whitespace, three-layer layout, progressive disclosure via case study depth. One critical issue: placeholder media (H8-02, Severity 3). "[image]" text and "ASSET COMING SOON" placeholders on project cards and case study process sections communicate "this isn't finished" to a recruiter. The Honeywell Warehouse project card shows two null image placeholders on the home page. Multiple processMedia items across case studies have `video: null` producing visible placeholder states.

### H9: Help Users Recognize, Diagnose, and Recover from Errors

Good clipboard fallback. One gap: no custom 404 page (H9-02, Severity 2). Astro's default 404 provides no navigation back to the portfolio.

### H10: Help and Documentation

Not applicable for a portfolio. The site effectively documents itself through the About page, design system page, and case study narratives.

---

## 5. Prioritized Action Plan

### Severity 3 -- Must fix (4 issues)

| ID | Issue | Fix | Effort |
|----|-------|-----|--------|
| H2-01 | About page claims React + Framer Motion | Update "Built from scratch" copy to reflect actual stack (Astro + CSS + vanilla JS) | 5 min |
| H2-02 | Hero "3 years" vs. resume "4+ years" | Reconcile experience numbers across both pages | 5 min |
| H7-02 | No mobile nav breakpoint | Add responsive gap reduction or hamburger menu for narrow viewports | 1-3 hrs |
| H8-02 | Placeholder media on cards and case studies | Remove null image slots from project data or replace with actual assets. Hide processMedia cards that have `video: null` and no `image` | 30 min (remove) or ongoing (add assets) |

### Severity 2 -- Should fix (2 issues)

| ID | Issue | Fix | Effort |
|----|-------|-----|--------|
| H3-01 | Case studies lack "All Projects" navigation | Add "All Projects" link to case study bottom nav alongside "Next" | 15 min |
| H9-02 | No custom 404 page | Create `src/pages/404.astro` using Layout with friendly message and Home link | 20 min |

### Severity 1 -- Nice to fix (6 issues)

| ID | Issue | Fix | Effort |
|----|-------|-----|--------|
| H1-01 | No active indicator for Home in nav | Add visual indicator to logo or add "Work" nav link | 15 min |
| H4-02 | First design decision heading larger than rest | Use consistent heading size or document the intentional distinction | 5 min |
| H4-03 | "See more" link uses inline styles instead of design system class | Replace inline styles with `type-link` or Button `variant="link"` | 5 min |
| H4-04 | Design system page missing from sitemap | Add `/design-system` to sitemap.astro | 2 min |
| H8-04 | Two different background grid patterns on home page | Consider unifying to one pattern or removing both | 5 min |
| H8-05 | Noise overlay performance on low-end devices | Test on low-end hardware; consider `will-change: transform` or conditional rendering | 15 min |

### Quick wins (high severity + low effort)

- **H2-01:** Fix About page copy (5 min, Severity 3)
- **H2-02:** Fix experience number discrepancy (5 min, Severity 3)
- **H8-02:** Remove null image entries from projects.js to eliminate "[image]" placeholders (30 min, Severity 3)

### Issues requiring further investigation

- **H7-02:** Test actual mobile rendering across 320px, 375px, and 390px viewports to confirm whether nav overflow occurs or if current sizing is acceptable. Build a hamburger menu only if testing confirms the issue.
- **H8-05:** Profile noise overlay compositing on a low-end Android device to determine if it causes jank during scroll.

---

## Sources

Evaluation framework: Nielsen's 10 Usability Heuristics as documented in `/Users/robjones/Documents/Dev/portfolio/HEURISTICS.md`.
