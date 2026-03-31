# TimeHopper Website

## What This Is

TimeHopper is a Chrome extension for time zone management in Google Calendar, with a marketing website at timehopperapp.com. The website serves as both a landing page for the extension and a free tools hub — currently offering 40 embeddable timezone converter widgets and an SEO-driven blog with 40+ articles targeting Google Calendar and timezone management queries.

## Core Value

Help people understand and navigate time zone differences through clear, interactive tools and authoritative content — driving awareness and installs of the TimeHopper Chrome extension.

## Current Milestone: v1.2 — Interactive World Time Zone Map

**Goal:** Build a visual, interactive SVG world time zone map with live clocks and embeddable widget.

**Target features:**
- Interactive SVG world map with color-coded timezone bands and live clocks
- Hover tooltips showing zone info and current time
- Click zone to navigate to converter pair page
- Map page at /tools/map.html
- Embeddable map widget at /embed/map.html
- Mobile card fallback below 480px

## Requirements

### Validated

- ✓ 40 timezone converter pair pages with live clocks and hour converter — v1.0
- ✓ Embeddable iframe widgets for all 40 pairs with auto-resize — v1.0
- ✓ AI discoverability (llms.txt, ai-plugin.json, oEmbed, JSON-LD) — v1.0
- ✓ SEO blog with 40+ articles (editorial pipeline) — v1.0
- ✓ Dark theme, zero-dependency, responsive design pattern — v1.0
- ✓ Comprehensive timezone data layer (39 zones, UTC-12 to UTC+14, IANA-based) — v1.1 Phase 5

### Active

- [ ] Interactive world time zone map
- [ ] Additional timezone visualizations (TBD)

### Out of Scope

- Native mobile app — web-first strategy
- User accounts / login — static site, no backend
- Paid features — all tools are free, driving CWS installs

## Context

- **Stack:** Astro static site, output to `/docs/`, `build.format: 'file'` for .html outputs
- **Data layer:** `timezone-pairs.ts` with 12 base zones and 40 pairs; `timezone-zones.ts` with 39 zones covering all UTC offsets
- **Components:** `TimezoneConverter.astro` — vanilla JS widget using browser Intl API
- **Deploy:** Static files in `/docs/` served via GitHub Pages
- **Design:** Dark gradient theme (#1e293b to #334155), card-based UI, responsive
- **Extension:** Chrome Web Store ID `jckljcbopecepadagmnjbfjgojpnfkhl`

## Constraints

- **Zero dependencies**: No external JS libraries — vanilla JS + browser APIs only
- **Static site**: No server-side processing — everything builds at compile time or runs client-side
- **Embeddable**: New tools should be embeddable via iframe like existing converters
- **Performance**: Pages must load fast — no heavy assets, lazy loading where appropriate

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Astro static site | Fast, SEO-friendly, simple deployment | ✓ Good |
| Vanilla JS only | Zero dependencies, fast load, no build complexity | ✓ Good |
| Iframe embed strategy | Style isolation, no conflicts with host page | ✓ Good |
| 5-layer AI discoverability | Cover all AI access patterns (LLM, agent, CMS, search) | ✓ Good |
| SVG-based map | Lightweight, interactive, no external deps | — Pending |
| Offsets as integer minutes | Avoids JS float imprecision for half-hour zones | ✓ Good |
| timezone-zones.ts zero imports | Hardcoded slugs avoid circular deps with pairs | ✓ Good |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd:transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-03-31 after milestone v1.2 started*
