# Project Research Summary

**Project:** TimeHopper v1.1 — Interactive SVG Timezone Map
**Domain:** Interactive timezone visualization tools integrated into existing Astro static site
**Researched:** 2026-03-30
**Confidence:** HIGH

## Executive Summary

TimeHopper v1.1 is a static-site timezone visualization feature — an interactive SVG world map with live clocks and zone click-through to existing converter pages — built on top of an already-deployed Astro 5 site with 40 converter pages and a proven embed pattern. The research consensus is clear: build the map entirely at build time (GeoJSON → SVG pre-generation via `mapshaper` + `geojson2svg` + SVGO), inline the resulting SVG directly in an Astro component, and drive all interactivity with zero-dependency vanilla JS using browser `Intl` API and a single shared `setInterval`. No runtime map library, no new runtime dependencies, no canvas. This is a static-first feature that plays directly to the project's existing strengths.

The recommended approach centers on a new `timezone-zones.ts` data file as the foundational layer, a `WorldMap.astro` component consuming it, and two new pages — `/tools/map.html` (standard layout) and `/embed/map.html` (reusing the proven embed pattern verbatim). The embeddable lightweight map is an unoccupied niche: every high-quality competitor (timeanddate, zonemap.live) is a heavy product that cannot be embedded. This is the primary differentiator. The map also converts into a traffic funnel: zone clicks navigate directly to the 40 existing converter pages.

The dominant risks are all data-model and asset-prep issues that must be resolved before writing a single line of rendering code: using IANA timezone identifiers (not fixed integer UTC offsets) to survive DST transitions, supporting half-hour offset zones (India, Nepal, Iran, Darwin) in the data model, sourcing a base SVG that includes UTC+13/+14 (Kiribati, Samoa), and aggressively optimizing the SVG to under 100KB before inlining. All six critical pitfalls are Phase 1 or Phase 2 concerns — none require architectural changes if addressed at the right time.

---

## Key Findings

### Recommended Stack

The stack is deliberately minimal: Astro 5.17.1 (already installed), browser `Intl` API (zero bytes shipped), inline SVG (direct DOM access for interaction), and a single shared `setInterval` with Page Visibility API guard. Three dev-only build tools are needed — `mapshaper`, `geojson2svg`, and `svgo` — but these run only in a `prebuild` npm script and ship nothing to the browser. The existing `timezone-pairs.ts` data file and `TimezoneConverter.astro` clock patterns are reused directly. The only meaningful new runtime artifact is a static SVG file and a vanilla JS event delegation handler.

**Core technologies:**
- Astro 5.17.1: page shell, build orchestration, SVG inlining at build time — already installed, no version change
- Browser `Intl.DateTimeFormat`: live time per IANA zone with automatic DST handling — zero bytes shipped, already proven in project
- Inline SVG (world map): gives direct DOM access to `<path>` elements for event delegation — required for interactivity
- Single shared `setInterval` (1000ms): drives all live clock updates in one callback — prevents timer drift across 25+ zones
- Page Visibility API (`document.hidden`): pauses clock loop when tab hidden — free CPU/battery win, prevents burst updates on restore
- `mapshaper` + `geojson2svg` + `svgo` (dev deps only): build-time GeoJSON-to-SVG pipeline — nothing shipped to browser
- `timezone-boundary-builder 2025c` (data source): IANA `tzid` attribute per polygon, ODbL licensed — preferred over Natural Earth if full IANA linkage is needed

**What NOT to use:** D3.js (57KB runtime), Leaflet/Mapbox (accounts required), Moment Timezone (67KB deprecated), `<canvas>` (no DOM nodes for hit testing), multiple `setInterval` per clock, runtime GeoJSON fetching.

### Expected Features

Research identified 8 competitors and mapped their feature sets against the static-site constraint. The embeddable lightweight map niche is genuinely open. The feature set is well-defined with clear P1/P2/P3 tiers.

**Must have (table stakes — v1.1 MVP):**
- Color-banded UTC offset zones on SVG map — the visual vocabulary users expect
- Live current time per zone (single tick loop + `Intl` API) — the #1 use case
- Hover tooltip: zone name, UTC offset, current time, DST status — every competitor has this
- DST-aware offset resolution using IANA identifiers — without this, US/EU/AU zones are wrong 6 months/year
- Half-hour offset zones displayed (India, Nepal, Iran, Darwin) — visible as distinct zones
- Click zone with converter pair → navigate to `/tools/convert/{pair}.html` — converts map into funnel for 40 existing pages
- Click zone without converter pair → inline info panel — no dead ends
- Mobile fallback: scrollable zone card list below 480px — >50% of users are on mobile
- Embeddable widget (`/embed/map.html`) — core differentiator; reuses existing pattern

**Should have (v1.x after validation):**
- City search field highlighting the correct zone
- Working hours context labels on hover (Business Hours / Evening / Late Night)
- UTC offset reference strip (horizontal bar below map)
- Next DST transition display in tooltip

**Defer (v2+):**
- Timeline/overlap chart (worldtimebuddy-style) — HIGH complexity, full product feature
- Day/night solar terminator overlay — HIGH complexity, requires solar position math
- Working hours heatmap — MEDIUM complexity, separate page
- Shareable URL encoding of zone selections
- Calendar export — delegate to existing Chrome extension

### Architecture Approach

The architecture integrates cleanly into the existing project with minimal disruption. Two new pages (`/tools/map.astro`, `/embed/map.astro`), two new components (`WorldMap.astro`, optionally `WorldClocks.astro`), and one new data file (`timezone-zones.ts`) are the complete surface area. All existing files — `timezone-pairs.ts`, `TimezoneConverter.astro`, `Layout.astro`, `[pair].astro` embed pages — require no changes. The data relationship is a one-way cross-reference: `timezone-zones.ts` imports from `timezone-pairs.ts` to populate the `converterPair` field for the 12 zones that have existing converter pages; the pairs file is never modified. Build output follows existing conventions: `docs/tools/map.html` and `docs/embed/map.html` via `build.format: 'file'`.

**Major components:**
1. `timezone-zones.ts` (new data layer) — defines all 38 UTC offsets with IANA IDs, DST flags, converter pair slugs, SVG group IDs; imported by WorldMap and map pages
2. `WorldMap.astro` (new component) — inline SVG rendering, vanilla JS event delegation for hover/click, single tick loop for live clocks, data-attribute driven zone-to-converter linkage
3. `pages/tools/map.astro` (new page) — wraps WorldMap in existing Layout, adds SEO/JSON-LD, outputs `/tools/map.html`
4. `pages/embed/map.astro` (new embed page) — no Layout, transparent background, postMessage auto-resize; structural copy of existing `embed/[pair].astro` with WorldMap substituted
5. `src/utils/time-format.ts` (recommended new utility) — shared time formatting functions extracted from TimezoneConverter to avoid duplication

**Key patterns to follow:**
- Inline SVG via Astro component (not `<img src>` or `<object>`) — required for JS access to SVG DOM nodes
- Data-attribute driven interaction: `data-utc-offset`, `data-iana`, `data-converter-pair` on each `<path>`/`<g>`
- UTC-offset-band SVG (one `<g>` per offset band) — not country-level granularity; matches data model and keeps file size manageable
- Event delegation on `<svg>` root — single handler for all zones, `event.target.closest('[data-iana]')`

### Critical Pitfalls

1. **Fixed UTC offsets break at DST transitions** — store IANA timezone identifiers (`"America/New_York"`) per region, resolve current offset at runtime via `Intl.DateTimeFormat` with `timeZoneName: "shortOffset"`. Never hardcode integer offsets. Address in Phase 1 data model.

2. **Half-hour and quarter-hour offsets silently dropped** — represent all offsets as minutes from UTC (not hours); explicitly test `["Asia/Kolkata", "Asia/Kathmandu", "Australia/Darwin", "Pacific/Chatham", "Asia/Tehran"]` as fixtures. Address in Phase 1 data model.

3. **SVG too large for inline use** — run base SVG through SVGO `--multipass` before any other work; target under 100KB (under 50KB gzipped); above 300KB inline fails Core Web Vitals LCP on mobile. Address in Phase 1 asset prep.

4. **UTC+13 and UTC+14 missing from base map** — verify base SVG file contains explicit paths for Kiribati Line Islands and Samoa/Tonga before committing to that source; source a replacement if missing. Address in Phase 1 SVG selection.

5. **Multiple `setInterval` timers cause visible clock drift** — use a single `requestAnimationFrame` loop with wall-clock second gating (`if (s !== lastSecond)`) that updates all clocks in one pass. Never create one timer per clock component. Address in Phase 2 clock implementation.

6. **Touch events conflict with scroll on mobile** — use `pointerup` for region selection (not `pointerdown`/`touchstart`); set `touch-action: pan-y` on the SVG container; show persistent info panel on mobile instead of dismissible overlay tooltip. Address in Phase 2 interaction layer.

---

## Implications for Roadmap

Based on combined research, the natural phase structure has three layers: foundational data and assets (must exist before any rendering), core interactive component (the map and its behavior), and integration/publishing (pages, embed, nav). All critical pitfalls map to Phase 1 or Phase 2 — the build order from ARCHITECTURE.md is the correct sequencing constraint.

### Phase 1: Foundation — Data Model and SVG Asset

**Rationale:** Every subsequent piece of work depends on `timezone-zones.ts` existing and the SVG being optimized. The three most expensive pitfalls (DST bugs, missing half-hour zones, SVG file size) are all data-model and asset-prep issues. Fixing them retroactively after rendering code exists is expensive. Do this first.

**Delivers:** `timezone-zones.ts` with all 38 UTC offsets + IANA IDs + converter pair cross-references; verified and optimized SVG base map file under 100KB; `src/utils/time-format.ts` shared utility extracted from existing TimezoneConverter

**Addresses:** timezone-zones.ts data file (FEATURES.md P1), DST awareness (table stakes), half-hour offset zones (table stakes)

**Avoids:** Pitfall 1 (fixed offsets), Pitfall 2 (half-hour offsets), Pitfall 3 (UTC+13/+14), Pitfall 5 (SVG file size)

**No research needed:** data model patterns are well-documented; `Intl` API behavior is verified via MDN

### Phase 2: Core Component — WorldMap.astro

**Rationale:** With the data layer and SVG asset ready, `WorldMap.astro` is the central deliverable. Building it in isolation (before wrapping in pages) allows testing the component directly and keeps page-level concerns separate.

**Delivers:** `WorldMap.astro` component with inline SVG, hover tooltip, zone click handler (navigate to converter pair or show inline info), single tick loop for live clocks, DST-correct time display, mobile touch handling, ARIA accessibility

**Uses:** `timezone-zones.ts` (Phase 1), `src/utils/time-format.ts` (Phase 1), inline SVG via Astro, single `requestAnimationFrame` tick loop with `document.hidden` guard

**Implements:** WorldMap component (ARCHITECTURE.md), event delegation pattern, data-attribute driven zone linkage (Pattern 3)

**Avoids:** Pitfall 4 (multiple timer drift), Pitfall 6 (touch scroll conflict)

**No research needed:** all patterns are verified vanilla JS; embed pattern is existing production code

### Phase 3: Pages and Integration

**Rationale:** Pages are thin wrappers once the component exists. The embed page is a structural copy of an existing production pattern. Navigation update is last because it has no dependencies.

**Delivers:** `/tools/map.html` (map page in standard Layout), `/embed/map.html` (standalone embed page with postMessage resize), Navigation.astro updated with "World Map" link

**Reuses:** `Layout.astro` (no changes), existing `embed/[pair].astro` pattern (copy-paste structure), `timezone-pairs.ts` (no changes)

**Implements:** Pattern 4 (embed page), standard Astro routing (no `getStaticPaths` needed)

**Avoids:** Integration gotcha — URL conflict with existing routes (verify `/tools/map` does not conflict before commit)

**No research needed:** page structure is standard Astro; embed pattern is proven in 40 existing pages

### Phase 4: Mobile Fallback and Polish

**Rationale:** Mobile fallback (scrollable card list below 480px) is a table-stakes requirement but is architecturally independent of the core map component. It can be added after the core component works on desktop. Polish items (cursor affordance, one-line instruction, clock flicker guard) are low-complexity additions that should not block the core deliverable.

**Delivers:** Responsive mobile card list below 480px viewports; cursor affordance and hover ring on interactive zones; clock flicker guard at second boundary; `Intl` fallback for environments without the API; "Looks Done But Isn't" checklist completion

**Addresses:** Mobile responsiveness (FEATURES.md table stakes), UX pitfalls from PITFALLS.md

**No research needed:** responsive CSS and progressive enhancement are standard patterns

### Phase Ordering Rationale

- `timezone-zones.ts` must exist before `WorldMap.astro` can import it — this is a hard dependency, not a preference
- SVG optimization must happen before rendering code is written — file size directly constrains whether inline SVG is viable
- IANA identifiers must be in the data model from day one — retrofitting after rendering code exists means touching every region record
- Component must exist before pages can wrap it — pages are thin; the component is where the work is
- Embed page is last because it is a copy of an existing pattern requiring only the component to exist
- Mobile fallback is architecturally independent and can be done in parallel with or after Phase 3, but must be done before launch

### Research Flags

Phases with well-documented patterns (skip `/gsd:research-phase`):
- **Phase 1:** `Intl` API behavior is verified via MDN (HIGH confidence); timezone-boundary-builder data format is verified; SVGO optimization is standard
- **Phase 2:** Single tick loop pattern is verified; Astro vanilla JS script pattern is documented; event delegation is foundational JS
- **Phase 3:** Astro routing is documented; embed pattern already in production
- **Phase 4:** Responsive CSS is standard; progressive enhancement is standard

Phases that may benefit from targeted validation during implementation:
- **Phase 1 (SVG sourcing):** The specific base SVG file choice needs manual verification that UTC+13/+14 paths exist — this is a one-time check, not a research phase, but must not be skipped
- **Phase 2 (browser testing):** iOS Safari SVG touch behavior should be tested on a real device early; DevTools simulation is insufficient for confirming `touch-action: pan-y` behavior

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All core APIs verified via MDN; Astro patterns verified via official docs; build pipeline tools (mapshaper, geojson2svg, svgo) are established npm packages |
| Features | HIGH | Competitive landscape thoroughly researched across 8 tools; user expectations for timezone maps are well-established; complexity estimates are MEDIUM confidence |
| Architecture | HIGH | Based on direct codebase inspection of existing Astro project; all patterns verified against Astro docs; integration points confirmed by reading existing component code |
| Pitfalls | HIGH (critical), MEDIUM (edge cases) | DST, half-hour offset, and timer drift pitfalls are well-documented; cross-browser SVG specifics are MEDIUM confidence |

**Overall confidence:** HIGH

### Gaps to Address

- **geojson2svg npm package:** MEDIUM confidence only — not widely starred; verify it produces usable SVG path strings for timezone boundary GeoJSON before committing to the build pipeline. Alternative: manual SVG authoring from Wikimedia Commons base file (simpler, no pipeline needed).
- **Base SVG file UTC+13/+14 coverage:** Must be manually verified before Phase 1 completes — cannot be confirmed through documentation alone. Open the source SVG and search for Kiribati/Samoa path elements.
- **SVG file size after SVGO:** The 100KB target is achievable based on documented compression ratios, but actual size depends on the chosen source file. Verify after running SVGO before proceeding to Phase 2.
- **`Intl.supportedValuesOf` completeness:** Chrome omits `Etc/*` zones. The static `timezone-zones.ts` approach (hardcoded 38 zones) is the correct mitigation — confirmed by ARCHITECTURE.md research. Not a gap, but worth flagging as a decision that was explicitly made.

---

## Sources

### Primary (HIGH confidence)
- [MDN: Intl.supportedValuesOf()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/supportedValuesOf) — browser support, IANA zone enumeration
- [MDN: Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API) — timer pausing in hidden tabs
- [MDN: SVG pointer-events](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/pointer-events) — cross-browser SVG interactivity
- [MDN: Element.getBoundingClientRect()](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect) — SVG element tooltip positioning
- [timezone-boundary-builder (GitHub)](https://github.com/evansiroky/timezone-boundary-builder) — 2025c GeoJSON source, IANA tzid per feature
- [Astro Routing Reference](https://docs.astro.build/en/guides/routing/) — static routing, `build.format: 'file'`
- [Astro Client-side Scripts](https://docs.astro.build/en/guides/client-side-scripts/) — vanilla JS in Astro components
- Direct codebase inspection: `TimezoneConverter.astro`, `timezone-pairs.ts`, `embed/[pair].astro`, `astro.config.mjs`

### Secondary (MEDIUM confidence)
- [timeanddate.com/time/map](https://www.timeanddate.com/time/map/) — competitive feature analysis
- [worldtimebuddy.com](https://www.worldtimebuddy.com/) — timeline grid, calendar export feature analysis
- [zonemap.live](https://zonemap.live/) — drag-to-simulate, working hours overlap
- [24timezones.com](https://24timezones.com/timezone-map) — day/night overlay patterns
- [Natural Earth Timezones](https://www.naturalearthdata.com/downloads/10m-cultural-vectors/timezones/) — alternative SVG data source (public domain)
- [Wikimedia Commons World Time Zones Map SVG](https://commons.wikimedia.org/wiki/File:World_Time_Zones_Map.svg) — recommended base SVG source
- [DebugBear: requestAnimationFrame performance](https://www.debugbear.com/blog/requestanimationframe) — rAF vs setInterval tradeoffs
- [Wikipedia: UTC+14:00](https://en.wikipedia.org/wiki/UTC+14:00) — Kiribati date line anomaly

### Tertiary (MEDIUM-LOW confidence)
- [geojson2svg (npm)](https://www.npmjs.com/package/geojson2svg) — build pipeline GeoJSON-to-SVG conversion; not widely starred, needs validation
- [simplified-timezone-boundaries (GitHub)](https://github.com/dejurin/simplified-timezone-boundaries) — 850KB simplified GeoJSON reference

---

*Research completed: 2026-03-30*
*Ready for roadmap: yes*
