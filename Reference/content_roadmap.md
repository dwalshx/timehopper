# Content Roadmap

**Last updated:** 2026-03-28
**Purpose:** Consolidated record of content strategy, backlog candidates, and tool ideas so nothing gets lost across sessions.

---

## 1) Content Strategy: Three Tiers

### Tier 1: Thought Leadership (HBR-quality essays)
- Full 10-step editorial pipeline with Voice Editor
- 2,500-3,500 words, argument essay format, no listicles
- Goal: establish TimeHopper as a voice on time and coordination, not just a utility
- Audience: Planner and Operator personas primarily
- Published so far:
  - [Meetings That Get Results](/blog/meetings-that-get-results)
  - [Time Is Not Money](/blog/time-is-not-money)
  - [A Soil Test for Your Calendar](/blog/soil-test-for-your-calendar)

### Tier 2: High-Volume SEO (keyword-driven articles)
- Streamlined pipeline (may skip full critique session)
- Targets specific search queries with clear intent
- Goal: traffic, authority, and internal linking fabric
- Published so far: ~30 articles covering Google Calendar troubleshooting, time zones, extensions, notifications, etc.
- **Opportunity:** Converter pair pages (see Section 4), additional troubleshooting queries

### Tier 3: Tools & Interactive Content
- Embeddable widgets and standalone tool pages
- Goal: utility that drives repeat visits and links
- Published so far: `/tools/convert` (time zone converter with 20 pair pages)
- **Opportunities:** Time zone map, calendar soil test widget, embeddable converters (see Section 5)

---

## 2) Thought Leadership Backlog

### Ready to Run (user-approved candidates)

| # | Title | Source | Notes |
|---|-------|--------|-------|
| 1 | **The Maker's Schedule in 2026: Was Paul Graham Right?** | time-is-not-money backlog | Graham's 2009 essay is 17 years old. How distributed work, async tools, and AI have changed the maker/manager dynamic. **Published 2026-03-29.** |
| 2 | The Billable Hour Is Broken — And Lawyers Know It | time-is-not-money backlog | Alt fee arrangements, value-based billing, post-billable-hour experiments. ABA Commission material available. |
| 3 | Time Confetti: Why Fragmented Hours Feel Like No Time at All | time-is-not-money backlog | Full treatment of Schulte's concept. Recognizing fragmentation, defragmenting time, protecting whole blocks. |
| 4 | How to Run a Shared-Time Audit for Your Team | time-is-not-money backlog | Practical companion to the coordination argument. Map overlapping windows, identify fragmentation patterns. |
| 5 | Time as a Commons: What Elinor Ostrom Can Teach Us About Calendar Governance | time-is-not-money backlog | Ostrom's 8 design principles applied to shared calendar management. |

### Pipeline-Generated Candidates (not yet reviewed)

**From soil-test-for-your-calendar pipeline:**
- Calendar Contamination Audit: How to Identify Inherited Meetings
- The Coordination Tax: Why Your Team's Calendar Is More Expensive Than You Think
- Why Empty Calendars Are Not Wasted Calendars: The Case for Slack
- Time Confetti and Deep Work: What Fragmentation Actually Costs (overlaps with #3 above)
- How to Talk to Your Manager About Meeting Load

**From meetings-that-get-results pipeline:**
- The Async Decision Playbook
- How to Audit Your Team's Meeting Culture
- The Calendar Fragmentation Problem (overlaps with time confetti candidates)
- Meeting-Free Days: What the Research Actually Says
- The Meeting Recipient's Playbook (for people who receive invites, not send them)
- Cross-Timezone Meeting Rules: A Decision Framework

### Brainstormed Topics (from philosophical brainstorm session, not yet developed)
- The broader "time and coordination" philosophical territory — TimeHopper operates at the intersection of these two big life concepts
- Potential angles around: attention as a shared resource, the ethics of scheduling across power imbalances, why "time management" is a misnomer when most of your time is managed by others

---

## 3) Thought Leadership Series Architecture

The three published essays form an emerging series:

1. **Time Is Not Money** — changes how you *think* about time (philosophical foundation)
2. **A Soil Test for Your Calendar** — changes what you *do* about it on Monday morning (operational framework)
3. **Meetings That Get Results** — specific tactical playbook for the biggest calendar consumer

Potential series structure going forward:
- **Philosophical foundations:** Time Is Not Money, Elinor Ostrom/commons, Paul Graham retrospective
- **Diagnostic frameworks:** Soil Test, Coordination Tax, Shared-Time Audit
- **Tactical playbooks:** Meetings That Get Results, Async Decision Playbook, Meeting Recipient's Playbook
- **Industry deep-dives:** Billable Hour (law), Time Confetti (knowledge work), Meeting-Free Days (org design)

---

## 4) High-Volume SEO: Converter Pair Pages

**Existing:** 20 time zone converter pair pages at `/tools/convert/[pair].html`
- EST-to-PST, UTC-to-EST, GMT-to-PST, etc.

**Opportunity:** Expand converter pairs to cover more high-search-volume combinations. Each pair page is a low-effort, high-intent landing page that drives tool usage.

**Keyword opportunity noted in prior sessions:**
- "time zone map" — significant search volume, currently served by world-time-zone-map-explained.md (article) but no interactive tool
- Additional converter pairs TBD based on search volume research

---

## 5) Tool Ideas

### Time Zone Map (discussed, not yet built)
- Interactive visual map showing world time zones
- Clickable regions that feed into the converter
- Could embed on the existing world-time-zone-map article
- Keyword opportunity: "world time zone map" has significant volume

### Embeddable Converters (discussed, user said "not ready for more tools just yet")
- Lightweight, embeddable time zone converter widgets
- Could be embedded in blog articles or offered for external sites to embed
- Drives brand awareness and backlinks

### Calendar Soil Test Widget (natural extension of the essay)
- Interactive self-assessment based on the five dimensions
- User answers diagnostic questions, gets a "soil report"
- Strong lead-gen and sharing potential
- Would pair with the published essay

---

## 6) Pipeline Improvements

### Voice Editor (implemented 2026-03-28)
- Added as Step 6b between Writer v2 and SEO
- De-AI pass (tells checklist) + Humanize pass (7 licensed moves) + Forage step + Pull quotes
- Spec: `Reference/voice_editor_spec.md`
- First full pipeline run with Voice Editor: pending (Paul Graham article)
- First retroactive pass: completed on soil-test-for-your-calendar

### Future Considerations
- The Voice Editor's "humanity brief" references Atlantic/Wired/Paul Graham voice targets — may evolve as we calibrate to user preferences
- Forage step may need refinement after first few full pipeline runs
- Pull quote CSS is live in the blog template

---

## 7) What's Published

### Thought Leadership (Tier 1)
| Article | Slug | Published |
|---------|------|-----------|
| Meetings That Get Results | meetings-that-get-results | 2026-03-27 |
| Time Is Not Money | time-is-not-money | 2026-03-27 |
| A Soil Test for Your Calendar | soil-test-for-your-calendar | 2026-03-27 |
| The Maker's Schedule in 2026: Was Paul Graham Right? | makers-schedule-2026 | 2026-03-29 |

### SEO Articles (Tier 2)
| Article | Slug |
|---------|------|
| How to Change Time Zone in Google Calendar | how-to-change-time-zone-in-google-calendar |
| Google Calendar Time Zone Wrong Fix | google-calendar-time-zone-wrong-fix |
| Google Calendar Notifications Not Working Chrome | google-calendar-notifications-not-working-chrome |
| Google Calendar Desktop Notifications Not Working | google-calendar-desktop-notifications-not-working |
| Google Calendar Notification Not Working Fixes | google-calendar-notification-not-working-fixes |
| Google Calendar Reminders Not Working Fix | google-calendar-reminders-not-working-fix |
| Best Google Calendar Extensions 2026 | best-google-calendar-extensions-2026 |
| Google Calendar Extension: What to Look For | google-calendar-extension-what-to-look-for |
| Google Calendar Extension for Chrome Quick View | google-calendar-extension-for-chrome-quick-view |
| Google Calendar Add-Ons vs Chrome Extensions | google-calendar-add-ons-vs-chrome-extensions |
| Change Default Notification Google Calendar | change-default-notification-google-calendar |
| Add Holidays to Google Calendar | add-holidays-to-google-calendar |
| Add Secondary Time Zone Google Calendar | add-secondary-time-zone-google-calendar |
| Add Time Zone to Google Calendar Options | add-time-zone-to-google-calendar-options |
| Color Code Google Calendar Events | color-code-google-calendar-events |
| Hide Weekends Google Calendar | hide-weekends-google-calendar |
| Share Google Calendar with Someone | share-google-calendar-with-someone |
| Show Week Numbers Google Calendar | show-week-numbers-google-calendar |
| Google Calendar Time Zone Confusion Travel | google-calendar-time-zone-confusion-travel |
| Google Calendar Time Zone What It Controls | google-calendar-time-zone-what-it-controls |
| Google Calendar Time Zone Wrong Travel | google-calendar-time-zone-wrong-travel |
| Daylight Saving Time Guide | daylight-saving-time-guide |
| How to Calculate Time Difference Between Time Zones | how-to-calculate-time-difference-between-time-zones |
| Mastering Remote Time Zones | mastering-remote-time-zones |
| Multiple Time Zones One View Labeling System | multiple-time-zones-one-view-labeling-system |
| UTC to Eastern to Pacific Quick Cheat Sheet | utc-to-eastern-to-pacific-quick-cheat-sheet |
| World Clock Google Calendar Remote Teams Setup | world-clock-google-calendar-remote-teams-setup |
| World Time Zone Map Explained | world-time-zone-map-explained |
| WorldTimeBuddy Alternatives | worldtimebuddy-alternatives |
| Time Zone Converter for Meetings | time-zone-converter-for-meetings |

### Tools (Tier 3)
| Tool | Path |
|------|------|
| Time Zone Converter | /tools/convert (+ 20 pair pages) |
