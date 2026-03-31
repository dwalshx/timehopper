---
title: "Google Calendar Notifications Not Working in Chrome? Fix This Checklist"
description: "Restore missing Google Calendar desktop alerts in Chrome. Symptom-based diagnosis, platform-specific fixes for Windows and macOS, and a redundancy plan to never miss a meeting."
pubDate: 2026-03-17
updatedDate: 2026-03-17
slug: google-calendar-notifications-not-working-chrome
tags: ["google calendar", "notifications", "chrome", "troubleshooting"]
sources:
  - google_calendar_troubleshoot_notifications
  - google_calendar_change_notifications
  - chrome_notifications_desktop
  - windows_notification_settings
  - macos_notification_settings
---

# Google Calendar Notifications Not Working in Chrome? Fix This Checklist

**Direct answer:** Missing Google Calendar alerts in Chrome almost always come down to one of three breaks in the notification chain: **Chrome is blocking calendar.google.com from sending notifications**, **your OS Focus or Do Not Disturb mode is silencing them**, or **Google Calendar's own notification setting is toggled off**. Fix those three in order and most people are done in under two minutes.

> **30-Second Quick Fix (Most Common Cause)**
> 1. Open Chrome → paste `chrome://settings/content/notifications` in the address bar
> 2. Under "Allowed to send notifications," look for `https://calendar.google.com:443`
> 3. If it's not there (or it's under "Not allowed"), click **Add** and enter `calendar.google.com`
>
> Restart Chrome. If your notifications are back, you're done.

---

### Symptom→Cause→Fix: Find Your Specific Problem

*These fixes are for Google Chrome. Using Brave or Edge? See the [FAQ below](#do-these-fixes-work-for-brave-or-edge).*

| Symptom | Likely Cause | Fix Path |
| :--- | :--- | :--- |
| No alerts appearing at all | Chrome site permissions blocking calendar.google.com | `chrome://settings/content/notifications` → Add to "Allowed" list |
| Banners appear in Action Center / Notification Center but don't pop up on screen | OS Focus / Do Not Disturb mode is active | Windows: Settings → System → Notifications → turn off DND. Mac: Control Center → turn off Focus |
| Alerts work on phone but not on desktop | Google Calendar internal notification set to "Off" or "Alerts" instead of "Desktop notifications" | Calendar Settings → General → Notification settings → select "Desktop notifications" |
| Alerts are delayed or intermittent | Chrome background apps disabled — closing Chrome kills the listener | `chrome://settings/system` → enable "Continue running background apps when Google Chrome is closed" |
| Only some calendars are silent | Per-calendar notification settings are off for that specific calendar | Calendar Settings → click the silent calendar → Notifications → set to "Desktop notifications" |

---

## Why are my Google Calendar notifications not showing in Chrome?

**Direct answer:** *Three things must all be working: Chrome site permissions, your OS notification settings, and Google Calendar's own notification toggle. If any one of these is off, your alerts stay silent.* The sections below fix each one in order.

---

## How do I fix Chrome notification permissions for Google Calendar?

**Direct answer:** Navigate to `chrome://settings/content/notifications` and verify that `calendar.google.com` is on the "Allowed" list. This is the single most common cause of missing notifications.

### Checklist: Chrome Site Permissions

1. Open Chrome and paste `chrome://settings/content/notifications` into the address bar.
2. Scroll to **"Allowed to send notifications."**
3. Look for `https://calendar.google.com:443`.
4. **If it's missing or under "Not allowed":** Click the three-dot menu → **Allow**, or click **Add** and type `calendar.google.com`.
5. Restart Chrome to apply the change.

**Optional — Enable notification sounds:**
Navigate to `chrome://settings/content/sound`. If `calendar.google.com` is not under "Allowed to play sound," add it. Without this, you may see popup banners but hear no sound.

**Optional — Force native notifications (advanced):**
If notifications feel inconsistent, try navigating to `chrome://flags/#enable-native-notifications` and setting it to **Enabled**. This forces Chrome to use your OS's native notification system rather than its own built-in one. Note: flags are experimental and may change between Chrome versions.

---

## How do I check OS notification and Focus settings?

**Direct answer:** Even if Chrome has the right permissions, your operating system can silently block notifications through Focus modes (Windows) or Do Not Disturb (macOS). You need to check both the global Focus toggle and Chrome's individual notification permissions at the OS level.

### If you're on Windows 11:
1. Click the **date/time** area in the bottom-right corner of your taskbar.
2. Look for the **bell icon** — if it shows a "Do Not Disturb" indicator, click it to turn DND off.
3. Open **Settings → System → Notifications**.
4. Scroll down to "Notifications from apps and other senders."
5. Find **Google Chrome** and ensure it's set to **On**.
6. Click into Chrome's notification settings and confirm "Show notification banners" is checked.

### If you're on Windows 10:
1. Open **Settings → System → Focus Assist**.
2. If set to "Priority only" or "Alarms only," either turn it off or add Chrome to your priority list.
3. Navigate to **Settings → System → Notifications & actions**.
4. Find **Google Chrome** in the sender list and toggle it to **On**.

### If you're on macOS:
1. Open **System Settings → Notifications** (on Ventura or later) or **System Preferences → Notifications** (Monterey or older).
2. Find **Google Chrome** in the app list. Ensure notifications are set to **Banners** or **Alerts** (not "None").
3. **Critical step:** Also find **"Google Chrome Helper (Alerts)"** in the same list. This is a separate entry and must also have notifications enabled. Missing this is one of the most common macOS-specific causes of silent notifications.
4. Check that **Do Not Disturb** / **Focus** is turned off in Control Center (click the Control Center icon in the menu bar).

> **Why the macOS "Chrome Helper" step matters:** Chrome uses a separate helper process to deliver notifications. macOS treats it as a different app, so even if Chrome itself has notification permission, the helper process may not. Both must be enabled.

---

## How do I enable Desktop Notifications inside Google Calendar?

**Direct answer:** Google Calendar has its own notification toggle that's separate from Chrome and your OS. If this is set to "Off" or "Alerts" (the old-style browser popups), you won't get desktop-style notifications even if Chrome and your OS are configured correctly.

1. Open [Google Calendar](https://calendar.google.com) in Chrome.
2. Click the **gear icon** (top right) → **Settings**.
3. In the left sidebar, go to **General → Notification settings**.
4. Under "Notifications," select **"Desktop notifications"** (not "Alerts" or "Off").
5. Optionally check **"Play notification sounds"** for an audible cue.

### Per-calendar notification settings

If notifications work for most calendars but one is silent, the issue is likely at the individual calendar level — not the global toggle:

1. In Calendar Settings, scroll down in the left sidebar to the **specific calendar** that's silent.
2. Click on it, then find **"Other notifications"** or **"Event notifications."**
3. Ensure notifications are set (not "None") and that the timing is correct (e.g., "10 minutes before").

This distinction trips people up — global notification settings control the delivery method (desktop vs. alerts), but individual calendar settings control *whether* that calendar sends notifications at all.

---

## What common mistakes cause Chrome calendar notifications to fail?

**Direct answer:** Beyond the three main settings (Chrome permissions, OS settings, Calendar toggle), several "invisible" blockers can silently prevent notifications from appearing. These are the edge cases that most troubleshooting guides skip.

### 7 Common Mistakes and How to Fix Them

1. **Extension interference**
   - **Why it fails:** Privacy-focused extensions (uBlock Origin, Privacy Badger, "Quiet Mode" extensions) sometimes classify notification popups as intrusive ads and block them.
   - **Fix:** Temporarily disable extensions one by one to isolate the culprit. Or add `calendar.google.com` to the extension's whitelist.

2. **Wrong Google account is active**
   - **Why it fails:** If you're signed into multiple Google accounts, notifications route to whichever account owns the calendar. If your "active" Chrome profile doesn't match, alerts may appear in a different browser window — or not at all.
   - **Fix:** Click your profile photo in Google Calendar and verify you're on the correct account. Consider using separate Chrome profiles for separate Google accounts.

3. **Chrome background apps disabled**
   - **Why it fails:** When you close the last Chrome window, Chrome stops listening for notification events. No listener = no alerts.
   - **Fix:** Go to `chrome://settings/system` → enable **"Continue running background apps when Google Chrome is closed."**

4. **Per-calendar notifications turned off**
   - **Why it fails:** You enabled desktop notifications globally but one specific calendar (e.g., a shared team calendar) has its own notification setting set to "None."
   - **Fix:** In Calendar Settings, check the individual calendar's notification settings (see section above).

5. **macOS Chrome Helper (Alerts) not enabled**
   - **Why it fails:** macOS treats Chrome's notification helper as a separate application. Chrome itself can have notification permission while the helper doesn't.
   - **Fix:** System Settings → Notifications → enable notifications for both "Google Chrome" AND "Google Chrome Helper (Alerts)."

6. **Managed or enterprise Chrome profile**
   - **Why it fails:** If your Chrome is managed by your organization (look for "Managed by your organization" at the top of `chrome://settings`), your IT admin may have disabled notification permissions via policy.
   - **Fix:** Contact your IT department. You cannot override managed policies locally.

7. **Using Brave, Edge, or another Chromium browser**
   - **Why it fails:** Brave and Edge share Chrome's Chromium base but use different internal URLs. `chrome://settings` won't work — use `brave://settings` or `edge://settings` instead. Brave's built-in shields may also block notification requests by default.
   - **Fix:** Use the browser-specific settings URL and check the browser's built-in privacy/shield settings separately.

---

## How do I set up a notification redundancy plan?

**Direct answer:** When a team member's desktop notifications break — and at some point they will — the damage depends on whether they have a backup layer running. A single notification channel is a single point of failure. A redundancy plan uses multiple layers so no single break means a missed meeting.

### Notification Redundancy Stack

| Layer | How It Works | Weak Point | Setup Check |
| :--- | :--- | :--- | :--- |
| **Chrome desktop popup** | Browser pushes a banner when Calendar fires an event alert | Hidden behind windows; breaks if any of the above settings are wrong | Verify monthly: `chrome://settings/content/notifications` |
| **Mobile app push** | Google Calendar app uses APNs (iOS) or FCM (Android) — bypasses browser entirely | Phone on silent, battery saver may delay | Ensure "Banner" alerts and sounds are on in phone Calendar settings |
| **Sidebar extension** | A persistent browser panel showing your upcoming agenda — no popup needed because the agenda is always visible | Only active when the browser is open | Pin the extension so it stays visible |

A browser sidebar extension like [TimeHopper](https://timehopperapp.com) keeps your next meeting and countdown visible at all times — no popup required, nothing to dismiss. It doesn't fix broken notification settings, but it means broken notifications don't have to mean a missed meeting.

For teams, consider establishing all three layers as a standard onboarding step. When someone's notifications inevitably break, the other layers buy time while they troubleshoot.

---

## FAQ

### Why do alerts work on my phone but not my computer?

**Direct answer:** Mobile devices use a completely different notification delivery system. The Google Calendar app on your phone communicates directly with Google's push notification service (APNs on iPhone, FCM on Android) — it never touches Chrome. So a working phone notification tells you the calendar event is set up correctly, and the problem is specifically in your Chrome or OS settings.

### Do I need to keep the Google Calendar tab open for notifications?

**Direct answer:** By default, yes — Calendar needs an open tab (even minimized) to listen for events. However, if you enable "Continue running background apps when Google Chrome is closed" at `chrome://settings/system`, Chrome can maintain the notification listener even after you close the tab. A sidebar extension is another option, as it maintains a persistent connection.

### Do these fixes work for Brave or Edge?

**Direct answer:** Mostly, yes. Brave and Edge are Chromium-based and share the same notification architecture. The key difference is the settings URL — replace `chrome://` with `brave://` or `edge://`. Brave users should also check Brave Shields, which may block notification requests by default. Edge users should verify that Windows notification settings include "Microsoft Edge" as an allowed sender.

---

## Sources

- [Troubleshoot missing Google Calendar notifications](https://support.google.com/calendar/answer/12200012) — Google Calendar Help
- [Change Google Calendar notifications](https://support.google.com/calendar/answer/37242) — Google Calendar Help
- [Use notifications to get alerts](https://support.google.com/chrome/answer/3220216) — Chrome Help
- [Change notification settings in Windows](https://support.microsoft.com/en-us/windows/change-notification-settings-in-windows) — Microsoft Support
- [Change Notifications settings on Mac](https://support.apple.com/guide/mac-help/change-notifications-settings-mh40583/mac) — Apple Support

---

*Need a backup plan for unreliable notifications?* [TimeHopper](https://timehopperapp.com) keeps your next meeting visible in your browser sidebar — no popups required. [Add to Chrome — Free](https://chromewebstore.google.com/detail/timehopper).

For more notification troubleshooting, see our guides on [Desktop Notification Fixes](/blog/google-calendar-desktop-notifications-not-working.html) and [Choosing the Right Chrome Extension](/blog/google-calendar-extension-what-to-look-for.html).
