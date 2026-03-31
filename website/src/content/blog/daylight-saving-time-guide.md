---
title: "Daylight Saving Time: What It Actually Changes (And What It Doesn't)"
description: "DST shifts your clock by one hour. It does not change UTC, time zone relationships, or your calendar's stored data. Here's what actually moves — and what to watch during the dangerous weeks when regions switch on different dates."
pubDate: 2026-03-26
slug: daylight-saving-time-guide
tags: ["daylight saving time", "dst", "time zones", "google calendar"]
---

# Daylight Saving Time: What It Actually Changes (And What It Doesn't)

**Quick answer:** Daylight saving time shifts the clock in participating regions by one hour — it does not change UTC, it does not alter time zone relationships in a permanent way, and it does not move events already stored in your calendar. What it does change: your UTC offset, your time zone abbreviation, and how far your local time sits from every region that observes a different schedule.

---

## What Actually Changes When DST Kicks In

**DST changes three things: your UTC offset, your time zone abbreviation, and the apparent gap between you and every other region.**

### 1. Your UTC offset shifts by one hour

UTC — Coordinated Universal Time — never changes. What changes is how far your local time sits from UTC. In the United States, Eastern Time runs at UTC−5 during standard time (EST) and UTC−4 during daylight saving time (EDT). That one-hour shift is the entire mechanical effect of DST.

### 2. Your time zone abbreviation changes

EST becomes EDT. PST becomes PDT. CET (Central European Time) becomes CEST (Central European Summer Time). These abbreviations are not interchangeable. If you schedule a call at "9 AM EST" in February and someone reads that in July, they are reading the wrong offset. Prefer city names over abbreviations when scheduling across seasons.

### 3. The gap between regions can change — temporarily

When New York switches to EDT but London has not yet switched to BST, the gap between them narrows from 5 hours to 4 hours for a short window. Two weeks later, London switches, and the gap returns to its usual 5 hours. This temporary shift is one of the most common sources of missed meetings.

---

## What Does NOT Change

**UTC does not move. Your calendar's stored event data does not move. The number of hours in a day does not change.**

These three points cause more confusion than the clock change itself.

**UTC stays fixed.** DST is a local convention. UTC is the reference that never adjusts. A meeting stored at 14:00 UTC is always at 14:00 UTC, regardless of which regions are in summer time and which are not.

**Calendar events do not drift — if they were set correctly.** Google Calendar stores events in UTC internally. When DST switches, the calendar converts that stored UTC time to your current local time automatically. An event that was at 9 AM before DST is still at 9 AM after DST — assuming it was set against a city-name time zone, not a fixed offset like UTC−5. Fixed-offset events are the exception and will appear to shift. See [why Google Calendar shows the wrong time zone after a DST change](/blog/google-calendar-time-zone-wrong-fix.html) for the specific fix.

**The offset between PST and EST does not change.** The US Pacific Coast is always 3 hours behind the US East Coast, regardless of DST, because both regions switch on the same date. A [PST to EST conversion](/tools/convert/pst-to-est.html) is always a 3-hour difference — DST does not touch that relationship.

---

## 2026 DST Dates by Region

**DST does not happen on the same date everywhere. Some regions don't observe it at all.**

| Region | Clocks Spring Forward | Clocks Fall Back |
| :--- | :--- | :--- |
| United States & Canada | Sun, March 8, 2026 | Sun, November 1, 2026 |
| European Union | Sun, March 29, 2026 | Sun, October 25, 2026 |
| United Kingdom | Sun, March 29, 2026 | Sun, October 25, 2026 |
| Australia (AEDT/AEST) | Sun, April 5, 2026 | Sun, October 4, 2026 |
| New Zealand | Sun, April 5, 2026 | Sun, September 27, 2026 |
| Brazil | No DST (abolished 2019) | — |
| China, Japan, India | No DST observed | — |
| Most of Africa | No DST observed | — |
| Arizona (US), Hawaii (US) | No DST observed | — |

Australia and New Zealand are in the Southern Hemisphere, so their seasons are reversed. They spring forward in April and fall back in October — the opposite of North America and Europe.

---

## The Dangerous Weeks: When Only Some Regions Have Switched

**The highest-risk period for scheduling errors is the gap between when the US switches and when Europe switches. In 2026, that window runs from March 8 to March 29.**

For those three weeks, the offset between US Eastern Time and London shifts from 5 hours to 4 hours. The offset between US Eastern and Central Europe shifts from 6 hours to 5 hours. Anyone relying on a memorized offset without checking the current date will book meetings an hour off.

The same gap appears in autumn. The US falls back on November 1. Europe falls back on October 25. Between those two dates, the US-Europe offset is temporarily one hour wider than usual.

### Why this matters for recurring meetings

A recurring weekly meeting set at 9 AM EST in January will appear at 9 AM in everyone's calendar throughout the year — if everyone's calendar is properly using city-name time zones. But if even one participant has a fixed-offset calendar, that participant will see the meeting at 8 AM or 10 AM during the transition window.

The only reliable fix is to set all recurring meetings using named time zones, verify attendee calendar settings before long-running series begin, and communicate proactively when transition weeks are approaching.

Use the [TimeHopper time zone converter](/tools/convert.html) to verify the current offset between any two cities during these transition windows.

---

## Regions and Countries That Don't Observe DST

**If a region doesn't observe DST, its UTC offset never changes. That makes it simpler to schedule with — but it also means its gap relative to DST-observing regions shifts twice a year.**

**United States exceptions:**
- Arizona: stays on Mountain Standard Time (UTC−7) year-round. During US DST, most of the country moves forward — Arizona does not. It ends up on the same clock as Pacific Daylight Time (UTC−7) during summer months. The exception within Arizona: the Navajo Nation does observe DST.
- Hawaii: stays on Hawaii-Aleutian Standard Time (UTC−10) year-round.

**Internationally:**
- Japan: UTC+9, no DST. Tokyo does not shift.
- China: UTC+8 for the entire country, no DST.
- India: UTC+5:30, no DST.
- Most of sub-Saharan Africa: no DST.
- Iceland: UTC+0 year-round (stays on GMT, does not switch to BST).
- Brazil: abolished DST in 2019. All regions are now fixed-offset.
- Russia: abolished DST in 2014. Uses fixed standard time year-round.

Scheduling with these regions is more predictable within themselves, but the gap between them and DST-observing regions still shifts twice a year. A 9 AM Tokyo meeting and a 9 AM New York meeting are always 13 or 14 hours apart, depending on whether the US is in EST or EDT.

---

## How Google Calendar Handles DST

**Google Calendar handles DST correctly for city-name time zones. The common failure mode is using a fixed offset like "UTC−5" instead of "Eastern Time (New York)."**

When you set your primary time zone to a city name, Google Calendar knows that city's full offset history — including every past and future DST transition. It stores event times in UTC and converts to your local time on display. When DST switches, your displayed times update automatically.

### What can go wrong

**Fixed-offset time zones do not shift.** If your calendar is set to "UTC−5" and DST moves Eastern Time to UTC−4, your calendar stays at UTC−5. Events appear one hour off.

**Imported calendars from other systems.** ICS files and third-party calendar feeds sometimes embed fixed UTC offsets. When DST switches, those events do not adjust. If a colleague sends you a meeting as an ICS file with a hardcoded UTC timestamp, it will land correctly in absolute time — but it will display as one hour off if the sending calendar was itself misconfigured.

**The "Display secondary time zone" feature.** If you use Google Calendar's secondary time zone display and that secondary zone is set to a fixed offset, it will show the wrong offset during DST transitions. Set the secondary zone to a city name, not an offset string.

For a deeper look at travel-related time zone confusion — where DST interacts with crossing time zone boundaries — see [Google Calendar time zone confusion during travel](/blog/google-calendar-time-zone-confusion-travel.html).

---

## Common DST Mistakes

### Mistake 1: Using "EST" when you mean "ET"

EST is Eastern Standard Time. It only applies between November and March. From March through November, Eastern Time is EDT. Using "EST" year-round communicates the wrong offset half the year. Use "ET" or "Eastern Time" when you don't want to commit to a season — or better, use the city name (New York, Toronto, Atlanta).

### Mistake 2: Assuming the US-Europe gap is always 5 hours (or 6)

It is not. New York to London is normally 5 hours. During the March gap (US has switched, UK hasn't), it is 4. During the October gap (UK has switched, US hasn't), it is 6. Anyone scheduling transatlantic calls without checking current offsets during March and October will be wrong by an hour.

### Mistake 3: Treating Arizona as "Mountain Time"

Arizona uses Mountain Standard Time (UTC−7) year-round. But during summer, "Mountain Time" refers to Mountain Daylight Time (UTC−6). Scheduling with someone in Denver and someone in Phoenix during summer means a 1-hour difference between two cities that are in the same nominal time zone. The Phoenix contact is not on Mountain Time during summer — they are on the equivalent of Pacific Daylight Time.

### Mistake 4: Thinking DST is global

Roughly 40% of countries observe DST. The majority of the world does not. Assuming a foreign contact observes DST because you do is a common error when scheduling with partners in Asia, Africa, or the Middle East.

---

## How to Protect Yourself During DST Transitions

**Before a DST transition date, run through this checklist. The five minutes you spend now will prevent a missed meeting later.**

- [ ] Confirm your calendar's primary time zone is set to a city name, not a fixed offset
- [ ] Check any recurring meetings that cross DST boundaries — verify attendees are using city-name time zones
- [ ] For international meetings, look up the current UTC offset for each attendee's city (not just their "time zone name")
- [ ] Communicate upcoming transition dates to any colleagues in non-DST regions — they will not experience the change, but the gap between you will shift
- [ ] During the March and October gap windows, double-check US-Europe meeting times manually before sending invites
- [ ] If you receive an ICS file from another system, verify the event displays at the correct time in your calendar before accepting
- [ ] Set your OS to "Set time zone automatically" to ensure your device offset matches your actual location

---

## Decision Rule: Fixed Offset vs. City Name

**When to use a fixed UTC offset:** When you need the event to always fire at the same UTC moment — server cron jobs, log timestamps, API calls.

**When to use a city name:** For all human-facing scheduling. Meetings, calendar events, recurring series, anything another person will read as "what time should I show up."

The rule is simple: if a human is attending, use a city name. If a machine is processing, use UTC or a fixed offset.

---

## FAQ

### Does daylight saving time change which time zone you're in?

No. DST changes your UTC offset, not your time zone. Eastern Time is still Eastern Time before and after DST. What changes is whether it's UTC−5 (standard) or UTC−4 (daylight). The time zone itself — the set of rules that governs your region's offset throughout the year — remains the same.

### When do clocks change in 2026?

In the United States: clocks spring forward on March 8, 2026, and fall back on November 1, 2026. In the European Union and United Kingdom: March 29 and October 25. Australia: April 5 (fall back, Southern Hemisphere autumn) and October 4 (spring forward, Southern Hemisphere spring).

### Why do I keep getting meeting times wrong after DST?

The most common cause is a fixed-offset time zone setting in your calendar. Check that your calendar's primary time zone is set to a city name like "New York" or "London," not an offset like "UTC−5." If the problem persists, the issue may be with a colleague's calendar — see the [full diagnostic guide for Google Calendar time zone errors](/blog/google-calendar-time-zone-wrong-fix.html).

### Does PST to EST always stay at 3 hours?

Yes. Both Pacific and Eastern Time observe DST on the same US schedule, so the gap between them does not change. PST to EST is 3 hours. PDT to EDT is also 3 hours. The abbreviations change with the season, but the offset between them stays fixed. Use the [PST to EST converter](/tools/convert/pst-to-est.html) any time of year — the math is always the same.

---

## Sources

1. U.S. Department of Transportation — Daylight Saving Time: https://www.transportation.gov/regulations/daylight-saving-time
2. timeanddate.com — Daylight Saving Time Dates by Country: https://www.timeanddate.com/time/dst/2026.html
3. Google Calendar Help — Change your calendar view or time zone: https://support.google.com/calendar/answer/37064
