export interface TimezoneInfo {
  abbr: string;
  dstAbbr: string;
  name: string;
  iana: string;
  stdOffset: number;
  dstOffset: number;
  hasDST: boolean;
  region: string;
}

export interface TimezonePair {
  slug: string;
  from: TimezoneInfo;
  to: TimezoneInfo;
  title: string;
  description: string;
  contextContent: string;
  faqs: { question: string; answer: string }[];
}

export const zones: Record<string, TimezoneInfo> = {
  PST: {
    abbr: "PST",
    dstAbbr: "PDT",
    name: "Pacific Standard Time",
    iana: "America/Los_Angeles",
    stdOffset: -8,
    dstOffset: -7,
    hasDST: true,
    region: "US West Coast",
  },
  MST: {
    abbr: "MST",
    dstAbbr: "MDT",
    name: "Mountain Standard Time",
    iana: "America/Denver",
    stdOffset: -7,
    dstOffset: -6,
    hasDST: true,
    region: "US Mountain",
  },
  CST: {
    abbr: "CST",
    dstAbbr: "CDT",
    name: "Central Standard Time",
    iana: "America/Chicago",
    stdOffset: -6,
    dstOffset: -5,
    hasDST: true,
    region: "US Central",
  },
  EST: {
    abbr: "EST",
    dstAbbr: "EDT",
    name: "Eastern Standard Time",
    iana: "America/New_York",
    stdOffset: -5,
    dstOffset: -4,
    hasDST: true,
    region: "US East Coast",
  },
  UTC: {
    abbr: "UTC",
    dstAbbr: "UTC",
    name: "Coordinated Universal Time",
    iana: "Etc/UTC",
    stdOffset: 0,
    dstOffset: 0,
    hasDST: false,
    region: "Universal",
  },
  GMT: {
    abbr: "GMT",
    dstAbbr: "BST",
    name: "Greenwich Mean Time",
    iana: "Europe/London",
    stdOffset: 0,
    dstOffset: 1,
    hasDST: true,
    region: "United Kingdom",
  },
  CET: {
    abbr: "CET",
    dstAbbr: "CEST",
    name: "Central European Time",
    iana: "Europe/Berlin",
    stdOffset: 1,
    dstOffset: 2,
    hasDST: true,
    region: "Central Europe",
  },
  EET: {
    abbr: "EET",
    dstAbbr: "EEST",
    name: "Eastern European Time",
    iana: "Europe/Athens",
    stdOffset: 2,
    dstOffset: 3,
    hasDST: true,
    region: "Eastern Europe",
  },
  IST: {
    abbr: "IST",
    dstAbbr: "IST",
    name: "India Standard Time",
    iana: "Asia/Kolkata",
    stdOffset: 5.5,
    dstOffset: 5.5,
    hasDST: false,
    region: "India",
  },
  SGT: {
    abbr: "SGT",
    dstAbbr: "SGT",
    name: "Singapore Standard Time",
    iana: "Asia/Singapore",
    stdOffset: 8,
    dstOffset: 8,
    hasDST: false,
    region: "Singapore",
  },
  JST: {
    abbr: "JST",
    dstAbbr: "JST",
    name: "Japan Standard Time",
    iana: "Asia/Tokyo",
    stdOffset: 9,
    dstOffset: 9,
    hasDST: false,
    region: "Japan",
  },
  AEST: {
    abbr: "AEST",
    dstAbbr: "AEDT",
    name: "Australian Eastern Standard Time",
    iana: "Australia/Sydney",
    stdOffset: 10,
    dstOffset: 11,
    hasDST: true,
    region: "Australia East",
  },
};

export const pairs: TimezonePair[] = [
  // 1. pst-to-est
  {
    slug: "pst-to-est",
    from: zones.PST,
    to: zones.EST,
    title: "PST to EST Converter \u2014 Pacific to Eastern Time",
    description:
      "Convert Pacific Time (PST/PDT) to Eastern Time (EST/EDT). See the current time difference and how DST affects the 3-hour offset.",
    contextContent: `Remote teams split between California and New York deal with this conversion daily. Engineering companies, media firms, and financial services with offices on both coasts rely on a clear understanding of the Pacific-to-Eastern gap.

The standard difference is 3 hours. When it is 9 AM in Los Angeles, it is noon in New York. Morning standups scheduled at 10 AM Pacific land at 1 PM Eastern, right after lunch on the East Coast.

Both zones observe Daylight Saving Time on the same schedule, so the 3-hour gap stays constant year-round. PST (UTC\u22128) becomes PDT (UTC\u22127) in spring, and EST (UTC\u22125) becomes EDT (UTC\u22124) at the same time.`,
    faqs: [
      {
        question: "What is the time difference between PST and EST?",
        answer:
          "EST is 3 hours ahead of PST. When it is 8 AM in Los Angeles (PST), it is 11 AM in New York (EST). This 3-hour gap holds year-round because both zones shift to daylight saving time on the same dates.",
      },
      {
        question: "Does DST change the PST to EST offset?",
        answer:
          "No. Both Pacific and Eastern time zones observe DST on the same US schedule (second Sunday in March, first Sunday in November). The offset remains exactly 3 hours whether both zones are in standard time or both in daylight time.",
      },
      {
        question:
          "What is the best time to schedule a meeting across PST and EST?",
        answer:
          "The most common overlap window is 9 AM\u201312 PM Pacific / 12\u20133 PM Eastern. This keeps the meeting within normal working hours on both coasts. Starting earlier than 9 AM Pacific pushes the Eastern side past typical end-of-day.",
      },
    ],
  },

  // 2. est-to-pst
  {
    slug: "est-to-pst",
    from: zones.EST,
    to: zones.PST,
    title: "EST to PST Converter \u2014 Eastern to Pacific Time",
    description:
      "Convert Eastern Time (EST/EDT) to Pacific Time (PST/PDT). Understand the 3-hour difference for scheduling across US coasts.",
    contextContent: `East Coast professionals working with West Coast partners check this conversion constantly. Sales teams in New York calling prospects in San Francisco, or product managers in Boston syncing with engineers in Seattle, need to avoid early-morning disruptions on the Pacific side.

Eastern Time is 3 hours ahead of Pacific. A 9 AM call in New York is 6 AM in Los Angeles \u2014 far too early for most. End-of-day on the East Coast at 5 PM translates to 2 PM Pacific, leaving plenty of West Coast afternoon remaining.

Because both zones follow the same US Daylight Saving Time schedule, the 3-hour difference never shifts. There is no period of the year where the gap becomes 2 or 4 hours.`,
    faqs: [
      {
        question: "How do I convert EST to PST quickly?",
        answer:
          "Subtract 3 hours from Eastern Time. If it is 2 PM EST, it is 11 AM PST. This rule applies in both standard time and daylight saving time.",
      },
      {
        question:
          "Is there ever a time of year when EST and PST are not 3 hours apart?",
        answer:
          "No. The US sets a uniform DST schedule for both zones. They spring forward and fall back on the same dates, so the offset is always exactly 3 hours.",
      },
      {
        question:
          "If I have a 5 PM deadline EST, when does that fall in Pacific Time?",
        answer:
          "A 5 PM EST deadline is 2 PM PST. If you are on the West Coast, you have until 2 PM local time to meet an Eastern deadline set at 5 PM.",
      },
    ],
  },

  // 3. utc-to-est
  {
    slug: "utc-to-est",
    from: zones.UTC,
    to: zones.EST,
    title: "UTC to EST Converter \u2014 Coordinated Universal Time to Eastern",
    description:
      "Convert UTC to Eastern Time (EST/EDT). Learn how the offset changes from UTC\u22125 to UTC\u22124 during Daylight Saving Time.",
    contextContent: `Developers, DevOps engineers, and database administrators frequently convert UTC timestamps to Eastern Time. Server logs, API responses, and cloud dashboards typically report in UTC, but the team reading them is often on the US East Coast.

During standard time, EST is UTC\u22125. Midnight UTC is 7 PM the previous evening in New York. During Daylight Saving Time (mid-March through early November), Eastern shifts to EDT (UTC\u22124), so midnight UTC becomes 8 PM EDT.

UTC never changes. It has no daylight saving adjustment. This means the offset to Eastern Time shifts by one hour twice a year. From November to March, subtract 5 hours. From March to November, subtract 4.`,
    faqs: [
      {
        question: "What is the difference between UTC and EST?",
        answer:
          "EST is 5 hours behind UTC. When it is 15:00 UTC, it is 10:00 AM EST. During Daylight Saving Time (EDT), the difference shrinks to 4 hours, so 15:00 UTC becomes 11:00 AM EDT.",
      },
      {
        question: "Why does the UTC to EST offset change during the year?",
        answer:
          "UTC is fixed and never observes DST. Eastern Time shifts forward by one hour in spring (becoming EDT, UTC\u22124) and back in fall (returning to EST, UTC\u22125). The offset changes because only the Eastern side moves.",
      },
      {
        question:
          "How do I convert a UTC timestamp from a server log to Eastern Time?",
        answer:
          "From November through mid-March, subtract 5 hours. From mid-March through early November, subtract 4 hours. For exact cutover dates, check the US DST schedule for the current year.",
      },
    ],
  },

  // 4. utc-to-pst
  {
    slug: "utc-to-pst",
    from: zones.UTC,
    to: zones.PST,
    title: "UTC to PST Converter \u2014 Coordinated Universal Time to Pacific",
    description:
      "Convert UTC to Pacific Time (PST/PDT). The offset is UTC\u22128 in winter and UTC\u22127 in summer during Daylight Saving Time.",
    contextContent: `West Coast tech companies headquartered in San Francisco, Seattle, and Portland rely on UTC-to-Pacific conversions for infrastructure monitoring, incident response, and coordinating with global teams. Cloud platforms like AWS and GCP report metrics in UTC.

PST is 8 hours behind UTC. A deploy at 18:00 UTC lands at 10 AM Pacific \u2014 a reasonable hour for the team to monitor it. During summer, PDT (UTC\u22127) shifts that same 18:00 UTC deploy to 11 AM local time.

Because UTC is fixed, the offset to Pacific changes twice a year. When Pacific springs forward in March, the gap narrows from 8 to 7 hours. When it falls back in November, the gap returns to 8.`,
    faqs: [
      {
        question: "How many hours behind UTC is PST?",
        answer:
          "PST is 8 hours behind UTC. During Daylight Saving Time (PDT), it is 7 hours behind UTC. The shift happens in mid-March and reverts in early November.",
      },
      {
        question: "When does the UTC-to-PST offset change?",
        answer:
          "The offset changes when US Daylight Saving Time starts (second Sunday in March, jumping to UTC\u22127) and ends (first Sunday in November, returning to UTC\u22128). UTC itself never changes.",
      },
      {
        question: "If a release is scheduled for 17:00 UTC, what time is that in Pacific?",
        answer:
          "During standard time (November\u2013March), 17:00 UTC is 9:00 AM PST. During daylight time (March\u2013November), 17:00 UTC is 10:00 AM PDT.",
      },
    ],
  },

  // 5. gmt-to-est
  {
    slug: "gmt-to-est",
    from: zones.GMT,
    to: zones.EST,
    title: "GMT to EST Converter \u2014 London to Eastern Time",
    description:
      "Convert GMT/BST (London) to Eastern Time (EST/EDT). The gap ranges from 4 to 5 hours depending on DST in each zone.",
    contextContent: `London and New York are two of the world\u2019s largest financial centers. Trading desks, investment banks, and law firms with transatlantic operations convert between these zones dozens of times a day.

When both cities are in standard time (late November through mid-March), London (GMT, UTC+0) is 5 hours ahead of New York (EST, UTC\u22125). A 2 PM meeting in London falls at 9 AM in New York.

The complexity arises because the UK and the US switch to daylight saving on different dates. The US springs forward in mid-March, but the UK does not follow until late March. During those two to three weeks, the gap temporarily narrows to 4 hours. A similar mismatch happens in autumn when the UK falls back in late October, but the US waits until early November.`,
    faqs: [
      {
        question: "What is the time difference between GMT and EST?",
        answer:
          "When both are in standard time, GMT is 5 hours ahead of EST. During periods when both observe daylight saving, BST is still 5 hours ahead of EDT. But for a few weeks in March and October/November, the gap is only 4 hours due to different DST switchover dates.",
      },
      {
        question: "Do GMT and EST change clocks on the same date?",
        answer:
          "No. The US starts DST on the second Sunday in March; the UK starts on the last Sunday in March. The US ends DST on the first Sunday in November; the UK ends on the last Sunday in October. During the gap weeks, the offset is 4 hours instead of 5.",
      },
      {
        question:
          "What is the best overlap window for meetings between London and New York?",
        answer:
          "The strongest overlap is 9 AM\u201312 PM Eastern / 2\u20135 PM London. This window keeps both sides within normal business hours. Scheduling after 12 PM Eastern pushes London past 5 PM.",
      },
    ],
  },

  // 6. est-to-gmt
  {
    slug: "est-to-gmt",
    from: zones.EST,
    to: zones.GMT,
    title: "EST to GMT Converter \u2014 Eastern to London Time",
    description:
      "Convert Eastern Time (EST/EDT) to GMT/BST (London). Offset is typically 5 hours, with brief 4-hour periods during DST transitions.",
    contextContent: `US East Coast teams coordinating with London offices need to plan around the afternoon handoff. By the time New York finishes lunch, London is wrapping up for the day. This matters for media companies, consulting firms, and any business with transatlantic clients.

Add 5 hours to Eastern Time to get London time in most of the year. A 10 AM meeting in New York is 3 PM in London. An end-of-day 5 PM in New York is already 10 PM in London, well outside working hours.

The tricky weeks come in March and October/November. Because the US and UK switch to daylight saving on different Sundays, there are roughly two weeks in spring and one week in autumn where the gap is only 4 hours. Mark those transition weekends on your calendar if precise scheduling matters.`,
    faqs: [
      {
        question: "How do I convert Eastern Time to London time?",
        answer:
          "Add 5 hours for most of the year. If it is 9 AM EST, it is 2 PM GMT. During the brief DST transition windows in March and October/November, add 4 hours instead.",
      },
      {
        question:
          "Why is the EST-to-GMT gap sometimes 4 hours instead of 5?",
        answer:
          "The US and UK start and end daylight saving on different dates. For two to three weeks in spring and about one week in autumn, one side has already changed clocks while the other has not, compressing the gap to 4 hours.",
      },
      {
        question:
          "Can I schedule a recurring weekly meeting between New York and London without worrying about DST?",
        answer:
          "If you pick a time that works at both the 4-hour and 5-hour offset, yes. For example, 10 AM Eastern is either 2 PM or 3 PM London \u2014 both fine. Avoid 12 PM Eastern or later, because at the 5-hour offset that pushes London to 5 PM or beyond.",
      },
    ],
  },

  // 7. cst-to-est
  {
    slug: "cst-to-est",
    from: zones.CST,
    to: zones.EST,
    title: "CST to EST Converter \u2014 Central to Eastern Time",
    description:
      "Convert Central Time (CST/CDT) to Eastern Time (EST/EDT). The difference is always 1 hour, year-round.",
    contextContent: `The Central-to-Eastern conversion is one of the most common in the US. Companies with offices in Chicago, Dallas, or Nashville coordinating with teams in New York, Washington D.C., or Atlanta use this daily.

Central Time is 1 hour behind Eastern. A 9 AM Central meeting is 10 AM Eastern. Lunch at noon in Chicago is 1 PM in New York. The single-hour gap makes cross-timezone scheduling straightforward.

Both zones follow the same US DST calendar, so the 1-hour difference never changes. CST (UTC\u22126) and EST (UTC\u22125) become CDT (UTC\u22125) and EDT (UTC\u22124) on the same dates.`,
    faqs: [
      {
        question: "How far apart are Central and Eastern time?",
        answer:
          "Eastern Time is exactly 1 hour ahead of Central Time. This is true all year. When it is 3 PM CST, it is 4 PM EST.",
      },
      {
        question: "Does the CST-to-EST difference change during DST?",
        answer:
          "No. Both zones are on the same US DST schedule. They shift forward and back on the same days, keeping the gap locked at 1 hour.",
      },
      {
        question:
          "If a TV show airs at 8 PM Eastern, what time is it Central?",
        answer:
          "7 PM Central. US broadcast schedules listed as \"8/7c\" follow this pattern \u2014 the second number is always one hour earlier for the Central time zone.",
      },
    ],
  },

  // 8. est-to-cst
  {
    slug: "est-to-cst",
    from: zones.EST,
    to: zones.CST,
    title: "EST to CST Converter \u2014 Eastern to Central Time",
    description:
      "Convert Eastern Time (EST/EDT) to Central Time (CST/CDT). Subtract 1 hour \u2014 the offset is constant year-round.",
    contextContent: `Eastern-to-Central is the reverse of the most-used US timezone conversion. New York-based companies with operations in Chicago, Houston, or Minneapolis subtract one hour to coordinate schedules.

Subtract 1 hour from Eastern to get Central. A 3 PM deadline in New York is 2 PM in Chicago. An 8 AM Eastern standup is 7 AM Central, which may be too early for some Central-based teammates.

The offset is permanently fixed at 1 hour. There is no point in the year where these two zones are the same time or two hours apart, since they both observe US DST identically.`,
    faqs: [
      {
        question: "How do I convert EST to CST?",
        answer:
          "Subtract 1 hour. If it is 11 AM EST, it is 10 AM CST. This rule works identically during daylight saving time (EDT to CDT).",
      },
      {
        question: "Are EST and CST ever the same time?",
        answer:
          "No. The 1-hour offset is constant. Both zones spring forward and fall back on the same dates, so the gap never closes.",
      },
      {
        question:
          "What should I keep in mind when scheduling from Eastern to Central?",
        answer:
          "An early morning Eastern meeting translates to an even earlier Central time. A 7 AM EST standup is 6 AM CST. If your team spans both zones, aim for 9 AM Eastern / 8 AM Central or later.",
      },
    ],
  },

  // 9. ist-to-est
  {
    slug: "ist-to-est",
    from: zones.IST,
    to: zones.EST,
    title: "IST to EST Converter \u2014 India to Eastern Time",
    description:
      "Convert India Standard Time (IST) to Eastern Time (EST/EDT). The gap is 10.5 hours in winter and 9.5 hours in summer.",
    contextContent: `India and the US East Coast form one of the busiest offshore collaboration corridors in the world. IT services, software development, and business process outsourcing teams in Bangalore, Hyderabad, and Pune work with counterparts in New York, New Jersey, and North Carolina.

IST is 10 hours and 30 minutes ahead of EST. When it is 9 AM in New York, it is 7:30 PM in India \u2014 the end of the Indian workday. When the Indian workday starts at 9 AM IST, it is 10:30 PM the previous night in New York.

India does not observe Daylight Saving Time. The US does. When the US shifts to EDT in spring, the gap narrows to 9 hours and 30 minutes. A 9 AM meeting in New York then falls at 6:30 PM IST instead of 7:30 PM. This seasonal shift changes the overlap window and catches teams off guard if they don\u2019t account for it.`,
    faqs: [
      {
        question:
          "What is the time difference between IST and EST?",
        answer:
          "IST is 10 hours and 30 minutes ahead of EST during standard time (November\u2013March). When the US is on EDT (March\u2013November), the gap shrinks to 9 hours and 30 minutes. India does not change clocks.",
      },
      {
        question:
          "Why does the IST-to-EST offset change if India has no DST?",
        answer:
          "The US shifts its clocks for DST, but India does not. When the US moves to EDT (UTC\u22124), the gap between IST (UTC+5:30) and Eastern drops from 10.5 to 9.5 hours.",
      },
      {
        question:
          "What is the best meeting time for teams in India and New York?",
        answer:
          "The common overlap is 8\u201310:30 AM Eastern, which is 6:30\u20139 PM IST (winter) or 5:30\u20138 PM IST (summer). Morning in New York lines up with early evening in India. Meetings earlier than 8 AM Eastern push the Indian side past 6:30 PM.",
      },
    ],
  },

  // 10. ist-to-pst
  {
    slug: "ist-to-pst",
    from: zones.IST,
    to: zones.PST,
    title: "IST to PST Converter \u2014 India to Pacific Time",
    description:
      "Convert India Standard Time (IST) to Pacific Time (PST/PDT). The offset is 13.5 hours in winter and 12.5 in summer.",
    contextContent: `Silicon Valley and Bangalore have one of the widest timezone gaps of any common business pairing. Product teams at headquarters in San Francisco or San Jose collaborate with engineering teams in India across a gap that is more than half a day.

IST is 13 hours and 30 minutes ahead of PST. When it is 9 AM Monday in San Francisco, it is 10:30 PM Monday in India. When India starts work at 9 AM IST, it is 7:30 PM the previous evening in California.

The practical overlap is narrow: roughly 7:30\u20139:30 AM Pacific aligns with 9\u201311 PM IST. Many teams adopt an early morning Pacific / late night India pattern, or they rely on asynchronous workflows. When the US moves to PDT in spring, the gap shrinks by one hour to 12.5, giving a slightly wider overlap window.`,
    faqs: [
      {
        question: "How many hours ahead is IST from PST?",
        answer:
          "IST is 13 hours and 30 minutes ahead of PST. During US Daylight Saving Time (PDT), the difference narrows to 12 hours and 30 minutes.",
      },
      {
        question:
          "Does the IST-to-PST gap change during the year?",
        answer:
          "Yes. India does not observe DST, but the US West Coast does. When California shifts to PDT in spring, the gap drops from 13.5 to 12.5 hours. It returns to 13.5 hours when PDT ends in November.",
      },
      {
        question:
          "How do teams in India and California find overlap for meetings?",
        answer:
          "The most common slot is 7:30\u20139:30 AM Pacific, which is 9\u201311 PM IST in winter or 8\u201310 PM IST in summer. Some teams use 6 PM\u20138 PM IST with late-afternoon Pacific slots, though those fall outside standard working hours on the California side.",
      },
    ],
  },

  // 11. gmt-to-pst
  {
    slug: "gmt-to-pst",
    from: zones.GMT,
    to: zones.PST,
    title: "GMT to PST Converter \u2014 London to Pacific Time",
    description:
      "Convert GMT/BST (London) to Pacific Time (PST/PDT). The offset is typically 8 hours but shifts to 7 during DST transitions.",
    contextContent: `London-to-Pacific coordination is common for global companies with UK headquarters and West Coast US operations. Fintech, gaming, and media companies frequently bridge this 8-hour gap.

When both regions are in standard time, London is 8 hours ahead of the Pacific coast. A 5 PM end-of-day in London is only 9 AM in San Francisco \u2014 just as the West Coast workday begins. This leaves a very narrow real-time collaboration window.

The DST complication mirrors the GMT-to-EST pattern but amplified. The US and UK switch clocks on different weekends, creating brief periods where the gap is 7 hours instead of 8. During summer, when both sides observe daylight saving (BST and PDT), the gap returns to 8 hours.`,
    faqs: [
      {
        question: "What is the time difference between London and Pacific Time?",
        answer:
          "London is 8 hours ahead of Pacific Time during most of the year. During the short DST transition windows in March and October/November, the gap temporarily narrows to 7 hours.",
      },
      {
        question: "When are GMT and PST closest together?",
        answer:
          "For a few weeks in mid-to-late March (after the US springs forward but before the UK does) and again in late October (after the UK falls back but before the US does), the gap is 7 hours instead of 8.",
      },
      {
        question:
          "Is there any reasonable meeting window between London and the US West Coast?",
        answer:
          "The overlap is tight. Morning Pacific hours (8\u201310 AM) correspond to late afternoon in London (4\u20136 PM). Earlier Pacific times push London past business hours. Many teams limit live meetings to that window and handle the rest asynchronously.",
      },
    ],
  },

  // 12. utc-to-cst
  {
    slug: "utc-to-cst",
    from: zones.UTC,
    to: zones.CST,
    title: "UTC to CST Converter \u2014 Coordinated Universal Time to Central",
    description:
      "Convert UTC to Central Time (CST/CDT). The offset is UTC\u22126 in winter and UTC\u22125 during Daylight Saving Time.",
    contextContent: `Central Time covers a large portion of the US population, including major cities like Chicago, Dallas, Houston, and Minneapolis. Developers and system administrators in these areas regularly translate UTC log timestamps and cron schedules to local time.

CST is 6 hours behind UTC. A server event logged at 14:00 UTC happened at 8:00 AM Central. During daylight saving time, CDT is only 5 hours behind UTC, so that same 14:00 UTC event would read as 9:00 AM local.

UTC has no seasonal adjustment. The Central zone shifts in mid-March and early November. Be especially careful with scheduled jobs: a cron set for 12:00 UTC will trigger at 6 AM CST in winter but 7 AM CDT in summer.`,
    faqs: [
      {
        question: "What is the UTC to CST offset?",
        answer:
          "CST is UTC\u22126. Subtract 6 hours from UTC to get Central Standard Time. During Daylight Saving Time (CDT), subtract 5 hours instead.",
      },
      {
        question: "Does the UTC-to-Central offset change?",
        answer:
          "Yes, twice a year. UTC is fixed, but Central Time shifts to CDT (UTC\u22125) in mid-March and back to CST (UTC\u22126) in early November. The offset alternates between 5 and 6 hours.",
      },
      {
        question:
          "If a cron job runs at 00:00 UTC daily, what time is that in Central?",
        answer:
          "During standard time (CST), it runs at 6:00 PM the previous day. During daylight time (CDT), it runs at 7:00 PM the previous day.",
      },
    ],
  },

  // 13. pst-to-gmt
  {
    slug: "pst-to-gmt",
    from: zones.PST,
    to: zones.GMT,
    title: "PST to GMT Converter \u2014 Pacific to London Time",
    description:
      "Convert Pacific Time (PST/PDT) to GMT/BST (London). The offset is usually 8 hours but briefly shifts to 7 during DST transitions.",
    contextContent: `West Coast US teams coordinating with London offices face one of the wider gaps in common business pairings. This conversion matters for game studios, SaaS companies, and financial firms managing cross-Atlantic workflows.

Add 8 hours to Pacific Time to get London time during standard months. A 9 AM call in San Francisco starts at 5 PM in London, which is the tail end of the UK workday. By 10 AM Pacific, London has clocked out.

The asymmetric DST switches between the US and UK create short transition windows where the gap shrinks to 7 hours. Teams that schedule recurring meetings across this pair should review timing during the last two weeks of March and the last week of October.`,
    faqs: [
      {
        question: "How do I convert PST to London time?",
        answer:
          "Add 8 hours for most of the year. 9 AM PST is 5 PM GMT. During the brief transition weeks in March and October/November when DST schedules differ, add 7 hours instead.",
      },
      {
        question:
          "Why is the PST-to-GMT gap sometimes 7 hours?",
        answer:
          "The US and UK switch to daylight saving on different weekends. For two to three weeks each spring and about one week each autumn, one side has changed clocks while the other has not, temporarily shrinking the gap to 7 hours.",
      },
      {
        question:
          "What meeting times work for both San Francisco and London?",
        answer:
          "The realistic window is 8\u20139:30 AM Pacific, which corresponds to 4\u20135:30 PM in London. Anything later Pacific-side means London is past normal working hours. Some teams use an 8 AM Pacific slot to catch London at 4 PM.",
      },
    ],
  },

  // 14. cet-to-est
  {
    slug: "cet-to-est",
    from: zones.CET,
    to: zones.EST,
    title: "CET to EST Converter \u2014 Central Europe to Eastern Time",
    description:
      "Convert Central European Time (CET/CEST) to Eastern Time (EST/EDT). The offset is usually 6 hours, briefly shifting to 5.",
    contextContent: `Berlin, Paris, Amsterdam, and other Central European cities maintain strong business ties with the US East Coast. Automotive companies, pharmaceutical firms, and tech startups coordinate across this 6-hour gap daily.

CET is 6 hours ahead of EST. A 3 PM meeting in Berlin is 9 AM in New York. The European afternoon overlaps with the American morning, creating a workable collaboration window of roughly 9 AM\u201312 PM Eastern / 3\u20136 PM Central European.

The EU and US switch to daylight saving on different dates. Europe changes on the last Sunday of March, while the US changes on the second Sunday. This creates a two-to-three-week window in March where the gap is only 5 hours. A similar mismatch occurs in October/November when Europe falls back before the US does.`,
    faqs: [
      {
        question:
          "What is the time difference between Central European Time and Eastern Time?",
        answer:
          "CET is 6 hours ahead of EST for most of the year. During short DST transition periods in March and October/November, the difference drops to 5 hours because Europe and the US change clocks on different weekends.",
      },
      {
        question:
          "Do CET and EST observe Daylight Saving Time on the same dates?",
        answer:
          "No. The EU changes on the last Sunday of March and October. The US changes on the second Sunday of March and the first Sunday of November. The mismatch creates brief periods with a 5-hour gap instead of 6.",
      },
      {
        question:
          "When is the best time for a call between Berlin and New York?",
        answer:
          "9 AM\u201312 PM Eastern works well, corresponding to 3\u20136 PM in Berlin. Going past noon Eastern pushes Berlin past 6 PM. For earlier European availability, try 8 AM Eastern / 2 PM CET.",
      },
    ],
  },

  // 15. est-to-cet
  {
    slug: "est-to-cet",
    from: zones.EST,
    to: zones.CET,
    title: "EST to CET Converter \u2014 Eastern to Central European Time",
    description:
      "Convert Eastern Time (EST/EDT) to Central European Time (CET/CEST). Add 6 hours typically, or 5 during DST transition weeks.",
    contextContent: `US East Coast businesses reaching out to European partners add 6 hours to their local time. New York law firms working with Frankfurt banks, or Boston biotech companies collaborating with labs in Zurich, rely on this conversion throughout the workday.

Add 6 hours to Eastern to get Central European Time. A 9 AM kickoff in New York is already 3 PM in Berlin. By the time the US East Coast hits mid-afternoon, Europe has gone home.

Twice a year, the conversion shifts briefly. In mid-March, the US springs forward while Europe has not yet, shrinking the gap to 5 hours for two to three weeks. In late October, Europe falls back while the US has not, again compressing the gap to 5 hours for about one week.`,
    faqs: [
      {
        question: "How do I convert EST to CET?",
        answer:
          "Add 6 hours for most of the year. 10 AM EST is 4 PM CET. During the DST transition weeks in March and October/November, add 5 hours instead.",
      },
      {
        question:
          "When does the EST-to-CET offset temporarily change?",
        answer:
          "In mid-March, the US starts DST two to three weeks before Europe. In late October, Europe ends DST about one week before the US. During both windows, the gap is 5 hours instead of 6.",
      },
      {
        question:
          "Is a 2 PM Eastern meeting reasonable for European colleagues?",
        answer:
          "At the standard 6-hour offset, 2 PM Eastern is 8 PM CET \u2014 outside normal business hours. Keep meetings before noon Eastern to stay within European working hours.",
      },
    ],
  },

  // 16. jst-to-est
  {
    slug: "jst-to-est",
    from: zones.JST,
    to: zones.EST,
    title: "JST to EST Converter \u2014 Japan to Eastern Time",
    description:
      "Convert Japan Standard Time (JST) to Eastern Time (EST/EDT). Japan is 14 hours ahead in winter and 13 in summer.",
    contextContent: `Japan and the US East Coast collaborate heavily in automotive, electronics, finance, and gaming. Toyota, Sony, and major trading firms operate across this nearly opposite-day timezone pairing.

JST is 14 hours ahead of EST. When it is 9 AM Monday in Tokyo, it is 7 PM Sunday in New York. The Japanese business day (9 AM\u20136 PM JST) corresponds to 7 PM\u20134 AM Eastern, making real-time collaboration during normal hours nearly impossible.

Japan does not observe DST. When the US shifts to EDT in spring, the gap shrinks to 13 hours. This gives a slightly better overlap: a 7 AM Eastern meeting corresponds to 8 PM JST in summer versus 9 PM in winter.`,
    faqs: [
      {
        question: "What is the time difference between Japan and Eastern Time?",
        answer:
          "JST is 14 hours ahead of EST during standard time (November\u2013March). When the US shifts to EDT (March\u2013November), the gap narrows to 13 hours. Japan does not observe DST.",
      },
      {
        question:
          "Why does the JST-to-EST offset change if Japan has no DST?",
        answer:
          "Japan\u2019s clock is fixed at UTC+9 year-round. The US East Coast shifts between UTC\u22125 (EST) and UTC\u22124 (EDT). When the US springs forward, the gap between the two zones drops by one hour.",
      },
      {
        question:
          "How can teams in Tokyo and New York find a workable meeting time?",
        answer:
          "The narrowest gap is in summer (13 hours). A 7\u20138 AM Eastern meeting falls at 8\u20139 PM JST, which is late but feasible. In winter (14-hour gap), that same 7\u20138 AM Eastern slot is 9\u201310 PM JST. Many teams rely on async communication and reserve live meetings for critical decisions.",
      },
    ],
  },

  // 17. aest-to-est
  {
    slug: "aest-to-est",
    from: zones.AEST,
    to: zones.EST,
    title: "AEST to EST Converter \u2014 Australia Eastern to US Eastern Time",
    description:
      "Convert Australian Eastern Time (AEST/AEDT) to US Eastern Time (EST/EDT). The gap ranges from 14 to 16 hours depending on DST.",
    contextContent: `Australia and the US East Coast are nearly a full day apart. Teams in Sydney and Melbourne working with counterparts in New York or Miami face one of the most challenging timezone pairings for real-time collaboration.

During the northern winter / southern summer (roughly November through March), Sydney is on AEDT (UTC+11) while New York is on EST (UTC\u22125), producing a 16-hour gap. When it is 9 AM Tuesday in Sydney, it is 5 PM Monday in New York.

The situation improves slightly in the northern summer / southern winter (roughly April through October). Sydney shifts to AEST (UTC+10) while New York moves to EDT (UTC\u22124), narrowing the gap to 14 hours. The DST calendars are inverted \u2014 Australia\u2019s summer is the US winter \u2014 which makes this pair one of the few where the offset swings by 2 full hours across the year.`,
    faqs: [
      {
        question:
          "How many hours ahead is Sydney compared to New York?",
        answer:
          "It depends on the season. During the northern winter (November\u2013March), Sydney (AEDT) is 16 hours ahead of New York (EST). During the northern summer (April\u2013October), Sydney (AEST) is 14 hours ahead of New York (EDT). The 2-hour swing is caused by opposite DST calendars.",
      },
      {
        question:
          "Why does the AEST-to-EST offset swing by 2 hours?",
        answer:
          "Australia and the US observe DST in opposite seasons. When Australia springs forward (October), the US has not yet fallen back, widening the gap. When the US springs forward (March), Australia has not yet fallen back, narrowing it. These opposing shifts add up to a 2-hour swing.",
      },
      {
        question:
          "When can teams in Sydney and New York both be online during business hours?",
        answer:
          "The best window in the northern summer is around 7\u20138 AM Eastern (9\u201310 PM AEST). In the northern winter, 6\u20137 AM Eastern corresponds to 10\u201311 PM AEDT. The overlap is minimal, so most teams rely on handoff-based workflows rather than synchronous meetings.",
      },
    ],
  },

  // 18. utc-to-ist
  {
    slug: "utc-to-ist",
    from: zones.UTC,
    to: zones.IST,
    title: "UTC to IST Converter \u2014 Coordinated Universal Time to India",
    description:
      "Convert UTC to India Standard Time (IST). IST is always UTC+5:30 with no Daylight Saving Time adjustments.",
    contextContent: `India\u2019s UTC+5:30 offset is one of the few half-hour timezone shifts in common use. Developers across India regularly convert UTC timestamps from cloud services, CI/CD pipelines, and monitoring tools to local IST.

IST is 5 hours and 30 minutes ahead of UTC, all year. There is no daylight saving adjustment. A deploy logged at 12:00 UTC happened at 5:30 PM IST. A scheduled maintenance window at 02:00 UTC falls at 7:30 AM IST.

The half-hour offset can trip up automated systems that only handle whole-hour zones. When configuring alerting tools or calendar integrations, confirm that the system supports 30-minute offsets. Some older software truncates or rounds, producing incorrect local times.`,
    faqs: [
      {
        question: "What is the UTC to IST offset?",
        answer:
          "IST is UTC+5:30. Add 5 hours and 30 minutes to any UTC time. This offset is fixed year-round because India does not observe Daylight Saving Time.",
      },
      {
        question: "Does IST ever change for Daylight Saving Time?",
        answer:
          "No. India Standard Time is UTC+5:30 throughout the entire year. There is no seasonal clock change in India.",
      },
      {
        question:
          "Why do some tools show the wrong time when converting to IST?",
        answer:
          "IST has a 30-minute offset (UTC+5:30), which some older software does not handle correctly. If a tool only supports whole-hour offsets, it may round to UTC+5 or UTC+6. Verify that your system explicitly supports half-hour timezone offsets.",
      },
    ],
  },

  // 19. pst-to-cst
  {
    slug: "pst-to-cst",
    from: zones.PST,
    to: zones.CST,
    title: "PST to CST Converter \u2014 Pacific to Central Time",
    description:
      "Convert Pacific Time (PST/PDT) to Central Time (CST/CDT). Central is always 2 hours ahead of Pacific.",
    contextContent: `Companies spanning the western and central US handle this conversion routinely. A Seattle engineering team syncing with a Dallas operations center, or a Los Angeles studio coordinating with a Nashville production team, deals with the 2-hour gap throughout the workday.

Central Time is 2 hours ahead of Pacific. When it is 9 AM in Los Angeles, it is 11 AM in Chicago. A late-afternoon 4 PM meeting Pacific-side is already 6 PM Central, at the edge of the workday.

Both zones observe US DST on the same schedule. The 2-hour offset is constant year-round. PST/PDT to CST/CDT is always a simple addition of 2 hours.`,
    faqs: [
      {
        question: "What is the time difference between Pacific and Central time?",
        answer:
          "Central Time is exactly 2 hours ahead of Pacific Time. This holds true year-round because both zones follow the same US DST schedule.",
      },
      {
        question: "Does DST affect the PST-to-CST conversion?",
        answer:
          "No. Both zones switch to daylight saving on the same dates. PST becomes PDT and CST becomes CDT simultaneously, keeping the gap at 2 hours.",
      },
      {
        question:
          "What is a good meeting window for teams in LA and Chicago?",
        answer:
          "9 AM\u20133 PM Pacific works well, corresponding to 11 AM\u20135 PM Central. Starting before 8 AM Pacific pushes Central to before 10 AM, and going past 3 PM Pacific means Central is past 5 PM.",
      },
    ],
  },

  // 20. est-to-ist
  {
    slug: "est-to-ist",
    from: zones.EST,
    to: zones.IST,
    title: "EST to IST Converter \u2014 Eastern to India Standard Time",
    description:
      "Convert Eastern Time (EST/EDT) to India Standard Time (IST). The gap is 10.5 hours in winter and 9.5 hours in summer.",
    contextContent: `The Eastern-to-India corridor is the backbone of US\u2013India outsourcing. New York and New Jersey financial firms, North Carolina banks, and Georgia-based enterprises all manage teams in India\u2019s major tech hubs.

Add 10 hours and 30 minutes to EST to get IST. A 9 AM Eastern kickoff lands at 7:30 PM IST. A 6 AM Eastern standup is 4:30 PM IST, catching the Indian team before their day ends.

When the US shifts to EDT in spring, the offset shrinks to 9 hours and 30 minutes. That 6 AM Eastern standup then lands at 3:30 PM IST. India\u2019s clock never changes, so the full seasonal swing rests on the US side. Teams that schedule meetings at the boundary of the overlap window should adjust their recurring invites in March and November.`,
    faqs: [
      {
        question: "How do I convert Eastern Time to IST?",
        answer:
          "Add 10 hours and 30 minutes during standard time (November\u2013March). During EDT (March\u2013November), add 9 hours and 30 minutes. For example, 8 AM EST is 6:30 PM IST; 8 AM EDT is 5:30 PM IST.",
      },
      {
        question:
          "Does the EST-to-IST gap change during the year?",
        answer:
          "Yes. India does not observe DST, but the US does. When the US shifts to EDT, the gap shrinks by 1 hour. The offset moves between 10.5 hours (winter) and 9.5 hours (summer).",
      },
      {
        question:
          "What is the recommended overlap window for Eastern and IST?",
        answer:
          "Aim for 7\u20139 AM Eastern during winter (5:30\u20137:30 PM IST) or 8\u201310 AM Eastern during summer (5:30\u20137:30 PM IST). This catches the end of India\u2019s workday and the start of the US East Coast\u2019s. Meetings later than 10 AM Eastern fall outside Indian business hours.",
      },
    ],
  },
];
