---
phase: 5
slug: timezone-data-foundation
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-31
---

# Phase 5 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Astro build validation (no test framework — data file verified via build + grep) |
| **Config file** | website/astro.config.mjs |
| **Quick run command** | `cd website && npx astro check 2>&1; node -e "const z=require('../website/src/data/timezone-zones.ts'); console.log(z.zones.length)"` |
| **Full suite command** | `cd website && npx astro build` |
| **Estimated runtime** | ~5 seconds (build) |

---

## Sampling Rate

- **After every task commit:** Run TypeScript import validation
- **After every plan wave:** Run full Astro build
- **Before `/gsd:verify-work`:** Full build must complete with zero errors
- **Max feedback latency:** 10 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 5-01-01 | 01 | 1 | TZD-01 | file + grep | `test -f website/src/data/timezone-zones.ts && grep -c "utcOffsetMinutes" website/src/data/timezone-zones.ts` | ❌ W0 | ⬜ pending |
| 5-01-02 | 01 | 1 | TZD-02 | grep | `grep -c "iana:" website/src/data/timezone-zones.ts` | ❌ W0 | ⬜ pending |
| 5-01-03 | 01 | 1 | TZD-03 | grep | `grep -cE "330\|345\|570\|210\|765" website/src/data/timezone-zones.ts` | ❌ W0 | ⬜ pending |
| 5-01-04 | 01 | 1 | TZD-04 | grep | `grep -c "converterPair:" website/src/data/timezone-zones.ts` | ❌ W0 | ⬜ pending |
| 5-01-05 | 01 | 1 | TZD-05 | grep | `grep -c "America/\|Europe/\|Asia/\|Pacific/\|Australia/" website/src/data/timezone-zones.ts` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `website/src/data/timezone-zones.ts` — new file, created by Plan 01

*Existing infrastructure covers all phase requirements — no test framework install needed.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Converter pair slugs match actual pair pages | TZD-04 | Cross-reference requires reading timezone-pairs.ts | Verify each non-null converterPair value exists as a slug in timezone-pairs.ts |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 10s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
