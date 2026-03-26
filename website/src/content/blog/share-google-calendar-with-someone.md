---
title: "Share Google Calendar Safely: Permission Guide (2026)"
description: "Share your Google Calendar without exposing private details. Step-by-step for desktop and mobile with the exact permission levels to choose."
pubDate: 2026-03-03
updatedDate: 2026-03-20
slug: share-google-calendar-with-someone
tags: ["google calendar", "sharing", "privacy", "how to", "permissions"]
---

# How to Share Your Google Calendar With Someone (Without Oversharing)

**Direct answer:** Open Google Calendar on the web, go to **Settings** (gear icon), find your calendar in the left sidebar, click **Share with specific people**, click **Add people**, enter their email address, choose a permission level, and click **Send**. The recipient gets an email with a link to add your calendar to their view. The whole process takes under a minute.

Before you share, decide one thing: **what permission level does this person actually need?** Most people should start with "See only free/busy" or "See all event details." You can always escalate later. You cannot un-see what someone has already seen.

---

## How to share your Google Calendar on desktop (web)

**Direct answer:** The web version of Google Calendar at `calendar.google.com` is where you control all sharing. This is the full-control path — every permission level, every option.

### Method 1: Through Settings (recommended)

1. Open [Google Calendar](https://calendar.google.com) in your browser.
2. Click the **gear icon** (top-right corner) and select **Settings**.
3. In the left sidebar, under **Settings for my calendars**, click the calendar you want to share.
4. Click **Share with specific people**.
5. Click **+ Add people and groups**.
6. Enter the email address of the person you want to share with.
7. Use the **Permissions** dropdown to select the appropriate level (see the [permission levels section](#understanding-permission-levels) below).
8. Click **Send**.

The recipient receives an email notification with a link. When they click it, your calendar appears in their "Other calendars" section.

### Method 2: From the calendar sidebar (faster)

1. In the left sidebar of Google Calendar, hover over the calendar name under **My calendars**.
2. Click the **three-dot menu** (more options) that appears.
3. Select **Settings and sharing**.
4. Scroll to **Share with specific people** and follow steps 5–8 above.

This method gets you to the same screen with fewer clicks.

### Making a calendar public

You can also make a calendar visible to anyone on the internet. Under the same sharing settings, there's an option: **Make available to public**. A checkbox. Be deliberate before enabling this.

Public calendars are indexed by search engines. Anyone with the link sees everything on it. This is useful for event calendars, class schedules, or community meetups. It is not useful for your personal work calendar.

If you enable public access, you get two sub-options:
- **See only free/busy (hide details)** — people see blocked time slots but no event titles or descriptions.
- **See all event details** — everything is visible.

For most public calendars, "See only free/busy" is the safer starting point.

---

## How to share your Google Calendar on mobile (Android and iOS)

**Direct answer:** The Google Calendar mobile app has **limited sharing controls**. You cannot add specific people or manage permission levels from the app. For full sharing setup, you need the web version. Here's what you *can* do on mobile, and the workaround for everything else.

### What you CAN do on mobile

**Share a single event** (both Android and iOS):

1. Open the Google Calendar app.
2. Tap the event you want to share.
3. Tap the **pencil icon** (Edit).
4. Tap **Add people** (or **Add guests**, depending on your app version).
5. Enter the person's email address.
6. Tap **Save**.

This adds them as a guest to that specific event — it does not share your entire calendar. The guest receives an email invitation and the event appears on their calendar.

**View shared calendars** (both Android and iOS):

If someone has shared their calendar with you via the web, it appears in your mobile app automatically. You can toggle its visibility in the hamburger menu (three horizontal lines > scroll to the shared calendar > check or uncheck it).

### What you CANNOT do on mobile

- Add or remove people from calendar-level sharing
- Change permission levels for existing shared users
- Make a calendar public or private
- Access the "Share with specific people" settings

### The mobile workaround

Open `calendar.google.com` in your phone's browser (Chrome on Android, Safari on iOS). Request the desktop version of the site:

- **Android (Chrome):** Tap the three-dot menu > check **Desktop site**.
- **iOS (Safari):** Tap the **Aa** icon in the address bar > tap **Request Desktop Website**.

From there, follow the [desktop sharing steps](#method-1-through-settings-recommended) above. The interface is cramped on a phone screen, but everything works.

---

## Understanding permission levels

**Direct answer:** Google Calendar has four sharing permission levels. Each one reveals more of your calendar to the recipient. Choose the most restrictive level that meets the actual need.

| Permission | What the recipient sees | Best for |
|---|---|---|
| **See only free/busy** | Time slots marked as busy or available. No event titles, descriptions, locations, or attendees. | Broad scheduling visibility. External contacts. People who just need to know when you're available. |
| **See all event details** | Event titles, times, locations, descriptions, and attendee lists. Cannot see events you've marked as private. | Close teammates who need context. A manager checking your meeting load. |
| **Make changes to events** | Everything above, plus the ability to edit, move, or delete your events. | Executive assistants. Co-managers who actively manage your schedule. |
| **Make changes and manage sharing** | Full control: edit events, add/remove other shared users, change permissions. | Trusted delegates only. This is effectively co-ownership of the calendar. |

### The safe-by-default principle

Here's a principle worth adopting — not just for this calendar, but for any permission decision you make:

**Start with the least access that's actually useful. Escalate only when someone asks for more, and only when the reason is clear.**

This is not about distrust. It's about reducing accidental exposure. A colleague with "See all event details" can read the title of your 3pm appointment with HR. A collaborator with "Make changes to events" can accidentally move your dentist appointment to next Thursday. These aren't hypothetical — they happen when permissions are set casually and forgotten.

The safe default for most sharing is **"See only free/busy"** for scheduling-only relationships and **"See all event details"** for people who genuinely need context. The editing permissions exist for specific workflows (assistant-executive, team calendar co-management). Use them when those workflows are real.

You can change permissions at any time. Go back to **Settings > Share with specific people**, find the person, and change their permission level from the dropdown. The change takes effect immediately. There's no cost to starting cautious.

---

## Sharing within Google Workspace (enterprise and teams)

**Direct answer:** If your organization uses Google Workspace (formerly G Suite), sharing behavior is shaped by admin-level policies that sit above your individual settings. Your IT admin controls the ceiling. Here's what that looks like in practice.

### Organizational default visibility

Workspace admins can set a **default internal sharing level** for everyone in the organization. Common configurations:

- **All users in the organization can see free/busy by default.** Your coworkers see your availability without you manually sharing with each person.
- **All users can see event details by default.** More open — every event title, time, and location is visible to colleagues unless you mark events as private.
- **No default sharing.** Each user must explicitly share their calendar.

You can check your organization's default by going to **Settings** > your calendar > **Access permissions for events**. Look for the line that starts with your organization's name (e.g., "Make available for Acme Corp").

### Domain-wide sharing restrictions

Admins can also restrict **external sharing** — sharing with people outside your organization. Common restrictions include:

- **External sharing disabled entirely.** You cannot share your calendar with anyone outside your company domain.
- **External sharing limited to free/busy only.** Outsiders can see when you're busy but never event details.
- **External sharing fully enabled.** No restrictions beyond what Google Calendar itself offers.

If you try to share your calendar with an external email address and Google Calendar won't let you, this is almost certainly an admin-level restriction. Talk to your IT team.

### Admin settings override individual settings

This is the key concept for Workspace users: **admin policies create a ceiling, not a floor.** You can always share *less* than what your admin allows. You cannot share *more*. If your admin blocks external sharing, no individual setting overrides that.

For Workspace admins configuring these policies: the controls live in the **Google Admin console** under **Apps > Google Workspace > Calendar > Sharing settings**. Changes propagate to all users in the affected organizational unit.

### Team calendars vs. personal calendar sharing

In Workspace environments, consider whether you need to share your *personal* calendar or create a **shared team calendar**. Team calendars (created via "Other calendars" > "Create new calendar") have their own sharing settings, separate from anyone's personal calendar. This keeps personal events private while giving the team a shared view of group commitments.

If your team uses [color-coding](/blog/color-code-google-calendar-events) on a shared team calendar, everyone sees the same colors — which makes the system more consistent than color-coding individual calendars that are shared piecemeal.

---

## Common sharing mistakes (and their real consequences)

**Direct answer:** Most sharing problems aren't technical failures. They're permission decisions made quickly and never revisited. Here are the ones that cause real trouble.

### 1. Sharing the wrong calendar

Many people have multiple calendars under one Google account: a primary calendar, a work calendar, a "Side projects" calendar, a shared family calendar. When you go to share, you need to select the right one from the left sidebar.

The mistake: sharing your personal calendar when you meant to share your work calendar — or vice versa. Your coworker doesn't need to see your couples therapy appointment. Your spouse doesn't need to see your performance review prep.

**Fix:** Before sharing, go to **Settings** and verify which calendar you've selected. The calendar name appears at the top of the sharing section. Read it.

### 2. Granting "Make changes" when "See all event details" would suffice

People ask "can you share your calendar?" and the natural instinct is to be generous. But "Make changes to events" means that person can edit, move, or delete anything on your calendar. If they do it accidentally, there's no undo notification — the event just changes.

**Fix:** Default to "See all event details." Only upgrade to editing permissions when someone specifically needs to manage your schedule as part of their role.

### 3. Not knowing about the "private" event flag

When you share your calendar with "See all event details" permission, recipients can see everything — except events you've explicitly marked as **private**. The private flag exists exactly for this: keeping specific events hidden from people who can otherwise see your full calendar.

The mistake: not knowing this flag exists, and either (a) never using it and accidentally exposing sensitive events, or (b) assuming all events are hidden when they're not.

**Fix:** When creating an event, click the **visibility dropdown** (default is "Default visibility") and select **Private**. Private events appear as "Busy" to people with "See all event details" access. People with editing permissions *can* see private event details — another reason to be careful with that permission level.

### 4. Sharing via public link without understanding the scope

Under sharing settings, there's an option to get a **shareable link** for your calendar. This link doesn't require the recipient to have a Google account. Anyone with the link can view the calendar.

The mistake: copying this link and pasting it in a Slack channel, email thread, or document — and not realizing that anyone who sees that link, now or in the future, can view your calendar. Links get forwarded. Documents get shared. Screenshots happen.

**Fix:** Use "Share with specific people" for person-to-person sharing. Reserve public links for calendars that are genuinely meant to be public (event schedules, office hours, community calendars).

### 5. Forgetting that shared calendars display in the viewer's time zone

When you share your calendar with someone in a different time zone, they see your events converted to *their* local time zone. A meeting you created at 2:00 PM Eastern appears as 11:00 AM Pacific on their screen. The conversion is automatic and correct.

The confusion: when you *discuss* a shared calendar event over chat or email, you might say "the 2pm meeting" and the other person sees it listed at 11am. Both of you are right. Neither of you realizes the other sees a different time.

**Fix:** When referencing shared calendar events across time zones, include the time zone: "the 2pm ET meeting." Or better — click the event and share the calendar link, which resolves to the correct time for each viewer.

---

## Cross-time-zone calendar sharing

**Direct answer:** Shared calendars handle time zone conversion automatically. Events display in each viewer's local time zone. But automatic conversion doesn't prevent human miscommunication — and that's where most cross-timezone sharing problems actually live.

### How the conversion works

Google Calendar stores every event in UTC internally. When you create an event at 3:00 PM in your time zone, Calendar converts it to UTC for storage. When someone in another time zone views your shared calendar, Calendar converts it again from UTC to their local time zone. The math is always correct.

This means:
- You don't need to manually adjust times when sharing across time zones.
- Recurring events respect daylight saving time changes automatically.
- All-day events stay as all-day events regardless of time zone.

### Where confusion happens

The conversion is correct, but it's invisible. You see 3:00 PM. They see 12:00 PM. Neither of you sees both times simultaneously. When you're looking at a colleague's shared calendar to find a meeting slot, you're seeing their events in *your* time zone — which is helpful for scheduling but can be disorienting if you're trying to understand their actual workday rhythm.

For example: your London colleague's shared calendar shows their standup at 4:00 AM your time (Pacific). That looks absurdly early until you remember it's noon in London.

If your team shares calendars across more than two time zones, the mental math compounds. This is where adding a secondary time zone display to your calendar helps. Google Calendar supports this natively (go to **Settings > Time zone > Display secondary time zone**). For teams spanning three or more zones, [TimeHopper](/) layers multiple time zones directly onto your calendar view, making the conversion visible instead of mental.

For more on configuring time zones in Google Calendar, see our guide on [how to change your time zone in Google Calendar](/blog/how-to-change-time-zone-in-google-calendar).

---

## How to stop sharing or change permissions

**Direct answer:** You can revoke sharing or change permission levels at any time. The change takes effect immediately.

### Remove a specific person

1. Open [Google Calendar](https://calendar.google.com) in your browser.
2. Click the **gear icon** > **Settings**.
3. In the left sidebar, click the calendar you're sharing.
4. Under **Share with specific people**, find the person.
5. Click the **X** next to their name to remove them.

They'll no longer see your calendar. Events that were already on their view disappear. They don't receive a notification that you've removed them.

### Change someone's permission level

Follow the same path above, but instead of clicking the X, click the **permission dropdown** next to their name and select a different level. The change is instant.

### Disable public access

If you previously made a calendar public, go to **Settings** > your calendar > **Access permissions for events** and uncheck **Make available to public**. Any public links to this calendar stop working immediately.

---

## FAQ

### Can I share my calendar with someone who doesn't have a Google account?

Yes, but only through a link. Go to **Settings** > your calendar > **Integrate calendar** and copy the **Secret address in iCal format**. The recipient can add this URL to any calendar app that supports iCal (Outlook, Apple Calendar, Thunderbird, etc.). This gives them read-only access and doesn't require the calendar to be public. Treat this URL like a password — anyone who has it can view the calendar.

Alternatively, you can make the calendar public and share the **Public address in iCal format**. This works the same way but doesn't require secrecy, since the calendar is already public.

### How do I stop sharing my calendar?

Go to **Settings** > your calendar > **Share with specific people** and remove the person by clicking the **X** next to their name. For public calendars, uncheck **Make available to public** under **Access permissions for events**. Both changes take effect immediately. See the [stop sharing section](#how-to-stop-sharing-or-change-permissions) above for the full walkthrough.

### Will shared users see my private events?

It depends on their permission level. Users with **"See only free/busy"** or **"See all event details"** permission see private events only as a "Busy" block — no title, description, or other details are visible. Users with **"Make changes to events"** or **"Make changes and manage sharing"** permissions **can** see full details of private events. This is one of the most important reasons to be conservative with editing-level permissions.

### Can I share just one event instead of my whole calendar?

Yes. Open the event, click **Edit** (pencil icon), and add guests by typing their email addresses in the **Add guests** field. This sends them an invitation for that single event without exposing anything else on your calendar. This works on both web and mobile. It's the better choice when someone needs to attend one meeting — not monitor your ongoing schedule.

### Does the other person need to accept the share?

When you share your calendar with someone, they receive an email with an "Add this calendar" link. They don't have to formally accept — clicking the link adds your calendar to their sidebar. If they never click the link, your calendar doesn't appear in their view. The share still exists on your end, so they could add it later by going to **Other calendars > Subscribe to calendar** and searching for your email address.

---

## Troubleshooting shared calendar issues

**Direct answer:** If sharing isn't working as expected, check these common causes before assuming something is broken.

**Recipient says they can't see the calendar:**
- Confirm you shared with the correct email address (check for typos).
- Ask them to check their "Other calendars" section in the left sidebar — your calendar might be there but unchecked (hidden).
- If they use a non-Google calendar app, they may need the iCal link instead.

**Shared calendar events show wrong times:**
- This is almost always a time zone display issue, not a sharing problem. Events display in the viewer's local time zone. Confirm both users have their [correct time zone set](/blog/how-to-change-time-zone-in-google-calendar).

**You can't share with an external email address:**
- Your Google Workspace admin may have restricted external sharing. Check with your IT team.

**Notifications aren't working for shared calendar events:**
- Shared calendars have their own notification settings, separate from your primary calendar. Go to **Settings** > the shared calendar > **Event notifications** and set a default. For more on notification configuration, see our guide on [changing default notification settings](/blog/change-default-notification-google-calendar).

---

## Sources

- [Share your calendar with someone — Google Calendar Help](https://support.google.com/calendar/answer/37082)
- [Change sharing settings of your calendar — Google Calendar Help](https://support.google.com/calendar/answer/37083)
- [Google Workspace Admin Help: Calendar sharing settings](https://support.google.com/a/answer/60765)
- [Create & manage a public Google Calendar](https://support.google.com/calendar/answer/37083#public)
