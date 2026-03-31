# Roadmap: TimeHopper Website

## Milestones

- ✅ **v1.0 Converter Widgets & Content Hub** - Phases 1-4 (shipped 2026-03-30)
- ✅ **v1.1 Timezone Data Foundation** - Phase 5 (complete 2026-03-31)
- 🚧 **v1.2 Interactive World Time Zone Map** - Phases 6-9 (in progress)

## Phases

<details>
<summary>✅ v1.0 Converter Widgets & Content Hub (Phases 1-4) - SHIPPED 2026-03-30</summary>

Shipped: 40 timezone converter pair pages, 40 embeddable widgets, AI discoverability (llms.txt, ai-plugin.json, oEmbed, JSON-LD), 40+ SEO blog articles, dark responsive zero-dependency design.

</details>

<details>
<summary>✅ v1.1 Timezone Data Foundation (Phase 5) - COMPLETE 2026-03-31</summary>

### Phase 5: Timezone Data Foundation
**Goal**: The site has a complete, DST-safe timezone data layer covering all major UTC offsets
**Depends on**: Phase 4 (v1.0 complete)
**Requirements**: TZD-01, TZD-02, TZD-03, TZD-04, TZD-05
**Success Criteria** (what must be TRUE):
  1. `timezone-zones.ts` exists and exports a typed array covering all major UTC offsets from UTC-12 through UTC+14 (~38 zones)
  2. Every zone entry includes IANA identifier, abbreviation, UTC offset (in minutes), region name, and at least one representative city
  3. Half-hour and quarter-hour offset zones are present as distinct entries: UTC+5:30 (India), UTC+5:45 (Nepal), UTC+9:30 (Darwin), UTC+3:30 (Iran), and UTC+12:45 (Chatham)
  4. Each of the 12 zones with existing converter pairs has a populated `converterPair` field pointing to the correct slug; remaining zones have the field set to `null`
  5. All time resolution in the file uses IANA timezone identifiers (e.g., `"America/New_York"`) — no hardcoded integer UTC offsets used for DST-sensitive calculations
**Plans**: 1/1 plans complete

Plans:
- [x] 05-01-PLAN.md — Create timezone-zones.ts with all 38 UTC offset zones, typed interface, and converter pair cross-references

</details>

### 🚧 v1.2 Interactive World Time Zone Map (In Progress)

**Milestone Goal:** Build a visual, interactive SVG world time zone map with live clocks, hover tooltips, click-through to converter pages, an embeddable widget, and a mobile card fallback.

#### Phase 6: SVG Asset & Map Component

**Goal**: The WorldMap.astro component renders an interactive SVG world map with color-coded timezone bands and live clocks
**Depends on**: Phase 5
**Requirements**: MAP-01, MAP-02, MAP-03
**Success Criteria** (what must be TRUE):
  1. The WorldMap.astro component renders a visually distinct color-coded SVG world map with one color band per UTC offset zone
  2. Every timezone region in the SVG has a `data-tz` attribute correctly linking to its IANA timezone identifier from timezone-zones.ts
  3. Live clock times update every second for all visible zones, driven by a single shared timer — no per-zone interval timers
  4. The SVG file is under 100KB (under 50KB gzipped) and inline — no external network request needed to render the map
**Plans**: TBD
**UI hint**: yes

#### Phase 7: Map Interactivity

**Goal**: Users can hover over and click timezone regions on the map to get zone details and navigate to converter pages
**Depends on**: Phase 6
**Requirements**: INT-01, INT-02, INT-03
**Success Criteria** (what must be TRUE):
  1. Hovering any timezone region shows a tooltip containing the zone abbreviation, UTC offset, region name, and live current time for that zone
  2. Clicking a timezone region that has a matching converter pair navigates the user to that converter page (e.g., `/tools/convert/utc-to-est.html`)
  3. Clicking a timezone region with no matching converter pair shows an inline info panel with zone details — no dead ends
  4. All hover and click interactions are handled by a single event delegation listener on the SVG root element — no per-region listeners
**Plans**: TBD
**UI hint**: yes

#### Phase 8: Pages & Integration

**Goal**: The map is accessible at /tools/map.html, embeddable as an iframe widget, and linked from site navigation
**Depends on**: Phase 7
**Requirements**: PGE-01, PGE-02, PGE-03
**Success Criteria** (what must be TRUE):
  1. Visiting `/tools/map.html` shows the full interactive map inside the standard site layout with SEO title/description and JSON-LD structured data
  2. Visiting `/embed/map.html` shows the map in a standalone embed layout with postMessage auto-resize and a "Powered by TimeHopper" credit link
  3. The site navigation and homepage tools section contain a link to the map page
**Plans**: TBD
**UI hint**: yes

#### Phase 9: Mobile & Polish

**Goal**: The map experience works on mobile devices and handles edge cases cleanly
**Depends on**: Phase 8
**Requirements**: MOB-01
**Success Criteria** (what must be TRUE):
  1. On a viewport narrower than 480px the SVG map is replaced by a scrollable card list showing all timezone zones with live current times
  2. The card list renders all zones from timezone-zones.ts — no zones are missing from the mobile view
  3. Live clock times in the card list update every second using the same shared timer as the desktop map
**Plans**: TBD
**UI hint**: yes

## Phase Details

### Phase 6: SVG Asset & Map Component
**Goal**: The WorldMap.astro component renders an interactive SVG world map with color-coded timezone bands and live clocks
**Depends on**: Phase 5
**Requirements**: MAP-01, MAP-02, MAP-03
**Success Criteria** (what must be TRUE):
  1. The WorldMap.astro component renders a visually distinct color-coded SVG world map with one color band per UTC offset zone
  2. Every timezone region in the SVG has a `data-tz` attribute correctly linking to its IANA timezone identifier from timezone-zones.ts
  3. Live clock times update every second for all visible zones, driven by a single shared timer — no per-zone interval timers
  4. The SVG file is under 100KB (under 50KB gzipped) and inline — no external network request needed to render the map
**Plans**: TBD
**UI hint**: yes

### Phase 7: Map Interactivity
**Goal**: Users can hover over and click timezone regions on the map to get zone details and navigate to converter pages
**Depends on**: Phase 6
**Requirements**: INT-01, INT-02, INT-03
**Success Criteria** (what must be TRUE):
  1. Hovering any timezone region shows a tooltip containing the zone abbreviation, UTC offset, region name, and live current time for that zone
  2. Clicking a timezone region that has a matching converter pair navigates the user to that converter page (e.g., `/tools/convert/utc-to-est.html`)
  3. Clicking a timezone region with no matching converter pair shows an inline info panel with zone details — no dead ends
  4. All hover and click interactions are handled by a single event delegation listener on the SVG root element — no per-region listeners
**Plans**: TBD
**UI hint**: yes

### Phase 8: Pages & Integration
**Goal**: The map is accessible at /tools/map.html, embeddable as an iframe widget, and linked from site navigation
**Depends on**: Phase 7
**Requirements**: PGE-01, PGE-02, PGE-03
**Success Criteria** (what must be TRUE):
  1. Visiting `/tools/map.html` shows the full interactive map inside the standard site layout with SEO title/description and JSON-LD structured data
  2. Visiting `/embed/map.html` shows the map in a standalone embed layout with postMessage auto-resize and a "Powered by TimeHopper" credit link
  3. The site navigation and homepage tools section contain a link to the map page
**Plans**: TBD
**UI hint**: yes

### Phase 9: Mobile & Polish
**Goal**: The map experience works on mobile devices and handles edge cases cleanly
**Depends on**: Phase 8
**Requirements**: MOB-01
**Success Criteria** (what must be TRUE):
  1. On a viewport narrower than 480px the SVG map is replaced by a scrollable card list showing all timezone zones with live current times
  2. The card list renders all zones from timezone-zones.ts — no zones are missing from the mobile view
  3. Live clock times in the card list update every second using the same shared timer as the desktop map
**Plans**: TBD
**UI hint**: yes

## Progress

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 5. Timezone Data Foundation | v1.1 | 1/1 | Complete | 2026-03-31 |
| 6. SVG Asset & Map Component | v1.2 | 0/? | Not started | - |
| 7. Map Interactivity | v1.2 | 0/? | Not started | - |
| 8. Pages & Integration | v1.2 | 0/? | Not started | - |
| 9. Mobile & Polish | v1.2 | 0/? | Not started | - |
