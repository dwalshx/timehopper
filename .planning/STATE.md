## Current Position

Phase: Not started (defining requirements)
Plan: —
Status: Defining requirements
Last activity: 2026-03-31 — Milestone v1.2 started

## Project Reference

See: .planning/PROJECT.md (updated 2026-03-31)

**Core value:** Help people understand and navigate time zone differences through clear, interactive tools
**Current focus:** v1.2 Interactive World Time Zone Map

## Accumulated Context

### Decisions

- Existing converter component (TimezoneConverter.astro) uses vanilla JS + Intl API — reuse pattern
- All tools follow embed pattern: standalone page at /embed/{slug}.html with postMessage resize
- 12 base zones defined in timezone-pairs.ts — timezone-zones.ts cross-references these, never modifies them
- SVG-based map approach confirmed: lightweight, zero-dependency, inline SVG for DOM access
- Store offsets as minutes from UTC (not hours) to handle half-hour/quarter-hour zones correctly
- timezone-zones.ts has zero imports — converterPair slugs are hardcoded string literals
- Single tick loop (setInterval) for all live clocks — not per-clock timers
- Event delegation on SVG element — one listener routes all zone interactions

### Pending Todos

None yet.

### Blockers/Concerns

- SVG base file needs manual verification: confirm UTC+13/+14 paths exist
- geojson2svg npm package is MEDIUM confidence — may need Wikimedia Commons SVG fallback

## Session Continuity

Last session: 2026-03-31
Stopped at: Milestone v1.2 started — defining requirements
Resume file: None
