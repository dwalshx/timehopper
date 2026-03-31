# Feature Research

**Domain:** Interactive timezone visualization tools — world time zone map and related views
**Researched:** 2026-03-30
**Confidence:** HIGH (competitive landscape, user expectations); MEDIUM (complexity estimates for static-site constraints)

---

## Competitive Landscape Summary

| Tool | Primary Visualization | Differentiator |
|------|----------------------|----------------|
| timeanddate.com/time/map | SVG/raster world map with city pins, hover tooltips, color-banded zones | Deepest database (215+ cities), links to per-city pages |
| worldtimebuddy.com | Horizontal timeline grid, draggable time slider | Meeting scheduling, calendar export (Google/Outlook/iCal) |
| everytimezone.com | Horizontal band chart, one row per zone | Minimal, shareable links, Pro tier for meetings |
| 24timezones.com | World map with real-time day/night overlay | Day/night/midnight color coding, conference planning |
| zonemap.live | World map + draggable timeline scrubber | Drag-to-simulate any time, working-hours overlap bar |
| iloveclock.com | World map with solar position + astronomical twilight | 24-hour sun/moon animation, astronomical twilight |
| timezoneoverlap.com | Overlap chart showing working-hour intersections | Pure overlap focus |
| WorldTimeZone.com | Static color reference chart | Quick visual reference, no interactivity |

**Key insight:** No competitor combines a world map + meeting overlap chart in a lightweight, embeddable, zero-dependency format. The high-quality tools (timeanddate, zonemap.live) are heavy products — not embeddable widgets. The embeddable niche is open.

---

## Feature Landscape

### Table Stakes (Users Expect These)

Features users assume exist on any timezone map. Missing these makes the product feel broken or incomplete.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Color-banded timezone zones | Every timezone map uses color to differentiate UTC offsets — it is the visual vocabulary users know | LOW | One color per UTC offset band; SVG `<g>` per offset |
| Live current time per zone | "What time is it there right now?" is the #1 use case | MEDIUM | Single tick loop, Intl API; proven in existing TimezoneConverter pattern |
| Zone name / UTC offset label | Users need to identify which offset they are looking at | LOW | Static text labels on SVG bands |
| DST awareness | Without it, US/EU/AU zones are wrong 6 months per year | MEDIUM | IANA identifiers per zone, runtime offset resolution — see PITFALLS.md Pitfall 1 |
| Hover tooltip showing zone info | Every major competitor shows zone name + current time on hover | MEDIUM | Vanilla JS `pointerenter`/`pointerleave`, tooltip positioned near cursor |
| Half-hour offset zones displayed | India, Nepal, Iran, Darwin visible as distinct zones | LOW | Data model issue — store IANA IDs not integer offsets; see PITFALLS.md Pitfall 2 |
| Mobile responsiveness | >50% of users are on mobile; a desktop-only tool is effectively broken | MEDIUM | Map must collapse to scrollable card list below 480px; see PITFALLS.md UX section |
| "What time is it in X?" search | timeanddate, 24timezones, zonemap all offer city/zone search | MEDIUM | Browser-side filter over static city dataset; no server needed |
| Link from zone to deeper tool | timeanddate links map pins to city pages; users expect navigation | LOW | Existing converter pairs linkable from map click — already architected in ARCHITECTURE.md |
| Embeddable / shareable | Competitors offer embed codes and shareable links | MEDIUM | Existing embed pattern in project is proven; map embed is straightforward reuse |

### Differentiators (Competitive Advantage)

Features that set the product apart and align with the core value of "helping people navigate time differences."

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Clickable zone links to existing converters | Turns the map into a gateway to the 40 converter pair pages — no competitor does this for an embeddable map | LOW | Data-attribute driven; architected in ARCHITECTURE.md Pattern 3 |
| Embeddable map widget | No major competitor offers a lightweight, self-contained embeddable timezone map | MEDIUM | Reuse existing `/embed/[pair].astro` pattern verbatim; proven architecture |
| Timezone overlap / meeting planner chart | High-demand feature (worldtimebuddy, zonemap, everytimezone all built their product around this) — none are embeddable lightweight widgets | HIGH | Separate visualization type; see "Additional Visualization Types" section below |
| Working hours context labels | Show "Business Hours / Evening / Late Night" per zone at hover | LOW | Pure JS string lookup against zone's current local hour; no external data |
| UTC offset bar at bottom | timeanddate uses this — a horizontal reference strip showing all offsets with current time | LOW | Static strip + live time update; low effort, high perceived value |
| Next DST transition display | Show when the next clock change happens per zone on hover | MEDIUM | Requires precomputed DST calendar data baked into timezone-zones.ts at build time |
| Day/night overlay on map | Used by 24timezones, zonemap, iloveclock — solar terminator drawn on map | HIGH | Canvas overlay or SVG polygon; requires solar position math; ~200 lines of vanilla JS |

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem desirable but create problems for this project's constraints (zero dependencies, static site, embeddable focus).

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| User-saved city lists / personal world clock | Users want to customize their view persistently | Requires user accounts or localStorage (stateful); breaks the stateless static site model; adds auth complexity outside scope | Shareable URL parameter encoding (e.g., `?zones=est,jst,cet`) — stateless, linkable, achieves same outcome |
| Calendar sync / Google Calendar export | worldtimebuddy's #1 feature; users expect it for meeting planning | Requires OAuth, server-side token handling — impossible on a zero-backend static site | Link to existing TimeHopper Chrome extension, which already integrates with Google Calendar |
| City-level granularity in the map | Users often think in cities, not UTC offsets | Country-level SVG (250+ paths) is 2-5MB; mapping cities-to-offset zones is complex many-to-many | City search field that highlights the correct UTC offset band; city stays in search box, map highlights zone |
| Real-time weather per city on hover | timeanddate shows weather — some users want this | Requires weather API, rate limits, API key management, server-side proxy — all impossible on static site | Out of scope; not timezone-related |
| Mobile app | Users ask for native apps | Outside "web-first strategy" and "native mobile app" is explicitly Out of Scope in PROJECT.md | Progressive Web App offline support (lightweight — service worker caching, no app store) |
| Auto-suggest meeting times across multiple zones | Users doing scheduling want a recommendation engine | Requires working-hours data per zone + algorithm — complexity is HIGH; meeting planner is a full product feature | Build the overlap chart (see differentiators); let users visually identify overlap themselves |
| Historical timezone data / past time lookups | Researchers occasionally need "what time was it in 1985 Tokyo?" | Historical IANA data is complex; edge cases with political changes; adds significant data payload | Out of scope; use timeanddate for historical lookups |

---

## Additional Visualization Types Beyond the Map

Research identified several distinct visualization categories. These represent future milestones, not v1.1 scope.

| Visualization | What It Is | Lead Competitor | Complexity | Dependency on Map |
|--------------|------------|-----------------|------------|-------------------|
| **Timeline/Grid** (overlap chart) | Horizontal rows, one per zone, showing 24-hour bands with working hours highlighted — drag a slider to pick a meeting time | worldtimebuddy, everytimezone | HIGH | Independent; can reuse timezone-zones.ts |
| **Day/Night Map Overlay** | Solar terminator drawn on world map; regions in darkness shaded | 24timezones, iloveclock, zonemap | HIGH | Requires map already built; extension of map page |
| **Working Hours Heatmap** | Grid of zones vs hours; cells colored green (overlap), red (off-hours) | whenest.com | MEDIUM | Independent; pure canvas/CSS grid |
| **UTC Offset Reference Strip** | Static horizontal band showing all UTC offsets with live clocks | timeanddate (partial) | LOW | Independent; can be its own page component |
| **"Is it business hours?" checker** | Input: timezone pair → Output: yes/no + hours until overlap | Various small tools | LOW | Builds on converter pair data from timezone-pairs.ts |

---

## Feature Dependencies

```
[timezone-zones.ts data file]
    └──required by──> [World Map Rendering]
                          └──required by──> [Clickable Zone → Converter Links]
                          └──required by──> [Hover Tooltip with Live Time]
                          └──required by──> [Embeddable Map Widget]
                          └──enables──────> [Day/Night Overlay] (future)

[timezone-pairs.ts data file — EXISTING]
    └──powers──> [Converter Link from Map Zone] (12 of 38 zones)
    └──powers──> [Existing 40 Converter Pages] (no change)

[Single Tick Loop (requestAnimationFrame)]
    └──required by──> [Live Clocks on Map]
    └──required by──> [Live Clocks in Overlap Chart] (future)

[World Map Page (/tools/map.html)]
    └──enables──> [Embeddable Map Widget (/embed/map.html)]

[Overlap Chart] (future)
    └──independent──> Can be built without the map
    └──enhances──────> Map page (could be a tab below the map)
```

### Dependency Notes

- **timezone-zones.ts required before WorldMap.astro:** The component needs the full 38-zone data set with IANA identifiers, UTC offsets, and converter pair slugs. This file does not exist yet and must be built first.
- **Zone click links require timezone-pairs.ts cross-reference:** 12 of 38 zones have existing converter pages. The data file must cross-reference pairs to generate the correct link target. Zones without a pair show a tooltip, not a link.
- **Embeddable widget requires map page:** The embed page is a stripped wrapper around the same WorldMap component — the component must exist first.
- **Day/night overlay enhances the map but is not required for map v1:** It can be added to the map page in a later phase without changing the base map architecture.
- **Overlap chart is fully independent:** It uses timezone-zones.ts (once built) but does not depend on the SVG map. It could be built in parallel or as a separate milestone.

---

## MVP Definition

### Launch With (v1.1 — This Milestone)

Minimum viable interactive timezone map. Validates the concept and provides SEO value.

- [ ] Interactive SVG world map with UTC-offset color bands — core visual deliverable
- [ ] Live current time displayed per offset zone (single tick loop) — makes the map useful vs static
- [ ] Hover tooltip: zone name, UTC offset, current time, DST status — baseline interaction
- [ ] Click zone with converter pair: navigate to `/tools/convert/{pair}.html` — converts map into funnel for existing 40 pages
- [ ] Click zone without converter pair: show inline info (live time + offset label) — graceful handling, no dead ends
- [ ] Mobile fallback: scrollable zone card list below 480px — required given mobile traffic share
- [ ] Embeddable widget (/embed/map.html) — reuse existing pattern; differentiator vs competitors
- [ ] timezone-zones.ts data file with all 38 UTC offsets + IANA IDs + converter pair cross-references — foundation for all rendering

### Add After Validation (v1.x)

Add once map is live and getting traffic.

- [ ] City search field — trigger: users asking "where is X on the map?" in feedback
- [ ] Working hours context labels on hover (Business Hours / Evening / Late Night) — low effort, high perceived value
- [ ] UTC offset reference strip (horizontal bar below map) — trigger: low engagement with map zones, users need orientation aid
- [ ] Next DST transition info in tooltip — trigger: DST-related confusion in user feedback

### Future Consideration (v2+)

Separate milestone; defer until map is validated.

- [ ] Timeline/overlap chart (worldtimebuddy-style) — HIGH complexity; separate page; high demand but full product feature
- [ ] Day/night solar terminator overlay — HIGH complexity; adds to map page; requires solar position math
- [ ] Working hours heatmap — MEDIUM complexity; useful for remote teams; separate page
- [ ] Shareable URL encoding of zone selections — MEDIUM complexity; useful for meeting coordination

---

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Color-banded SVG map with live times | HIGH | MEDIUM | P1 |
| Hover tooltip (zone + time + DST) | HIGH | MEDIUM | P1 |
| Click zone → converter page link | HIGH | LOW | P1 |
| timezone-zones.ts data layer | HIGH | LOW | P1 |
| Mobile fallback (card list) | HIGH | MEDIUM | P1 |
| Embeddable map widget | HIGH | LOW | P1 |
| City search / zone highlight | MEDIUM | MEDIUM | P2 |
| Working hours context labels | MEDIUM | LOW | P2 |
| UTC offset reference strip | MEDIUM | LOW | P2 |
| Next DST transition in tooltip | MEDIUM | MEDIUM | P2 |
| Timeline overlap chart | HIGH | HIGH | P3 |
| Day/night solar overlay | MEDIUM | HIGH | P3 |
| Working hours heatmap | MEDIUM | MEDIUM | P3 |
| Shareable URL encoding | MEDIUM | MEDIUM | P3 |

**Priority key:**
- P1: Must have for v1.1 launch — these constitute the MVP
- P2: Should have — add after map is live and working; low-risk additions
- P3: Future milestone — HIGH complexity or requires validation that users want it

---

## Competitor Feature Analysis

| Feature | timeanddate.com | worldtimebuddy.com | everytimezone.com | Our Approach |
|---------|----------------|-------------------|-------------------|--------------|
| World map visualization | Yes — color-banded SVG map, city pins | No — timeline grid only | No — horizontal band chart | Yes — UTC-offset SVG map, clickable zones |
| Live clocks per zone | Yes (hover only) | Yes (in grid) | Yes (bar view) | Yes — displayed in tooltip + optional strip |
| Meeting planner / overlap | Yes (separate page) | Yes (core feature) | Yes (Pro tier) | Future milestone — not v1.1 |
| Day/night overlay | Yes (separate page) | No | No | Future (v2+) |
| Click zone → deeper content | Yes — links to city pages | No | No | Yes — links to existing converter pairs |
| Embeddable widget | No | No (app only) | No | Yes — core differentiator |
| Zero-dependency / fast load | No (heavy product) | No (full app) | No (React app) | Yes — static HTML, vanilla JS |
| DST awareness | Yes | Yes | Yes | Yes — IANA-based, runtime resolved |
| Half-hour offset zones | Yes (diagonal stripes) | Yes | Partial | Yes — full IANA support in data model |
| Mobile-friendly | Partial | Yes (native app) | Partial | Yes — responsive with card fallback |
| Shareable URL | Yes (city pins) | Yes | Yes | Future (v1.x) |
| Calendar export | No (external links) | Yes (core feature) | Yes (Pro) | Out of scope — delegate to Chrome extension |

---

## Existing Infrastructure Dependencies

Features in this milestone can reuse without modification:

| Existing Asset | How New Features Reuse It |
|---------------|--------------------------|
| `timezone-pairs.ts` | Source of 12 zone slugs for converter link targets; 12 of 38 map zones click through to existing converter pages |
| `TimezoneConverter.astro` clock pattern | Single-loop `requestAnimationFrame` + `Intl.DateTimeFormat` pattern should be extracted to shared utility and reused |
| `/embed/[pair].astro` pattern | Map embed page (`/embed/map.html`) is structural copy: no Layout, transparent background, postMessage resize |
| `Layout.astro` | Map page (`/tools/map.html`) wraps with same Layout as all other tools pages — no changes needed |
| Dark gradient theme (#1e293b to #334155) | SVG zone colors should harmonize with existing dark theme palette |
| Existing 40 converter pages | Destination pages for map zone clicks — they already exist and need no changes |

Features that require new infrastructure:

| New Asset Required | What It Enables |
|-------------------|-----------------|
| `timezone-zones.ts` (net-new data file) | Full 38-zone UTC offset dataset with IANA IDs, DST flags, converter pair slugs, SVG group IDs |
| Annotated SVG world map file | The visual base of the map; needs `data-utc-offset` and `data-iana` attributes per zone group |
| `WorldMap.astro` component | SVG rendering, hover/click interaction, live clock updates |
| `src/utils/time-format.ts` (recommended) | Shared time formatting functions to avoid duplicating TimezoneConverter logic |

---

## Sources

- [timeanddate.com/time/map](https://www.timeanddate.com/time/map/) — map feature analysis
- [timeanddate.com/worldclock/meeting.html](https://www.timeanddate.com/worldclock/meeting.html) — meeting planner feature analysis
- [worldtimebuddy.com](https://www.worldtimebuddy.com/) — timeline grid, calendar export features
- [everytimezone.com](https://everytimezone.com/) — horizontal band chart, sharing features
- [zonemap.live](https://zonemap.live/) — drag-to-simulate timeline, working hours overlap bar
- [iloveclock.com/en/world-clock/map](https://iloveclock.com/en/world-clock/map) — solar position, astronomical twilight
- [24timezones.com/timezone-map](https://24timezones.com/timezone-map) — day/night overlay, real-time coloring
- [timezoneoverlap.com](https://timezoneoverlap.com/) — overlap-focused visualization
- [whenest.com/availability-heatmap](https://whenest.com/availability-heatmap) — heatmap visualization type
- [timezonebase.com/blog/best-time-zone-converter-tools-2026](https://timezonebase.com/blog/best-time-zone-converter-tools-2026.html) — feature comparison review
- [MakeUseOf: 10 ways to visualize time zones](https://www.makeuseof.com/tag/10-ways-to-visualize-time-zones-around-the-world/) — visualization taxonomy
- [oncehub.com: 9 meeting planner tools for global teams](https://www.oncehub.com/blog/9-meeting-planner-world-clock-tools-for-global-teams) — remote team use cases
- [zonemap.live Hacker News thread](https://news.ycombinator.com/item?id=47151210) — builder rationale, pain points
- [6 techniques for comparing timezone overlays](https://www.maplibrary.org/10102/6-techniques-for-comparing-time-zone-overlays/) — visualization pattern taxonomy
- [markkilby.com: Hours of Overlap (HoO)](https://www.markkilby.com/hours-of-overlap-hoo/) — remote team overlap concept

---
*Feature research for: Interactive timezone visualization tools — Astro static site milestone v1.1*
*Researched: 2026-03-30*
