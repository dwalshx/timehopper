---
title: "World Clock + Google Calendar: The Fastest Setup for Remote Teams"
description: "Set up a world clock alongside Google Calendar to coordinate across time zones. Covers Google's built-in world clock, secondary zones, and third-party options."
pubDate: 2026-02-11
updatedDate: 2026-03-20
slug: world-clock-google-calendar-remote-teams-setup
tags: ["world clock", "google calendar", "remote teams", "time zones"]
---

# World Clock + Google Calendar: The Fastest Setup for Remote Teams

**Direct answer:** The fastest remote-team time setup has three parts: **(1)** enable Google Calendar's built-in world clock sidebar, **(2)** [add a secondary time zone](/blog/add-secondary-time-zone-google-calendar) to your calendar grid, and **(3)** pick two to four cities that represent your team's spread. The whole process takes under five minutes. Once it's done, every meeting invite you open shows times in multiple zones without any mental math.

Remote teams lose hours each week to timezone confusion. Someone sends "let's meet at 3 PM" with no zone attached. Someone else converts wrong. A third person forgets that daylight saving time shifted an hour last weekend. These small errors compound. A visible world clock next to your calendar grid removes the guesswork entirely.

This guide walks through the full setup: Google's built-in world clock, secondary time zones on the calendar grid, choosing the right cities, handling DST transitions, and the most common mistakes that trip up distributed teams.

---

## Google's built-in world clock sidebar

**Direct answer:** Google Calendar has a world clock feature built into its sidebar. It displays the current time in multiple cities at a glance, and it takes about 30 seconds to turn on.

Here is how to enable it:

1. Open [Google Calendar](https://calendar.google.com) in your browser.
2. Click the **gear icon** in the top-right corner and select **Settings**.
3. In the left sidebar, click **General**.
4. Click **World clock**.
5. Check the box labeled **Show world clock**.
6. Click **Add time zone** and search for your first city.
7. Repeat for each additional city you want to track.
8. Close settings. The world clock now appears in the left sidebar beneath your mini calendar.

The sidebar clock updates in real time. Each city shows its current time and the UTC offset. When you open Calendar each morning, you can immediately see what time it is for every key teammate.

A few things to know about the sidebar clock:

- It supports up to dozens of cities, but more than five gets visually cluttered. Stick with two to four.
- The clock respects each city's DST rules automatically. You do not need to update offsets manually.
- The sidebar clock only appears in the web version of Google Calendar. The Android and iOS apps do not display it.
- If your sidebar is collapsed, click the **side panel** arrow on the left edge to expand it.

The world clock sidebar answers the question "what time is it there right now?" That is useful for ad-hoc messages and quick calls. But for scheduling meetings, you also need a secondary time zone on the grid itself.

---

## Setting up a secondary time zone on the calendar grid

**Direct answer:** A secondary time zone adds a second column of hour labels to your calendar grid. It lets you see every time slot in two zones simultaneously, which makes scheduling across regions faster than any external tool.

To set it up:

1. Open Google Calendar and go to **Settings** (gear icon).
2. Under **General**, click **Time zone**.
3. Check **Display secondary time zone**.
4. Use the dropdown to select the zone you want. Pick the zone where most of your cross-timezone meetings happen.
5. Optionally, add a **label** to each zone (e.g., "NYC" and "London") so the grid is easier to read.
6. Close settings. Your calendar grid now shows two time columns on the left edge.

For a detailed walkthrough with screenshots, see our guide on [how to add a secondary time zone in Google Calendar](/blog/add-secondary-time-zone-google-calendar).

### Which zone should you pick as secondary?

Choose the zone where your most frequent collaborators sit. If you are in New York and your engineering team is in Berlin, set Berlin as your secondary zone. If your team spans three or more zones, pick the one that causes the most scheduling confusion.

Google Calendar only supports two zones on the grid (primary and secondary). If you need a third, you have two options:

- Use the world clock sidebar for the third zone.
- Use a browser extension like [TimeHopper](https://chromewebstore.google.com/detail/timehopper-calendar-clock/jckljcbopecepadagmnjbfjgojpnfkhl), which overlays additional timezone context directly in your toolbar.

### Swapping primary and secondary zones

You can click the swap arrows between the two time zone columns on the calendar grid to flip your perspective. This is helpful when you are scheduling a meeting and want to think in your colleague's local time instead of your own. Understanding [what your time zone setting actually controls](/blog/google-calendar-time-zone-what-it-controls) helps you avoid confusion when switching.

---

## Choosing which cities to track

**Direct answer:** Track the cities where your teammates actually work, not the nearest major metro. Start with two cities and add more only if your team genuinely spans additional zones.

### The selection process

1. **List every time zone your team uses.** Ask teammates directly. Do not assume based on country. India has one zone (IST), but Brazil has four.
2. **Group zones that overlap.** If three teammates are in US Eastern and two are in US Central, you probably only need Eastern on the clock. The one-hour gap is manageable.
3. **Pick a representative city for each zone.** Use cities your team recognizes. "New York" is clearer than "US Eastern" for most people.
4. **Limit to two to four cities.** More than four clutters the sidebar and slows you down.

### Common city groupings for remote teams

Here are the most frequent setups based on typical distributed team structures:

**US-only distributed team:**
- San Francisco (Pacific)
- New York (Eastern)

**US + Europe:**
- San Francisco (Pacific)
- New York (Eastern)
- London (GMT/BST)

**US + Europe + India:**
- San Francisco (Pacific)
- London (GMT/BST)
- Bangalore (IST)

**Global spread:**
- San Francisco (Pacific)
- London (GMT/BST)
- Bangalore (IST)
- Tokyo (JST)

If you need a quick reference for conversions between common US and UTC zones, our [UTC to Eastern to Pacific cheat sheet](/blog/utc-to-eastern-to-pacific-quick-cheat-sheet) saves time.

### Revisit your city list quarterly

Teams change. People relocate. New hires join from different regions. Review your world clock cities every few months to make sure they still reflect where your team actually sits.

---

## Managing DST transitions

**Direct answer:** Daylight saving time shifts cause more scheduling errors than any other time zone issue. The fix is simple: audit your recurring meetings twice per year, in March and November (for US teams) or March and October (for European teams).

### Why DST causes problems

DST does not happen on the same date worldwide. The United States switches on the second Sunday of March and the first Sunday of November. The European Union switches on the last Sunday of March and the last Sunday of October. Many countries, including Japan, India, and China, do not observe DST at all.

This mismatch creates a two-to-three-week window each spring and fall where offsets between zones temporarily change. A meeting that normally works for both New York and London might land an hour earlier or later for one side during the gap.

### How to handle DST transitions

1. **Identify your DST risk windows.** For US-EU teams, there are four risk weeks per year: two in March and two in October/November.
2. **Audit recurring meetings before each transition.** Open each recurring cross-timezone meeting and verify the times still work for all attendees.
3. **Use the calendar's built-in zone display.** Google Calendar handles DST automatically for events created with time zones attached. The problem arises when people create events without specifying a zone, or when they agreed on a time verbally ("same time as always") without checking the calendar.
4. **Send a team reminder.** A simple Slack message or email the Monday before a DST switch prevents confusion: "Clocks change this weekend in [region]. Check your recurring meetings."
5. **Consider anchoring to UTC for recurring meetings.** Some teams schedule all recurring meetings in UTC and let each participant convert locally. This eliminates DST confusion entirely, though it requires everyone to be comfortable converting from UTC.

If you need to [change your calendar's time zone](/blog/how-to-change-time-zone-in-google-calendar) after traveling or relocating, do it before a DST transition, not during one.

### A note on Google Calendar's DST behavior

Google Calendar adjusts event times automatically when DST changes, as long as the event was created with a specific time zone. If a meeting was set for "2 PM America/New_York," it stays at 2 PM Eastern regardless of whether EST or EDT is active. The UTC offset changes behind the scenes, but the local time stays the same.

The problem occurs when someone creates an event at a fixed UTC offset (e.g., "UTC-5") instead of a named zone (e.g., "America/New_York"). Fixed offsets do not adjust for DST. Avoid using them for recurring events.

---

## Five common mistakes with world clocks and calendar zones

**Direct answer:** Most time zone errors come from setup choices, not from the tools themselves. Here are the five mistakes that cause the most confusion for remote teams.

### 1. Setting a secondary zone but never labeling it

Google Calendar lets you add labels to your primary and secondary zones. Without labels, you see two columns of numbers and have to remember which is which. Always add a short label like "NYC" or "LON."

### 2. Tracking too many cities

A world clock with eight cities is harder to read than one with three. Each city you add increases cognitive load. Be selective. If two teammates are one hour apart, you usually only need one of their zones on the clock.

### 3. Forgetting that the mobile app has no world clock sidebar

Google Calendar's mobile apps do not show the world clock sidebar. If you rely on mobile for scheduling, you need a separate world clock app or widget on your phone's home screen. The built-in Clock app on both Android and iOS supports multiple cities.

### 4. Using UTC offsets instead of city names

Telling a teammate "let's meet at 14:00 UTC-5" is error-prone. UTC-5 is Eastern Standard Time, but during daylight saving, Eastern is UTC-4. Use city names or named zones instead. "2 PM New York time" is unambiguous year-round.

### 5. Not verifying times after changing your own time zone

If you travel and [change your Google Calendar time zone](/blog/how-to-change-time-zone-in-google-calendar), all your events shift to display in the new zone. This is expected. But if you manually created events without attaching a zone, those events may appear at the wrong time. After any zone change, scan your upcoming week to confirm nothing shifted unexpectedly.

---

## FAQ

### Does Google Calendar's world clock update automatically for DST?

**Direct answer:** Yes. The world clock sidebar uses IANA time zone data, which includes DST rules for each city. When a city's clocks change, the sidebar updates automatically. You do not need to adjust anything manually.

### Can I show more than two time zones on the calendar grid?

**Direct answer:** No. Google Calendar supports exactly two time zones on the grid: primary and secondary. For additional zones, use the world clock sidebar or a browser extension. There is no setting or workaround to add a third column to the grid itself.

### Does the secondary time zone appear on shared calendar invites?

**Direct answer:** No. Your secondary time zone is a local display setting. It only affects what you see on your own screen. When you send a meeting invite, recipients see the event in their own primary time zone. This is by design and prevents confusion. Each person's calendar converts the event time automatically.

### How do I set up a world clock on Google Calendar mobile?

**Direct answer:** Google Calendar's mobile apps do not include a world clock sidebar. Your options on mobile are: (1) use your phone's built-in Clock app to add world clock cities, (2) add a world clock widget to your home screen, or (3) use a third-party app. The secondary time zone setting from the web version does sync to the mobile app, so you will see two zones on the mobile calendar grid if you enabled it on the web.

### What happens to my world clock if I change my primary time zone?

**Direct answer:** Your world clock cities stay the same. Changing your primary time zone affects how events display on your grid, but the world clock sidebar continues showing the current time in each city you added. The sidebar clocks are independent of your calendar's primary zone setting. However, you should still review your [secondary time zone](/blog/add-secondary-time-zone-google-calendar) to make sure the pairing still makes sense after the change.

---

## Sources

- [Google Calendar Help: Change time zones](https://support.google.com/calendar/answer/37064) — Google's official documentation on setting primary and secondary time zones.
- [Google Calendar Help: World clock settings](https://support.google.com/calendar/answer/83117) — Official instructions for enabling and configuring the world clock sidebar.
- [Google Workspace Updates Blog](https://workspaceupdates.googleblog.com/) — Announcements about new Calendar features, including time zone improvements.
- [IANA Time Zone Database](https://www.iana.org/time-zones) — The authoritative source for time zone definitions used by Google Calendar and most software.
- [timeanddate.com: DST Dates by Country](https://www.timeanddate.com/time/dst/) — Reference for when each country observes daylight saving time transitions.
- [World Clock by timeanddate.com](https://www.timeanddate.com/worldclock/) — Useful cross-reference tool for verifying times across multiple cities.
