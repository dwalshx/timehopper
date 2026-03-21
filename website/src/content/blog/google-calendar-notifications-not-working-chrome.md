---
title: "Google Calendar Notifications Not Working in Chrome — Fix It in 60 Seconds"
description: "Google Calendar notifications not working in Chrome? Match your symptom to a fix. Covers Calendar settings, Chrome permissions, and OS settings for Windows and Mac."
pubDate: 2026-03-18
updatedDate: 2026-03-18
slug: google-calendar-notifications-not-working-chrome
tags: ["google calendar", "notifications", "chrome", "troubleshooting"]
---

# Google Calendar Notifications Not Working in Chrome — Fix It in 60 Seconds

**Most common fix — takes 15 seconds:** Open Google Calendar, click the gear icon, go to **Settings > General > Notification settings**, and switch from **Alerts** to **Desktop notifications**. Click **Allow** on the browser prompt. Done.

Desktop notifications must pass through three independent permission gates — Google Calendar, Chrome, and your operating system — and any one of them can silently block everything.

## Why are my Google Calendar notifications not showing?

| What you see | Most likely cause | Fix |
|---|---|---|
| **No notification at all** — no popup, no sound, nothing | Calendar set to "Alerts" (shows inside the tab only) | Switch to Desktop notifications — [Fix 1](#fix-1-turn-on-desktop-notifications-in-google-calendar) |
| **Small popup inside the Calendar tab**, but nothing in your OS notification area | Chrome is blocking desktop notifications for Calendar | Allow `calendar.google.com` in Chrome — [Fix 2](#fix-2-allow-notifications-for-calendargooglecom-in-chrome) |
| **Desktop notification appears, but no sound** | Chrome sound permission is off for Calendar | Allow sound for `calendar.google.com` — [Fix 4](#fix-4-enable-sound-for-calendargooglecom) |
| **Notifications stopped after a Chrome update** | Chrome flags or site permissions reset during the update | Re-check Chrome permissions and flags — [Fix 6](#fix-6-disable-the-system-notifications-flag-in-chrome) |
| **Notifications stopped after a macOS update** | macOS reset Chrome's notification permissions | Re-enable Chrome and Chrome Helper (Alerts) — [macOS update section](#why-did-notifications-break-after-my-macos-update) |
| **Notifications work in Firefox or Edge, but not Chrome** | Chrome-specific site permission is missing | Check `chrome://settings/content/notifications` — [Fix 2](#fix-2-allow-notifications-for-calendargooglecom-in-chrome) |
| **Notifications work on one device but not another** | The non-working device has a permission gap in one of the three layers | Run through all three layers on the broken device — [Fix 1](#fix-1-turn-on-desktop-notifications-in-google-calendar), [Fix 2](#fix-2-allow-notifications-for-calendargooglecom-in-chrome), [Fix 3](#fix-3-enable-chrome-notifications-in-your-operating-system) |
| **Notifications missing for specific calendars only** | That calendar's notification default is set to None | Set a notification on the affected calendar — [Fix 5](#fix-5-check-per-calendar-and-per-event-notification-settings) |
| **Notifications worked earlier today but stopped** | Chrome's Memory Saver discarded the Calendar tab | Pin the Calendar tab or add it to Memory Saver's exception list — [Tab requirement](#does-google-calendar-need-to-be-open-for-notifications-to-work) |

## How do Google Calendar desktop notifications work?

Three gates stand between a calendar event and a desktop notification. All three must be open. No error message tells you which one closed.

**Gate 1 — Google Calendar settings.** Calendar has its own notification toggle. If it's set to "Alerts" instead of "Desktop notifications," popups appear inside the Calendar tab but never reach your desktop. This is the default for many accounts.

**Gate 2 — Chrome site permissions.** Chrome maintains a separate allow/block list for every website that requests notification access. Even if Calendar is configured for desktop notifications, Chrome can block them at the site level. This permission can reset after updates or if you clear site data.

**Gate 3 — Operating system permissions.** Windows, macOS, and Linux each have their own notification controls for every application. Chrome must be allowed to show notifications at the OS level. Quiet hours, Focus Assist, and Do Not Disturb modes all sit at this gate and can silently suppress everything.

## How do I fix Google Calendar notifications in Chrome?

Work through these seven fixes in order. They're ranked by how often each one is the actual cause — start at Fix 1.

### Fix 1: Turn on desktop notifications in Google Calendar

You'll know this is your problem if you see no notification at all — no popup, no sound, nothing on your desktop. Google Calendar has two notification modes, and the default one never leaves the browser tab.

1. Open [Google Calendar](https://calendar.google.com) in Chrome.
2. Click the **gear icon** (top right) > **Settings**.
3. Under **General**, find **Notification settings**.
4. Change the dropdown from **Alerts** to **Desktop notifications**.
5. Chrome will show a permission prompt at the top of the page — click **Allow**.

"Alerts" shows a small popup inside the Calendar tab. "Desktop notifications" sends a real notification through Chrome to your operating system. If you've been seeing nothing at all, this is likely why.

Reference: [Google Calendar notification settings](https://support.google.com/calendar/answer/37242?hl=en&co=GENIE.Platform%3DDesktop)

### Fix 2: Allow notifications for calendar.google.com in Chrome

If Calendar is set to Desktop notifications but you still see nothing, Chrome itself is blocking the request. Chrome denies notification permissions from sites by default — Calendar needs an explicit exception.

1. Open `chrome://settings/content/notifications` in your address bar.
2. Under **Allowed to send notifications**, look for `calendar.google.com`.
3. If it's not there — or if it's listed under **Not allowed** — click **Add** next to "Allowed" and enter `calendar.google.com`.

**Alternative path:** While on `calendar.google.com`, click the **lock icon** (or tune icon) in the address bar > **Site settings** > find **Notifications** > set to **Allow**.

Reference: [Chrome notification settings](https://support.google.com/chrome/answer/3220216?hl=en&co=GENIE.Platform%3DDesktop)

### Fix 3: Enable Chrome notifications in your operating system

Your OS has its own notification controls for every app. Chrome must be allowed here, and quiet-hours features must not be suppressing it.

Find your operating system below — you only need one section.

#### Windows 10

1. Open `Settings > System > Notifications & Actions`.
2. Scroll down to the app list. Find **Google Chrome** and toggle it **On**.
3. Check Focus Assist: `Settings > System > Focus Assist`. If it's set to **Priority only** or **Alarms only**, Chrome notifications will be suppressed unless Chrome is on your priority list.
4. To add Chrome to the priority list: click **Customize your priority list** > under **Apps**, click **Add an app** > select **Google Chrome**.

Reference: [Windows notification settings](https://support.microsoft.com/en-us/windows/notifications-and-do-not-disturb-in-windows-feeca47f-0baf-5680-16f0-8801db1a8466)

#### Windows 11

1. Open `Settings > System > Notifications`.
2. Ensure the master **Notifications** toggle is **On**.
3. Scroll to the app list. Find **Google Chrome** and toggle it **On**.
4. Check Do Not Disturb: click the **bell icon** in the system tray, or go to `Settings > System > Notifications` and look for **Do not disturb**. Toggle it **Off**, or add Chrome as a priority app that bypasses DND.
5. Check Focus sessions: `Settings > System > Focus`. If a Focus session is active, notifications may be suppressed.

#### macOS (Ventura / Sonoma / Sequoia)

1. Open `System Settings > Notifications`.
2. Scroll to **Google Chrome** in the app list. Click it.
3. Toggle **Allow Notifications** to **On**.
4. Set notification style to **Alerts** (not Banners) — Alerts stay on screen until you dismiss them, so you won't miss one that appears while you're away.
5. Scroll back to the app list and look for **Google Chrome Helper (Alerts)**. This is a separate entry. It also needs notifications enabled. This is the one most people miss, especially after a macOS update.
6. Check Focus / Do Not Disturb: `System Settings > Focus > Do Not Disturb`. Ensure no Focus mode is currently active.

Reference: [Apple notification settings](https://support.apple.com/guide/mac-help/change-notifications-settings-mh40583/mac)

> **Important:** macOS updates (e.g., Ventura to Sonoma, Sonoma to Sequoia) frequently reset Chrome notification permissions. If your notifications stopped after an OS update, this fix is almost certainly the one. Re-enable both **Google Chrome** and **Google Chrome Helper (Alerts)** in System Settings > Notifications. For more macOS-specific detail, see our [Google Calendar desktop notifications not working](/blog/google-calendar-desktop-notifications-not-working) guide.

### Fix 4: Enable sound for calendar.google.com

Notifications appear on your desktop but make no sound. The notification itself works — Chrome's sound permission for the Calendar site is a separate toggle.

1. Open `chrome://settings/content/siteDetails?site=https://calendar.google.com` in your address bar.
2. Find **Sound** in the permissions list.
3. Set it to **Allow**.

**Alternative path:** Open `chrome://settings/content/sound` and add `calendar.google.com` to the list of sites allowed to play sound.

Reference: [Chrome site permissions](https://support.google.com/chrome/answer/114662?hl=en&co=GENIE.Platform%3DDesktop)

### Fix 5: Check per-calendar and per-event notification settings

Global notification settings don't override individual calendar or event settings. A specific calendar can have its own notification default set to None — and you'd never know unless you check.

1. In Google Calendar, click the **gear icon** > **Settings**.
2. In the left sidebar, under **Settings for my calendars**, click each calendar name.
3. Look at **Event notifications**. If no notification is listed, click **Add notification** and set it (e.g., **10 minutes**, **Desktop notification**).

**Concrete example:** Your primary Work calendar has a 10-minute desktop notification set. But your subscribed "Holidays" calendar has notifications set to None. Events from that calendar appear on your calendar grid, but they never trigger a notification.

Individual events can also override their calendar's default. If a specific event isn't firing a notification, open the event, click the **pencil icon** to edit, and check its notification setting.

Reference: [Google Calendar notification settings](https://support.google.com/calendar/answer/37242?hl=en&co=GENIE.Platform%3DDesktop)

### Fix 6: Disable the system notifications flag in Chrome

**When to use this:** All three permission layers look correct — Calendar is set to Desktop notifications, Chrome allows notifications for `calendar.google.com`, and your OS allows Chrome to send notifications — but notifications still don't appear. This flag changes how Chrome delivers notifications, bypassing a known class of OS integration issues.

1. Open `chrome://flags/#enable-system-notifications` in your address bar.
2. Find **Enable system notifications**.
3. Set it to **Disabled**.
4. Click **Relaunch** at the bottom of the page.

This forces Chrome to use its own built-in notification system instead of delegating to your OS. It's an experimental setting — Google may change or remove it in a future Chrome update — but it resolves a significant category of "everything looks right but nothing appears" failures.

**Platform notes:**
- **Windows:** Bypasses Windows notification center integration. Notifications appear as Chrome-native popups instead.
- **macOS:** Bypasses macOS Notification Center. Useful when Chrome Helper (Alerts) permissions are not sticking after an update.
- **Linux:** Falls back from the system notification daemon (dunst, notify-osd, mako) to Chrome-native popups. Often the most impactful fix on Linux.

Reference: [Google Calendar troubleshooting](https://support.google.com/calendar/answer/12200012?hl=en)

### Fix 7: Clear cache, restart Chrome, re-sign in

A full reset. Try this after the targeted fixes above haven't resolved it.

1. Open `chrome://settings/clearBrowserData`.
2. Select **Cached images and files** (leave other options unchecked unless you want a broader reset).
3. Click **Clear data**.
4. Close **all** Chrome windows. On macOS, use **Cmd+Q** to fully quit — closing the window doesn't quit Chrome.
5. Reopen Chrome and navigate to [Google Calendar](https://calendar.google.com).
6. If notifications still don't work: sign out of your Google account, close Chrome, reopen, sign back in, and re-enable Desktop notifications (Fix 1).

## Does Google Calendar need to be open for notifications to work?

Yes. Google Calendar is a web app, not a native desktop application. Desktop notifications only fire when `calendar.google.com` is open in a Chrome tab.

> **The tab must stay open.** It doesn't need to be the active tab — a background tab works. But it must be open and not hibernated. If you close the Calendar tab or Chrome discards it to save memory, notifications stop.

Chrome's **Memory Saver** feature (previously called Tab Discarding) can put background tabs to sleep after a period of inactivity. A sleeping tab stops all JavaScript execution, which means no notifications.

**To prevent this:**
- **Pin the Calendar tab:** Right-click the tab > **Pin**. Pinned tabs are not discarded by Memory Saver.
- **Add Calendar to the always-active list:** Open `chrome://settings/performance`. Under **Memory Saver**, find "Always keep these sites active" and add `calendar.google.com`.

## Why did notifications break after my macOS update?

macOS updates — especially major version upgrades like Ventura to Sonoma or Sonoma to Sequoia — frequently reset notification permissions for third-party apps, including Chrome.

Two things to re-enable:

1. **Google Chrome** in `System Settings > Notifications > Google Chrome` > toggle **Allow Notifications** on.
2. **Google Chrome Helper (Alerts)** — a separate entry in the same notification list. This is the process Chrome uses to deliver alert-style notifications. macOS treats it as a distinct app, and its permission resets independently.

After re-enabling both, set the notification style to **Alerts** rather than **Banners**. Banners disappear automatically after a few seconds. Alerts stay on screen until you dismiss them — more reliable for calendar notifications you can't afford to miss.

If notifications still don't appear after re-enabling both entries, run through Fix 6 (the `chrome://flags` workaround) to bypass macOS Notification Center entirely.

For a deeper walkthrough of macOS-specific scenarios, see [Google Calendar desktop notifications not working](/blog/google-calendar-desktop-notifications-not-working).

## What if notifications still don't work after checking everything?

A Chrome extension, a wrong browser profile, or power-saving mode can block notifications even when all three permission layers are correct. These edge cases are rarer, but if you've verified Calendar settings, Chrome permissions, and OS permissions, one of the following is likely the cause.

### 1. A Chrome extension is blocking notifications

Ad blockers, notification managers, and productivity extensions can intercept or suppress notification permission prompts. Some block notifications outright.

**Test:** Open `chrome://settings/extensions`, disable all extensions, then test a Calendar notification. If it works, re-enable extensions one at a time to find the one responsible. Or test in a fresh Chrome profile with no extensions installed.

### 2. Wrong Chrome profile is active

Chrome notification permissions are per-profile. If you use multiple profiles (e.g., Work and Personal), notifications may be enabled in one profile but not the one you're currently using.

**Fix:** Check which profile is active (look at the profile icon in the top right of Chrome). Then verify `chrome://settings/content/notifications` in that specific profile. Each profile maintains its own allow/block list.

### 3. Battery saver or energy saver mode is throttling Chrome

Both OS-level and Chrome-level power saving modes can restrict background activity, including notification delivery.

**Chrome:** Open `chrome://settings/performance`. If **Energy Saver** is enabled, it may throttle background tab activity. Consider adding `calendar.google.com` to the always-active list.

**Windows:** Check `Settings > System > Power & battery`. If Battery Saver is on, background app activity may be limited.

**macOS:** Check the battery icon in the menu bar. If **Low Power Mode** is enabled, background processes including notifications may be delayed or suppressed.

### 4. Google Calendar is open in multiple tabs

Having Calendar open in two or more tabs can cause notification conflicts. One tab may fire the notification while the other suppresses it, or you may receive duplicate notifications followed by none.

**Fix:** Close duplicate Calendar tabs. Keep one tab open — preferably pinned.

### 5. You're using incognito or guest mode

Chrome blocks all site notification permissions in incognito windows and guest profiles. This is by design and cannot be overridden.

**Fix:** Use a regular Chrome window. There is no workaround for incognito.

### 6. Your organization's Chrome policy is overriding your settings

If your browser is managed by an employer or school, IT policies can lock notification settings. You may have the correct settings visible in Chrome, but a policy silently overrides them.

**Check:** Open `chrome://policy` in your address bar. Look for policies named `NotificationsAllowedForUrls`, `NotificationsBlockedForUrls`, or `DefaultNotificationsSetting`. If any of these exist and restrict `calendar.google.com`, contact your IT administrator — user-level settings cannot override managed policies.

Reference: [Chrome Enterprise policy documentation](https://support.google.com/chrome/a/answer/2657289?hl=en)

### 7. Multiple Google accounts signed in simultaneously

If you're signed into more than one Google account in the same Chrome profile, Calendar notifications only fire for the account whose Calendar tab is currently open.

**Fix:** Make sure the Calendar tab showing `calendar.google.com` is logged into the account whose events you need notifications for. If you need notifications for multiple accounts, open each account's Calendar in a separate Chrome profile rather than switching accounts within a single profile.

## How do I make sure this doesn't happen again?

You just spent time fixing this. Here's how to make sure you don't have to do it again.

### Harden your current setup

- [ ] **Test now:** Create a test event 2 minutes from now. Confirm the desktop notification fires. If it doesn't, work through the fixes above before relying on notifications for anything important.
- [ ] **Pin the Calendar tab** in Chrome. This prevents Memory Saver from discarding it and ensures notifications keep firing.
- [ ] **On Windows:** Add Chrome to your Do Not Disturb / Focus Assist priority list so calendar notifications bypass quiet hours.
- [ ] **On macOS:** Set Chrome's notification style to **Alerts** (not Banners) in System Settings. Alerts persist until dismissed.
- [ ] **After any OS or Chrome update:** Spend 30 seconds re-checking all three permission layers. OS updates are the most common cause of notifications silently breaking.

### Add a backup notification path

The three-gate chain — Calendar, Chrome, OS — is fragile by design. Any single gate can close without warning. A backup path means a missed gate doesn't mean a missed meeting.

- [ ] **Add an email notification as a fallback.** In Google Calendar > Settings > Event notifications, add a second notification set to **Email** (e.g., 10 minutes before). If your desktop notifications fail, you still get an email.
- [ ] **Add a separate notification surface.** Browser extensions like [TimeHopper](https://chromewebstore.google.com/detail/timehopper-calendar-clock/jckljcbopecepadagmnjbfjgojpnfkhl) display your upcoming events directly in your browser toolbar — a completely separate path that doesn't depend on Calendar's notification permission chain. Because it reads your calendar data independently, it sidesteps all three gates. If the notification chain breaks, your toolbar still shows what's next.

If your time zone is also displaying incorrectly in Calendar, that's a separate issue with its own fix path — see [How to fix wrong time zones in Google Calendar](/blog/google-calendar-time-zone-wrong-fix).

---

*[TimeHopper](https://chromewebstore.google.com/detail/timehopper-calendar-clock/jckljcbopecepadagmnjbfjgojpnfkhl) — your calendar and time zones, always visible.*
