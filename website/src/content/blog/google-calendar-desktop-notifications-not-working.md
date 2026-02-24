---
title: "Google Calendar Desktop Notifications Not Working (Chrome / Mac / Windows)"
description: "Desktop notifications can fail due to Chrome permissions, OS focus modes, and background restrictions. Here’s a platform-by-platform fix guide."
pubDate: 2026-02-11
updatedDate: 2026-02-11
slug: google-calendar-desktop-notifications-not-working
tags: ["google calendar", "desktop notifications", "chrome", "mac", "windows"]
sources:
  - chrome_notifications_desktop
  - apple_macos_notifications_settings
  - windows_notifications_and_dnd
  - apple_macos_focus_set_up
---

# Google Calendar Desktop Notifications Not Working (Chrome / Mac / Windows)

**Direct answer:** If Google Calendar desktop notifications aren’t working, the fix is usually: **(1) allow notifications in [Chrome](https://support.google.com/chrome/answer/3220216)**, **(2) allow Chrome notifications in your OS**, and **(3) ensure Focus/Do Not Disturb isn’t silencing them**.

---

## Step 1: Confirm Chrome can show notifications (all platforms)
**Direct answer:** If Chrome notifications are blocked, nothing else matters.

- [Chrome Settings](https://support.google.com/chrome/answer/3220216) → Site settings → Notifications
- Allow notifications and ensure calendar.google.com isn’t blocked

---

## macOS checklist
1. System Settings → Notifications → Google Chrome → [Allow notifications](https://support.apple.com/guide/mac-help/notifications-settings-mh40583/mac)
2. System Settings → [Focus](https://support.apple.com/guide/mac-help/set-up-a-focus-to-stay-on-task-mchl613dc43f/mac) → allow Chrome (or disable Focus)
3. Test with a new event + 1-minute alert

---

## Windows checklist
1. Windows Settings → System → [Notifications](https://support.microsoft.com/en-us/windows/notifications-and-do-not-disturb-in-windows-feeca47f-0baf-5680-16f0-8801db1a8466) → Google Chrome On
2. [Focus assist](https://support.microsoft.com/en-gb/windows/make-it-easier-to-focus-on-tasks-0d259fd9-e9d0-702c-c027-007f0e78eaf2) off (or allow Chrome)
3. Confirm calendar.google.com site permissions in Chrome
