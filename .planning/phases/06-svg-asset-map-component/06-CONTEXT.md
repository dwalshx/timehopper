# Phase 6: SVG Asset & Map Component - Context

**Gathered:** 2026-03-31
**Status:** Ready for planning

<domain>
## Phase Boundary

The WorldMap.astro component renders an interactive SVG world map with color-coded timezone bands and live clocks. This phase creates the visual map component — interactivity (hover/click) is Phase 7.

</domain>

<decisions>
## Implementation Decisions

### SVG Source & Preparation
- Generate simplified SVG with vertical timezone bands (not geographic borders) — lightweight, guaranteed UTC+13/+14 coverage, matches dark theme natively
- Color-code bands using gradient spectrum from cool (blues) to warm (oranges) across UTC offsets — visually intuitive west-to-east
- Inline SVG directly in WorldMap.astro template — enables DOM access for interactivity
- Label zones with abbreviation overlaid on each band with UTC offset below

### Clock Display
- Show live clocks for ~8-10 major zones positioned along map bands — not all 39
- Clock format: HH:MM with zone abbreviation (e.g., "3:42 PM EST") — matches TimezoneConverter pattern
- Position clocks overlaid on their timezone band at representative city latitude

### Component Structure
- Single WorldMap.astro with inline script + scoped styles — matches TimezoneConverter pattern
- Import zones array from timezone-zones.ts at build time, render data-tz attributes on SVG elements
- Match existing slate gradient (#1e293b → #334155) with accent highlights (#fd547a for hover)

### Claude's Discretion
- Exact SVG geometry and band widths
- Which 8-10 zones get visible clocks (pick globally representative spread)
- Clock text sizing and positioning details
- Animation/transition details for clock updates

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- TimezoneConverter.astro — inline script pattern with data-* attributes and Intl.DateTimeFormat
- timezone-zones.ts — 39 zones with iana, abbr, utcOffsetMinutes, region, city, hasDST, converterPair
- Layout.astro — wrapper with SEO metadata, breadcrumbs, slot-based content

### Established Patterns
- Props via Astro.props, data attributes for JS bridging
- Single setInterval for clock updates (not per-element timers)
- Scoped styles with dark theme (slate gradient, #fd547a accent, rgba white text)
- DOMContentLoaded dual-init pattern for SSR safety

### Integration Points
- WorldMap.astro will be used by /tools/map.astro (Phase 8) and /embed/map.astro (Phase 8)
- Navigation.astro will get a map link (Phase 8)
- timezone-zones.ts provides all zone data at build time

</code_context>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches within the decided framework.

</specifics>

<deferred>
## Deferred Ideas

- Hover tooltips and click navigation — Phase 7
- Map page and embed page — Phase 8
- Mobile card fallback — Phase 9

</deferred>

---

*Phase: 06-svg-asset-map-component*
*Context gathered: 2026-03-31 via smart discuss*
