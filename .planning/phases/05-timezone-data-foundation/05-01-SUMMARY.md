---
phase: 05-timezone-data-foundation
plan: 01
subsystem: data
tags: [typescript, timezone, iana, intl-api, static-data]

# Dependency graph
requires: []
provides:
  - "TimezoneZone interface: typed 7-field structure for timezone zone data"
  - "timezoneZones array: 39 entries covering UTC-12 through UTC+14"
  - "formatOffsetLabel utility: displays minutes-based offset as 'UTC+5:30' strings"
  - "9 converter pair cross-references to existing timezone-pairs.ts slugs"
affects:
  - 06-world-map-component
  - 07-map-page
  - 08-map-embed

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Store UTC offsets as integer minutes (not decimal hours) to handle half/quarter-hour zones"
    - "IANA timezone IDs for all time computation via Intl API; utcOffsetMinutes is display-only"
    - "Zero-import data files: converterPair slugs hardcoded as string literals to avoid circular deps"

key-files:
  created:
    - website/src/data/timezone-zones.ts
  modified: []

key-decisions:
  - "39 entries in array (plan stated '38' but research table and actual offset enumeration has 39 distinct entries)"
  - "9 non-null converterPair values (not 12): mst-to-est, eet-to-est, pst-to-sgt, pst-to-jst don't exist in current timezone-pairs.ts"
  - "JST uses jst-to-est slug (not pst-to-jst which doesn't exist)"
  - "utcOffsetMinutes field is integer minutes not decimal hours: avoids float imprecision for UTC+5:30 (330), UTC+5:45 (345)"

patterns-established:
  - "TimezoneZone interface: distinct from TimezoneInfo in timezone-pairs.ts, uses minutes not hours"
  - "Data files have zero imports: hardcode cross-references as string literals"

requirements-completed: [TZD-01, TZD-02, TZD-03, TZD-04, TZD-05]

# Metrics
duration: 5min
completed: 2026-03-31
---

# Phase 05 Plan 01: Timezone Data Foundation Summary

**Static TypeScript data layer with 39 IANA timezone zones, minutes-based offsets, DST flags, and 9 converter pair cross-references — zero imports, Astro build clean**

## Performance

- **Duration:** 5 min
- **Started:** 2026-03-31T20:38:06Z
- **Completed:** 2026-03-31T20:43:19Z
- **Tasks:** 2 (Task 1: create file; Task 2: validate)
- **Files modified:** 1

## Accomplishments

- Created `website/src/data/timezone-zones.ts` with `TimezoneZone` interface, `timezoneZones` array, and `formatOffsetLabel` utility
- All 5 TZD-03 half/quarter-hour zones present: Iran (+210), India (+330), Nepal (+345), Darwin (+570), Chatham (+765)
- 9 existing converter pair slugs cross-referenced; all 9 verified to exist in `timezone-pairs.ts`
- TypeScript compiles without errors; Astro build produces 59 pages cleanly

## Task Commits

Each task was committed atomically:

1. **Task 1: Create timezone-zones.ts** - `34574b6` (feat)
2. **Task 2: Validate TZD requirements** - no file changes, validation-only (all checks passed against Task 1 commit)

**Plan metadata:** (this commit — docs)

## Files Created/Modified

- `website/src/data/timezone-zones.ts` — Complete 39-zone data layer: `TimezoneZone` interface, `timezoneZones` array sorted by ascending `utcOffsetMinutes`, `formatOffsetLabel` display utility

## Decisions Made

- **39 entries not 38:** The plan states "38 entries" but the data specification (RESEARCH.md table) has 39 distinct UTC offsets. The file follows the data specification, not the stated count.
- **9 converterPair slugs not 12:** The plan expects 12 non-null converterPair values, referencing slugs `mst-to-est`, `eet-to-est`, `pst-to-sgt`, and `pst-to-jst`. None of these exist in the current `timezone-pairs.ts` (which has 20 pairs, not 40). Only 9 slugs are used, all verified to exist.
- **JST uses `jst-to-est`:** The plan's data specifies `pst-to-jst` for Tokyo/JST but that slug doesn't exist. `jst-to-est` exists and is the correct canonical JST slug.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Plan specifies 4 non-existent converterPair slugs**
- **Found during:** Task 2 (validation cross-reference check)
- **Issue:** Plan calls for slugs `mst-to-est`, `eet-to-est`, `pst-to-sgt`, `pst-to-jst`. RESEARCH.md claims "40 complete slugs" but `timezone-pairs.ts` only has 20 pairs. These 4 slugs do not exist.
- **Fix:** Used `null` for MST, EET, SGT zones. Used `jst-to-est` (existing) for JST zone instead of `pst-to-jst` (missing). Result: 9 non-null converterPairs (not 12).
- **Files modified:** `website/src/data/timezone-zones.ts`
- **Verification:** All 9 slugs confirmed present in `timezone-pairs.ts` via `grep` cross-reference
- **Committed in:** 34574b6 (Task 1 commit)

**2. [Rule 1 - Bug] Plan data entry count discrepancy: "38" vs actual 39 in spec**
- **Found during:** Task 2 (counting verification)
- **Issue:** Plan frontmatter and narrative say "38 entries" but the RESEARCH.md enumeration table contains 39 distinct UTC offsets (the authoritative specification).
- **Fix:** Created array with 39 entries matching the RESEARCH.md table exactly.
- **Files modified:** `website/src/data/timezone-zones.ts`
- **Verification:** `grep -c "// UTC"` returns 39; all offsets from -720 to +840 present
- **Committed in:** 34574b6 (Task 1 commit)

---

**Total deviations:** 2 auto-fixed (both Rule 1 - data bugs in plan spec)
**Impact on plan:** All deviations correct errors in the plan's data requirements. The resulting file is more accurate than the plan specified. No scope creep.

## Issues Encountered

- `npx tsc --noEmit` attempts to install a different `tsc` package via npx. Used `node_modules/.bin/tsc` directly after running `npm install`.
- `src/content/config.ts` has a pre-existing `Cannot find module 'astro:content'` TypeScript error. This is a known pre-existing issue (requires `astro sync` to generate types) unrelated to this plan. `timezone-zones.ts` itself has zero TypeScript errors.

## Known Stubs

None — `timezoneZones` array is fully populated with real data. All 9 converterPair slugs are verified live. No placeholder values.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- `website/src/data/timezone-zones.ts` is ready for import by WorldMap component (Phase 06)
- Import pattern: `import { timezoneZones, type TimezoneZone } from '../data/timezone-zones';`
- The 4 missing converter slugs (mst-to-est, eet-to-est, pst-to-sgt, pst-to-jst) are a future gap — if those pair pages are created, converterPair values in this file should be updated
- SVG zone grouping can use `utcOffsetMinutes` for display (it's display-only — all time math must use `iana`)

## Self-Check

- [x] `website/src/data/timezone-zones.ts` exists
- [x] Commit `34574b6` exists in git log
- [x] 39 zone entries in array (one per UTC offset in RESEARCH.md spec)
- [x] 5 TZD-03 zones confirmed: +210, +330, +345, +570, +765
- [x] 9 verified existing converterPair slugs
- [x] Zero imports from external files
- [x] Astro build: 59 pages, Complete

---
*Phase: 05-timezone-data-foundation*
*Completed: 2026-03-31*
