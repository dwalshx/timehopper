---
title: "Show Week Numbers in Google Calendar (1-Click Setup)"
description: "Turn on week numbers in Google Calendar for sprint planning and quarterly reviews. Covers ISO week numbering, mobile limits, and common pitfalls."
pubDate: 2026-02-25
updatedDate: 2026-03-20
slug: show-week-numbers-google-calendar
tags: ["google calendar", "week numbers", "how to", "planning", "productivity"]
---

# How to Show Week Numbers in Google Calendar (and Why They Matter for Planning)

**Direct answer:** Open Google Calendar on the web, go to **Settings > View options**, and check **Show week numbers**. Small numbers (1--53) appear in the left margin of your Week and Month views. Week numbering follows ISO 8601, where Week 1 is the first week of the year that contains a Thursday.

**Quick steps (web):**

1. Open [Google Calendar](https://calendar.google.com).
2. Click the **gear icon** (top-right) and select **Settings**.
3. Under **View options**, check **Show week numbers**.
4. Go back to your calendar. Week numbers now appear along the left edge.

That covers the fastest path. The rest of this guide explains how ISO week numbering works, what happens on mobile, how week numbers interact with other calendar settings, and the mistakes that trip teams up.

---

## How to enable week numbers on desktop (full walkthrough)

**Direct answer:** The "Show week numbers" checkbox lives in Settings > View options. It is an account-level setting that syncs across every browser where you are signed in.

1. Open [Google Calendar](https://calendar.google.com) in your browser.
2. Click the **gear icon** in the top-right corner.
3. Select **Settings** from the dropdown.
4. In the **View options** section, find **Show week numbers**.
5. Check it.
6. Navigate back to your calendar by clicking the **back arrow** or the Google Calendar logo.

Week numbers appear immediately. In **Week view**, the number shows at the top-left corner. In **Month view**, numbers appear in the left margin of each row.

### Where week numbers appear -- and where they do not

- **Week view:** The week number displays alongside the date range header (e.g., "W12" for March 16--22, 2026).
- **Month view:** Each row gets a number in the left margin. Best view for scanning multiple weeks.
- **Day view:** No week number displayed.
- **Schedule view:** No week numbers.
- **Year view:** No week numbers.

The setting syncs across browsers via your Google account. Configure it once and it carries over everywhere on web.

---

## Week numbers on mobile: Android and iOS

**Direct answer:** The Google Calendar mobile app does not show week numbers. There is no toggle for it in the Android or iOS app settings. This is a platform limitation, not a hidden feature.

### Android

The Google Calendar app on Android has no "Show week numbers" option. Even with the setting enabled on web, the mobile app will not reflect it. Third-party calendar apps (such as Business Calendar 2 or aCalendar) do show week numbers and sync with your Google account -- that is the most practical workaround.

### iOS

Same situation. Neither the Google Calendar iOS app nor Apple's built-in Calendar app shows ISO week numbers by default. If you need week numbers on the go, open calendar.google.com in your mobile browser and request the desktop site.

The honest answer: if week numbers are critical to your daily mobile workflow, Google Calendar on mobile does not serve you today. Third-party apps or the mobile browser are your options.

---

## ISO 8601 week numbering explained

**Direct answer:** Google Calendar uses ISO 8601 week numbering. Week 1 is the first week of the year that contains a Thursday -- equivalently, the first week with four or more days in the new year. Weeks always start on Monday.

### The rule in plain language

- Weeks start on **Monday** and end on **Sunday**.
- **Week 1** is the week containing the first Thursday of the year.
- If January 1 falls on a Friday, that week has only one day in the new year. It counts as Week 52 or 53 of the previous year. Week 1 starts the following Monday.
- If January 1 falls on a Wednesday, the week (Mon Dec 29 -- Sun Jan 4) has four days in the new year and qualifies as Week 1.

This system ensures every year has exactly 52 or 53 complete weeks with no partial-week fragments. "Deliver by W12" means the same date range for everyone using the standard.

### The "Start week on" setting and its effect

Google Calendar lets you set your week to start on **Saturday**, **Sunday**, or **Monday** (under **Settings > View options > Start week on**). This shifts which day appears in the leftmost column of your grid.

The important part: week numbering still follows ISO 8601 regardless of your start-day preference. If you set your week to start on Sunday, the week number in the margin still reflects the ISO Monday-start convention. The visual grid and the numbering system use different definitions of "week." This is a common source of confusion.

---

## When week numbers are useful

**Direct answer:** Week numbers eliminate ambiguity. Instead of "the week of March 16th" (which could mean different date ranges depending on start-day settings), you say "W12" and everyone lands on the same seven days.

- **Sprint planning:** "Sprint 6 covers W11--W12" is unambiguous. Calendar, project tool, and standups all align.
- **Quarterly reviews:** Q1 maps to roughly W01--W13. Week numbers give more granularity than monthly milestones.
- **Manufacturing and supply chain:** Production schedules and delivery windows have used week numbers for decades, especially in Europe and Asia.
- **EU business conventions:** In much of Europe, week numbers are standard in meeting invitations, project timelines, and casual scheduling.
- **Cross-team coordination:** "EOD Friday W12" is precise. "End of next week" depends on when you read the message.

If your team coordinates across time zones, a quick-glance tool like [TimeHopper](/) pairs well with week-numbered planning -- you can check your upcoming week without opening a full tab.

---

## When week numbers cause confusion

**Direct answer:** Week numbers cause problems when team members use different standards, different "Start week on" settings, or do not understand ISO year-boundary rules.

### US vs ISO week standards

The US does not widely use ISO week numbering. Many US systems define Week 1 as the week containing January 1, with weeks starting on Sunday. ISO defines Week 1 as the first week with a Thursday, starting on Monday. In early January and late December, these systems can disagree. If half your team assumes US conventions and the other half uses ISO, "W1" could mean different date ranges.

### Mismatched "Start week on" settings

When one person starts their week on Sunday and another on Monday, their grids look different. The week numbers stay the same, but the visual framing differs. This leads to confusion like: "I see W12 starting on Sunday the 15th, but you say it starts Monday the 16th." Both see the same week number -- their grids just frame it differently.

### Week 52 and 53 edge cases

Most years have 52 weeks. Some have 53. December 31 might belong to W01 of the next year. January 1 might belong to W52 or W53 of the previous year. If your planning involves year-end deadlines or Q1 kickoffs, these edges need explicit attention.

---

## Common mistakes with week numbers

**Direct answer:** Five mistakes come up repeatedly. Each one is avoidable with a small amount of coordination.

### Mistake 1: Assuming US and ISO weeks always match

They do not. In early January and late December, the gap can be significant. If your team spans US and international members, agree on one standard. Google Calendar uses ISO 8601 -- problems arise when someone cross-references a non-ISO system like an Excel spreadsheet using US week numbering.

### Mistake 2: Not coordinating "Start week on" across the team

Each user independently chooses their start day. The week numbers do not change, but the visual grid does. When one person's "W12 row" starts on Sunday and another's starts on Monday, it looks like different weeks. **Fix:** Agree on Monday as the team standard -- it aligns with ISO week starts.

### Mistake 3: Week 53 confusion at year boundaries

Not every year has a Week 53. When it appears, people think it is an error. Week 53 is valid -- it happens when January 1 of the next year falls on a Thursday (or Wed/Thu in a leap year). **Fix:** Check at year start whether the outgoing year had 52 or 53 weeks. Adjust planning templates accordingly.

### Mistake 4: Ignoring the mobile gap

Teams adopt week numbers on desktop, start saying "W12" in Slack, and then someone on their phone has no idea what week it is. **Fix:** Make sure everyone knows a quick web search for "what week is it" returns the current ISO week number.

### Mistake 5: Confusing week numbers with week counts

"We have 6 weeks until launch" is a countdown (relative). "Launch is in W18" is a fixed target (absolute). Mixing the two leads to off-by-one errors. Week numbers are absolute references within a year. Week counts are relative to today.

---

## How week numbers interact with other calendar settings

**Direct answer:** Week numbers are display-only, but they interact visually with "Hide weekends" and "Start week on." Understanding these interactions prevents surprises.

### Week numbers and "Hide weekends"

When you [hide weekends in Google Calendar](/blog/hide-weekends-google-calendar), Saturday and Sunday columns disappear. Week numbers remain unchanged -- W12 is still W12 whether you see five columns or seven. Since ISO weeks start on Monday, a hidden-weekends view actually aligns neatly: Monday is both the ISO week start and your first visible column.

### Week numbers and "Start week on"

- **Start week on Monday:** Grid and ISO week numbers align perfectly. Cleanest combination.
- **Start week on Sunday:** The week number in the margin corresponds to an ISO week starting one column to the right. Manageable but takes adjustment.
- **Start week on Saturday:** Most confusing. The ISO week starts two columns into the grid.

**Recommendation:** If you use week numbers, set your week to start on Monday.

### The optimal combination

For a work-focused calendar with maximum clarity:

1. Enable **Show week numbers**.
2. Set **Start week on** to **Monday**.
3. Uncheck **Show weekends** (if your schedule is Monday--Friday).

This gives you a five-column grid with ISO week numbers that match perfectly. Add [color-coded events](/blog/color-code-google-calendar-events) on top, and your calendar becomes a highly scannable planning tool. A [Chrome extension for quick calendar access](/blog/google-calendar-extension-for-chrome-quick-view) can speed up daily checks further -- glance at your toolbar instead of opening a full tab.

---

## FAQ

### Do week numbers change my events?

No. Week numbers are purely a display feature. Enabling or disabling them does not move, modify, or delete any events. The only change is a small number appearing in the margin of your Week and Month views.

### Why don't I see week numbers on mobile?

The Google Calendar mobile app (Android and iOS) does not support week numbers. This is a known limitation. You can see week numbers by opening calendar.google.com in your mobile browser and requesting the desktop site, or by using a third-party calendar app.

### What is Week 1 -- is it January 1?

Not necessarily. Under ISO 8601, Week 1 is the first week containing a Thursday. If January 1 falls on a Friday, Saturday, or Sunday, it belongs to the last week of the previous year. Week 1 can start as late as January 4 or as early as December 29.

### Can I change the week numbering system in Google Calendar?

No. Google Calendar uses ISO 8601 exclusively. There is no setting to switch to US week numbering. If your organization uses a different system, you will need to offset manually or use an external reference.

### Do week numbers work with shared calendars?

Yes. Week numbers are a personal display setting -- they appear on your view regardless of which calendars are overlaid. Everyone who enables the setting sees the same numbers, making week-based coordination reliable.

---

## Sources

- [Google Calendar Help -- Change your calendar view](https://support.google.com/calendar/answer/7638168) -- official documentation for view options, including "Show week numbers" and "Start week on" settings.
- [ISO 8601 -- Wikipedia](https://en.wikipedia.org/wiki/ISO_8601) -- explanation of the ISO week date standard, including Week 1 rules and the 52/53-week year structure.
- [Google Calendar Help Community](https://support.google.com/calendar/community) -- user-reported threads on mobile limitations, week number display, and setting interactions.
