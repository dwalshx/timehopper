---
title: "Change Your Google Calendar Time Zone (Every Platform)"
description: "Change your Google Calendar time zone on desktop, Android, and iOS. Plus the display vs. event zone setting most people get wrong."
pubDate: 2026-03-10
updatedDate: 2026-03-20
slug: how-to-change-time-zone-in-google-calendar
tags: ["google calendar", "time zones", "how to", "productivity"]
---

# How to Change Time Zone in Google Calendar (Desktop, Android, iOS)

**Direct answer:** Open Google Calendar settings, go to **General > Time zone**, and select your new zone from the dropdown. On mobile, open the Google Calendar app, tap **Settings > General > Time zone**, and choose your location. The change takes effect immediately — every event on your calendar shifts to display in the new zone.

One critical detail before you start: **changing your time zone shifts how events display, not when they actually occur.** A meeting scheduled for 2:00 PM Eastern still happens at the same moment in time. If you switch your calendar to Pacific, that meeting now shows as 11:00 AM. Understanding this distinction prevents the most common time zone mistakes.

---

## Change your time zone on desktop (web)

**Direct answer:** The web version of Google Calendar gives you the most control over time zone settings. Here's the exact path.

1. Open [Google Calendar](https://calendar.google.com) in your browser.
2. Click the **gear icon** (top-right corner) and select **Settings**.
3. In the left sidebar, click **General**.
4. Click **Time zone**.
5. Under **Primary time zone**, click the dropdown and select your zone.
   - Use the "Area/City" format (e.g., "America/New_York," not "EST"). This ensures Google handles Daylight Saving Time transitions automatically.
6. Changes save automatically.

### What happens when you change your primary zone

Every event on your calendar immediately shifts to display in the new zone. A 3:00 PM meeting in your old zone recalculates to whatever time it is in your new zone. No events are deleted or moved — only the display changes.

Recurring events also shift. If you have a daily standup at 9:00 AM Eastern and you switch to Pacific, it now shows at 6:00 AM. The actual meeting time hasn't changed — just how your calendar displays it.

---

## Change your time zone on Android

**Direct answer:** The Android Google Calendar app can either follow your device's time zone automatically or let you set one manually.

1. Open the **Google Calendar** app.
2. Tap the **hamburger menu** (three horizontal lines, top-left).
3. Tap **Settings**.
4. Tap **General**.
5. Under **Time zone**, you'll see the current setting.
   - If "Use device time zone" is enabled, the calendar follows your phone's automatic time zone.
   - To set a specific zone, disable "Use device time zone" and select your preferred zone manually.

### Android-specific notes

- **"Use device time zone" is on by default.** This means your calendar automatically updates when you travel. For most people, this is the right setting.
- If you disable automatic zone detection and set a manual zone, your calendar stays locked to that zone regardless of where your phone thinks you are.
- If events appear at wrong times after traveling, check whether your phone's system time zone updated correctly: **Android Settings > System > Date & time > Time zone**.

---

## Change your time zone on iOS (iPhone / iPad)

**Direct answer:** On iOS, time zone settings for Google Calendar are inside the app, not in Apple's Settings.

1. Open the **Google Calendar** app.
2. Tap the **hamburger menu** (three horizontal lines, top-left).
3. Tap **Settings**.
4. Tap **General**.
5. Tap **Time zone** and select your zone.

### iOS-specific notes

- If you also use Apple's built-in Calendar app, its time zone settings are separate. Changing one doesn't affect the other.
- Apple's "Time Zone Override" feature (in **iOS Settings > Calendar > Time Zone Override**) can conflict with Google Calendar's zone. If events show wrong times on iOS, check both settings.
- When "Time Zone Override" is enabled in Apple's calendar settings, events display in a fixed zone regardless of your location. This can create confusion if you expect times to update as you travel.

---

## Display zone vs. event zone: the distinction that prevents errors

**Direct answer:** Your "display zone" controls how your calendar grid looks. An "event zone" locks a specific event to a specific location's time. Confusing the two is the #1 cause of time zone scheduling errors.

### Display time zone (your calendar view)

Your primary time zone is a display setting. It determines the hour labels on the left side of your calendar grid. When you change it, every event shifts visually.

**Example:** You're in New York (Eastern). Your calendar shows a meeting at 2:00 PM. You change your display zone to London (GMT). That meeting now shows at 7:00 PM. The meeting itself didn't move — your view shifted.

### Event time zone (a single event's anchor)

When you create an event, you can assign it a specific time zone. This anchors the event to that zone regardless of your display settings.

**Example:** You create a meeting at "3:00 PM London time." If your display zone is Eastern, the meeting shows at 10:00 AM on your grid. If you later switch your display zone to Pacific, it shows at 7:00 AM. The event stays anchored to 3:00 PM London.

### How to set an event's time zone

1. Create or edit an event in Google Calendar (web).
2. Click the **time zone** link next to the start time (it may say your current zone, or you may need to click "More options" first).
3. Select the zone you want to anchor the event to.
4. Set the start and end times in that zone.
5. Save.

### When to use each

| Situation | What to change |
| :--- | :--- |
| You moved to a new city | Change your **display zone** (primary time zone) |
| You're scheduling a meeting in someone else's zone | Set the **event zone** on that specific event |
| You're traveling for a few days | Add a **secondary display zone** (see below) — don't change your primary |
| You work with a team in another zone daily | Add a **secondary display zone** for their location |

---

## Add a secondary time zone for cross-zone coordination

**Direct answer:** Instead of constantly switching your primary zone, add a second zone column to your calendar. This shows two sets of hour labels side by side.

### How to enable a secondary time zone (web)

1. Open **Settings** (gear icon) > **Settings**.
2. Go to **General > Time zone**.
3. Check **Display secondary time zone**.
4. Select the second zone from the dropdown.
5. Optionally, add labels (e.g., "NYC" and "London") so you can tell which column is which at a glance.

### When a secondary zone is the right choice

- You have regular meetings with people in a different zone and need to quickly see "what time is it there?"
- You're traveling for less than a week and want to see destination time alongside home time.
- You coordinate across two offices or time zones daily.

### Limitations

- Google Calendar supports exactly two display zones (primary + secondary). You cannot add a third.
- Secondary zones only appear on the web and some desktop views. Mobile apps don't show the secondary zone column.
- If you need to track three or more zones simultaneously, you'll need either Google's built-in world clock widget (on the web, under "Other calendars") or a dedicated tool. [TimeHopper](/) provides a persistent multi-zone display that works alongside your calendar without requiring settings changes.

---

## The traveler's decision matrix

**Direct answer:** Whether to change your time zone settings depends on trip length and how you schedule meetings during travel. Here's a decision framework.

| Scenario | Recommended strategy | Why |
| :--- | :--- | :--- |
| **Day trip or 1-2 day trip** | Keep your primary zone. Add destination as secondary zone. | Avoids confusion. Your regular schedule stays visually consistent. |
| **3-7 day trip** | Keep your primary zone. Add destination as secondary. Enable "Ask to update time zone." | Google will prompt you to update when it detects a zone change, giving you the choice. |
| **Relocation or 1+ week stay** | Change your primary zone to the new location. Remove or update secondary zone. | You're operating in the new zone full-time. Your calendar should reflect that. |
| **Frequent travel (digital nomad)** | Enable "Use device time zone" on mobile. Set a fixed primary zone on web. | Mobile auto-updates as you move. Web stays anchored to your "home base." |

### The "Ask to update time zone" setting

Google Calendar can detect when you've traveled to a different time zone and prompt you to update your calendar.

**To enable it (web):**
1. Go to **Settings > General > Time zone**.
2. Check **Ask to update my primary time zone to current location**.

**To enable it (mobile):**
- On Android and iOS, the "Use device time zone" toggle serves a similar purpose. When enabled, your calendar follows your phone's detected zone.

This setting is useful for infrequent travelers. For frequent travelers, it can be annoying — you'll get prompted every time you cross a zone boundary.

---

## Common mistakes with time zone settings

**Direct answer:** Five errors account for most time zone frustration. Here's each one and how to avoid it.

### Mistake 1: Changing your OS clock instead of your calendar setting

Your computer's system clock and Google Calendar's time zone are independent settings. Changing one doesn't necessarily change the other. If you update your Windows or macOS time zone but don't update Google Calendar, your calendar grid stays on the old zone.

**Fix:** Always change the time zone inside Google Calendar settings directly. Don't rely on your OS clock to propagate the change.

### Mistake 2: Using abbreviations instead of city names

Setting your zone to "EST" locks it to Eastern Standard Time year-round — it won't switch to EDT (Eastern Daylight Time) in summer. This means your calendar will be one hour off for roughly half the year.

**Fix:** Always use the "Area/City" format: "America/New_York" instead of "EST." Google handles DST transitions automatically when you use city-based zones.

### Mistake 3: Forgetting event-level time zones when scheduling across zones

You're in New York and create a meeting at "9:00 AM" for your colleague in Los Angeles. Without setting an event zone, that meeting is 9:00 AM Eastern — which is 6:00 AM in LA.

**Fix:** When scheduling cross-zone meetings, click the time zone link next to the event time and set it explicitly. Or verbally confirm: "9 AM your time or mine?"

### Mistake 4: Changing your primary zone before a trip (then forgetting to change it back)

You switch to Tokyo time for a business trip. Your week in Tokyo goes smoothly. You fly home, forget to switch back, and miss a Monday morning meeting because your calendar still shows Tokyo time.

**Fix:** Use the secondary time zone feature for trips instead of changing your primary zone. Or enable "Ask to update time zone" so Google prompts you when it detects you've moved.

### Mistake 5: Assuming mobile and web share the same zone setting

If "Use device time zone" is enabled on mobile but you've manually set a different zone on the web, your mobile calendar and web calendar can show different times for the same event.

**Fix:** Decide on one strategy. Either use automatic zone detection everywhere, or set a manual zone on both platforms. Check both after making any change.

---

## FAQ

### Why are my meetings showing one hour off?

This is almost always a Daylight Saving Time (DST) issue. If you used a fixed offset (like "GMT-5" or "EST") instead of a city name (like "America/New_York"), your calendar doesn't adjust for DST. Change your time zone to use the city format, and the one-hour offset should resolve at the next DST transition.

### Can I show three or more time zones on my calendar?

Not natively. Google Calendar supports two display zones (primary + secondary). For additional zones, you can use Google's world clock widget (visible on the web sidebar) or a browser extension. [TimeHopper](/) displays multiple zones in a persistent sidebar without requiring settings changes.

### Does changing my time zone affect events other people invited me to?

No. Changing your display zone doesn't alter when events occur. It only changes how they appear on your grid. Other attendees' views are unaffected. The event still happens at the same moment in time — it just displays differently on your calendar.

### What happens to recurring events when I change time zones?

Recurring events shift to display in your new zone. If you have a daily 9:00 AM Eastern meeting and switch to Pacific, it shows at 6:00 AM. The meeting still occurs at the same absolute time. If you need the meeting to be at 9:00 AM in your new zone, you'll need to edit the recurring series.

### Should I use "Use device time zone" on mobile?

For most people, yes. It means your calendar automatically adjusts when you travel, showing events in local time. Disable it only if you need your calendar locked to a specific zone regardless of location — for example, if you're a remote worker whose team operates in a fixed zone and you want your calendar to always reflect that zone.

---

## Sources

- [Google Calendar Help: Change your time zone](https://support.google.com/calendar/answer/37064) — official documentation on time zone settings and display options.
- [Google Calendar Help: Use Google Calendar on different devices](https://support.google.com/calendar/answer/6261951) — cross-device sync behavior including time zone propagation.
