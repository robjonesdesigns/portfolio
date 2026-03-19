## Doctrine Audit

**Files audited:** VECTOR.md, CLAUDE.md, ARCHITECTURE.md
**Run date:** 2026-03-18
**Project stage:** development

---

### Findings

#### STRUCTURE — medium

- `src/stories/` exists on disk with Storybook MDX and story files but is not declared in the ARCHITECTURE.md project structure tree. (Storybook is noted in the stack table as "Not deployed" but the directory itself is undocumented.)
- `src/components/ui/HeroName.jsx` exists on disk but is not declared in ARCHITECTURE.md's component listing or CLAUDE.md's file structure.
- `src/components/ui/SEO.jsx` exists on disk but is not declared in ARCHITECTURE.md's component listing or CLAUDE.md's file structure.
- `vector/schemas/` exists on disk (Investiture JSON schemas) but is not listed in VECTOR.md's Research Status table or ARCHITECTURE.md's layer map.

#### STRUCTURE — low

- `src/assets/` exists on disk (contains `react.svg`, likely a Vite template artifact) but is not declared in ARCHITECTURE.md's project structure tree.
- `src/components/ui/Cursor.stories.jsx` is an orphaned story file — `Cursor.jsx` was deleted but the stories file remains.

#### DRIFT — low

- CLAUDE.md `pages/` file structure section lists only `ResumePage.jsx` and `SitemapPage.jsx`; `HomePage.jsx` and `CaseStudyPage.jsx` are missing from the reference.
- CLAUDE.md `layout/` file structure section omits `Container.jsx`, which is declared in ARCHITECTURE.md and exists on disk.
- CLAUDE.md `ui/` file structure section omits `RJLogo.jsx` and `RJLogo3D.jsx`, both declared in ARCHITECTURE.md and present on disk.
- `vector/audits/invest-backfill.md` describes spacing tokens as "space-1=4px → space-9=128px" (numeric naming). Actual tokens use semantic names (`space-xs` through `space-5xl`). Doctrine and codebase are consistent; the backfill audit file has the wrong names.

---

### Summary

- Critical: 0 | High: 0 | Medium: 4 | Low: 3 | Info: 0
- Doctrine health: GAPS FOUND

---

### Recommended Actions

1. **Add `src/stories/` to ARCHITECTURE.md's project structure tree.** It's a substantial directory tied to the declared Storybook stack entry. The structure tree should document it so invest-architecture knows it's intentional.

2. **Declare `HeroName.jsx` and `SEO.jsx` in ARCHITECTURE.md's `src/components/ui/` listing.** Active components not in the structure tree are invisible to downstream audits. Add a one-line note on what each does.

3. **Update CLAUDE.md's file structure section.** The `pages/` block is missing `HomePage.jsx` and `CaseStudyPage.jsx`. The `layout/` block is missing `Container.jsx`. The `ui/` block is missing `RJLogo.jsx` and `RJLogo3D.jsx`. CLAUDE.md is the agent briefing — an incomplete component reference degrades every session that uses it.
