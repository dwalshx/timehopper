# Stack Research

**Domain:** Interactive SVG timezone visualizations — world map with live clocks, embeddable widgets, zero external dependencies
**Researched:** 2026-03-30
**Confidence:** HIGH (browser APIs verified via MDN; SVG data sources verified via official repos; Astro patterns verified via official docs)

---

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Astro | 5.17.1 (current) | Page shell, build orchestration, SVG inlining | Already in project; Astro 5.7+ has native experimental SVG component import; handles pre-build scripts via package.json |
| Browser `Intl` API | ES2022+ (no version) | Timezone names, UTC offsets, formatted times | Already proven in project; `Intl.supportedValuesOf('timeZone')` returns 400+ IANA IDs; `timeZoneName: 'shortOffset'` yields "GMT-8" labels; zero-dependency |
| Inline SVG (world map) | — | Timezone region rendering, hit targets, CSS hover | Inline SVG gives direct DOM access for event delegation; `pointer-events` attribute on `<path>` elements is fully cross-browser; no canvas complexity |
| `setInterval` (single shared) | Browser built-in | Driving live clock updates for all zones simultaneously | One shared 1000ms interval dispatching to all clock DOM nodes beats N individual intervals; browser throttles background tabs automatically |
| Page Visibility API (`document.hidden`) | Browser built-in | Pause clock updates when tab is hidden | Free CPU/battery win; `visibilitychange` event re-syncs time on tab focus so clocks never drift visibly |

### SVG Map Data Pipeline (Build-Time Only)

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| timezone-boundary-builder releases | 2025c | Source GeoJSON for all IANA timezone polygons | OSM-derived, ODbL licensed, `tzid` attribute on every feature links to IANA ID; updated to 2025c |
| Natural Earth Timezones (1:10m) | 4.0.0 | Lightweight alternative source (24 UTC-offset bands) | Public domain (no attribution required); ~1.88MB shapefile → much smaller post-simplification; only has UTC offset, not full IANA name |
| `geojson2svg` (npm, build-time only) | latest | Convert GeoJSON polygons → SVG `<path>` `d` strings | Node.js-compatible; produces viewBox-aware path strings; combine with SVGO for final compression |
| `mapshaper` (npm, build-time only) | latest | Simplify GeoJSON polygon complexity before SVG conversion | Douglas-Peucker / Visvalingam simplification; 8% simplification yields ~850KB GeoJSON vs multi-MB raw; CLI-friendly for npm scripts |
| SVGO (npm, build-time only) | latest | Compress final SVG output | Removes redundant nodes, optimizes `d` path strings; already the standard for SVG optimization pipelines |

### Supporting Patterns (No New Libraries)

| Pattern | Purpose | How |
|---------|---------|-----|
| `data-tz` HTML attributes on `<path>` | Store IANA timezone ID per SVG region | `<path data-tz="America/New_York" data-offset="-5" ...>` — no lookup tables needed at runtime |
| Event delegation on `<svg>` element | Single click/hover handler for all regions | Attach one `mouseover` + `click` listener to `<svg>`; read `event.target.closest('[data-tz]')` — O(1) per event |
| `getBoundingClientRect()` on hovered `<path>` | Position tooltip/popup relative to viewport | Works on SVG elements; add `window.scrollX/Y` for document-relative position |
| `requestAnimationFrame` | Smooth second-hand animation (analog clocks only) | Use only if building analog clock faces; for digital text readouts, single `setInterval` is sufficient and correct |
| CSS `transition` on SVG `fill` | Hover highlight effect | `path { transition: fill 150ms ease; }` — runs on compositor thread, zero JS cost |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| `npm run prebuild` script | Run GeoJSON → SVG conversion before `astro build` | Add `"prebuild": "node scripts/generate-map-svg.js"` to package.json; Astro's `astro build` auto-runs `prebuild` hook first |
| SVGO CLI | Final SVG optimization in build pipeline | `npx svgo --input=src/assets/timezone-map.svg --output=src/assets/timezone-map.svg` |
| Browser DevTools Performance tab | Profile clock update loop | Verify `setInterval` callback stays under 1ms per tick for 20+ clocks |

---

## Installation

```bash
# Build-time only — these run in prebuild script, NOT shipped to browser
npm install -D geojson2svg mapshaper svgo

# No runtime additions — zero new browser dependencies
```

The three dev dependencies are consumed entirely in `scripts/generate-map-svg.js` and produce a static `.svg` file committed to `src/assets/`. They do not affect bundle size.

---

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Build-time GeoJSON → SVG pre-generation | Runtime GeoJSON fetch + canvas/SVG rendering | Only if timezone boundaries need to update dynamically (they don't — static site) |
| timezone-boundary-builder GeoJSON (IANA tzid per polygon) | Natural Earth UTC-offset bands (24 zones) | Natural Earth is sufficient if you only need UTC offset labels, not linkage to existing IANA-named converter pages |
| Single shared `setInterval` | N individual `setInterval` per clock | N individual intervals are fine for ≤5 clocks; at 20+ clocks the shared dispatcher is cleaner to pause/resume with Page Visibility API |
| Inline SVG in Astro component | `<img src="map.svg">` or `<object>` | External SVG references block JS access to internal DOM; inline is required for interactive hover/click |
| Inline SVG in Astro component | Astro 5.7 experimental SVG import | Experimental flag; the map SVG is too large and complex for icon-style import; manually inlining via `fs.readFileSync` in `.astro` frontmatter is stable and explicit |
| CSS `transition` on SVG fill | JS-driven style changes on hover | CSS transitions for fill are compositor-accelerated; JS style writes on every mousemove cause layout thrashing |
| `Intl.DateTimeFormat` with `timeZoneName: 'shortOffset'` | Hardcoded UTC offset strings | Hardcoded strings go stale with DST; `Intl` handles DST transitions automatically, same as existing converter pages |

---

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| D3.js | 57KB+ runtime library just for SVG path projection; violates zero-dependency constraint | Generate SVG paths at build time with `geojson2svg` (dev dep only); serve static SVG |
| Leaflet / Mapbox / Google Maps | External map libraries — heavy, require accounts/keys, violate zero-dep constraint | Hand-rolled inline SVG with timezone-boundary-builder data |
| Moment Timezone | 67KB+ deprecated library for timezone data | Browser `Intl` API has full IANA database built-in, zero bytes shipped |
| `<canvas>` for map rendering | Accessibility problems (no DOM nodes to attach ARIA/click handlers to per region); harder hit testing for irregular polygons | SVG paths with `pointer-events: visiblePainted` |
| jQuery timezone-picker | jQuery dependency; stale library; assumes Moment.js | Vanilla JS event delegation on inline SVG |
| Multiple `setInterval` (one per clock) | 20+ intervals each wake the event loop independently; harder to pause all at once for Page Visibility | Single shared 1000ms interval; all clocks update in one callback |
| `requestAnimationFrame` for clock text updates | rAF fires 60x/second; digital clock text only needs 1x/second; wastes CPU | `setInterval(update, 1000)` with Page Visibility guard |
| Fetching timezone boundary GeoJSON at runtime | Large payload (850KB+ even simplified); blocks initial render; unnecessary for static data | Pre-generate SVG at build time; serve as static asset |

---

## Stack Patterns by Variant

**If the map shows UTC offset bands (simpler approach):**
- Use Natural Earth Timezones data (public domain, 24 bands, `ZONE` attribute is numeric UTC offset)
- Group `<path>` elements by UTC offset, link to `/convert/utc-to-[zone]/` pages
- Each band gets one color from a 24-step hue progression

**If the map shows full IANA timezone regions (richer, links to existing pairs):**
- Use timezone-boundary-builder 2025c GeoJSON (ODbL license — output is not copyleft for web use)
- Each `<path>` carries `data-tz="America/New_York"`; JS maps that to existing converter pair URLs
- ~37 of the 40 existing pairs have direct IANA tzid matches; remaining 3 map to closest zone

**If building embeddable widget (iframe) version of the map:**
- Same SVG, same JS, different Astro page at `/tools/world-time-map/embed.html`
- Add `postMessage` auto-resize (already established pattern from v1.0 embed pages)
- Strip navigation; keep dark gradient theme consistent

**If 20+ simultaneous live clocks on a "world clock" page (not map):**
- Render clock DOM nodes statically in Astro using `Intl.supportedValuesOf('timeZone')` at build time — no JS needed to create elements
- Single `setInterval` in client `<script>` queries all `[data-tz]` elements and calls `Intl.DateTimeFormat.format(new Date())`
- Use `document.hidden` guard: `if (document.hidden) return;` at top of interval callback

---

## Version Compatibility

| Package | Compatible With | Notes |
|---------|-----------------|-------|
| astro@5.17.1 | node@18+ | Already installed; no change needed |
| geojson2svg@latest | node@16+ | Build-time only; no browser compatibility concerns |
| mapshaper@latest | node@14+ | CLI tool; run before geojson2svg in prebuild script |
| svgo@latest | node@14+ | SVGO 3.x has breaking changes from 2.x; use 3.x (current) |
| Browser `Intl.supportedValuesOf` | Chrome 93+, Firefox 91+, Edge 93+, Safari 15.4+ | Baseline widely available since March 2022; safe for target audience |
| SVG `pointer-events` attribute | All modern browsers | Fully supported; use `visiblePainted` value for filled paths |
| Page Visibility API (`document.hidden`) | All modern browsers | Universally supported; no prefix needed since 2013 |

---

## Data Structure: Timezone Master List

At build time, generate a single JS module (`src/data/timezones.ts`) mapping IANA IDs to display metadata. This is the only "data addition" to the project:

```typescript
// Generated at build time OR maintained manually for the 20-30 "featured" zones
export interface TimezoneEntry {
  tzid: string;          // "America/New_York" — IANA identifier
  label: string;         // "Eastern Time" — human label
  utcOffset: number;     // -5 — standard offset in hours (no DST)
  dstOffset: number;     // -4 — DST offset in hours (same if no DST)
  cities: string[];      // ["New York", "Boston", "Miami"]
  converterSlug?: string; // "est-to-pst" — links to existing v1.0 page if exists
}
```

Runtime UTC offset for ANY IANA zone (handles DST correctly):
```javascript
// Use Intl to get live offset — do NOT hardcode
function getLiveOffset(tzid) {
  const date = new Date();
  const formatter = new Intl.DateTimeFormat('en', {
    timeZone: tzid,
    timeZoneName: 'shortOffset'
  });
  // Returns "GMT-5" or "GMT+5:30" etc.
  return formatter.formatToParts(date).find(p => p.type === 'timeZoneName').value;
}
```

---

## Sources

- [MDN: Intl.supportedValuesOf()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/supportedValuesOf) — Browser support confirmed HIGH confidence; returns 400+ IANA IDs, Baseline widely available
- [MDN: Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API) — `document.hidden` + `visibilitychange` for background tab pause, HIGH confidence
- [MDN: SVG pointer-events](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/pointer-events) — Cross-browser SVG interactivity patterns, HIGH confidence
- [MDN: Element.getBoundingClientRect()](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect) — Works on SVG elements for tooltip positioning, HIGH confidence
- [timezone-boundary-builder (GitHub)](https://github.com/evansiroky/timezone-boundary-builder) — 2025c release, GeoJSON + shapefile, MIT (code) + ODbL (data), `tzid` attribute per feature
- [Natural Earth Timezones](https://www.naturalearthdata.com/downloads/10m-cultural-vectors/timezones/) — Public domain, ~1.88MB shapefile, UTC offset attribute, 24 zones
- [simplified-timezone-boundaries (GitHub)](https://github.com/dejurin/simplified-timezone-boundaries) — 850KB simplified GeoJSON using mapshaper Visvalingam at 8%
- [geojson2svg (npm)](https://www.npmjs.com/package/geojson2svg) — Converts GeoJSON to SVG path strings, Node.js compatible, MEDIUM confidence (not widely starred but functional)
- [Astro Integration API docs](https://docs.astro.build/en/reference/integrations-reference/) — `astro:build:start` hook; `prebuild` npm script pattern confirmed
- [Astro 5.7 SVG components](https://alternativeto.net/news/2025/4/astro-5-7-released-with-experimental-fonts-api-svg-components-and-stable-sessions-api/) — Experimental SVG import flag exists but not recommended for large complex SVGs
- [MDN: requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame) — rAF pauses in background tabs; 60fps inappropriate for 1s clock updates
- [WebDevSimplified: Stop Using setInterval](https://blog.webdevsimplified.com/2021-12/request-animation-frame/) — rAF vs setInterval tradeoffs confirmed

---
*Stack research for: Interactive SVG Timezone Map — TimeHopper v1.1*
*Researched: 2026-03-30*
