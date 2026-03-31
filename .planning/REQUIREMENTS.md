# Requirements: TimeHopper Website

**Defined:** 2026-03-31
**Core Value:** Help people understand and navigate time zone differences through clear, interactive tools

## v1.2 Requirements

Requirements for interactive world time zone map. Each maps to roadmap phases.

### SVG Map Component

- [ ] **MAP-01**: WorldMap.astro component renders an inline SVG world map with color-coded timezone bands
- [ ] **MAP-02**: Each timezone region in the SVG has a `data-tz` attribute linking to its IANA identifier from timezone-zones.ts
- [ ] **MAP-03**: Live clocks update every second for all visible zones using a single shared setInterval

### Map Interactivity

- [ ] **INT-01**: Hovering a timezone region shows a tooltip with zone abbreviation, UTC offset, region name, and live current time
- [ ] **INT-02**: Clicking a timezone region navigates to the corresponding converter pair page (if available) or shows zone details
- [ ] **INT-03**: Event delegation on the SVG element handles all hover and click interactions (no per-element listeners)

### Pages & Embed

- [ ] **PGE-01**: Map page at /tools/map.html with full navigation, SEO metadata, and structured data
- [ ] **PGE-02**: Embeddable map widget at /embed/map.html with postMessage auto-resize and "Powered by TimeHopper" credit
- [ ] **PGE-03**: Navigation link to map from the tools section and homepage

### Mobile

- [ ] **MOB-01**: Below 480px viewport, map switches to a responsive card list showing all zones with live times

## v1.1 Requirements (Completed)

### Timezone Data

- [x] **TZD-01**: Site has a comprehensive timezone-zones.ts data file covering all major UTC offsets (UTC-12 through UTC+14)
- [x] **TZD-02**: Each zone entry includes IANA identifier, abbreviation, UTC offset, region name, and representative city
- [x] **TZD-03**: Half-hour and quarter-hour offsets are represented
- [x] **TZD-04**: Each zone cross-references existing converter pair slugs where available
- [x] **TZD-05**: Zone data uses IANA identifiers for DST-safe time resolution via Intl API

## Future Requirements

### Advanced Visualizations

- **VIZ-01**: Day/night solar overlay on map
- **VIZ-02**: Meeting overlap chart for selected zones
- **VIZ-03**: City search within map

## Out of Scope

| Feature | Reason |
|---------|--------|
| Day/night solar overlay | Canvas-based, high complexity — future milestone |
| City search | Not needed for MVP map experience |
| Overlap/meeting planner | Full product (worldtimebuddy territory) — future |
| User-customizable zones | No backend, static site |
| Canvas-based visualizations | Zero-dependency constraint; SVG + vanilla JS only |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| MAP-01 | TBD | Pending |
| MAP-02 | TBD | Pending |
| MAP-03 | TBD | Pending |
| INT-01 | TBD | Pending |
| INT-02 | TBD | Pending |
| INT-03 | TBD | Pending |
| PGE-01 | TBD | Pending |
| PGE-02 | TBD | Pending |
| PGE-03 | TBD | Pending |
| MOB-01 | TBD | Pending |

**Coverage:**
- v1.2 requirements: 10 total
- Mapped to phases: 0
- Unmapped: 10 ⚠️

---
*Requirements defined: 2026-03-31*
*Last updated: 2026-03-31 after initial definition*
