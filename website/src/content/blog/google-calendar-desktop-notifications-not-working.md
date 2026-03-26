---
title: "Google Calendar Desktop Notifications Not Working? Fix"
description: "Three permission layers can silently block alerts — Calendar, Chrome, and your OS. Check all three in under two minutes."
pubDate: 2026-02-11
updatedDate: 2026-03-20
slug: google-calendar-desktop-notifications-not-working
tags: ["google calendar", "desktop notifications", "chrome", "mac", "windows", "troubleshooting"]
---

# Google Calendar Desktop Notifications Not Working (Chrome / Mac / Windows)

Google Calendar desktop notifications pass through three independent permission gates. Any one of them can silently block everything. No error message tells you which gate closed.

**Gate 1 — Google Calendar settings.** Calendar must be set to "Desktop notifications" (not "Alerts"). Alerts only show a popup inside the browser tab.

**Gate 2 — Chrome permissions.** Chrome maintains its own allow/block list for every site that requests notification access. Calendar needs an explicit exception.

**Gate 3 — Operating system.** macOS, Windows, and Linux each control which apps can send notifications. Focus modes, Do Not Disturb, and quiet hours all sit at this gate.

All three gates must be open. The fix is finding the one that closed.

## Why aren't my Google Calendar desktop notifications working?

One of three permission layers is blocking the notification. Calendar, Chrome, and your OS each have separate notification controls, and all three must be set to "allow." Find your symptom below.

| Symptom | Likely cause | Platform | Fix |
|---|---|---|---|
| No notification at all — nothing on your desktop | Calendar set to "Alerts" instead of "Desktop notifications" | All | [Switch to Desktop notifications](#whats-the-most-common-fix) |
| Popup appears inside the Calendar tab only | Chrome is blocking desktop notifications for calendar.google.com | All | [Allow in Chrome site settings](#whats-the-most-common-fix), then see our [Chrome troubleshooting guide](/blog/google-calendar-notifications-not-working-chrome) for deeper fixes |
| Notifications stopped after a macOS update | macOS reset Chrome's notification permissions | Mac | [Re-enable Chrome + Chrome Helper](#how-do-i-fix-notifications-on-macos) |
| Notifications stopped after enabling Focus or DND | Focus mode is suppressing Chrome notifications | Mac / Windows | [macOS Focus fix](#how-do-i-fix-notifications-on-macos) or [Windows DND fix](#how-do-i-fix-notifications-on-windows) |
| Notifications work in other browsers but not Chrome | Chrome site permission for calendar.google.com is missing or blocked | All | Chrome-specific — see our [Chrome troubleshooting guide](/blog/google-calendar-notifications-not-working-chrome) |
| Notifications stopped randomly during the day | Chrome Memory Saver discarded the Calendar tab | All | [Keep Calendar tab active](#does-google-calendar-need-to-be-open-for-notifications) |
| Notifications appear but with no sound | Chrome sound permission is off for calendar.google.com | All | Chrome-specific — see [Fix 4 in our Chrome guide](/blog/google-calendar-notifications-not-working-chrome) |

**Decision rule:** Find your symptom in the table. If none match exactly, start with the most common fix below — it resolves the majority of cases.

## What's the most common fix?

Switch from Alerts to Desktop notifications in Google Calendar settings. This is the single most frequent cause. Google Calendar defaults to "Alerts," which only show a popup inside the Calendar tab — they never reach your desktop.

1. Open [Google Calendar](https://calendar.google.com) in Chrome.
2. Click the **gear icon** (top right) > **Settings**.
3. Under **General**, click **Notification settings**.
4. Change the dropdown from **Alerts** to **Desktop notifications**.
5. Click **Allow** on the browser permission prompt.

If you already see "Desktop notifications" selected and notifications still aren't working, the problem is in Chrome or your OS. Check your platform section below — or for Chrome-specific fixes (site permissions, flags, extensions), see our detailed guide: [Google Calendar notifications not working in Chrome](/blog/google-calendar-notifications-not-working-chrome).

For more on configuring default notification settings across all your calendars, see [How to change default notifications in Google Calendar](/blog/change-default-notification-google-calendar).

Reference: [Google Calendar notification settings](https://support.google.com/calendar/answer/37242?hl=en&co=GENIE.Platform%3DDesktop)

## How do I fix notifications on macOS?

macOS requires Chrome to have notification permission AND a separate entry called Chrome Helper (Alerts) to also be enabled. Missing either one blocks desktop notifications silently.

### macOS notification checklist

1. Open **System Settings > Notifications**.
2. Scroll to **Google Chrome**. Click it.
3. Toggle **Allow Notifications** to **On**.
4. Set notification style to **Alerts** (not Banners). Alerts stay on screen until dismissed — more reliable for calendar notifications.
5. Go back to the notification list. Find **Google Chrome Helper (Alerts)**. This is a separate entry that most people miss. Enable notifications for it too.
6. Check Focus: **System Settings > Focus > Do Not Disturb**. Make sure no Focus mode is active, or add Chrome to the allowed apps list.

**Test it:** Create a calendar event 2 minutes from now with a desktop notification. Confirm it appears on your screen.

### If notifications stopped after a macOS update

macOS updates — Ventura to Sonoma, Sonoma to Sequoia — frequently reset notification permissions for Chrome. Both the Chrome and Chrome Helper (Alerts) entries need re-enabling after an OS update.

**Decision rule:** If your notifications stopped working right after a macOS update, skip everything else and re-enable both Chrome notification entries first. This resolves the issue in most post-update cases.

Reference: [Apple notification settings](https://support.apple.com/guide/mac-help/change-notifications-settings-mh40583/mac)

## How do I fix notifications on Windows?

Windows must allow Chrome to send notifications at the OS level. Do Not Disturb and Focus modes can also suppress Chrome notifications without any visible warning.

### Windows 11

1. Open **Settings > System > Notifications**.
2. Ensure the master **Notifications** toggle is **On**.
3. Scroll to the app list. Find **Google Chrome** and toggle it **On**.
4. Check Do Not Disturb: look at the **bell icon** in the system tray. If DND is active, toggle it **Off** — or add Chrome as a priority app that bypasses DND.
5. Check Focus: **Settings > System > Focus**. If a Focus session is active, notifications are suppressed.

### Windows 10

1. Open **Settings > System > Notifications & Actions**.
2. Scroll to the app list. Find **Google Chrome** and toggle it **On**.
3. Check Focus Assist: **Settings > System > Focus Assist**. If set to **Priority only** or **Alarms only**, Chrome notifications are suppressed unless Chrome is on your priority list.
4. To add Chrome to the priority list: click **Customize your priority list > Apps > Add an app > Google Chrome**.

**Edge case:** Windows activates Focus Assist automatically when you share your screen, use a full-screen app, or during scheduled quiet hours. If notifications disappear only during meetings, check Focus Assist's automatic rules in **Settings > System > Focus Assist > Automatic rules**.

**Test it:** Create a calendar event 2 minutes from now with a desktop notification. Confirm it appears on your screen.

Reference: [Windows notifications and Do Not Disturb](https://support.microsoft.com/en-us/windows/notifications-and-do-not-disturb-in-windows-feeca47f-0baf-5680-16f0-8801db1a8466)

## How do I fix notifications on Linux?

Linux desktop environments handle notification permissions differently from macOS and Windows. Chrome relies on the system's notification daemon, and most distributions ship with one enabled by default. When it breaks, the fix depends on your desktop environment.

### Ubuntu and Fedora (GNOME)

1. Open **Settings > Notifications**.
2. Find **Google Chrome** in the app list. Toggle it **On**.
3. If Chrome doesn't appear in the list, open Chrome and visit `chrome://settings/content/notifications` to trigger a test. Chrome registers with GNOME's notification system after the first notification request.
4. Check Do Not Disturb: click the clock area in the top bar. If DND is active, toggle it off.

### KDE Plasma

1. Open **System Settings > Notifications**.
2. Find **Google Chrome** under **Applications**. Ensure notifications are enabled.
3. If notifications work in other apps but not Chrome, confirm D-Bus is running: Chrome routes notifications through `org.freedesktop.Notifications` on D-Bus.

### Common Linux issues

- **Missing notification daemon.** Minimal or tiling-window-manager setups (i3, Sway, Hyprland) often don't include a notification daemon. Install `dunst`, `mako`, or `swaync` and ensure it starts at login.
- **Wayland quirks.** On Wayland, Chrome sometimes needs the `--ozone-platform=wayland` flag for full desktop integration. If notifications fail under Wayland but work under X11, add this flag to your Chrome launch command.
- **Snap or Flatpak sandboxing.** Chrome installed via Snap or Flatpak may lack the D-Bus permissions needed for notifications. Check your sandbox permissions or install Chrome from the `.deb` or `.rpm` package directly.

Reference: [Chromium Linux desktop integration](https://chromium.googlesource.com/chromium/src/+/main/docs/linux/build_instructions.md)

## Does Google Calendar need to be open for notifications?

Yes. Google Calendar is a web app, not a native desktop application. Desktop notifications only fire when `calendar.google.com` is open in a Chrome tab. The tab doesn't need to be active — a background tab works — but it must be open and not hibernated.

Chrome's **Memory Saver** feature can discard background tabs to save memory. A discarded tab stops running JavaScript, which kills notifications.

**To prevent this:**
- **Pin the Calendar tab:** Right-click the tab > **Pin**. Pinned tabs are never discarded.
- **Add Calendar to the always-active list:** Go to `chrome://settings/performance` > under Memory Saver, add `calendar.google.com` to "Always keep these sites active."

## Common mistakes that block notifications

Even after walking through all three permission gates, these mistakes catch people off guard. Each one silently blocks notifications while everything else looks correct.

### 1. Testing in incognito mode

Chrome blocks all notifications in incognito by default. The entire Notification API is disabled — there is no per-site override. If you're debugging in an incognito window, switch to a regular window first. This is the most common false negative during troubleshooting.

### 2. Forgetting Chrome Helper (Alerts) on Mac

macOS shows two separate entries for Chrome in notification settings: **Google Chrome** and **Google Chrome Helper (Alerts)**. Enabling only the first one is not enough. Chrome Helper (Alerts) is the process that actually delivers web notifications to the macOS notification center. Both entries must be enabled.

### 3. Not realizing the Calendar tab must stay open

Google Calendar has no background service, no system tray process, no daemon. Close the tab, and the notification pipeline shuts down entirely. Many people close their Calendar tab after checking their schedule and then wonder why the 2 p.m. reminder never arrived. Pin the tab or use a [backup notification path](#how-do-i-stop-this-from-happening-again).

### 4. Dismissing the Chrome permission prompt

When you switch from Alerts to Desktop notifications in Calendar settings, Chrome shows a permission prompt. If you click "Block" or dismiss the popup by clicking elsewhere, Chrome records that as a denial. Calendar won't ask again. You'll need to manually allow notifications at `chrome://settings/content/notifications` — find `calendar.google.com` in the blocked list and move it to allowed.

### 5. Running multiple Chrome profiles

Notification permissions are per-profile. If you have a personal profile and a work profile, the permissions you set in one don't carry over. Check that you're in the correct profile — the one where your Google Calendar account is signed in — and verify the notification permissions there.

## What if notifications still don't work after checking everything?

A Chrome extension or wrong browser profile can block notifications even when all three permission gates look correct. These are less common but worth checking if the standard fixes didn't help.

- **Chrome extension conflict:** Ad blockers and notification managers can intercept notification permissions. Test in a fresh Chrome profile with no extensions.
- **Wrong Chrome profile:** Notification permissions are per-profile. Check that you're in the right profile and verify permissions there.
- **Battery / energy saver:** Both OS-level and Chrome-level power saving modes can throttle background tab activity, delaying or blocking notifications.
- **Managed browser (enterprise):** If Chrome shows "Managed by your organization," IT policies may override your notification settings. Check `chrome://policy` for notification-related policies.

For detailed steps on each edge case — including Chrome flags, multiple Google accounts, and incognito mode — see [Google Calendar notifications not working in Chrome](/blog/google-calendar-notifications-not-working-chrome). For a broader set of notification fixes beyond Chrome, see [Google Calendar notification not working fixes](/blog/google-calendar-notification-not-working-fixes).

## How do I stop this from happening again?

You just fixed this. Here's how to make sure it stays fixed.

- [ ] **Test right now:** Create a test event 2 minutes from now. Confirm the desktop notification fires.
- [ ] **Pin the Calendar tab** in Chrome. This prevents Memory Saver from discarding it.
- [ ] **After any OS or Chrome update:** Re-check all three permission layers. OS updates are the most common cause of notifications silently breaking.
- [ ] **On macOS:** Set Chrome notification style to **Alerts** (not Banners). Alerts persist until dismissed.
- [ ] **On Windows:** Add Chrome to your Do Not Disturb priority list so calendar notifications bypass quiet hours.

### Add a backup notification path

The three-gate chain — Calendar, Chrome, OS — is fragile by design. Any single gate can close without warning. A backup path means a missed gate doesn't mean a missed meeting.

- **Add an email notification as a fallback.** In Google Calendar Settings > Event notifications, add a second notification set to **Email** (e.g., 10 minutes before). For more on configuring reminders and default alerts, see [Google Calendar reminders not working fix](/blog/google-calendar-reminders-not-working-fix).
- **Use a separate notification surface.** Browser extensions like [TimeHopper](https://chromewebstore.google.com/detail/timehopper-calendar-clock/jckljcbopecepadagmnjbfjgojpnfkhl) display upcoming events directly in your browser toolbar — a separate path that doesn't depend on Calendar's notification permission chain.

Reference: [Troubleshoot missing Google Calendar notifications](https://support.google.com/calendar/answer/12200012?hl=en)

## Frequently asked questions

### Do notifications work in Firefox, Edge, or Safari?

Firefox and Edge both support the Web Notifications API. Google Calendar desktop notifications work in those browsers using the same permission model — allow notifications for `calendar.google.com` within the browser and at the OS level.

Safari is different. Safari on macOS supports web push notifications as of Safari 16.4, but the implementation is less consistent for web apps like Google Calendar. If you depend on desktop notifications, Chrome or Firefox is the more predictable choice.

Reference: [MDN Web Notifications API browser compatibility](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API#browser_compatibility)

### Why do notifications work on some sites but not Google Calendar?

Each site has its own entry in Chrome's notification allow/block list. Gmail or Slack can be set to "Allow" while `calendar.google.com` is set to "Block" — or was never granted permission at all.

Check the specific entry: go to `chrome://settings/content/notifications` and search for `calendar.google.com`. If it's in the blocked list, remove it and re-allow. For a full walkthrough on Chrome site-level permissions, see [Google Calendar notifications not working in Chrome](/blog/google-calendar-notifications-not-working-chrome).

### Can I get notifications without keeping the Calendar tab open?

Not through Google Calendar's built-in notification system. Calendar relies on an active browser tab running JavaScript. Close the tab and the notification pipeline stops.

Two workarounds exist. First, install Google Calendar as a Progressive Web App: open Calendar in Chrome, click the three-dot menu, and select **Install Google Calendar**. The PWA runs in its own window and is less likely to be closed accidentally — though it still needs to be running.

Second, use a browser extension that surfaces calendar events independently. [TimeHopper](https://chromewebstore.google.com/detail/timehopper-calendar-clock/jckljcbopecepadagmnjbfjgojpnfkhl) shows upcoming events in your toolbar without requiring the Calendar tab to stay open.

### Why did notifications stop after a macOS or Windows update?

Operating system updates frequently reset app-level notification permissions. On macOS, both the Chrome and Chrome Helper (Alerts) entries can revert to "off" after a major update. On Windows, a feature update can reset the notification toggle for Chrome or re-enable Do Not Disturb with default settings.

After any OS update, re-check the OS-level notification permissions for Chrome. This is the single most common cause of notifications that "were working yesterday."

### Do notifications work in incognito mode?

No. Chrome disables the Notification API entirely in incognito mode. There is no setting to override this — it is a hard restriction built into Chrome's privacy model.

If you use incognito for day-to-day browsing, any Calendar tab opened there will never send desktop notifications. Keep Calendar in a regular window.

Reference: [Chrome incognito mode](https://support.google.com/chrome/answer/7440301?hl=en)

## Sources

- Reference: [Google Calendar notification settings](https://support.google.com/calendar/answer/37242?hl=en&co=GENIE.Platform%3DDesktop)
- Reference: [Troubleshoot missing Google Calendar notifications](https://support.google.com/calendar/answer/12200012?hl=en)
- Reference: [Apple notification settings — macOS](https://support.apple.com/guide/mac-help/change-notifications-settings-mh40583/mac)
- Reference: [Windows notifications and Do Not Disturb](https://support.microsoft.com/en-us/windows/notifications-and-do-not-disturb-in-windows-feeca47f-0baf-5680-16f0-8801db1a8466)
- Reference: [MDN Web Notifications API](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API)
- Reference: [Chrome incognito mode](https://support.google.com/chrome/answer/7440301?hl=en)
- Reference: [Chromium Linux desktop integration](https://chromium.googlesource.com/chromium/src/+/main/docs/linux/build_instructions.md)
