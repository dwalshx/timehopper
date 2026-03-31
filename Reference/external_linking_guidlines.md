Here are copy/paste instructions for Antigravity—designed to be simple, consistent, and “fairly automated” without turning into a dev project.

Antigravity Instructions: External Linking (SEO + AEO Citability)
Goal

Add authoritative external links to each blog post to improve:

AEO “citable” passages (verifiability)

user trust

long-tail SEO for troubleshooting/how-to content

Rules (keep it clean)

2–5 external links per article (max 6).

Prefer primary sources (Google, Chrome, Apple, Microsoft).

Put links where they help the reader take action:

In step-by-step fix sections

In “why this happens” sections for factual claims

Add a Sources section at the bottom of each article with 2–5 bullets.

Don’t auto-link repeated phrases. One link per concept per article is enough.

Do not add affiliate links. Do not link to low-quality blogs.

Avoid “Join thousands…” style claims unless we can substantiate them.

Source Quality Hierarchy

Use this order unless there’s a good reason not to:

Google official docs/help (support.google.com, developers.google.com)

Chrome official docs/help (support.google.com/chrome, developer.chrome.com)

Apple support (support.apple.com)

Microsoft support (support.microsoft.com)

IANA / tz database explainer (when needed for time zone definitions)

Implementation Approach (light automation, low effort)
Step 1: Create a small source library file

Create src/data/sources.yml (or .json) with canonical URLs we reuse.

Example keys:

google_calendar_timezone_settings

google_calendar_notifications

chrome_manage_notifications

chrome_site_permissions

apple_macos_notifications

apple_focus_mode

microsoft_windows_notifications

microsoft_focus_assist

iana_time_zones (optional)

Step 2: Allow each article to declare which sources it uses

In each post frontmatter, add:

sources:
  - google_calendar_timezone_settings
  - chrome_manage_notifications
  - apple_focus_mode

Step 3: Render a “Sources” block automatically in the blog layout

In the blog post layout component:

read entry.data.sources

map IDs → URLs from sources.yml

render:

## Sources
- [Google Calendar: Time zone settings](...)
- [Chrome: Manage notifications](...)


Notes:

Use normal links (no nofollow) for citations.

Use target="_blank" optionally, but not required.

Keep link text descriptive (“Chrome: Manage notifications”), not “click here”.

Content Guidelines: Where to add links
For time zone articles

Add sources for:

Google Calendar time zone settings

“Secondary time zone” / “Event time zone” explanations (Google Help)

DST/time zone basics (optional: IANA)

For notification articles

Add sources for:

Chrome notification permissions

macOS notifications + Focus mode docs

Windows notifications + Focus Assist docs

For “extensions” articles

Add sources for:

Chrome Web Store extension permissions (or Chrome extension docs)

Google Calendar help docs as needed

Optional automation (only if easy)

If we want a semi-automated pass:

Write a small script to append a Sources section if missing, based on tags or keywords:

if tags include notifications → include Chrome + OS docs

if tags include time zones → include Google time zone docs

But prioritize the frontmatter-driven approach first.

QA Checklist (do for each post)

Page returns 200 OK

Links are to authoritative domains

Sources section renders correctly

No broken links

No excessive outbound links (2–5 is the target)

Links match visible content (no schema mismatch)