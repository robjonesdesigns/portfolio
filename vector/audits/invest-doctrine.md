## Doctrine Audit

**Files audited:** VECTOR.md, CLAUDE.md, ARCHITECTURE.md
**Run date:** 2026-04-07 (session 25)
**Project stage:** development

---

### Findings

#### DRIFT — medium

- `CLAUDE.md:37-41` describes scroll animation as `.js-ready [data-animate] { opacity: 0 }` with `.visible` class. Codebase now uses `.will-animate` class for hiding and `.visible` for revealing (progressive enhancement flip). CLAUDE.md does not document `.will-animate`.
- `CLAUDE.md:214` documents `processMedia` fields but does not include `sectionBreak`, `systemMap`, or inline `decision` as processMedia item properties. These are actively used in the APM case study.
- `CLAUDE.md:122-129` type composition table does not include `type-meta` or `type-meta-bold`, which exist in globals.css and are used for metadata labels across WorkEntry, CaseStudy, and resume.
- `CLAUDE.md:208` says `images` array accepts "null slots ok." Data was cleaned to `images: []`. Null slots no longer expected.
- `ARCHITECTURE.md:172-175` describes scroll animation as `data-animate` with opacity 0 triggered by IntersectionObserver. Does not mention `.will-animate` progressive enhancement pattern.

#### GAP — low

- `CLAUDE.md` processMedia field reference missing: `sectionBreak` (boolean, renders h2 header with optional caption), `systemMap` (boolean, renders SystemMap component), inline `decision` on processMedia items (editorial decision block within flow).
- `CLAUDE.md` does not document additional CSS tokens noted in previous audit: `--border-strong`, `--grad-from/to`, `--media-bg/border`, `--card-bg-apm/keytrn`.
- `VECTOR.md` has no Key Assumptions or Open Questions sections.

---

### Summary

- Critical: 0 | High: 0 | Medium: 5 | Low: 3 | Info: 0
- Doctrine health: **GAPS FOUND**

No contradictions between files. No structure mismatches with disk. All declared directories exist. All files on disk are declared. The findings are documentation drift from session 25 changes (animation rewrite, processMedia extensions, type class additions). The codebase is ahead of the doctrine.

---

### Recommended Actions

1. **Update CLAUDE.md animation docs (lines 37-41)** to describe `.will-animate` progressive enhancement: elements start visible, observer adds `.will-animate` to hide below-fold, `.visible` to reveal on scroll. Update ARCHITECTURE.md lines 172-175 to match.
2. **Update CLAUDE.md processMedia field reference (lines 214-221)** to include `sectionBreak`, `systemMap`, inline `decision`, and remove "null slots ok" from `images`.
3. **Add `type-meta` and `type-meta-bold` to CLAUDE.md type composition table (lines 122-129)** with values: 14px fixed, line-height 1.5, fg-secondary/fg color, used for metadata labels.
