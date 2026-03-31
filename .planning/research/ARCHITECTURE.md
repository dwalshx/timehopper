# Architecture Research

**Domain:** Timezone visualization tools integrated into existing Astro static site
**Researched:** 2026-03-30
**Confidence:** HIGH (based on direct codebase inspection + verified Astro docs)

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         Pages Layer                              │
├──────────────────┬──────────────────┬───────────────────────────┤
│  /tools/map.html │ /embed/map.html  │  /tools/convert/[pair].html│
│  (NEW)           │ (NEW)            │  (EXISTING — 40 pages)    │
└────────┬─────────┴────────┬─────────┴───────────────────────────┘
         │                  │
┌────────▼──────────────────▼─────────────────────────────────────┐
│                      Components Layer                            │
├──────────────────────┬──────────────────────────────────────────┤
│  WorldMap.astro (NEW)│  TimezoneConverter.astro (EXISTING)      │
│  WorldClocks.astro   │  Navigation.astro                        │
│  (NEW, optional)     │  Layout.astro                            │
└──────────┬───────────┴──────────────────────────────────────────┘
           │
┌──────────▼───────────────────────────────────────────────────────┐
│                         Data Layer                               │
├─────────────────────────┬────────────────────────────────────────┤
│  timezone-zones.ts (NEW)│  timezone-pairs.ts (EXISTING)         │
│  All UTC offsets, ~38   │  12 base zones, 40 converter pairs    │
│  zones with IANA IDs    │  with full content, FAQs, slugs       │
└─────────────────────────┴────────────────────────────────────────┘
           │
┌──────────▼───────────────────────────────────────────────────────┐
│                       Assets Layer                               │
├──────────────────────────────────────────────────────────────────┤
│  public/images/world-map.svg  (large SVG, ~200-400KB raw)       │
│  OR: src/assets/world-map.svg (inlined at build time)           │
└──────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| `WorldMap.astro` | Renders SVG map, handles zone click/hover, shows live UTC times | Inline SVG + vanilla JS setInterval |
| `WorldClocks.astro` | Optional: grid of live clocks for all 38 UTC offsets | Vanilla JS, same Intl API pattern as TimezoneConverter |
| `Layout.astro` (existing) | Page shell, nav, SEO, JSON-LD, footer | No changes required |
| `TimezoneConverter.astro` (existing) | Two-zone live converter widget | No changes required |
| `timezone-zones.ts` (new) | Data for all 38 UTC offsets (IANA IDs, offset values, display names) | Exported TS const array |
| `timezone-pairs.ts` (existing) | 12 base zones, 40 converter pairs with content | No changes required |

---

## Recommended Project Structure

```
website/src/
├── components/
│   ├── TimezoneConverter.astro   # EXISTING — no changes
│   ├── WorldMap.astro            # NEW — interactive SVG map component
│   ├── WorldClocks.astro         # NEW (optional) — grid of live clocks
│   ├── Navigation.astro          # EXISTING — add map link
│   ├── JsonLd.astro              # EXISTING — no changes
│   ├── RelatedPosts.astro        # EXISTING — no changes
│   └── SupportCTA.astro          # EXISTING — no changes
├── data/
│   ├── timezone-pairs.ts         # EXISTING — 12 zones, 40 pairs, no changes
│   └── timezone-zones.ts         # NEW — all 38 UTC offsets + map linkage data
├── pages/
│   ├── tools/
│   │   ├── convert/
│   │   │   ├── index.astro       # EXISTING
│   │   │   └── [pair].astro      # EXISTING — 40 converter pages
│   │   └── map.astro             # NEW — /tools/map.html
│   └── embed/
│       ├── [pair].astro          # EXISTING — 40 embed pages
│       └── map.astro             # NEW — /embed/map.html
├── layouts/
│   └── Layout.astro              # EXISTING — no structural changes needed
└── assets/                       # (if using src-import SVG approach)
    └── world-map.svg             # NEW — SVG map source file

website/public/
├── images/                       # EXISTING
└── (world-map.svg here if using  # ALTERNATIVE — served as static asset
    the external reference approach)
```

### Structure Rationale

- **`data/timezone-zones.ts`:** Separate from `timezone-pairs.ts` to avoid breaking 40 existing pages that import pairs. The zones file covers the full UTC offset spectrum (-12 to +14), while pairs only covers 12 curated zones. Both files can cross-reference each other without circular imports.
- **`pages/tools/map.astro`:** Follows the existing `/tools/convert/` path convention. Generates `/tools/map.html` at build time, consistent with `build.format: 'file'`.
- **`pages/embed/map.astro`:** Reuses the embed pattern exactly — no Layout wrapper, transparent background, postMessage resize. The map embed is a standalone HTML page.
- **SVG asset placement:** `src/assets/` for inline import (Astro inlines at build) or `public/` for external `<img src>` reference. Choose based on file size — see Patterns below.

---

## Architectural Patterns

### Pattern 1: SVG Inlined via Astro Component (recommended for maps under ~150KB)

**What:** The SVG map markup lives in `WorldMap.astro` or is imported from `src/assets/world-map.svg`. Astro inlines it into the HTML at build time. JavaScript running in the browser attaches click/hover handlers using `document.querySelectorAll('[data-utc-offset]')`.

**When to use:** When the SVG is small enough that inline saves an HTTP round-trip, and when JavaScript must manipulate SVG elements by selecting them from the DOM.

**Trade-offs:** Inlining avoids a separate HTTP request and makes SVG elements first-class DOM nodes (queryable, styleable). Downside: adds to initial HTML payload. For a map SVG, 100-200KB inline is acceptable for a tools page.

**Example:**
```typescript
// WorldMap.astro — frontmatter
// No external imports needed; SVG is written directly in the template

// In the <script> block (vanilla JS, runs in browser):
document.querySelectorAll('[data-utc-offset]').forEach(zone => {
  zone.addEventListener('click', () => {
    const offset = zone.dataset.utcOffset; // e.g. "-5"
    const pairSlug = zone.dataset.converterPair; // e.g. "est-to-utc" if pair exists
    if (pairSlug) {
      window.location.href = `/tools/convert/${pairSlug}.html`;
    } else {
      // Show tooltip/info panel for zones without a converter pair
      showZoneInfo(offset);
    }
  });
});
```

### Pattern 2: SVG as External Asset (recommended if SVG exceeds ~300KB)

**What:** SVG is placed in `public/images/world-map.svg`. The HTML references it via `<img src="/images/world-map.svg">` or `<object>`. JavaScript cannot select internal SVG elements this way, so interaction requires coordinate-to-zone hit testing via click position calculation or an overlay canvas.

**When to use:** When the source SVG is very large (detailed geographic boundaries) and inlining would bloat HTML significantly. Also when the map is display-only (no interactivity needed).

**Trade-offs:** Cheaper to serve (cached separately), but loses DOM access to SVG elements. Click handling becomes coordinate math, which is complex. This is the wrong choice for an interactive map.

**Recommendation:** Avoid for interactive use. Use only if the SVG must remain external.

### Pattern 3: Data-Attribute Driven Zone-to-Converter Linkage

**What:** Each SVG `<path>` or `<g>` element for a timezone zone carries `data-utc-offset` and optionally `data-converter-pair` attributes. The data layer (`timezone-zones.ts`) defines which zones have converter pairs and which do not.

**When to use:** Every time a map zone needs to link to an existing converter page, or display live time for zones without a pair.

**Trade-offs:** Requires the SVG to be authored with data attributes embedded in the markup. Wikimedia Commons SVGs do not have these — they must be added as a post-processing step or manual edit. This is a one-time authoring cost. The attribute-driven approach keeps all logic in vanilla JS without a data lookup table.

**Example data shape in `timezone-zones.ts`:**
```typescript
export interface TimezoneZone {
  utcOffset: number;        // e.g. -5 (integer or .5 for half-hours)
  displayName: string;      // e.g. "UTC-5 (Eastern)"
  iana: string;             // e.g. "America/New_York"
  abbr: string;             // e.g. "EST"
  hasDST: boolean;
  converterPair?: string;   // slug of existing pair, e.g. "est-to-utc"
  svgGroupId: string;       // ID of the SVG <g> or <path> element
}
```

### Pattern 4: Embed Page — Identical to Existing Pattern

**What:** `/embed/map.html` is a standalone page: no Layout wrapper, `overflow: hidden`, transparent body background, postMessage for height. Structurally identical to existing `/embed/[pair].html` pages.

**When to use:** Any tool page that needs to be iframeable on third-party sites.

**Trade-offs:** None — this pattern is already proven in production with 40 converter embeds. Exact copy-paste structure with WorldMap component substituted for TimezoneConverter.

**Example:**
```astro
---
// src/pages/embed/map.astro
import WorldMap from '../../components/WorldMap.astro';
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="robots" content="noindex" />
    <!-- Same structured data approach as embed/[pair].astro -->
    <style is:global>
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html, body { background: transparent; overflow: hidden; }
    </style>
  </head>
  <body>
    <WorldMap />
    <script>
      // Same postMessage resize pattern as existing embed pages
      function sendHeight() {
        const height = document.body.scrollHeight;
        window.parent.postMessage({ type: 'timehopper-embed-resize', height }, '*');
      }
      document.addEventListener('DOMContentLoaded', () => { sendHeight(); setTimeout(sendHeight, 500); });
      window.addEventListener('resize', sendHeight);
    </script>
  </body>
</html>
```

---

## Data Flow

### Zone Click to Converter Navigation

```
User clicks SVG zone path
    ↓
Vanilla JS click handler reads data-converter-pair attribute
    ↓
If pair exists → navigate to /tools/convert/{pair-slug}.html
If no pair → show inline tooltip with live clock for that UTC offset
```

### Live Clock Update Flow (identical to existing TimezoneConverter pattern)

```
DOMContentLoaded
    ↓
Collect all [data-utc-offset] zone elements
    ↓
setInterval(updateAllClocks, 1000)
    ↓
For each zone: new Date().toLocaleTimeString('en-US', { timeZone: zone.iana })
    ↓
Update DOM text node in zone label overlay
```

### Data Model Relationship

```
timezone-zones.ts               timezone-pairs.ts
(38 UTC offsets, all zones)     (12 curated zones, 40 pairs)
        │                               │
        │  converterPair?: slug ────────┤
        │  (12 of 38 zones link         │
        │   to existing converter)      │
        ↓                               ↓
  WorldMap.astro             TimezoneConverter.astro
  (map rendering,            (converter widget,
   all 38 zones)              40 dedicated pages)
```

### Build-Time Data Flow

```
timezone-zones.ts
    ↓ imported by
src/pages/tools/map.astro
    ↓ generates at build
docs/tools/map.html  (static HTML with inline SVG + hydrated vanilla JS)

src/pages/embed/map.astro
    ↓ generates at build
docs/embed/map.html  (standalone, noindex, same SVG component)
```

---

## Integration Points

### Existing Code: What to Reuse vs What's Net-New

| Element | Status | Action |
|---------|--------|--------|
| `TimezoneConverter.astro` | EXISTING | No changes — used on 40 converter pages |
| `Layout.astro` | EXISTING | No changes — map page wraps with same Layout |
| `timezone-pairs.ts` | EXISTING | No changes — pairs remain the source of truth for converters |
| `Navigation.astro` | EXISTING — needs update | Add "World Map" link to nav |
| `timezone-zones.ts` | NET-NEW | Full UTC offset dataset for map; cross-references pairs |
| `WorldMap.astro` | NET-NEW | SVG + live clocks + click navigation |
| `pages/tools/map.astro` | NET-NEW | Page using Layout wrapper |
| `pages/embed/map.astro` | NET-NEW | Standalone embed page |
| SVG source file | NET-NEW | Wikimedia Commons base, annotated with data attributes |

### Zone-to-Converter Pair Mapping

The 12 existing base zones cover these UTC offsets: -8, -7, -6, -5, 0 (×2), +1, +2, +5.5, +8, +9, +10. The map shows ~38 total UTC offsets. Zones with existing converter pairs get clickable links; zones without pairs show a live clock tooltip. This is a progressive enhancement — the map is useful standalone, and becomes more useful as more converter pairs exist.

### SVG Asset Strategy (Recommended Decision)

Use an SVG with UTC-offset-level granularity rather than IANA-level (not one path per country, but one `<g>` per UTC offset band). This matches the existing data model (which uses UTC offsets, not country polygons) and keeps the SVG smaller.

**Recommended source:** Wikimedia Commons "Time zones of the world" SVG. License: CC BY-SA (attribution required in page footer or credits). Requires post-processing to add `data-utc-offset` attributes to each zone group. This is a one-time edit.

**File size expectation:** Wikimedia timezone SVGs are typically 300-800KB raw. After SVGO compression (which Astro applies automatically when importing from `src/assets/`), expect 100-300KB. For a tools page, this is acceptable. For the embed variant, consider a simplified version (fewer geographic details, same UTC zone bands).

### Routing and Build Output

`src/pages/tools/map.astro` (no square-bracket in filename) → generates `docs/tools/map.html` automatically. No `getStaticPaths()` needed — this is a static non-parameterized page, just like `tools/convert/index.astro`.

`src/pages/embed/map.astro` → generates `docs/embed/map.html`. Same pattern.

The `build.format: 'file'` config in `astro.config.mjs` ensures `.html` extension output, consistent with all existing pages.

---

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| Current (40 pairs) | Inline SVG in WorldMap component. Single static map page. |
| Adding more converter pairs | No architecture change — update timezone-zones.ts converterPair fields as new pairs are added. Map automatically inherits links. |
| Adding per-zone converter pages for all 38 offsets | Extend timezone-zones.ts, add slugs, use getStaticPaths in a new [zone].astro page. No map changes needed. |
| Heavy embed usage | SVG is served as static HTML — CDN caches it. No server-side load. Scales to any traffic. |

---

## Anti-Patterns

### Anti-Pattern 1: Putting SVG in `public/` for an interactive map

**What people do:** Drop the SVG file in `public/images/` and reference it with `<img src>`.

**Why it's wrong:** Browser cannot query or manipulate SVG elements inside an `<img>` tag. Click handlers on individual timezone zones become impossible. You lose the entire interactivity model.

**Do this instead:** Inline the SVG either directly in the `.astro` component template or import it from `src/assets/` so Astro inlines it at build time. This makes every `<path>` and `<g>` a first-class DOM node accessible to vanilla JS.

### Anti-Pattern 2: Importing timezone-pairs.ts to drive the map

**What people do:** Try to use the 12 existing pairs as the data source for the map, generating 12 zone regions.

**Why it's wrong:** The map should represent all ~38 UTC offsets visually, not just the 12 zones with converter pages. Using only 12 leaves most of the world uncolored or uncovered, creating a confusing half-populated map.

**Do this instead:** Create `timezone-zones.ts` with all 38 offsets. Import `pairs` from `timezone-pairs.ts` inside `timezone-zones.ts` to populate the `converterPair` field where a match exists. The map uses the zones data; the converter pages use the pairs data.

### Anti-Pattern 3: One SVG path per country

**What people do:** Use a world map SVG with country-level granularity and try to assign timezone data per country.

**Why it's wrong:** Many countries span multiple timezones (USA, Russia, Australia, Canada). Many timezone offsets span multiple countries. Aligning country polygons to UTC offset bands requires complex many-to-many mapping. A detailed country SVG is also 2-5MB, far too large for inline embedding.

**Do this instead:** Use a UTC-offset-band SVG where each colored band is one `<g>` element representing a UTC offset. These are pre-made and available from Wikimedia Commons. They match the data model exactly and keep file sizes manageable.

### Anti-Pattern 4: Separate JS clock logic in WorldMap vs TimezoneConverter

**What people do:** Write entirely new time formatting functions in WorldMap.astro that duplicate what TimezoneConverter.astro already does.

**Why it's wrong:** Creates maintenance burden — any fix or improvement to time formatting must be made in two places.

**Do this instead:** Extract the core formatting functions (`formatTime`, `getDSTLabel`) into a shared utility file at `src/utils/time-format.ts`. Both `TimezoneConverter.astro` and `WorldMap.astro` import from the same source. Consistent behavior, single place to fix bugs.

### Anti-Pattern 5: Using Intl.supportedValuesOf('timeZone') to enumerate zones at runtime

**What people do:** Try to dynamically discover all available timezones from the browser API to populate the map data.

**Why it's wrong:** Chrome's implementation is incomplete — it excludes `Etc/*` zones and returns inconsistent results compared to Firefox and Safari. Also, the list returns IANA zone names, not UTC offsets, and includes hundreds of aliases you don't want.

**Do this instead:** Hard-code `timezone-zones.ts` with the specific 38 UTC offset zones the map needs. IANA timezone data doesn't change frequently; the static data file is the right approach here, consistent with how the existing `timezone-pairs.ts` is structured.

---

## Build Order Recommendation

1. **`timezone-zones.ts`** — must exist before any component or page imports it
2. **SVG source file** — annotate with `data-utc-offset` attributes before component work
3. **`WorldMap.astro`** — core component, testable in isolation
4. **`pages/tools/map.astro`** — wraps WorldMap in Layout, adds page-level SEO
5. **`pages/embed/map.astro`** — copy embed pattern, substitute WorldMap
6. **`Navigation.astro`** update — add map link last (no dependencies)

---

## Sources

- Direct codebase inspection: `website/src/components/TimezoneConverter.astro`, `website/src/data/timezone-pairs.ts`, `website/src/pages/embed/[pair].astro`, `website/src/pages/tools/convert/[pair].astro`, `website/src/layouts/Layout.astro`, `website/astro.config.mjs`
- [Astro Routing Reference](https://docs.astro.build/en/guides/routing/) — static vs dynamic routes, `build.format: 'file'`
- [Astro SVG as Component](https://astrothem.es/blog/astro-svg-components/) — inline SVG import patterns
- [Astro Experimental SVG Optimization](https://docs.astro.build/en/reference/experimental-flags/svg-optimization/) — build-time optimization
- [Astro Client-side Scripts](https://docs.astro.build/en/guides/client-side-scripts/) — vanilla JS event handling in Astro components
- [Intl.supportedValuesOf browser inconsistency](https://github.com/mdn/browser-compat-data/issues/25828) — Chrome omits Etc/* zones (use static data instead)
- [timezone-boundary-builder](https://github.com/evansiroky/timezone-boundary-builder) — GeoJSON source for timezone boundaries
- [simplified-timezone-boundaries](https://github.com/dejurin/simplified-timezone-boundaries) — simplified GeoJSON (not SVG, but informs SVG sourcing decision)
- [Wikimedia Commons World Time Zones Map SVG](https://commons.wikimedia.org/wiki/File:World_Time_Zones_Map.svg) — recommended SVG source

---
*Architecture research for: Timezone visualization tools in Astro static site*
*Researched: 2026-03-30*
