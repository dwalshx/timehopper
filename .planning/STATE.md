# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-03-30)

**Core value:** Help people understand and navigate time zone differences through clear, interactive tools
**Current focus:** Phase 5 — Timezone Data Foundation (v1.1)

## Current Position

Phase: 5 of 5 (Timezone Data Foundation)
Plan: 0 of ? in current phase
Status: Ready to plan
Last activity: 2026-03-31 — Roadmap created for v1.1 milestone

Progress: [░░░░░░░░░░] 0% (v1.1)

## Performance Metrics

**Velocity:**
- Total plans completed: 0 (v1.1)
- Average duration: —
- Total execution time: —

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| - | - | - | - |

*Updated after each plan completion*

## Accumulated Context

### Decisions

- Existing converter component (TimezoneConverter.astro) uses vanilla JS + Intl API — reuse pattern
- All tools follow embed pattern: standalone page at /embed/{slug}.html with postMessage resize
- 12 base zones defined in timezone-pairs.ts — `timezone-zones.ts` cross-references these, never modifies them
- SVG-based map approach confirmed: lightweight, zero-dependency, inline SVG for DOM access
- Store offsets as minutes from UTC (not hours) to handle half-hour/quarter-hour zones correctly

### Pending Todos

None yet.

### Blockers/Concerns

- SVG base file needs manual verification: confirm UTC+13/+14 paths (Kiribati, Samoa) exist before Phase 5 completes
- geojson2svg npm package is MEDIUM confidence — verify usable SVG output or fall back to Wikimedia Commons base SVG

## Session Continuity

Last session: 2026-03-31
Stopped at: Roadmap created — Phase 5 ready to plan
Resume file: None
