# Pitfalls Research

**Domain:** Interactive SVG timezone map and live clock visualizations on static Astro site
**Researched:** 2026-03-30
**Confidence:** HIGH (critical pitfalls), MEDIUM (edge cases and cross-browser specifics)

---

## Critical Pitfalls

### Pitfall 1: Treating UTC Offsets as Fixed — DST Invalidates Static Color Mapping

**What goes wrong:**
The map assigns a fixed color to each SVG path region based on a hard-coded UTC offset. When DST transitions occur (typically March, October/November), entire country regions shift offset by +1. The map shows the wrong time for affected regions — US Eastern appears as UTC-5 in summer when it is actually UTC-4 (EDT). Users see incorrect live clock values or the wrong region highlighted.

**Why it happens:**
Developers map geographic regions to UTC offsets at build time using a lookup table. This works for countries that never observe DST (India, China, Japan) but fails for the ~70 countries that do shift. The build-time offset is frozen; the runtime reality changes twice a year.

**How to avoid:**
Never store a fixed UTC offset per region. Instead, store the IANA timezone identifier (e.g., `"America/New_York"`, `"Europe/London"`) for each SVG region, then compute the *current* UTC offset at runtime using `Intl.DateTimeFormat` with `timeZoneName: "shortOffset"`. Color the map dynamically based on the runtime-resolved offset, not a build-time constant.

```js
// WRONG — frozen at build time
const regions = { "us-east": -5 };

// CORRECT — resolved at runtime
function getCurrentOffset(ianaZone) {
  const fmt = new Intl.DateTimeFormat("en", {
    timeZone: ianaZone,
    timeZoneName: "shortOffset"
  });
  // parse "+5:30" or "-4" from formatted string
}
```

**Warning signs:**
- Region colors are assigned in a static JSON or `.ts` config file with numeric offsets.
- The map looks wrong after clocks change in March or November.
- Test in a browser with system time set to summer vs. winter — colors should differ for DST-observing regions.

**Phase to address:** Phase 1 (SVG map data layer / architecture) — the timezone-to-region mapping must use IANA identifiers from day one. Retrofitting this later requires touching every region record.

---

### Pitfall 2: Half-Hour and Quarter-Hour Offsets Rendered as Integer Slots

**What goes wrong:**
The map divides the world into 25 columns (UTC-12 to UTC+14, integer steps). India (UTC+5:30), Iran (UTC+3:30), Afghanistan (UTC+4:30), Australia/Darwin (UTC+9:30), Australia/Lord Howe (UTC+10:30), Nepal (UTC+5:45), Chatham Islands (UTC+12:45) fall between integer columns. They either get silently dropped, mis-assigned to a neighboring slot, or the SVG region gets the wrong color and live clock.

**Why it happens:**
Integer-grid thinking is natural — 24 time zones, one per hour. Most tutorial code and example lookup tables use integer offsets. The non-integer zones are minority cases that are easy to overlook until a user in India reports the clock is 30 minutes wrong.

**How to avoid:**
Design the offset-to-display mapping using fractional slots from the start. Represent all offsets as minutes from UTC (not hours), so UTC+5:30 = 330, UTC+9:30 = 570, UTC+5:45 = 345. Use a sorted array of offset buckets when assigning map columns or color bands. Test explicitly against this list of known non-integer zones: `["Asia/Kolkata", "Asia/Kathmandu", "Asia/Colombo", "Asia/Kabul", "Australia/Darwin", "Australia/Lord_Howe", "Pacific/Chatham", "Asia/Tehran", "Asia/Rangoon"]`.

**Warning signs:**
- Live clock for IST shows exactly 5 hours ahead of UTC (missing the 30 minutes).
- Map has no visible region for UTC+5:30 — the SVG path for India is uncolored or colored as UTC+6.
- Nepal clock reads same as India clock.

**Phase to address:** Phase 1 (offset data model). Add a test fixture covering all non-integer offsets before writing any map rendering logic.

---

### Pitfall 3: UTC+13 and UTC+14 Break Map Geometry

**What goes wrong:**
Most SVG world map base files clip or wrap at the 180° meridian — UTC+12 is typically the rightmost column. Kiribati's Line Islands (UTC+14) and Samoa/Tonga (UTC+13) are geographically in the Pacific near the date line but politically east of it. If the map base file does not include paths for these regions on the correct side of the date line, these zones render invisible or appear on the wrong side of the map. Additionally, any layout that uses a simple `(offset + 12) * columnWidth` formula for x-position will place UTC+14 two columns beyond the right edge.

**Why it happens:**
Most freely available SVG world map files (including the widely-used Wikimedia Commons versions) are designed for geographic accuracy, not political timezone accuracy. The date line detour for Kiribati is a political decision (made in 1995) that creates a visual anomaly requiring custom SVG path data.

**How to avoid:**
Source or create SVG map paths that explicitly include Kiribati Line Islands and Samoa on the UTC+13/+14 side. Verify the base map file contains separate `<path>` elements for these regions. Treat UTC+12 through UTC+14 as a capped range: `Math.min(offset, 14)` for layout calculations, with UTC+14 rendered as a distinct rightmost slot rather than a formula overflow.

**Warning signs:**
- Open the base SVG in a browser — search the file for "Kiribati" or the ISO country code "KI" in path IDs. If absent, the UTC+13/+14 zones are missing.
- UTC+14 x-position calculation returns a value outside the SVG viewBox width.

**Phase to address:** Phase 1 (base SVG selection and region data mapping). Choose the base map file with this verified before writing any rendering code.

---

### Pitfall 4: Multiple `setInterval` Timers Cause Visible Clock Drift

**What goes wrong:**
Each live clock on the map gets its own `setInterval(() => updateClock(), 1000)`. With 25+ simultaneous timers (one per UTC offset column), timers drift out of phase with each other. Some clocks flip to the next second half a second before others. Over minutes, visible desynchronization accumulates — clocks in the same group show different seconds. On low-end mobile devices this is immediately noticeable.

**Why it happens:**
`setInterval` does not guarantee exact 1000ms intervals — it guarantees *at least* 1000ms. JavaScript's single-threaded execution and event queue delay mean each interval fires at slightly different wall-clock times. Multiply this by 25 independent timers and the cumulative drift compounds across the UI.

**How to avoid:**
Use a single `requestAnimationFrame` loop (or a single `setInterval`) that updates *all* clocks in one pass per second. Gate updates with a wall-clock second check: only redraw when `Date.now()` crosses a second boundary. This guarantees all clocks update simultaneously within the same frame.

```js
let lastSecond = -1;
function tick() {
  const now = new Date();
  const s = now.getSeconds();
  if (s !== lastSecond) {
    lastSecond = s;
    updateAllClocks(now); // single pass updates every clock
  }
  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);
```

Also use the Page Visibility API to pause the loop when the tab is hidden (browsers throttle `setInterval` in hidden tabs anyway, but explicit pausing prevents burst catch-up updates on tab restore).

**Warning signs:**
- Each `<clock-component>` has its own timer initialized in a loop.
- Clocks visibly desync after ~30 seconds on mobile.
- CPU profiler shows 25+ timer callbacks firing in rapid succession.

**Phase to address:** Phase 2 (live clock implementation). Must be architected as a single-loop pattern from the start — retrofitting after individual clocks are built requires touching every component.

---

### Pitfall 5: SVG File Too Large for Inline Use, Blocks Initial Render

**What goes wrong:**
A raw world map SVG from Wikimedia Commons or Natural Earth is typically 500KB–2MB unoptimized. Inlining this into the HTML page (the natural Astro pattern for interactive SVGs) blocks the parser and inflates the initial HTML payload to an unacceptable size. Lighthouse scores degrade significantly. The map takes 3–5 seconds to become interactive on mobile connections.

**Why it happens:**
World map SVG files contain country paths with 6-decimal-place coordinate precision, redundant metadata, comments, and Inkscape/Adobe editor namespaces. Developers take the Wikimedia file "as is" without running it through SVGO. The file looks fine at 1MB on desktop broadband but fails on mobile 4G.

**How to avoid:**
Run the base SVG through SVGO with `--multipass` before including in the project. For a timezone map (showing UTC zones, not individual countries at high detail), apply heavy path simplification — tolerance of 0.5–1.0 pixels is invisible at the map's display scale. Target under 100KB for the optimized SVG, under 50KB gzipped. At build time in Astro, use the SVG as an imported component (which Astro inlines and optimizes), not a raw `<img src="map.svg">`.

Performance threshold: SVG larger than 150KB inline will score below 90 on Lighthouse mobile. Above 300KB inline is a hard failure for Core Web Vitals LCP.

**Warning signs:**
- Base SVG file is larger than 200KB.
- HTML source for the map page exceeds 500KB.
- Lighthouse LCP score above 2.5s on mobile simulation.

**Phase to address:** Phase 1 (asset preparation). Optimize the SVG before writing a single line of rendering code — all subsequent work builds on this file.

---

### Pitfall 6: Touch Events Conflict With Scroll on Mobile

**What goes wrong:**
An interactive SVG map that uses `touchstart`/`touchmove` for hover tooltips or region selection intercepts vertical scroll events on mobile. Users trying to scroll past the map are instead panning or selecting regions. On iOS Safari, pointer events on SVG elements are particularly aggressive about capturing touch input.

**Why it happens:**
Desktop `mouseover`/`mouseenter` events have no scroll conflict. When developers add `touchstart` as the mobile equivalent, they do not distinguish between a tap (intent: select region) and a swipe (intent: scroll). The SVG element consumes the touch event before the browser scroll handler sees it.

**How to avoid:**
Use `pointerup` events (which fire after the pointer lifts) for region selection rather than `pointerdown`/`touchstart`. This lets the browser determine scroll intent before the SVG handler fires. For tooltips, show on `pointerenter` (desktop) and `pointerup` (mobile), not on `pointerdown`. Set `touch-action: pan-y` on the SVG container so the browser handles vertical scroll natively and only routes horizontal movements to custom handlers.

```css
.timezone-map-container {
  touch-action: pan-y; /* allow vertical scroll, route horizontal to JS */
}
```

**Warning signs:**
- Scrolling on mobile causes timezone regions to highlight or tooltip to appear.
- iOS Safari users report unable to scroll past the map.
- Testing with DevTools mobile simulation shows scroll hijacking.

**Phase to address:** Phase 2 (interaction layer). Design the event model for both desktop and mobile simultaneously — do not add mobile support as an afterthought.

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Hard-code UTC offsets per region as integers | Simple lookup, fast to build | Breaks twice a year for DST zones, wrong for half-hour zones | Never — use IANA identifiers from day one |
| Use Wikimedia SVG file without SVGO optimization | No setup required | 500KB–2MB inline bloats page, fails Core Web Vitals on mobile | Never — optimize before any other work |
| One `setInterval` per clock | Simple component isolation | 25+ timers drift and desync, mobile CPU spikes | Never — single shared tick loop required |
| Hover-only tooltip (no touch equivalent) | Fast to build | ~50% of map users (mobile) get no information | Never for a public tool |
| Static color map (no DST-aware runtime recompute) | No client-side JS for coloring | Map wrong for ~6 months/year in DST-observing regions | Never |
| Skip ARIA labels on SVG paths | Faster development | Screen readers announce nothing — map is inaccessible | Never for a public-facing product |
| `<img src="map.svg">` instead of inline SVG | Simpler markup | No JS access to SVG paths — interactivity impossible | Never for interactive map |

---

## Integration Gotchas

Pitfalls specific to connecting the timezone map to the existing TimeHopper converter infrastructure.

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Linking map regions to converter pages | Hard-code `/utc-to-est` path from a region click | Look up the converter pair URL from `timezone-pairs.ts` — not all 25 UTC slots have converter pairs in v1.0 |
| Reusing `TimezoneConverter.astro` clock logic | Duplicate the `Intl.DateTimeFormat` call pattern | Extract clock rendering to a shared vanilla JS module both components import |
| Embeddable iframe widget | Set a fixed pixel height on the iframe | Use `ResizeObserver` + `postMessage` for auto-resize, matching the pattern used in existing converter embeds |
| DST color updates when embedded | Map initializes at iframe load time only | On DST transition day, the iframe color state is wrong until reload — document this known limitation, schedule a page reload at midnight using `Page Visibility API` check |
| URL structure for timezone map page | Name the page `/timezone-map` | Confirm this does not conflict with any existing page route in the Astro build before committing to the URL |

---

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Forcing layout reflow inside the tick loop | CPU spikes every second, janky clocks | Read all DOM measurements before tick, write all updates in one pass — no interleaved reads and writes | Immediately on any device with >10 visible clocks |
| Re-rendering entire SVG on each tick | Browser repaints entire map every second | Only update `<text>` clock elements — never touch `<path>` geometry in the tick loop | Every device; SVG repaint is expensive |
| Unthrottled `mousemove` tooltip updates | Tooltip position lags or causes scroll jitter | Throttle tooltip position updates with `requestAnimationFrame` | Mobile with high-DPI displays |
| Loading SVG as `<object>` or `<embed>` | Cross-origin JS access blocked — interactivity silently fails | Always inline the SVG in the HTML document for interactive maps | Every browser by default |
| Not pausing timers on hidden tab | Battery drain on mobile, burst updates on restore | Page Visibility API: `document.addEventListener('visibilitychange', ...)` to pause/resume tick | Mobile Safari aggressively throttles — burst on restore looks broken |
| Tooltip overflow outside viewport on small screens | Tooltip clipped at right/bottom edge, information cut off | Compute tooltip position relative to viewport and flip to opposite side when near edge | Any screen narrower than 480px |

---

## Security Mistakes

This is a read-only display tool with no user data input, so the domain-specific security surface is minimal. The relevant considerations are:

| Mistake | Risk | Prevention |
|---------|------|------------|
| Including third-party timezone data JS from a CDN | CDN compromise injects script into map page | Zero-dependency policy already established — keep it; use only browser `Intl` API for timezone data |
| Trusting `postMessage` from embedded iframe without origin check | Malicious host page sends fake resize messages | In the map page's `postMessage` handler, validate `event.origin` against the expected embed domain |
| SVG `<use>` referencing external files | External SVG references blocked by CSP on some hosts | Keep all SVG self-contained; no `<use xlink:href="external.svg#id">` patterns |

---

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Showing all 25 UTC offset clocks simultaneously on mobile | Screen too cluttered to read; clocks too small to be useful | On mobile viewports below 480px, collapse to a scrollable list of offset cards instead of the full 2D map |
| No visual indication that regions are clickable | Users do not discover that regions link to converter pages | Add `cursor: pointer` to interactive paths, and a subtle hover/focus ring; include a one-line instruction above the map |
| Clock flicker on the transition second (from 59 to :00) | Clocks briefly show previous time before updating | Ensure the tick loop fires at or just after the second boundary, not before it; test with `Date.now() % 1000 < 50` guard |
| Tooltip disappears before user reads it on mobile | User taps region, tooltip appears for 300ms, then scrolling closes it | Show tooltip in a persistent info panel below the map on mobile, not as a dismissible overlay |
| Map displays wrong "current time" for UTC+14 and shows it as next calendar day | Users confused — the map shows tomorrow for Kiribati | Explicitly display the date alongside the time for UTC+10 and higher; date wraps ahead of UTC |
| No fallback when `Intl` API unavailable | Map shows empty clock cells | Detect `typeof Intl === 'undefined'` and display static UTC offset strings as fallback |

---

## "Looks Done But Isn't" Checklist

- [ ] **DST correctness:** Map colors look right in January — verify they *also* look right in July by temporarily advancing system clock. US, EU, AU regions should shift offset columns.
- [ ] **Half-hour offsets visible:** India (UTC+5:30), Nepal (UTC+5:45), Darwin (UTC+9:30) are each individually colored and display correct live clock times — not the same as their neighboring integer-offset zones.
- [ ] **UTC+13 and UTC+14 rendered:** Samoa/Tonga and Kiribati Line Islands SVG paths are visible, colored, and clocks display correctly.
- [ ] **Mobile touch scrolling:** User can scroll through the page on iOS Safari without inadvertently selecting map regions.
- [ ] **Single tick loop:** Browser profiler shows exactly one repeating timer callback, not N timers where N = number of offset zones displayed.
- [ ] **Clock synchronization:** All visible clocks flip to the next second simultaneously — no staggered updates visible.
- [ ] **SVG file size:** Confirm optimized SVG is under 100KB before adding interactivity. Check with `ls -lh` after SVGO.
- [ ] **Screen reader accessible:** Map has `role="img"` and `<title>` on the SVG root; interactive regions have `aria-label` with timezone name and current time.
- [ ] **Embeddable widget:** Map page loads inside an iframe on a blank HTML file without errors; auto-resizes correctly.
- [ ] **Existing converter links:** Clicking a timezone region that has a corresponding converter page (`timezone-pairs.ts`) navigates to that page; clicking a region with no pair shows a graceful message, not a 404.

---

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| DST bug discovered in production | MEDIUM | Update region IANA mapping (data fix, no architectural change if IANA identifiers were stored); redeploy static build |
| Wrong base SVG file (missing UTC+13/+14 paths) | HIGH | Source new base SVG, re-run SVGO, re-map all region IDs to timezone data — all rendering code tied to path IDs must be retested |
| Performance failure (Lighthouse < 70 on mobile) | MEDIUM | Profile tick loop first (usually the culprit); fallback to static clock display with a single "refresh" approach if dynamic clocks are too expensive |
| Touch scroll hijacking reported by users | LOW | Add `touch-action: pan-y` to container CSS — single-line fix, no architecture change |
| Multiple timer drift reported | MEDIUM | Refactor to single-loop architecture; requires touching all clock rendering components but is a contained change |
| SVG too large causing LCP regression | MEDIUM | Run SVGO with aggressive path simplification; simplify geographic detail — does not require changing any JS logic |

---

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Fixed UTC offsets breaking at DST | Phase 1 — data model | Test clock accuracy in both January and July by mocking system time |
| Half-hour offsets missing | Phase 1 — data model | Explicit fixture test: IST clock shows `:30` minutes offset from UTC |
| UTC+13/+14 map geometry | Phase 1 — base SVG selection | Visually confirm Kiribati and Samoa are colored on the rendered map |
| SVG file too large | Phase 1 — asset preparation | Confirm file size under 100KB before writing rendering code |
| Multiple timer drift | Phase 2 — clock implementation | Browser profiler shows single tick loop; all clocks update in the same frame |
| Touch scroll conflict | Phase 2 — interaction layer | Manual test on iOS Safari: scroll through map without triggering region selection |
| Missing ARIA labels | Phase 2 — accessibility | axe DevTools reports zero violations on map page |
| Tooltip overflow mobile | Phase 2 — interaction layer | Test on 375px viewport: tooltip content fully visible without horizontal scroll |
| Missing live link to converter pages | Phase 3 — integration | All 40 existing converter pairs are reachable via map region click; no 404s |
| Embeddable iframe not resizing | Phase 3 — embed system | Load map in test iframe at 320px width; confirm auto-resize triggers |

---

## Sources

- [MDN: Date.prototype.getTimezoneOffset() — DST non-uniformity](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset)
- [MDN: Page Visibility API — timer throttling in hidden tabs](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API)
- [MDN: CSS and JavaScript animation performance](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/CSS_JavaScript_animation_performance)
- [SVG AI: Complete SVG Animation Encyclopedia 2025](https://www.svgai.org/blog/research/svg-animation-encyclopedia-complete-guide)
- [DebugBear: Improve Animation Performance With requestAnimationFrame](https://www.debugbear.com/blog/requestanimationframe)
- [Wikipedia: UTC+14:00 — Kiribati date line anomaly](https://en.wikipedia.org/wiki/UTC+14:00)
- [Wikipedia: Time in Kiribati](https://en.wikipedia.org/wiki/Time_in_Kiribati)
- [CSS-Tricks: Accessible SVGs](https://css-tricks.com/accessible-svgs/)
- [Deque: Creating Accessible SVGs](https://www.deque.com/blog/creating-accessible-svgs/)
- [W3C: SVG Accessibility API Mappings](https://www.w3.org/TR/svg-aam-1.0/)
- [GitHub: svg-toolbelt — zero-dependency SVG interaction with WCAG 2.1 AA](https://github.com/zakariaf/svg-toolbelt)
- [SVG AI: SVG Code Optimization Guide 2025](https://www.svgai.org/blog/svg-code-optimization-guide)
- [Astro Docs: Experimental SVG optimization](https://docs.astro.build/en/reference/experimental-flags/svg-optimization/)
- [Medium: Why JavaScript timer is unreliable](https://abhi9bakshi.medium.com/why-javascript-timer-is-unreliable-and-how-can-you-fix-it-9ff5e6d34ee0)
- [SitePoint: Creating Accurate Timers in JavaScript](https://www.sitepoint.com/creating-accurate-timers-in-javascript/)
- [una.im: 3 Weird SVG Browser Inconsistencies](https://una.im/weird-svg-issues)
- [MoldStud: Cross-Browser Compatibility in Data Visualizations](https://moldstud.com/articles/p-how-to-effectively-resolve-cross-browser-compatibility-issues-in-your-data-visualizations)
- [Devin Marié B.: How to render responsive SVGs on all browsers](https://devinmarieb.medium.com/how-to-render-responsive-svgs-on-all-browsers-e93397bc4715)
- [Toast UI: Handling Time Zone in JavaScript](https://toastui.medium.com/handling-time-zone-in-javascript-547e67aa842d)

---
*Pitfalls research for: Interactive SVG timezone map + live clocks, Astro static site, zero dependencies*
*Researched: 2026-03-30*
