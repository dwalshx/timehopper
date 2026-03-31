# Requirements: TimeHopper Website

**Defined:** 2026-03-31
**Core Value:** Help people understand and navigate time zone differences through clear, interactive tools

## v1.1 Requirements

Requirements for timezone data foundation. Each maps to roadmap phases.

### Timezone Data

- [x] **TZD-01**: Site has a comprehensive timezone-zones.ts data file covering all major UTC offsets (UTC-12 through UTC+14)
- [x] **TZD-02**: Each zone entry includes IANA identifier, abbreviation, UTC offset, region name, and representative city
- [x] **TZD-03**: Half-hour and quarter-hour offsets are represented (UTC+5:30 India, UTC+5:45 Nepal, UTC+9:30 Darwin, UTC+3:30 Iran)
- [x] **TZD-04**: Each zone cross-references existing converter pair slugs where available (12 of ~38 zones)
- [x] **TZD-05**: Zone data uses IANA identifiers for DST-safe time resolution via Intl API (no fixed UTC offsets)

## v1.2+ Requirements

Deferred to future release. Tracked but not in current roadmap.

### Interactive Map

- **MAP-01**: Interactive SVG world map with color-coded timezone bands
- **MAP-02**: Hover tooltip showing zone info and live current time
- **MAP-03**: Click zone to navigate to converter pair page
- **MAP-04**: Single tick loop architecture for all live clocks

### Pages & Embed

- **PAGE-01**: Map page at /tools/map.html with full navigation
- **PAGE-02**: Embeddable map widget at /embed/map.html (iframe, auto-resize)
- **PAGE-03**: Navigation link to map from tools section

### Mobile

- **MOB-01**: Responsive card fallback below 480px viewport width

## Out of Scope

| Feature | Reason |
|---------|--------|
| Day/night solar overlay | High complexity, canvas-based — future milestone |
| Overlap/meeting planner chart | Full product feature (worldtimebuddy territory) — future milestone |
| City search | Adds complexity; map is usable without it |
| User accounts / saved zones | Static site, no backend |
| Canvas-based visualizations | Zero-dependency constraint; SVG + vanilla JS only |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| TZD-01 | Phase 5 | Complete |
| TZD-02 | Phase 5 | Complete |
| TZD-03 | Phase 5 | Complete |
| TZD-04 | Phase 5 | Complete |
| TZD-05 | Phase 5 | Complete |

**Coverage:**
- v1.1 requirements: 5 total
- Mapped to phases: 5
- Unmapped: 0 ✓

---
*Requirements defined: 2026-03-31*
*Last updated: 2026-03-31 after roadmap creation*
