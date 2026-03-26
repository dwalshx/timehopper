---
title: "Google Calendar Notification Not Working? 6 Fixes by Platform"
description: "Notifications silent on desktop, email, or mobile? Pinpoint which alert type broke and follow the platform-specific fix to restore them fast."
pubDate: 2026-02-11
updatedDate: 2026-03-20
slug: google-calendar-notification-not-working-fixes
tags: ["google calendar", "notifications", "troubleshooting", "meeting alerts", "calendar fixes"]
---

# Google Calendar Notification Not Working? Here's How to Fix It

Google Calendar notifications break when browser permissions, OS settings, or app configurations block them. The fix depends on which notification type stopped working and which platform you're on. Use the diagnostic table below to find your problem, then jump to the right section.

## Which notification type is broken?

| Symptom | Likely cause | Jump to |
|---|---|---|
| **No desktop popup at all** | Calendar set to "Alerts" instead of "Desktop notifications," or Chrome/OS permissions are blocking | [Desktop fixes](#fix-desktop-notifications) |
| **Desktop popup appears but no sound** | Chrome sound permission off for `calendar.google.com` | [Desktop fixes](#fix-desktop-notifications) |
| **No notification on Android** | App notification channel disabled or battery optimization killing Calendar | [Android fixes](#fix-android-notifications) |
| **No notification on iPhone/iPad** | iOS notification permission off or Background App Refresh disabled | [iOS fixes](#fix-ios-notifications) |
| **No email notification** | Email notifications not set, or emails going to spam | [Email fixes](#fix-email-notifications) |
| **Notifications work for some events but not others** | Per-calendar or per-event overrides | [Per-calendar settings](#check-per-calendar-and-per-event-settings) |
| **Notifications stopped after an update** | OS or browser update reset permissions | [Edge cases](#edge-cases-and-less-obvious-causes) |
| **Everything looks right but nothing fires** | Extension conflict, multiple accounts, or power-saving mode | [Edge cases](#edge-cases-and-less-obvious-causes) |

---

## Quick fixes (try these first)

Before diving into platform-specific sections, check these three things. They account for most broken notifications across all platforms.

**1. Verify the event actually has a notification set.**
Open the event, click Edit, and check whether a notification exists. Per-event settings override everything. If the notification field is blank, no alert fires regardless of your global defaults.

**2. Confirm you're signed into the correct Google account.**
If you use multiple Google accounts, Calendar shows events for whichever account is active. Notification settings are per-account. The wrong account means the wrong settings.

**3. Check Focus mode / Do Not Disturb.**
Every major platform — Windows, macOS, Android, iOS — has a quiet mode that silently suppresses notifications. These modes are the single most common reason notifications "stop working" without any settings changing. Turn off DND, test, then re-enable with Calendar whitelisted.

---

## Fix desktop notifications

Desktop notifications must pass through three independent permission gates: Google Calendar's own settings, your browser, and your operating system. All three must be open. No error message tells you which one closed.

For a deep dive into Chrome-specific fixes, see our [full Chrome notification troubleshooting guide](/blog/google-calendar-notifications-not-working-chrome).

### Gate 1: Google Calendar settings

Google Calendar has two notification modes. The default — "Alerts" — shows a small popup inside the Calendar browser tab. It never reaches your desktop.

1. Open [Google Calendar](https://calendar.google.com).
2. Click the **gear icon** (top right) > **Settings**.
3. Under **General**, find **Notification settings**.
4. Change the dropdown from **Alerts** to **Desktop notifications**.
5. Your browser will show a permission prompt. Click **Allow**.

If you want to change the default reminder time (e.g., 10 minutes vs. 30 minutes), that's a separate setting. See [how to change default notifications in Google Calendar](/blog/change-default-notification-google-calendar).

Reference: [Google Calendar notification settings](https://support.google.com/calendar/answer/37242?hl=en&co=GENIE.Platform%3DDesktop)

### Gate 2: Browser permissions

Even with Calendar set to "Desktop notifications," your browser can block the request at the site level.

**Chrome:**
1. Open `chrome://settings/content/notifications`.
2. Under **Allowed to send notifications**, look for `calendar.google.com`.
3. If it's missing or listed under **Not allowed**, add it to the allowed list.

**Alternative:** While on `calendar.google.com`, click the lock icon (or tune icon) in the address bar > **Site settings** > **Notifications** > set to **Allow**.

**Firefox:** Open `about:preferences#privacy`, scroll to **Permissions** > **Notifications** > **Settings**, and ensure `calendar.google.com` is set to Allow.

**Edge:** Open `edge://settings/content/notifications` and follow the same steps as Chrome.

Reference: [Chrome notification settings](https://support.google.com/chrome/answer/3220216?hl=en&co=GENIE.Platform%3DDesktop)

### Gate 3: Operating system permissions

Your OS has its own notification controls for every application. The browser must be allowed here.

**Windows 10/11:**
1. Open **Settings > System > Notifications**.
2. Find **Google Chrome** (or your browser) and toggle it **On**.
3. Check **Do Not Disturb / Focus Assist**. If active, add Chrome to the priority list so calendar notifications bypass quiet hours.

**macOS (Ventura / Sonoma / Sequoia):**
1. Open **System Settings > Notifications**.
2. Find **Google Chrome**. Toggle **Allow Notifications** on.
3. Also enable notifications for **Google Chrome Helper (Alerts)** — a separate entry that macOS treats as a distinct app. This is the one most people miss.
4. Set notification style to **Alerts** (not Banners). Alerts persist until dismissed.

macOS updates frequently reset these permissions. If your notifications stopped after an update, re-enable both Chrome entries. For the full macOS walkthrough, see [Google Calendar desktop notifications not working](/blog/google-calendar-desktop-notifications-not-working).

**Linux:**
Check your notification daemon (dunst, mako, notify-osd) and ensure Chrome is not filtered out. If system notifications are unreliable, open `chrome://flags/#enable-system-notifications` and set it to **Disabled** to use Chrome's built-in notification system instead.

Reference: [Windows notification settings](https://support.microsoft.com/en-us/windows/notifications-and-do-not-disturb-in-windows-feeca47f-0baf-5680-16f0-8801db1a8466)

### The tab must stay open

Google Calendar is a web app. Desktop notifications only fire when `calendar.google.com` is open in a browser tab. The tab doesn't need to be active — a background tab works — but it must be open and not hibernated.

Chrome's **Memory Saver** feature puts background tabs to sleep after inactivity. A sleeping tab stops all JavaScript, which stops all notifications.

**To prevent this:**
- **Pin the Calendar tab.** Right-click the tab > Pin. Pinned tabs are not discarded.
- **Add Calendar to the always-active list.** Open `chrome://settings/performance` > under Memory Saver, add `calendar.google.com` to "Always keep these sites active."

---

## Fix Android notifications

Android notifications for Google Calendar are handled entirely by the Google Calendar app — browser settings don't apply here.

**Step 1: Check app notification permissions.**
Open **Settings > Apps > Google Calendar > Notifications**. Ensure notifications are toggled on. Check each notification channel (Event notifications, Reminders, etc.) individually — Android lets you disable specific channels while leaving others on.

**Step 2: Disable battery optimization for Calendar.**
Open **Settings > Apps > Google Calendar > Battery** and set it to **Unrestricted**. Android's Adaptive Battery and Doze mode can delay or suppress Calendar notifications when the phone is idle.

**Step 3: Check Do Not Disturb.**
Open **Settings > Sound > Do Not Disturb**. If active, add Google Calendar to the exceptions list.

**Step 4: Check sync.**
Open **Settings > Accounts > Google > [your account] > Account sync**. Ensure **Google Calendar** sync is toggled on. If sync is off, the app doesn't know about new or changed events.

Reference: [Google Calendar app notifications](https://support.google.com/calendar/answer/37242?hl=en&co=GENIE.Platform%3DAndroid)

---

## Fix iOS notifications

On iPhone and iPad, Google Calendar notifications come from the Google Calendar app — not the built-in Apple Calendar (unless you've synced your Google account there).

**Step 1: Enable notification permissions.**
Open **Settings > Google Calendar > Notifications**. Toggle **Allow Notifications** on. Enable Sounds, Badges, and Banners as needed.

**Step 2: Enable Background App Refresh.**
Open **Settings > General > Background App Refresh**. Ensure **Google Calendar** is toggled on. If Background App Refresh is disabled globally at the top of that screen, no app can refresh in the background.

**Step 3: Check Focus modes.**
Open **Settings > Focus**. If any Focus mode is active, check its **Allowed Apps** list. Add Google Calendar if it's not there.

**Step 4: Check in-app notification settings.**
Open the Google Calendar app > **Settings** > **General** > **Notifications on this device**. Ensure notifications are enabled at the app level.

Reference: [Apple notification settings](https://support.apple.com/en-us/105065)

---

## Fix email notifications

Email notifications are a separate system from desktop or mobile push notifications. They're sent by Google's servers, not by your browser or phone.

**Step 1: Check Calendar notification settings.**
In Google Calendar (web), click **Settings** > click a calendar under **Settings for my calendars** > under **Event notifications**, add a notification set to **Email** with your preferred lead time.

**Step 2: Check spam and filters.**
Google Calendar emails come from `calendar-notification@google.com`. Check your Spam folder. Also check **Settings > Filters and Blocked Addresses** in Gmail to ensure no filter is archiving or deleting calendar emails.

**Step 3: Check notification limits.**
Google rate-limits email notifications. If you have hundreds of events per day, some notifications may be suppressed. This primarily affects shared calendars in large organizations.

Reference: [Google Calendar email notifications](https://support.google.com/calendar/answer/37242?hl=en)

---

## Check per-calendar and per-event settings

Global notification defaults don't override individual calendar or event settings. This is one of the most misunderstood aspects of Google Calendar notifications.

**Per-calendar defaults:**
1. In Google Calendar, click **Settings** (gear icon) > **Settings**.
2. In the left sidebar under **Settings for my calendars**, click each calendar name.
3. Check **Event notifications**. If no notification is listed, events from that calendar fire silently.

**Example:** Your primary calendar has a 10-minute desktop notification. Your "Holidays" calendar has notifications set to None. Holiday events appear on your grid but never trigger a notification.

**Per-event overrides:**
Individual events can override their calendar's default. If a specific event isn't firing a notification, open the event, click Edit, and check its notification field. Someone who created or shared the event may have set it to no notification.

**Shared calendars:**
Calendars shared by other people use their own notification defaults, which are often set to None. You need to configure notifications on shared calendars explicitly in your own settings.

For related issues with reminders (as distinct from event notifications), see [Google Calendar reminders not working](/blog/google-calendar-reminders-not-working-fix).

---

## Edge cases and less obvious causes

If the standard fixes didn't resolve it, one of these less obvious causes is likely responsible.

### Chrome extension conflicts

Ad blockers, notification managers, and productivity extensions can intercept or suppress notification prompts. **Test:** Disable all extensions at `chrome://settings/extensions`, then test a Calendar notification. If it works, re-enable extensions one at a time to find the culprit.

### Wrong browser profile

Chrome notification permissions are per-profile. If you use multiple profiles (Work and Personal), notifications may be enabled in one but not the one you're currently using. Check which profile is active, then verify permissions in that specific profile.

### Battery saver or power-saving mode

Both OS-level and browser-level power saving can throttle background activity. Chrome's **Energy Saver** (in `chrome://settings/performance`) may delay background tab activity. On laptops, OS battery-saver modes can do the same.

### Multiple Calendar tabs open

Having Calendar open in two or more tabs can cause notification conflicts. Close duplicate tabs and keep one — preferably pinned.

### Incognito or guest mode

Chrome blocks all site notification permissions in incognito windows and guest profiles. This is by design. Use a regular browser window.

### Organization-managed Chrome policies

If your browser is managed by an employer or school, IT policies can lock notification settings. Open `chrome://policy` and look for `NotificationsAllowedForUrls`, `NotificationsBlockedForUrls`, or `DefaultNotificationsSetting`. If any restrict `calendar.google.com`, contact your IT admin — user-level settings cannot override managed policies.

### Multiple Google accounts

Calendar notifications only fire for the account whose Calendar tab is open. If you're signed into multiple accounts, ensure the correct one is active. For notifications across multiple accounts, use separate browser profiles.

### Time zone mismatches

If your notification fires at the wrong time, the issue may be a time zone mismatch rather than a notification failure. An event at 3:00 PM Eastern notifies at 3:00 PM Eastern — if you're in Pacific time and expected a noon alert, the notification worked but felt "late." See [how to fix wrong time zones in Google Calendar](/blog/google-calendar-time-zone-wrong-fix).

Reference: [Chrome Enterprise policy documentation](https://support.google.com/chrome/a/answer/2657289?hl=en)

---

## Common mistakes

These are the errors people make most often when troubleshooting Calendar notifications. Avoiding them saves significant time.

**1. Setting notifications on the wrong calendar.**
You configure a 10-minute notification, test it on your primary calendar, and it works. But the event you keep missing is on a shared or secondary calendar that still has no notification default. Always check which calendar the event belongs to before assuming notifications are broken globally.

**2. Confusing "Alerts" with "Desktop notifications."**
Google Calendar's "Alerts" mode shows a popup inside the Calendar tab. If the tab isn't visible, you see nothing. "Desktop notifications" sends alerts through your browser to your OS. Many people think they've enabled desktop notifications when they've actually left it on Alerts.

**3. Fixing one permission gate and stopping.**
Desktop notifications require three gates: Calendar settings, browser permissions, and OS permissions. Fixing one and assuming the problem is solved is the most common troubleshooting mistake. All three must be open simultaneously.

**4. Assuming mobile and desktop share settings.**
Notification settings on the Google Calendar Android or iOS app are independent of your browser notification settings. Fixing desktop notifications does not fix mobile, and vice versa.

**5. Forgetting to test after fixing.**
The only way to confirm a fix worked is to create a test event 2 minutes in the future and wait for the notification. Skipping this step means you discover the fix didn't work when you miss a real meeting.

---

## How to prevent notifications from breaking again

You just spent time fixing this. Here's how to avoid repeating it.

### Harden your setup

- **Pin the Calendar tab** in Chrome. This prevents Memory Saver from discarding it and ensures desktop notifications keep firing.
- **On Windows:** Add Chrome to your Do Not Disturb priority list so calendar notifications bypass quiet hours.
- **On macOS:** Set Chrome's notification style to **Alerts** (not Banners) in System Settings. Alerts persist until dismissed.
- **After any OS or browser update:** Spend 30 seconds re-checking all three desktop permission layers. OS updates are the most common cause of notifications silently breaking.
- **Test regularly.** Create a quick test event after any system update or settings change. Two minutes of testing prevents hours of missed meetings.

### Add a backup notification path

The multi-gate notification chain — whether desktop, mobile, or email — is fragile. Any single failure point silences everything downstream. A backup path means a broken gate doesn't mean a missed meeting.

**Use email as a fallback.** In Google Calendar > Settings > Event notifications, add a second notification set to **Email**. If your primary notification channel fails, you still get an email.

**Add a separate notification surface.** Browser extensions like [TimeHopper](https://chromewebstore.google.com/detail/timehopper-calendar-clock/jckljcbopecepadagmnjbfjgojpnfkhl) display upcoming events directly in your browser toolbar — an independent path that doesn't rely on Calendar's permission chain. It reads your calendar data separately, sidestepping the three-gate problem entirely.

---

## Frequently asked questions

### Why do my notifications work for some events but not others?

Per-calendar and per-event notification settings override your global defaults. If notifications work on your primary calendar but not a shared or secondary one, that calendar likely has its own notification default set to None. Open Settings > click the calendar name > check Event notifications. Individual events can also override the calendar default — someone who created or forwarded the event may have removed the notification.

### Do notification settings sync across devices?

Partially. Your Google Calendar notification defaults sync across devices through your Google account. But browser permissions, OS permissions, and mobile app settings are local to each device. Fixing notifications on your laptop does not fix them on your phone. Each device has its own permission stack.

### Can my Workspace admin disable notifications?

Yes. Google Workspace administrators can control notification behavior through admin console policies. They can also push Chrome browser policies that block or allow notifications for specific sites. If you're on a managed account and `chrome://policy` shows notification-related policies, your admin has restricted this. Contact your IT department — there's no user-level workaround for admin-enforced policies.

### Why did my notifications stop after a Chrome update?

Chrome updates occasionally reset site permissions, including notification permissions for `calendar.google.com`. The update may also reset Chrome flags (like `#enable-system-notifications`) to defaults. After a Chrome update, verify `calendar.google.com` is still in your allowed list at `chrome://settings/content/notifications`. For the full Chrome-specific process, see [Google Calendar notifications not working in Chrome](/blog/google-calendar-notifications-not-working-chrome).

### What's the difference between Google Calendar reminders and notifications?

Notifications are tied to calendar events — meetings, appointments, time blocks. Reminders are standalone to-do items that appear on your calendar but use a different notification system internally. Fixing one doesn't fix the other. If your reminders specifically are missing, see [Google Calendar reminders not working](/blog/google-calendar-reminders-not-working-fix).

---

## Sources

- Reference: [Google Calendar notification settings](https://support.google.com/calendar/answer/37242?hl=en)
- Reference: [Chrome notification settings](https://support.google.com/chrome/answer/3220216?hl=en)
- Reference: [Windows notification settings](https://support.microsoft.com/en-us/windows/notifications-and-do-not-disturb-in-windows-feeca47f-0baf-5680-16f0-8801db1a8466)
- Reference: [Apple notification settings](https://support.apple.com/guide/mac-help/change-notifications-settings-mh40583/mac)
- Reference: [Chrome Enterprise policy documentation](https://support.google.com/chrome/a/answer/2657289?hl=en)
- Reference: [Google Calendar troubleshooting](https://support.google.com/calendar/answer/12200012?hl=en)

---

*[TimeHopper](https://chromewebstore.google.com/detail/timehopper-calendar-clock/jckljcbopecepadagmnjbfjgojpnfkhl) — your calendar and time zones, always visible.*
