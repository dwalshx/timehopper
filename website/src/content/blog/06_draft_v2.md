---
title: "Google Calendar Reminders Not Working? Here's What Changed and How to Fix It"
description: "Google migrated Reminders to Tasks. If your reminders vanished or stopped notifying, here's how to fix it on web, Android, and iOS."
pubDate: 2026-03-20
updatedDate: 2026-03-20
slug: google-calendar-reminders-not-working-fix
tags: ["google calendar", "reminders", "tasks", "troubleshooting", "notifications"]
---

# Google Calendar Reminders Not Working? Here's What Changed and How to Fix It

**Direct answer:** Google [migrated Calendar Reminders to Google Tasks](https://support.google.com/tasks/answer/12572073) between 2023 and 2025. If your reminders vanished, that's why — they now live in Tasks. If your tasks or remaining reminders exist but don't send alerts, it's a notification settings problem on your browser, phone, or OS.

Pick your path:

> **Path A — Reminders disappeared entirely?**
> Google moved them to Tasks. Jump to [What happened to my reminders](#google-migrated-your-reminders-to-tasks).
>
> **Path B — Reminders or tasks exist but don't notify?**
> It's a settings issue. Jump to [Fix notifications](#fix-google-calendar-and-tasks-notifications).

---

### Symptom → Cause → Fix Table

| Symptom | Likely cause | Fix section |
| :--- | :--- | :--- |
| Reminders gone from Calendar sidebar | Google migrated them to Tasks | [Migration](#google-migrated-your-reminders-to-tasks) |
| Tasks exist but no alerts fire | Task notification settings not enabled | [Tasks notifications](#how-to-turn-on-google-tasks-notifications) |
| No notifications at all (web) | Browser blocking calendar.google.com | [Browser fixes](#web-chrome) |
| No notifications at all (phone) | App notification permissions off | [Mobile fixes](#android-google-calendar-notifications) |
| Alerts silenced during work hours | OS Focus / Do Not Disturb active | [OS-level settings](#check-os-level-focus-and-do-not-disturb-settings) |
| Only some calendars are silent | Per-calendar notification defaults off | [Per-calendar settings](#why-are-only-some-calendars-silent) |
| Notifications delayed or intermittent | Background sync or battery optimization | [Sync and background fixes](#fix-sync-and-background-issues) |

### The notification chain — why one broken link silences everything

Every Google Calendar alert passes through a chain: **app → browser or device permissions → OS notification layer → Focus / DND filter → background sync**. Each link must be intact. If your browser allows notifications but your OS has Do Not Disturb active, alerts die silently at the OS layer. If permissions are fine but background sync is restricted, alerts arrive late — or not at all. The fix sections below walk the chain link by link, starting with the most commonly broken one.

---

## Google migrated your reminders to Tasks

**Direct answer:** Google began migrating Calendar Reminders to Google Tasks in late 2023 and completed the rollout through 2025. Your reminders weren't deleted — they were moved. [Android Authority covered the migration timeline in detail.](https://www.androidauthority.com/google-calendar-reminders-migration-to-tasks-3580106/)

Here's what changed:

- **Before:** Reminders lived inside Google Calendar as a separate item type. You created them from the Calendar sidebar or mobile app.
- **After:** Those reminders were converted to Tasks inside [Google Tasks](https://support.google.com/tasks/answer/12572073). They still appear in Calendar if you have the Tasks calendar visible, but they're managed through the Tasks system.

### Where to find your migrated reminders

**On the web:**
1. Open [Google Calendar](https://calendar.google.com).
2. In the left sidebar, look under "My calendars" for **Tasks**. Make sure the checkbox is enabled.
3. Alternatively, open [Google Tasks](https://tasks.google.com) directly to see all your migrated items.

**On Android:**
1. Open the Google Tasks app (install from Play Store if needed).
2. Your migrated reminders appear as tasks with their original due dates.

**On iOS:**
1. Open the Google Tasks app (install from App Store if needed).
2. Migrated reminders appear as tasks.

### Decision rule

> If your reminders disappeared sometime after late 2023, they're almost certainly in Google Tasks now. Check Tasks first before recreating anything.

---

## Reminders vs. Tasks — what's different

If you relied on Reminders, here's what changed when Google moved everything to Tasks.

| Feature | Reminders (legacy) | Tasks (current) |
| :--- | :--- | :--- |
| Where they live | Google Calendar only | Google Tasks app + Calendar sidebar |
| Recurrence | Basic repeat options | Full recurrence (daily, weekly, custom) |
| Subtasks | No | Yes |
| Notifications | Tied to Calendar notification settings | Separate notification settings in Tasks |
| Due dates | Date + optional time | Date + optional time |
| Integration | Calendar only | Calendar, Gmail, Tasks app, Google Assistant |
| Status | Snooze or mark done | Mark complete, with completion history |

The key takeaway: **Tasks notifications are managed separately from Calendar notifications.** If you only fixed Calendar notification settings, your Tasks alerts may still be silent.

---

## How to turn on Google Tasks notifications

**Direct answer:** Tasks has its own notification toggle. Even if Google Calendar notifications work fine, Tasks won't alert you unless you enable them separately.

### Web

1. Open [Google Calendar](https://calendar.google.com).
2. Click the **gear icon** (top right) → **Settings**.
3. In the left sidebar, scroll to **General** → **Notification settings**.
4. Under "Notification settings," confirm "Notifications" is set to **Desktop notifications** (not "Off" or "Alerts").
5. Scroll down to find the **Tasks** calendar under "Settings for my calendars."
6. Click **Tasks** → set "Other notifications" as desired.

### Android

1. Open the **Google Tasks** app.
2. Tap the **three-line menu** (top left) → **Settings**.
3. Tap **Notifications**.
4. Enable **Task reminders** and **Due date notifications**.
5. Also open your phone's **Settings → Apps → Tasks → Notifications** and make sure notifications are allowed at the OS level.

### iOS

1. Open the **Google Tasks** app.
2. Tap the **three-line menu** → **Settings**.
3. Tap **Notifications** and enable them.
4. Then go to your iPhone's **Settings → Google Tasks → Notifications** and confirm they're allowed.

### Decision rule

> If you migrated from Reminders to Tasks (or Google did it for you), you need to enable notifications in two places: inside the Tasks app **and** at the OS level.

---

## Fix Google Calendar and Tasks notifications

**Direct answer:** Notifications require a chain of permissions — app, browser, and OS must all agree. If any single link is broken, your alerts stay silent.

**Find your platform below** and work through the steps in order. Each subsection fixes one link in the notification chain.

### Web (Chrome)

This is the most common break point. Chrome must explicitly allow calendar.google.com to send notifications.

1. Open Chrome. Paste `chrome://settings/content/notifications` into the address bar.
2. Under **"Allowed to send notifications,"** look for `https://calendar.google.com:443`.
3. If it's missing or listed under "Not allowed to send notifications," click **Add** and type `calendar.google.com`.
4. Restart Chrome.

For a deeper walkthrough of Chrome-specific issues, see our [full Chrome notification fix guide](/blog/google-calendar-notifications-not-working-chrome).

**Also check:**
- `chrome://settings/content/sound` — if calendar.google.com isn't allowed to play sound, you'll see popups but hear nothing.
- `chrome://settings/system` — enable "Continue running background apps when Google Chrome is closed." Without this, closing Chrome kills the notification listener.

### Android: Google Calendar notifications

1. Open **Settings → Apps → Google Calendar → Notifications**.
2. Confirm **"Allow notifications"** is toggled on.
3. Check individual notification categories (event reminders, etc.) and make sure they're enabled.
4. If you see "Silent" next to any category, tap it and switch to **Default** or **Alert**.

### Android: Google Tasks notifications

1. Open **Settings → Apps → Tasks → Notifications**.
2. Confirm **"Allow notifications"** is toggled on.
3. Enable all relevant categories.

### iOS: Google Calendar notifications

1. Open **Settings → Google Calendar → Notifications**.
2. Toggle **"Allow Notifications"** on.
3. Enable **Banners**, **Sounds**, and **Badges** as needed.
4. Set banner style to **Persistent** if you need alerts that stay on screen.

### iOS: Google Tasks notifications

1. Open **Settings → Google Tasks → Notifications**.
2. Toggle **"Allow Notifications"** on.
3. Enable your preferred alert style.

For more on setting default notification times and types, see our guide on [changing default notifications in Google Calendar](/blog/change-default-notification-google-calendar).

---

## Why are only some calendars silent?

**Direct answer:** Google Calendar lets you set notification defaults per calendar. If a specific calendar has notifications turned off, events on that calendar will be silent — even when everything else works.

### Web

1. Open [Google Calendar](https://calendar.google.com) → **Settings** (gear icon).
2. In the left sidebar under "Settings for my calendars," click the calendar that's not notifying.
3. Click **General notifications** or **Event notifications**.
4. Set your preferred default (e.g., "Notification — 10 minutes").

### Android / iOS

1. Open the Google Calendar app → **Settings** (gear or three-line menu → Settings).
2. Tap the specific calendar.
3. Set default notifications for events.

**Important:** Shared calendars and subscribed calendars (holidays, sports, etc.) do **not** inherit your default notification settings. You must configure notifications for each one individually.

For a broader look at notification troubleshooting across multiple scenarios, see our [notification fix roundup](/blog/google-calendar-notification-not-working-fixes).

---

## Check OS-level Focus and Do Not Disturb settings

**Direct answer:** Your operating system can silently block all notifications — even when Chrome and Google Calendar are configured correctly. Focus modes are the most commonly overlooked cause.

### Windows 11

1. Click the **date/time** in the bottom-right taskbar area.
2. If the bell icon shows a crescent moon or "Do Not Disturb" indicator, click it to disable DND.
3. Open **Settings → System → Notifications**.
4. Scroll to "Notifications from apps and other senders."
5. Find **Google Chrome** (or your browser) and confirm it's set to **On**.
6. Click into Chrome's entry and check that "Show notification banners" is enabled.

Also check **Settings → System → Focus** — Windows can automatically enable Focus during certain hours or activities.

### macOS

1. Click **Control Center** (top-right menu bar) and confirm Focus / Do Not Disturb is off.
2. Open **System Settings → Notifications → Google Chrome**.
3. Set "Allow notifications" to on. Choose **Banners** or **Alerts**.

Also check **System Settings → Focus** for any scheduled Focus modes.

### Android

1. Open **Settings → Notifications → Do Not Disturb**.
2. If DND is active, turn it off or add Google Calendar and Google Tasks as exceptions.
3. Check **Settings → Notifications → Do Not Disturb → Schedules** for automatic DND rules.

### iOS

1. Open **Settings → Focus**.
2. Check each Focus mode (Do Not Disturb, Work, Sleep, etc.).
3. Either disable the active Focus or add Google Calendar and Google Tasks to the "Allowed Apps" list for that Focus mode.

For a platform-by-platform deep dive on desktop notification issues specifically, see our [desktop notification troubleshooting guide](/blog/google-calendar-desktop-notifications-not-working).

---

## Fix sync and background issues

**Direct answer:** If your notifications arrive late rather than not at all, the problem is usually background sync. Your device needs to keep Calendar and Tasks running in the background to fire alerts on time.

### Chrome (web)

1. Go to `chrome://settings/system`.
2. Enable **"Continue running background apps when Google Chrome is closed."**
3. If notifications are still delayed, try disabling then re-enabling Chrome notifications for calendar.google.com.

### Android

1. Open **Settings → Apps → Google Calendar → Battery**.
2. Set to **Unrestricted** (not "Optimized" or "Restricted").
3. Repeat for **Google Tasks** if you use it.
4. Open **Settings → Accounts → Google → Account sync** and confirm Calendar sync is enabled.
5. To force a sync: open Google Calendar, pull down to refresh, or toggle Calendar sync off and back on.

### iOS

1. Open **Settings → General → Background App Refresh**.
2. Confirm it's enabled globally and enabled for Google Calendar and Google Tasks specifically.
3. Open **Settings → Google Calendar → Background App Refresh** and confirm it's on.

### Decision rule

> If notifications are missing entirely, it's a permissions problem (previous sections). If they're delayed, it's a sync or background problem (this section).

---

## Edge cases most guides miss

These catch the remaining 10–15% of "reminders not working" problems.

**Multiple Google accounts signed in at once.**
> If you're signed into several Google accounts, Calendar may be showing the wrong account's calendars. Check which account is active (click your profile photo, top right). Notifications only fire for the active account's calendars.

**Shared and subscribed calendars ignore your defaults.**
> When someone shares a calendar with you — or you subscribe to a public calendar like holidays — that calendar does not inherit your notification settings. You must set notifications for each subscribed calendar individually in Calendar Settings.

**All-day events use different notification settings.**
> Google Calendar has separate notification defaults for all-day events and timed events. If you only set notifications for timed events, your all-day events will be silent. Check both under Settings → [calendar name] → Event notifications and All-day event notifications.

**Ad blockers and browser extensions intercepting popups.**
> Some ad blockers (uBlock Origin, Adblock Plus) or privacy extensions can intercept notification popups. Test by opening Calendar in an incognito/private window (with extensions disabled). If notifications work there, one of your extensions is the culprit. Disable them one by one to find it.

**Google Workspace admin policies blocking notifications.**
> If you're using a work or school Google account, your Workspace admin may have disabled or restricted notifications at the organizational level. You won't see an error — notifications just won't fire. Check with your IT admin if personal-account Calendar notifications work but your work account's don't.

**Mobile app and mobile browser running at the same time.**
> If you have both the Google Calendar app and calendar.google.com open in your mobile browser, notification behavior can be unpredictable. Pick one. The app is more reliable for notifications on mobile.

---

## Prevention — never miss a calendar alert again

Once you've fixed the immediate problem, set up redundancy so a single broken link in the notification chain can't silence you again.

### Redundancy checklist

- [ ] Enable notifications in **both** Google Calendar and Google Tasks (if you use Tasks).
- [ ] Set a default notification on every calendar you own (Settings → each calendar → Event notifications).
- [ ] Enable notifications on at least two devices (phone + laptop).
- [ ] Disable battery optimization for Calendar and Tasks on Android.
- [ ] Add Calendar/Tasks to your Focus mode exceptions on iOS.
- [ ] Test your setup: create a test event 2 minutes from now and confirm the alert fires on every device.

### Add a backup notification layer

Single-app notification chains are fragile. OS updates, browser updates, and Focus mode changes can break them silently — and you won't know until you miss something.

[TimeHopper](/) runs an independent notification chain that doesn't share any links with Google's system. It monitors your upcoming Google Calendar events through its own pipeline and sends separate alerts. If Chrome's notification permission resets after an update, or your phone's DND activates unexpectedly, TimeHopper's chain keeps firing because none of its links depend on the same browser, OS, or app permissions that Google Calendar uses.

It's not a replacement for fixing the root cause. But it means one broken link in Google's chain doesn't cost you a meeting.

### Decision rule

> If you've missed a critical meeting due to notification failure, add a second, independent notification chain. Don't rely on a single app-to-OS path.

---

## FAQ

### Did Google delete my reminders?

No. Google migrated Reminders to Tasks. Your reminders still exist as tasks with their original due dates. Open [Google Tasks](https://tasks.google.com) or the Tasks app to find them. [Google's support page explains the migration.](https://support.google.com/tasks/answer/12572073)

### Can I still create reminders in Google Calendar?

As of 2025, no. The Reminders feature has been fully replaced by Tasks. You can create tasks with due dates and times that function the same way — but they live in the Tasks system.

### Why do my notifications work on my phone but not my computer?

The notification chain is different on each device. Your phone's Calendar app has its own notification permissions (OS-level), while your computer relies on browser permissions (Chrome site settings) plus OS permissions (Windows/macOS notification settings). Fix each chain independently using the sections above.

### Do these fixes apply to Brave, Edge, or Firefox?

The browser-level fixes in this guide are written for Chrome, but the concepts are the same. Brave and Edge use Chromium under the hood — their notification settings pages are similar. Firefox uses a different permission model but the same principle applies: the browser must allow calendar.google.com to send notifications. For Chrome-specific details, see our [Chrome notification fix guide](/blog/google-calendar-notifications-not-working-chrome).

### How do I test if my notifications are working?

Create a new event (or task) set to 1–2 minutes from now with a notification. Wait for it. If it fires, your setup is correct. If it doesn't, work through the fix sections above starting with Path A or Path B at the top.

---

## Sources

- [Google Tasks migration support](https://support.google.com/tasks/answer/12572073) — official Google documentation on the Reminders-to-Tasks migration.
- [Google Calendar notification settings](https://support.google.com/calendar/answer/37242) — Google's help page for configuring Calendar notifications.
- [Android Authority: Google Calendar reminders migration](https://www.androidauthority.com/google-calendar-reminders-migration-to-tasks-3580106/) — detailed coverage of the migration timeline and impact.
