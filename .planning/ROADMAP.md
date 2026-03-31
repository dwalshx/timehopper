# Roadmap: TimeHopper Website

## Milestones

- ✅ **v1.0 Converter Widgets & Content Hub** - Phases 1-4 (shipped 2026-03-30)
- 🚧 **v1.1 Timezone Visualizations** - Phase 5 (in progress)

## Phases

<details>
<summary>✅ v1.0 Converter Widgets & Content Hub (Phases 1-4) - SHIPPED 2026-03-30</summary>

Shipped: 40 timezone converter pair pages, 40 embeddable widgets, AI discoverability (llms.txt, ai-plugin.json, oEmbed, JSON-LD), 40+ SEO blog articles, dark responsive zero-dependency design.

</details>

### 🚧 v1.1 Timezone Visualizations (In Progress)

**Milestone Goal:** Build interactive timezone visualization tools starting with a world time zone map showing relationships across the entire globe.

#### Phase 5: Timezone Data Foundation

**Goal**: The site has a complete, DST-safe timezone data layer covering all major UTC offsets
**Depends on**: Phase 4 (v1.0 complete)
**Requirements**: TZD-01, TZD-02, TZD-03, TZD-04, TZD-05
**Success Criteria** (what must be TRUE):
  1. `timezone-zones.ts` exists and exports a typed array covering all major UTC offsets from UTC-12 through UTC+14 (~38 zones)
  2. Every zone entry includes IANA identifier, abbreviation, UTC offset (in minutes), region name, and at least one representative city
  3. Half-hour and quarter-hour offset zones are present as distinct entries: UTC+5:30 (India), UTC+5:45 (Nepal), UTC+9:30 (Darwin), UTC+3:30 (Iran), and UTC+12:45 (Chatham)
  4. Each of the 12 zones with existing converter pairs has a populated `converterPair` field pointing to the correct slug; remaining zones have the field set to `null`
  5. All time resolution in the file uses IANA timezone identifiers (e.g., `"America/New_York"`) — no hardcoded integer UTC offsets used for DST-sensitive calculations
**Plans:** 1 plan

Plans:
- [ ] 05-01-PLAN.md — Create timezone-zones.ts with all 38 UTC offset zones, typed interface, and converter pair cross-references

## Progress

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 5. Timezone Data Foundation | v1.1 | 0/1 | Not started | - |
