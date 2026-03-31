## Current Position

Phase: Not started (defining requirements)
Plan: —
Status: Defining requirements
Last activity: 2026-03-30 — Milestone v1.1 started

## Project Reference

See: .planning/PROJECT.md (updated 2026-03-30)

**Core value:** Help people understand and navigate time zone differences through clear, interactive tools
**Current focus:** Timezone visualizations milestone

## Accumulated Context

- Existing converter component (TimezoneConverter.astro) uses vanilla JS + Intl API
- All tools follow embed pattern: standalone page at /embed/{slug}.html with postMessage resize
- 12 base zones defined in timezone-pairs.ts, expandable
- Site builds to /docs/ for GitHub Pages deployment
