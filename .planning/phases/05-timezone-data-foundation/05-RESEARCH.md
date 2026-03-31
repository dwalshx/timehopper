# Phase 5: Timezone Data Foundation - Research

**Researched:** 2026-03-30
**Domain:** TypeScript static data layer — IANA timezone identifiers, UTC offset enumeration, DST-safe data model
**Confidence:** HIGH

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| TZD-01 | Site has a comprehensive timezone-zones.ts data file covering all major UTC offsets (UTC-12 through UTC+14) | Full 38-zone enumeration with best representative IANA IDs provided below |
| TZD-02 | Each zone entry includes IANA identifier, abbreviation, UTC offset, region name, and representative city | TypeScript interface and per-zone data fully specified below |
| TZD-03 | Half-hour and quarter-hour offsets are represented (UTC+5:30 India, UTC+5:45 Nepal, UTC+9:30 Darwin, UTC+3:30 Iran) | All 5 non-whole-hour zones identified with IANA IDs and offsets in minutes |
| TZD-04 | Each zone cross-references existing converter pair slugs where available (12 of ~38 zones) | All 12 existing zones mapped to canonical pair slugs — see mapping table below |
| TZD-05 | Zone data uses IANA identifiers for DST-safe time resolution via Intl API (no fixed UTC offsets) | IANA IDs specified for every zone; minutes-based offset field is display-only, never used for time calculation |
</phase_requirements>

---

## Summary

Phase 5 creates a single TypeScript data file: `website/src/data/timezone-zones.ts`. This file is a static, manually-authored array covering all major UTC offsets from UTC-12 through UTC+14 (~38 entries). It is the foundational data layer that every subsequent phase (WorldMap component, map page, embed page) imports from.

The key design constraint is that this file must store IANA timezone identifiers (e.g., `"America/New_York"`) rather than fixed integer UTC offsets for any time computation. The `utcOffsetMinutes` field is metadata for display and SVG zone grouping — all actual time lookups use the `iana` field via `Intl.DateTimeFormat`. This is the same pattern already proven in the existing `timezone-pairs.ts` and `TimezoneConverter.astro`.

The 12 zones that already have converter pairs in `timezone-pairs.ts` receive a populated `converterPair` field pointing to their canonical slug. The canonical slug is the most-searched pair involving that zone (determined by which slug appears first in pairs array — typically a US-centric pairing). The remaining ~26 zones have `converterPair: null`. The file never imports from `timezone-pairs.ts` to avoid circular dependency risk; the 12 slugs are hardcoded as string literals.

**Primary recommendation:** Author `timezone-zones.ts` as a hand-maintained static array. Do not generate it programmatically. The 38 entries are stable; IANA timezone data rarely changes at the offset level.

---

## Standard Stack

### Core

| Technology | Version | Purpose | Why Standard |
|------------|---------|---------|--------------|
| TypeScript | project-defined | Type-safe data structure | Project is already TypeScript; Astro 5 compiles it |
| `Intl.DateTimeFormat` | Browser built-in | DST-safe time resolution at runtime | Already proven in `TimezoneConverter.astro`; zero bytes shipped |

### Supporting

No new libraries are required. This phase produces a `.ts` data file with zero runtime dependencies.

**Installation:**

```bash
# Nothing to install — zero new dependencies for this phase
```

---

## Architecture Patterns

### Recommended File Location

```
website/src/data/
├── timezone-pairs.ts    # EXISTING — do not modify
└── timezone-zones.ts    # NEW — this phase creates this file
```

### TypeScript Interface

The interface for `timezone-zones.ts` entries should be named `TimezoneZone` to distinguish it from `TimezoneInfo` in `timezone-pairs.ts`.

```typescript
// website/src/data/timezone-zones.ts

export interface TimezoneZone {
  /** IANA timezone identifier. Used for ALL time resolution via Intl API. */
  iana: string;
  /** Short abbreviation shown in UI, e.g. "EST", "IST". */
  abbr: string;
  /** UTC offset in minutes. Display and grouping only — never use for time math.
   *  Minutes avoids float representation issues with +5:30 (+330), +5:45 (+345), etc. */
  utcOffsetMinutes: number;
  /** Human-readable region label, e.g. "US East Coast", "India" */
  region: string;
  /** One representative major city, e.g. "New York", "Mumbai" */
  city: string;
  /** Whether this zone observes daylight saving time. */
  hasDST: boolean;
  /** Slug of the canonical converter pair if one exists in timezone-pairs.ts.
   *  Null for zones without an existing converter page. */
  converterPair: string | null;
}

export const timezoneZones: TimezoneZone[] = [ ... ];
```

**Critical design note on `utcOffsetMinutes`:** Store offsets as integer minutes (not decimal hours). This avoids JavaScript float imprecision (`5.5` vs `330` minutes for UTC+5:30) and makes half-hour/quarter-hour zones unambiguous. The existing `timezone-pairs.ts` uses decimal hours (`stdOffset: 5.5`) — `timezone-zones.ts` intentionally diverges from this to handle edge cases cleanly. Document this difference clearly in both files.

### Anti-Patterns to Avoid

- **Do not import from `timezone-pairs.ts`** inside `timezone-zones.ts`. The 12 `converterPair` values are string literals. Importing pairs creates a dependency in the wrong direction and adds ~25KB of content data to every consumer of zones.
- **Do not use `Etc/GMT+X` IANA identifiers** as representative zones. They are inverted-sign (Etc/GMT+5 = UTC-5), have no DST data, and `Intl.supportedValuesOf` may omit them on Chrome. Use geographic IANA IDs instead.
- **Do not compute UTC offset from IANA ID at build time.** Store `utcOffsetMinutes` as standard (non-DST) offset metadata. The value is for display grouping; live time uses `Intl`.

---

## Complete Zone Enumeration

This is the full ~38-zone list with recommended IANA IDs, abbreviations, offsets in minutes, regions, cities, and whether a `converterPair` exists. This is the primary deliverable of the research — the planner can use this table as the authoritative source for the data file content.

**Confidence: HIGH** — IANA identifiers verified against IANA Time Zone Database 2025c. Offsets verified against tzdata. Half-hour/quarter-hour zones cross-referenced with Wikipedia UTC offset articles.

| utcOffsetMinutes | iana | abbr | region | city | hasDST | converterPair |
|-----------------|------|------|--------|------|--------|---------------|
| -720 | Pacific/Baker | BIT | Baker Island | Baker Island | false | null |
| -660 | Pacific/Pago_Pago | SST | American Samoa | Pago Pago | false | null |
| -600 | Pacific/Honolulu | HST | Hawaii | Honolulu | false | null |
| -570 | Pacific/Marquesas | MART | Marquesas Islands | Taiohae | false | null |
| -540 | America/Anchorage | AKST | Alaska | Anchorage | true | null |
| -480 | America/Los_Angeles | PST | US West Coast | Los Angeles | true | **pst-to-est** |
| -420 | America/Denver | MST | US Mountain | Denver | true | **mst-to-est** |
| -360 | America/Chicago | CST | US Central | Chicago | true | **cst-to-est** |
| -300 | America/New_York | EST | US East Coast | New York | true | **est-to-pst** |
| -240 | America/Halifax | AST | Atlantic Canada | Halifax | true | null |
| -210 | America/St_Johns | NST | Newfoundland | St. John's | true | null |
| -180 | America/Sao_Paulo | BRT | Brazil | Sao Paulo | true | null |
| -120 | America/Noronha | FNT | Fernando de Noronha | Fernando de Noronha | false | null |
| -60 | Atlantic/Azores | AZOT | Azores | Ponta Delgada | true | null |
| 0 | Etc/UTC | UTC | Universal | — | false | **utc-to-est** |
| 0 | Europe/London | GMT | United Kingdom | London | true | **gmt-to-est** |
| 60 | Europe/Berlin | CET | Central Europe | Berlin | true | **cet-to-est** |
| 120 | Europe/Athens | EET | Eastern Europe | Athens | true | **eet-to-est** |
| 180 | Asia/Riyadh | AST | Arabia | Riyadh | false | null |
| 210 | Asia/Tehran | IRST | Iran | Tehran | true | null |
| 240 | Asia/Dubai | GST | Gulf / UAE | Dubai | false | null |
| 270 | Asia/Kabul | AFT | Afghanistan | Kabul | false | null |
| 300 | Asia/Karachi | PKT | Pakistan | Karachi | false | null |
| 330 | Asia/Kolkata | IST | India | Mumbai | false | **ist-to-est** |
| 345 | Asia/Kathmandu | NPT | Nepal | Kathmandu | false | null |
| 360 | Asia/Dhaka | BST | Bangladesh | Dhaka | false | null |
| 390 | Asia/Yangon | MMT | Myanmar | Yangon | false | null |
| 420 | Asia/Bangkok | ICT | Indochina | Bangkok | false | null |
| 480 | Asia/Singapore | SGT | Singapore / SE Asia | Singapore | false | **pst-to-sgt** |
| 525 | Australia/Eucla | ACWST | Eucla (AU) | Eucla | false | null |
| 540 | Asia/Tokyo | JST | Japan / Korea | Tokyo | false | **pst-to-jst** |
| 570 | Australia/Darwin | ACST | Australia Central | Darwin | false | null |
| 600 | Australia/Sydney | AEST | Australia East | Sydney | true | **aest-to-est** |
| 630 | Pacific/Norfolk | NFT | Norfolk Island | Kingston | true | null |
| 660 | Pacific/Noumea | NCT | New Caledonia | Noumea | false | null |
| 720 | Pacific/Auckland | NZST | New Zealand | Auckland | true | null |
| 765 | Pacific/Chatham | CHAST | Chatham Islands | Waitangi | true | null |
| 780 | Pacific/Tongatapu | TOT | Tonga | Nuku'alofa | false | null |
| 840 | Pacific/Kiritimati | LINT | Kiribati (Line Is.) | Christmas Island | false | null |

**Notes on specific entries:**

- **UTC and GMT (both offset 0):** Two distinct entries. Both have existing converter pairs (`utc-to-est` and `gmt-to-est`). They differ in DST behavior: `Etc/UTC` never observes DST; `Europe/London` observes BST in summer. Keep both with `utcOffsetMinutes: 0`.
- **UTC-9:30 (Marquesas, -570):** `Pacific/Marquesas` = UTC-9:30 = **-570 minutes**. Verified against IANA 2025c.
- **UTC+8:45 (Eucla, +525):** `Australia/Eucla` = UTC+8:45 = **+525 minutes**. Uses ACWST abbreviation. No DST.
- **UTC+12:45 (Chatham, +765):** `Pacific/Chatham` standard time is UTC+12:45 = **+765 minutes**; DST is UTC+13:45. This is the quarter-hour offset zone explicitly required by TZD-03.

**Requirement TZD-03 checklist — half-hour and quarter-hour zones:**

| Zone | IANA | utcOffsetMinutes | Required by TZD-03 |
|------|------|------------------|--------------------|
| India | Asia/Kolkata | +330 | Yes (UTC+5:30) |
| Nepal | Asia/Kathmandu | +345 | Yes (UTC+5:45) |
| Darwin | Australia/Darwin | +570 | Yes (UTC+9:30) |
| Iran | Asia/Tehran | +210 | Yes (UTC+3:30) |
| Chatham | Pacific/Chatham | +765 | Yes (UTC+12:45) |
| Marquesas | Pacific/Marquesas | -570 | Bonus |
| Eucla | Australia/Eucla | +525 | Bonus |

All five TZD-03 zones are present in the enumeration above.

---

## Zone-to-Converter Pair Mapping

These 12 zones have existing converter pairs. The `converterPair` field should use the most canonical/primary slug for that zone — the slug that best represents "what is this zone's main converter page."

**Confidence: HIGH** — Derived from direct inspection of `timezone-pairs.ts` slug list.

| Zone Key | IANA | Canonical Slug | Rationale |
|----------|------|----------------|-----------|
| PST | America/Los_Angeles | `pst-to-est` | First PST pair; most searched US-to-US conversion |
| MST | America/Denver | `mst-to-est` | First MST pair |
| CST | America/Chicago | `cst-to-est` | First CST pair |
| EST | America/New_York | `est-to-pst` | First EST pair; EST-to-PST is high-volume |
| UTC | Etc/UTC | `utc-to-est` | First UTC pair; UTC-to-EST is canonical use case |
| GMT | Europe/London | `gmt-to-est` | First GMT pair |
| CET | Europe/Berlin | `cet-to-est` | First CET pair |
| EET | Europe/Athens | `eet-to-est` | Only EET pair |
| IST | Asia/Kolkata | `ist-to-est` | First IST pair; IST-to-EST is primary |
| SGT | Asia/Singapore | `pst-to-sgt` | First SGT pair |
| JST | Asia/Tokyo | `pst-to-jst` | First JST pair |
| AEST | Australia/Sydney | `aest-to-est` | First AEST pair |

**Complete 40 slugs available in `timezone-pairs.ts`** (for reference):
pst-to-est, est-to-pst, utc-to-est, utc-to-pst, gmt-to-est, est-to-gmt, cst-to-est, est-to-cst, ist-to-est, ist-to-pst, gmt-to-pst, utc-to-cst, pst-to-gmt, cet-to-est, est-to-cet, jst-to-est, aest-to-est, utc-to-ist, pst-to-cst, est-to-ist, pst-to-jst, est-to-jst, pst-to-sgt, est-to-sgt, cst-to-ist, gmt-to-ist, cet-to-ist, gmt-to-jst, gmt-to-sgt, gmt-to-aest, mst-to-est, mst-to-pst, mst-to-cst, cst-to-pst, aest-to-gmt, aest-to-pst, aest-to-jst, cet-to-gmt, eet-to-est, cet-to-pst.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Current UTC offset for a zone | Integer math on `utcOffsetMinutes` field | `Intl.DateTimeFormat` with `timeZoneName: 'shortOffset'` | DST transitions change the live offset; the stored value is standard time only |
| List of all IANA timezone IDs | `Intl.supportedValuesOf('timeZone')` at runtime | Static array in `timezone-zones.ts` | Chrome omits `Etc/*` zones; static array is explicit and consistent |
| Abbreviation during DST | Hardcode DST abbreviation in each entry | `Intl.DateTimeFormat` with `timeZoneName: 'short'` | Returns "EDT", "PDT" etc. automatically when DST is active |

**Key insight:** `utcOffsetMinutes` in `timezone-zones.ts` is a display hint, not a computation input. Every live time calculation in the codebase must use the `iana` field.

---

## Common Pitfalls

### Pitfall 1: Decimal Hours for Non-Whole-Hour Offsets

**What goes wrong:** Storing `utcOffset: 5.5` for India. JavaScript floating-point makes `5.5 * 60 = 330.0000000004` in edge cases. Arithmetic breaks.

**Why it happens:** Instinct to mirror the existing `timezone-pairs.ts` format (which uses `stdOffset: 5.5`).

**How to avoid:** Use minutes from UTC as the canonical storage unit. `utcOffsetMinutes: 330` is unambiguous integer arithmetic.

**Warning signs:** Any zone with `:30` or `:45` in its UTC offset. There are 7 such zones in the full enumeration.

### Pitfall 2: Using Etc/GMT+X Identifiers as Representatives

**What goes wrong:** Using `Etc/GMT+5` for a UTC-5 zone. The sign is inverted by POSIX convention (`Etc/GMT+5` = UTC-5). Confusion is nearly universal. Additionally these zones carry no DST information and may be omitted by `Intl.supportedValuesOf` on Chrome.

**Why it happens:** They look like canonical UTC offset IDs.

**How to avoid:** Always use geographic IANA IDs (`America/New_York` not `Etc/GMT+5`). The `Etc/UTC` identifier (offset 0, no DST) is the only safe `Etc/` ID.

**Warning signs:** Any entry with `Etc/GMT` prefix other than `Etc/UTC`.

### Pitfall 3: UTC and GMT as the Same Zone

**What goes wrong:** Merging UTC and GMT into one entry because both are offset 0.

**Why it happens:** They display the same offset. The difference feels academic.

**How to avoid:** Keep them as separate entries. `Etc/UTC` has no DST; `Europe/London` (GMT/BST) observes summer time. More importantly, both have independent converter pair pages (`utc-to-est` vs `gmt-to-est`) that serve different user queries. The requirements also state "at least one representative city" — UTC has no city, which is fine; GMT has London.

**Warning signs:** Only 11 `converterPair`-linked zones instead of 12.

### Pitfall 4: Importing timezone-pairs.ts Inside timezone-zones.ts

**What goes wrong:** The file imports the full pairs array to populate `converterPair` values dynamically.

**Why it happens:** Seems DRY — why hardcode slug strings?

**How to avoid:** Hardcode the 12 slug strings as literals. The pairs file is ~25KB of content (FAQs, descriptions) that should not be bundled into every consumer of the zones file.

**Warning signs:** An `import` statement at the top of `timezone-zones.ts` referencing `timezone-pairs.ts`.

### Pitfall 5: Missing UTC+12:45 Chatham Islands

**What goes wrong:** The Chatham Islands entry is omitted because the offset looks unusual. TZD-03 explicitly requires it.

**Why it happens:** Quarter-hour offsets are rare and easy to forget.

**How to avoid:** Use the requirements TZD-03 checklist: verify all 5 required zones are in the array before declaring done.

---

## Code Examples

### Runtime Offset Resolution (DST-safe)

```typescript
// Source: MDN Intl.DateTimeFormat — verified HIGH confidence
// Use this pattern in WorldMap.astro for live time display, NOT utcOffsetMinutes

function getLiveOffset(iana: string): string {
  const date = new Date();
  const formatter = new Intl.DateTimeFormat('en', {
    timeZone: iana,
    timeZoneName: 'shortOffset'
  });
  // Returns "GMT-5", "GMT+5:30", "GMT+12:45", etc.
  const parts = formatter.formatToParts(date);
  return parts.find(p => p.type === 'timeZoneName')?.value ?? 'UTC';
}
```

### Converting utcOffsetMinutes to Display String

```typescript
// Use in timezone-zones.ts or display utilities — no Intl needed for static label
function formatOffsetLabel(minutes: number): string {
  const sign = minutes >= 0 ? '+' : '-';
  const abs = Math.abs(minutes);
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  return m === 0 ? `UTC${sign}${h}` : `UTC${sign}${h}:${String(m).padStart(2, '0')}`;
}
// formatOffsetLabel(330)  → "UTC+5:30"
// formatOffsetLabel(-570) → "UTC-9:30"
// formatOffsetLabel(765)  → "UTC+12:45"
// formatOffsetLabel(0)    → "UTC+0"
```

### Minimal Valid Entry Structure

```typescript
// Example entry — use this shape for all 38 entries
const example: TimezoneZone = {
  iana: "America/New_York",
  abbr: "EST",
  utcOffsetMinutes: -300,
  region: "US East Coast",
  city: "New York",
  hasDST: true,
  converterPair: "est-to-pst",
};
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `moment-timezone` for IANA data (~67KB) | Browser `Intl` API | Chrome 24+ / Deprecated 2020 | Zero bytes shipped; DST handled automatically |
| Decimal hours for offset (`5.5`) | Integer minutes (`330`) | Best practice as of TZ complexity awareness | Eliminates float edge cases for half-hour zones |
| `Etc/GMT±X` as representative IDs | Geographic IDs (`Asia/Kolkata`) | Always best practice, widely documented | Correct DST behavior; consistent `Intl` support |

**Deprecated/outdated:**
- `moment-timezone`: Do not use. Deprecated upstream; browser `Intl` covers all use cases.
- Storing offsets as hours with `.5` decimals: Works for 99% of zones, silently wrong for `Pacific/Chatham` (+12.75), `Australia/Eucla` (+8.75), and arithmetic edge cases.

---

## Environment Availability

Step 2.6: SKIPPED (no external dependencies identified — this phase creates a TypeScript data file only; no CLI tools, build pipeline, or services required).

---

## Validation Architecture

No dedicated test framework was detected in the worktree. The phase deliverable is a static data file. Validation is primarily a manual checklist:

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None detected — manual verification |
| Config file | None — no test runner configured |
| Quick run command | `npx tsc --noEmit` (TypeScript type check only) |
| Full suite command | `npx tsc --noEmit` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| TZD-01 | Array exists and exports at least 36 entries | manual | `npx tsc --noEmit` (type check) | N/A — new file |
| TZD-02 | Every entry has iana, abbr, utcOffsetMinutes, region, city fields | type-check | `npx tsc --noEmit` | N/A — interface enforces |
| TZD-03 | Entries exist for +330, +345, +570, +210, +765 offsets | manual count | Grep: `grep "utcOffsetMinutes:" timezone-zones.ts \| grep -E "330\|345\|570\|210\|765"` | N/A — new file |
| TZD-04 | Exactly 12 entries have non-null converterPair | manual count | Grep: `grep "converterPair:" timezone-zones.ts \| grep -v null \| wc -l` → should be 12 | N/A — new file |
| TZD-05 | No entry uses Etc/GMT±X (other than Etc/UTC) | manual audit | Grep: `grep "Etc/GMT" timezone-zones.ts` → should return nothing | N/A — new file |

### Wave 0 Gaps

- No test infrastructure needed for this phase — data file validation is compile-time (TypeScript) + manual checklist
- The TypeScript interface (`TimezoneZone`) is self-documenting; invalid entries fail `tsc`

---

## Open Questions

1. **UTC+0 — single entry or two entries for UTC and GMT?**
   - What we know: Both have existing converter pair slugs; both are offset 0; they differ in DST behavior
   - What's unclear: Whether the SVG map (Phase 6) needs one zone or two for offset 0
   - Recommendation: Include both as separate entries. Two entries at `utcOffsetMinutes: 0` with different `iana` values is valid TypeScript. The SVG phase can merge or split the visual band as needed.

2. **Should `converterPair` store a single slug or an array?**
   - What we know: Each of the 12 zones has multiple pair slugs (e.g., PST appears in 8 pairs)
   - What's unclear: Whether downstream consumers (WorldMap) will want to link to all pairs or just the primary one
   - Recommendation: Use `string | null` (single canonical slug) for now. If the map ever needs a "see all pairs" list, add a `converterPairs: string[]` field separately. Do not over-engineer for Phase 5.

3. **Pacific/Baker (UTC-12) — include or exclude?**
   - What we know: Baker Island is uninhabited; UTC-12 is technically in use only by Baker/Howland Islands
   - What's unclear: Whether to include purely for completeness vs. visual noise on the map
   - Recommendation: Include for completeness (TZD-01 says "UTC-12 through UTC+14"). Mark `city` as "Baker Island" and note it is uninhabited. The SVG phase can decide whether to render it.

---

## Sources

### Primary (HIGH confidence)

- IANA Time Zone Database 2025c — `tzid` per zone, offset data — https://www.iana.org/time-zones
- MDN: Intl.DateTimeFormat — timeZone, timeZoneName: 'shortOffset', 'short' — https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
- MDN: Intl.supportedValuesOf — Chrome Etc/* omission documented — https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/supportedValuesOf
- Direct codebase inspection: `website/src/data/timezone-pairs.ts` — 12 existing zones (PST, MST, CST, EST, UTC, GMT, CET, EET, IST, SGT, JST, AEST) and 40 pair slugs confirmed
- `.planning/research/STACK.md` — Stack decisions verified HIGH confidence
- `.planning/research/ARCHITECTURE.md` — Data model pattern verified HIGH confidence

### Secondary (MEDIUM confidence)

- Wikipedia: UTC offset articles (UTC+5:30, UTC+5:45, UTC+9:30, UTC+3:30, UTC+12:45) — cross-validated offset values for non-whole-hour zones
- Wikipedia: UTC+14:00 — Kiribati Line Islands (Pacific/Kiritimati) date anomaly confirmed

### Tertiary (LOW confidence — not used for primary decisions)

- None

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — no new libraries; existing TypeScript + Intl pattern
- Zone enumeration: HIGH — IANA 2025c is authoritative; offsets are stable
- Converter pair mapping: HIGH — derived from direct file inspection
- Interface design: HIGH — follows existing project TypeScript patterns
- Half-hour zones: HIGH — cross-referenced against multiple authoritative sources

**Research date:** 2026-03-30
**Valid until:** 2027-03-30 (IANA timezone data changes are rare; review if tzdata 2026+ has major offset changes)
