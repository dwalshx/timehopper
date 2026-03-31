# Milestones

## v1.0 — Converter Widgets & Content Hub (Complete)

**Shipped:** 2026-03-30

**What shipped:**
- 40 timezone converter pair pages with live clocks, hour converter, DST detection
- 40 embeddable iframe widgets with auto-resize and "Powered by TimeHopper" credit
- AI discoverability: llms.txt, ai-plugin.json, oEmbed directory + per-widget, JSON-LD schema
- 40+ SEO blog articles via multi-agent editorial pipeline
- Dark theme, responsive, zero-dependency design

**Key metrics:**
- 125 pages built (40 converters, 40 embeds, 40 blog posts, 5 static pages)
- 12 base timezone zones, 40 converter pairs
- Build time: ~5 seconds

## v1.1 — Timezone Data Foundation (Complete)

**Shipped:** 2026-03-31

**What shipped:**
- timezone-zones.ts with 39 zones covering UTC-12 through UTC+14
- Typed TimezoneZone interface (IANA ID, abbreviation, offset in minutes, region, city, DST flag, converter pair slug)
- All half-hour and quarter-hour offsets (India, Nepal, Iran, Darwin, Chatham)
- 9 converter pair cross-references verified against actual pair slugs

**Key metrics:**
- 39 timezone zones, 1 phase, 1 plan, 2 tasks
- Zero new dependencies
