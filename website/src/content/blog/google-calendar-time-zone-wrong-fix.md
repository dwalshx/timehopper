---
title: "Google Calendar Time Zone Wrong? Fix It in 5 Steps"
description: "Diagnose DST shifts, OS mismatches, and sync errors causing wrong time zones. Platform-specific steps for Windows, macOS, Android, and iOS."
pubDate: 2026-02-11
updatedDate: 2026-03-20
slug: google-calendar-time-zone-wrong-fix
tags: ["google calendar", "time zones", "troubleshooting", "DST"]
---

# Google Calendar Time Zone Wrong? How to Fix It

Your Google Calendar is showing the wrong time. The most common fix: open **Settings > Time zone** and change your primary time zone to your current city. If that does not resolve it, the mismatch is in your operating system or browser — use the diagnostic table below to find the exact cause.

---

## What Causes Google Calendar to Show the Wrong Time Zone?

Three layers control what time your calendar displays: Google Calendar's own settings, your OS clock, and your browser's location detection. When any of these disagree, events shift.

| Symptom | Likely Cause | Fix |
| :--- | :--- | :--- |
| Events are 1 hour off | DST mismatch — fixed offset instead of city name | [Settings > Time zone > switch to a city name](#why-are-events-1-hour-off-after-daylight-saving-time) |
| Web calendar wrong, phone is correct | OS time zone or Chrome location mismatch | [Check OS time zone settings](#how-do-you-fix-an-os-level-time-zone-mismatch) |
| Phone wrong, web is correct | Mobile app using cached or manual zone | [Calendar app > Settings > Use device time zone](#how-do-you-sync-the-mobile-app-to-the-correct-time-zone) |
| New events default to wrong city | Primary time zone set incorrectly | [Settings > Time zone > change Primary](#how-do-you-fix-the-primary-time-zone-in-google-calendar) |
| Everything shifted after travel | Auto-detect flipped your zone | [Disable "Ask to update" in Settings > Time zone](#how-do-you-prevent-time-zone-problems-from-recurring) |
| Time zone keeps reverting | VPN or admin policy overriding your setting | [Set manual zone + check with IT](#can-a-vpn-change-your-google-calendar-time-zone) |
| Shared calendar events at wrong times | Source calendar uses a different zone | [Check shared calendar settings](#how-do-you-fix-time-zone-issues-with-shared-and-imported-calendars) |

---

## How Do You Fix the Primary Time Zone in Google Calendar?

Open Google Calendar on your computer. Go to **Settings** (gear icon, top right) and change your **Primary time zone** to your current city. This is the fix for the majority of wrong-time-zone issues.

Google Calendar uses your primary time zone to position every event on the grid. If it points to the wrong city, everything appears shifted.

**Steps:**

1. Open [Google Calendar](https://calendar.google.com) in your browser.
2. Click the **gear icon** (top right) and select **Settings**.
3. Under **Time zone**, click the **Primary time zone** dropdown.
4. Search for your city (e.g., "New York," "London," "Tokyo").
5. Select it and close Settings. The calendar grid updates immediately.

**Still wrong?** Check individual calendar time zones. Shared and imported calendars can have their own time zone that overrides your global setting. Hover over the calendar in the left sidebar, click the three-dot menu, select **Settings and sharing**, and verify its time zone matches.

For a complete walkthrough, see [How to Change Time Zone in Google Calendar](/blog/how-to-change-time-zone-in-google-calendar).

Reference: [Google Calendar Help — Use Google Calendar in different time zones](https://support.google.com/calendar/answer/37064)

---

## Why Are Events 1 Hour Off After Daylight Saving Time?

You are likely using a fixed GMT offset (like "GMT-5") instead of a city-based time zone (like "America/New_York"). City-based zones track DST transitions automatically. Fixed offsets stay the same year-round, putting your calendar 1 hour out of sync when clocks change.

When DST starts, a city-based zone shifts from GMT-5 to GMT-4. A fixed "GMT-5" offset stays at GMT-5. Your calendar thinks it is an hour earlier (or later) than it actually is.

**How to fix:**

1. Go to **Settings > Time zone** in Google Calendar.
2. Look at your Primary time zone value.
3. If it shows something like `(GMT-05:00)` without a city name, that is a fixed offset.
4. Change it to a city: search for your actual location (e.g., "New York," "Chicago," "Los Angeles").

**After changing, force a refresh:**
- Windows: press **Ctrl + Shift + R**
- macOS: press **Cmd + Shift + R**

This clears cached time zone rendering data and forces the calendar to recalculate.

Reference: [IANA Time Zone Database](https://www.iana.org/time-zones)

---

## How Do You Fix an OS-Level Time Zone Mismatch?

Your computer's clock feeds Google Calendar on the web. If your OS reports the wrong city, your calendar inherits that error — even if Google Calendar's own time zone setting is correct.

### Windows

1. Open **Settings** (Win + I).
2. Go to **Time & language > Date & time**.
3. Toggle **"Set time zone automatically"** to **On**.
4. If it is already on and still wrong, toggle it off, manually select your time zone from the dropdown, then toggle it back on.
5. Click **Sync now** under "Additional settings."

**Note:** "Set time zone automatically" requires Location Services. If the toggle is grayed out, go to **Settings > Privacy & security > Location** and turn on Location Services.

Reference: [Microsoft Support — Set time, date, and time zone settings in Windows](https://support.microsoft.com/en-us/windows/set-time-date-and-time-zone-settings-in-windows-dfaa7122-479f-5b98-2a7b-fa0b6e01b261)

### macOS

1. Open **System Settings > General > Date & Time**.
2. Turn on **"Set time and date automatically."**
3. Turn on **"Set time zone automatically using your current location."**
4. If the automatic option does not work, go to **System Settings > Privacy & Security > Location Services > System Services** (click Details) and enable **"Setting time zone."**

Reference: [Apple Support — Set the date and time automatically on your Mac](https://support.apple.com/guide/mac-help/set-the-date-and-time-automatically-mchlp2996/mac)

For more on how OS settings affect your calendar, see [What Google Calendar Time Zone Controls](/blog/google-calendar-time-zone-what-it-controls).

---

## How Do You Sync the Mobile App to the Correct Time Zone?

Open the Google Calendar app, go to **Settings > General**, and toggle **"Use device time zone"** to on. This forces the app to follow your phone's current time zone instead of a manually set zone.

If the app still shows the old time after you changed settings on the web, it is displaying a cached version.

### Android

1. Open the Google Calendar app.
2. Tap the **menu** (three lines, top left).
3. Tap **Settings > General**.
4. Toggle **"Use device time zone"** to on.
5. If still wrong, check your device time zone: **Settings > System > Date & time**.

### iOS

1. Open the Google Calendar app.
2. Tap the **menu** (three lines, top left).
3. Tap **Settings > General**.
4. Toggle **"Use device time zone"** to on.
5. If still wrong, go to **Settings > Privacy & Security > Location Services**. Find Google Calendar and set it to **"While Using the App."**
6. As a last resort, delete and reinstall the Google Calendar app. iOS does not offer a direct cache clear for individual apps.

Reference: [Google Calendar Help — Use Google Calendar in different time zones (Android)](https://support.google.com/calendar/answer/37064?co=GENIE.Platform%3DAndroid)

---

## Can a VPN Change Your Google Calendar Time Zone?

Yes. If your VPN routes through a different city and **"Ask to update my primary time zone"** is enabled, Google Calendar may prompt you to switch — or silently shift your grid.

**Decision rule:**
- **VPN user + manual primary zone + "Ask to update" off** = safe. Your time zone stays fixed.
- **VPN user + auto-detect on** = risky. Google may flip your zone to match the VPN exit point.

**To lock it down:**
1. Go to Google Calendar **Settings > Time zone**.
2. Set your primary time zone to your actual city.
3. Uncheck **"Ask to update my primary time zone to current location."**

---

## How Do You Fix Time Zone Issues With Shared and Imported Calendars?

Shared and imported calendars carry their own time zone metadata. When that metadata does not match your primary zone, events from those calendars appear at the wrong time — even though your own events look fine.

This is one of the most overlooked causes of time zone errors. You fix your primary zone, verify your OS, and still see shifted events. The problem is not your settings. It is the calendar source.

### Shared calendars from other Google users

When someone shares a calendar with you, their events store the time zone of the original creator. Google Calendar converts those times to your primary zone automatically. But if the creator set their events using a fixed GMT offset instead of a city name, DST shifts will not convert correctly.

**What to check:**
1. In the left sidebar, hover over the shared calendar name.
2. Click the three-dot menu and select **Settings and sharing**.
3. Look at the time zone listed for that calendar.
4. If it shows a fixed offset, ask the calendar owner to switch to a city-based zone.

You cannot change the time zone of a calendar you do not own. Only the owner can update it.

### Imported calendars (.ics files)

ICS files include a `VTIMEZONE` component that defines the time zone for all events in the file. If that component is missing or uses a non-standard zone identifier, Google Calendar may default to UTC — shifting everything.

**How to fix:**
1. Open the original `.ics` file in a text editor.
2. Look for the `VTIMEZONE` block near the top. It should reference a valid IANA zone like `America/New_York`.
3. If it is missing or shows something like `GMT-0500`, events will not track DST.
4. Delete the imported calendar from Google Calendar, correct the `.ics` file, and re-import it.

**Tip:** After importing, spot-check two or three events to confirm their times match the source. Imports do not give you an error when zone data is malformed — they just silently shift.

Reference: [RFC 5545 — Internet Calendaring and Scheduling (iCalendar)](https://datatracker.ietf.org/doc/html/rfc5545#section-3.6.5)

For related time zone behavior, see [What Google Calendar Time Zone Controls](/blog/google-calendar-time-zone-what-it-controls).

---

## Common Mistakes That Cause Time Zone Errors

Most time zone problems in Google Calendar come from small oversights, not complex bugs. These five mistakes account for the majority of issues.

### 1. Using a GMT offset instead of a city name

This is the single most common mistake. A fixed offset like `(GMT-05:00)` does not adjust for Daylight Saving Time. The city name `America/New_York` does. Every time DST starts or ends, fixed-offset users lose an hour. Always select a city in your time zone dropdown.

### 2. Changing the OS clock but not the Calendar setting

Fixing your Windows or macOS time zone does not automatically update Google Calendar's primary time zone. These are separate settings. After correcting your OS clock, open Google Calendar **Settings > Time zone** and verify the primary zone matches.

### 3. Forgetting that shared calendars have their own time zones

Your primary zone only governs calendars you own. Shared calendars retain the time zone set by their owner. If a colleague's calendar is set to a fixed offset or the wrong city, their events will appear shifted on your grid. You cannot fix this yourself — the owner needs to update their settings.

### 4. Ignoring the "Ask to update" setting

The **"Ask to update my primary time zone to current location"** checkbox sounds helpful. For people who travel or use VPNs, it causes constant zone-switching. If your calendar keeps reverting to a different time zone, this setting is almost certainly the cause. Turn it off unless you explicitly want location-based prompts.

### 5. Not checking event-level time zones

Individual events can have their own time zone, separate from your primary zone. When you create an event while traveling or paste in event details from another source, the event may store a different zone. Click on the event, select **Edit**, and look for the time zone indicator next to the start and end times. If it shows a different city than your primary zone, click it and correct it.

---

## How Do You Prevent Time Zone Problems From Recurring?

Lock your settings so this does not break again. Time zone correctness in Google Calendar depends on a chain of systems — your OS clock, your browser's location detection, and your Calendar settings all need to agree. If any single link in that chain drifts, your events shift silently.

**Prevention checklist:**

1. Set your Google Calendar primary time zone to a **city name**, not a GMT offset.
2. Disable **"Ask to update my primary time zone to current location"** unless you want the prompt when traveling.
3. Verify your OS time zone matches your physical location.
4. On mobile, keep **"Use device time zone"** toggled on.
5. If you use a VPN, set a manual primary zone.
6. Spot-check shared and imported calendars for mismatched zones.
7. Review event-level time zones when copying or importing events from other sources.

That chain-of-systems problem is why some people add a second layer of time awareness. [TimeHopper](https://chromewebstore.google.com/detail/timehopper-calendar-clock/jckljcbopecepadagmnjbfjgojpnfkhl) gives you a persistent sidebar showing your next events with live countdowns — so even if your calendar grid shifts due to a sync error, you still know exactly when your next meeting starts.

For time zone issues caused by travel, see [Google Calendar Time Zone Wrong After Travel](/blog/google-calendar-time-zone-wrong-travel). If your notifications are also misfiring, see [Google Calendar Notifications Not Working](/blog/google-calendar-notification-not-working-fixes).

---

## FAQ

### Why does my Google Calendar time zone keep changing back?

Two common causes: you have **"Ask to update my primary time zone to current location"** enabled and travel (or use a VPN) frequently, or your Google Workspace admin has set a default time zone policy. Disable auto-update in **Settings > Time zone**. If it still reverts, check with your IT team — admin policies can override your setting.

### Does clearing cache fix time zone issues?

Partially. A hard refresh (**Ctrl + Shift + R** on Windows, **Cmd + Shift + R** on macOS) clears cached rendering data. But if the underlying setting is wrong — wrong primary zone, wrong OS zone — clearing cache alone will not fix it. Fix the setting first, then refresh.

### Can my Workspace admin override my time zone?

Yes. Workspace admins can set a default time zone for new users. You can still change your own time zone in Calendar settings, but if it keeps reverting, an admin policy is likely overriding it. Contact your IT team to confirm.

Reference: [Google Workspace Admin Help — Set the time zone for your organization](https://support.google.com/a/answer/9685498)

### Why does my calendar show the right time on my phone but wrong on desktop?

Your phone and desktop pull time zone data from different sources. The Google Calendar mobile app uses your device's time zone (set by the carrier or GPS). The web version on desktop uses a combination of your OS clock, browser location, and Google Calendar settings. If your OS or browser reports a different zone than your phone, the desktop calendar will be off. Fix the OS time zone first (see [OS-level mismatch instructions above](#how-do-you-fix-an-os-level-time-zone-mismatch)), then verify your Google Calendar primary zone matches.

### Can I fix time zones for past events?

Yes, but only manually. Changing your primary time zone does not retroactively adjust events that were already created with a specific time zone. Each past event retains the zone it was created in. To fix a past event, open it, click **Edit**, and change the time zone next to the start and end times. For bulk corrections across many events, there is no built-in tool — you would need to export the calendar as an `.ics` file, edit the `DTSTART` and `DTEND` values in a text editor, delete the originals, and re-import.

### Does changing my time zone affect recurring events?

It depends on how the recurring event was created. If the event was created with a city-based time zone (e.g., "America/Chicago"), changing your primary zone will correctly convert the recurrence to your new zone. The event stays at the same local time in its original zone. But if the event was created with a fixed GMT offset, changing your zone can cause each occurrence to shift. Check the time zone on the recurring event itself — not just your primary zone — to make sure it uses a city name.

Reference: [Google Calendar Help — Create or edit recurring events](https://support.google.com/calendar/answer/37115)

---

## Sources

- Reference: [Google Calendar Help — Use Google Calendar in different time zones](https://support.google.com/calendar/answer/37064)
- Reference: [IANA Time Zone Database](https://www.iana.org/time-zones)
- Reference: [Microsoft Support — Set time, date, and time zone settings in Windows](https://support.microsoft.com/en-us/windows/set-time-date-and-time-zone-settings-in-windows-dfaa7122-479f-5b98-2a7b-fa0b6e01b261)
- Reference: [Apple Support — Set the date and time automatically on your Mac](https://support.apple.com/guide/mac-help/set-the-date-and-time-automatically-mchlp2996/mac)
- Reference: [RFC 5545 — Internet Calendaring and Scheduling (iCalendar)](https://datatracker.ietf.org/doc/html/rfc5545#section-3.6.5)
- Reference: [Google Workspace Admin Help — Set the time zone for your organization](https://support.google.com/a/answer/9685498)
- Reference: [Google Calendar Help — Create or edit recurring events](https://support.google.com/calendar/answer/37115)
