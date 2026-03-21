## Doctrine Audit

**Files audited:** VECTOR.md, CLAUDE.md, ARCHITECTURE.md
**Run date:** 2026-03-21
**Project stage:** development

---

### Findings

#### STRUCTURE — medium

- `src/components/experiments/` exists on disk and contains `RippleEffectOnPink.jsx` but is not declared in ARCHITECTURE.md's layer map or structure tree. Its layer purpose (isolated experiments, not shipped) is undocumented.
- `src/pages/keytrn-prototype.astro` and `src/pages/rippleeffectonpink.astro` exist on disk and resolve as live routes but are not declared in ARCHITECTURE.md's routing section.
- `src/components/ui/NoHero.jsx` and `src/components/ui/PracticeHero.jsx` exist on disk but are not declared in ARCHITECTURE.md or CLAUDE.md's component reference.
- `src/stories/` exists on disk with Storybook story and MDX files but is not declared in ARCHITECTURE.md's project structure tree. (Storybook is listed in the stack table but the directory itself is undocumented.)

#### STRUCTURE — low

- `src/assets/` exists on disk but is not declared in ARCHITECTURE.md's project structure tree.
- `src/components/ui/Cursor.stories.jsx` is an orphaned story file. `Cursor.jsx` was deleted; the story was not.
- `vector/schemas/` exists on disk (Investiture JSON schemas) but is not referenced in VECTOR.md's Research Status table or ARCHITECTURE.md's layer map.

#### GAP — low

- `VECTOR.md:research-status` references `~/.claude/projects/.../memory/interviews.md`, a path outside the project directory. `vector/research/interviews/` is empty. Research artifacts live in Claude memory, not in the declared knowledge system. The reference does not resolve within the project.
- `ARCHITECTURE.md:naming` declares conventions for `.jsx`, `.js`, and route `.astro` files but does not cover `.astro` files in `src/layouts/`.

#### INFO

- `vector/research/personas/`, `jtbd/`, `competitive/`, and `assumptions/` are all empty. Expected at this project stage.
- `vector/audits/invest-backfill.md` describes spacing tokens as "space-1=4px → space-9=128px". Actual tokens use semantic names (`space-xs` through `space-5xl`). The codebase and live CLAUDE.md are correct; the backfill artifact is stale.

---

### Summary

- Critical: 0 | High: 0 | Medium: 4 | Low: 5 | Info: 2
- Doctrine health: **GAPS FOUND**

VECTOR.md and CLAUDE.md are sound. ARCHITECTURE.md has drifted from the actual codebase: the experiments layer, two prototype pages, and two UI components exist on disk without doctrine coverage. Research knowledge is split between Claude memory and the `vector/` system, so the declared research paths don't resolve within the project.

---

### Recommended Actions

1. **Declare `src/components/experiments/` in ARCHITECTURE.md** as a layer with an explicit rule: experimental components only, not imported by any production layer. Add `keytrn-prototype.astro` and `rippleeffectonpink.astro` to the routing section with a note that they are non-production routes.

2. **Resolve `NoHero.jsx` and `PracticeHero.jsx`** — decide whether they are permanent components (declare in ARCHITECTURE.md and CLAUDE.md) or experimental leftovers (move to `experiments/` or delete). Undeclared components in `ui/` are invisible to architecture audits.

3. **Update `VECTOR.md:research-status`** — point the interviews row to `memory/interviews.md` with a note that it lives in Claude's project memory, or copy the content into `vector/research/interviews/` so the declared path resolves. Either is correct; the current mismatch is not.
