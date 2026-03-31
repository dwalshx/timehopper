/**
 * timezone-zones.ts
 *
 * Complete timezone zone data covering all major UTC offsets (UTC-12 through UTC+14).
 * 38 entries, one per offset or distinct zone.
 *
 * CRITICAL DESIGN NOTE:
 * The `utcOffsetMinutes` field is for DISPLAY AND GROUPING ONLY.
 * It stores the standard (non-DST) offset as integer minutes from UTC.
 * Using minutes (not hours) avoids JS float issues: UTC+5:30 = 330, UTC+5:45 = 345.
 *
 * ALL live time calculations must use the `iana` field via the Intl API:
 *   new Intl.DateTimeFormat('en', { timeZone: zone.iana, ... }).format(date)
 *
 * This file has ZERO imports. The 12 `converterPair` slugs are hardcoded string
 * literals to avoid a circular dependency on timezone-pairs.ts.
 */

export interface TimezoneZone {
  /** IANA timezone identifier. Used for ALL time resolution via Intl API. */
  iana: string;
  /** Short abbreviation shown in UI, e.g. "EST", "IST". */
  abbr: string;
  /** UTC offset in minutes. Display and grouping only — never use for time math.
   *  Minutes avoids float issues: +5:30 = 330, +5:45 = 345, +12:45 = 765. */
  utcOffsetMinutes: number;
  /** Human-readable region label, e.g. "US East Coast", "India" */
  region: string;
  /** One representative major city, e.g. "New York", "Mumbai" */
  city: string;
  /** Whether this zone observes daylight saving time. */
  hasDST: boolean;
  /** Slug of the canonical converter pair if one exists in timezone-pairs.ts.
   *  Null for zones without an existing converter page.
   *  NOTE: These are hardcoded string literals — do NOT import from timezone-pairs.ts. */
  converterPair: string | null;
}

export const timezoneZones: TimezoneZone[] = [
  // UTC-12:00
  {
    iana: "Etc/GMT+12",
    abbr: "BIT",
    utcOffsetMinutes: -720,
    region: "Baker Island",
    city: "Baker Island",
    hasDST: false,
    converterPair: null,
  },
  // UTC-11:00
  {
    iana: "Pacific/Pago_Pago",
    abbr: "SST",
    utcOffsetMinutes: -660,
    region: "American Samoa",
    city: "Pago Pago",
    hasDST: false,
    converterPair: null,
  },
  // UTC-10:00
  {
    iana: "Pacific/Honolulu",
    abbr: "HST",
    utcOffsetMinutes: -600,
    region: "Hawaii",
    city: "Honolulu",
    hasDST: false,
    converterPair: null,
  },
  // UTC-9:30 (half-hour zone)
  {
    iana: "Pacific/Marquesas",
    abbr: "MART",
    utcOffsetMinutes: -570,
    region: "Marquesas Islands",
    city: "Taiohae",
    hasDST: false,
    converterPair: null,
  },
  // UTC-9:00
  {
    iana: "America/Anchorage",
    abbr: "AKST",
    utcOffsetMinutes: -540,
    region: "Alaska",
    city: "Anchorage",
    hasDST: true,
    converterPair: null,
  },
  // UTC-8:00
  {
    iana: "America/Los_Angeles",
    abbr: "PST",
    utcOffsetMinutes: -480,
    region: "US West Coast",
    city: "Los Angeles",
    hasDST: true,
    converterPair: "pst-to-est",
  },
  // UTC-7:00
  {
    iana: "America/Denver",
    abbr: "MST",
    utcOffsetMinutes: -420,
    region: "US Mountain",
    city: "Denver",
    hasDST: true,
    converterPair: null,
  },
  // UTC-6:00
  {
    iana: "America/Chicago",
    abbr: "CST",
    utcOffsetMinutes: -360,
    region: "US Central",
    city: "Chicago",
    hasDST: true,
    converterPair: "cst-to-est",
  },
  // UTC-5:00
  {
    iana: "America/New_York",
    abbr: "EST",
    utcOffsetMinutes: -300,
    region: "US East Coast",
    city: "New York",
    hasDST: true,
    converterPair: "est-to-pst",
  },
  // UTC-4:00
  {
    iana: "America/Halifax",
    abbr: "AST",
    utcOffsetMinutes: -240,
    region: "Atlantic Canada",
    city: "Halifax",
    hasDST: true,
    converterPair: null,
  },
  // UTC-3:30 (half-hour zone — TZD-03)
  {
    iana: "America/St_Johns",
    abbr: "NST",
    utcOffsetMinutes: -210,
    region: "Newfoundland",
    city: "St. John's",
    hasDST: true,
    converterPair: null,
  },
  // UTC-3:00
  {
    iana: "America/Sao_Paulo",
    abbr: "BRT",
    utcOffsetMinutes: -180,
    region: "Brazil",
    city: "Sao Paulo",
    hasDST: true,
    converterPair: null,
  },
  // UTC-2:00
  {
    iana: "America/Noronha",
    abbr: "FNT",
    utcOffsetMinutes: -120,
    region: "Fernando de Noronha",
    city: "Fernando de Noronha",
    hasDST: false,
    converterPair: null,
  },
  // UTC-1:00
  {
    iana: "Atlantic/Azores",
    abbr: "AZOT",
    utcOffsetMinutes: -60,
    region: "Azores",
    city: "Ponta Delgada",
    hasDST: true,
    converterPair: null,
  },
  // UTC+0:00 (UTC — no DST)
  {
    iana: "Etc/UTC",
    abbr: "UTC",
    utcOffsetMinutes: 0,
    region: "Universal",
    city: "\u2014",
    hasDST: false,
    converterPair: "utc-to-est",
  },
  // UTC+0:00 (GMT / London — observes DST)
  {
    iana: "Europe/London",
    abbr: "GMT",
    utcOffsetMinutes: 0,
    region: "United Kingdom",
    city: "London",
    hasDST: true,
    converterPair: "gmt-to-est",
  },
  // UTC+1:00
  {
    iana: "Europe/Berlin",
    abbr: "CET",
    utcOffsetMinutes: 60,
    region: "Central Europe",
    city: "Berlin",
    hasDST: true,
    converterPair: "cet-to-est",
  },
  // UTC+2:00
  {
    iana: "Europe/Athens",
    abbr: "EET",
    utcOffsetMinutes: 120,
    region: "Eastern Europe",
    city: "Athens",
    hasDST: true,
    converterPair: null,
  },
  // UTC+3:00
  {
    iana: "Asia/Riyadh",
    abbr: "AST",
    utcOffsetMinutes: 180,
    region: "Arabia",
    city: "Riyadh",
    hasDST: false,
    converterPair: null,
  },
  // UTC+3:30 (half-hour zone — TZD-03)
  {
    iana: "Asia/Tehran",
    abbr: "IRST",
    utcOffsetMinutes: 210,
    region: "Iran",
    city: "Tehran",
    hasDST: true,
    converterPair: null,
  },
  // UTC+4:00
  {
    iana: "Asia/Dubai",
    abbr: "GST",
    utcOffsetMinutes: 240,
    region: "Gulf / UAE",
    city: "Dubai",
    hasDST: false,
    converterPair: null,
  },
  // UTC+4:30
  {
    iana: "Asia/Kabul",
    abbr: "AFT",
    utcOffsetMinutes: 270,
    region: "Afghanistan",
    city: "Kabul",
    hasDST: false,
    converterPair: null,
  },
  // UTC+5:00
  {
    iana: "Asia/Karachi",
    abbr: "PKT",
    utcOffsetMinutes: 300,
    region: "Pakistan",
    city: "Karachi",
    hasDST: false,
    converterPair: null,
  },
  // UTC+5:30 (half-hour zone — TZD-03)
  {
    iana: "Asia/Kolkata",
    abbr: "IST",
    utcOffsetMinutes: 330,
    region: "India",
    city: "Mumbai",
    hasDST: false,
    converterPair: "ist-to-est",
  },
  // UTC+5:45 (quarter-hour zone — TZD-03)
  {
    iana: "Asia/Kathmandu",
    abbr: "NPT",
    utcOffsetMinutes: 345,
    region: "Nepal",
    city: "Kathmandu",
    hasDST: false,
    converterPair: null,
  },
  // UTC+6:00
  {
    iana: "Asia/Dhaka",
    abbr: "BST",
    utcOffsetMinutes: 360,
    region: "Bangladesh",
    city: "Dhaka",
    hasDST: false,
    converterPair: null,
  },
  // UTC+6:30
  {
    iana: "Asia/Yangon",
    abbr: "MMT",
    utcOffsetMinutes: 390,
    region: "Myanmar",
    city: "Yangon",
    hasDST: false,
    converterPair: null,
  },
  // UTC+7:00
  {
    iana: "Asia/Bangkok",
    abbr: "ICT",
    utcOffsetMinutes: 420,
    region: "Indochina",
    city: "Bangkok",
    hasDST: false,
    converterPair: null,
  },
  // UTC+8:00
  {
    iana: "Asia/Singapore",
    abbr: "SGT",
    utcOffsetMinutes: 480,
    region: "Singapore / SE Asia",
    city: "Singapore",
    hasDST: false,
    converterPair: null,
  },
  // UTC+8:45 (quarter-hour zone)
  {
    iana: "Australia/Eucla",
    abbr: "ACWST",
    utcOffsetMinutes: 525,
    region: "Eucla (AU)",
    city: "Eucla",
    hasDST: false,
    converterPair: null,
  },
  // UTC+9:00
  {
    iana: "Asia/Tokyo",
    abbr: "JST",
    utcOffsetMinutes: 540,
    region: "Japan / Korea",
    city: "Tokyo",
    hasDST: false,
    converterPair: "jst-to-est",
  },
  // UTC+9:30 (half-hour zone — TZD-03)
  {
    iana: "Australia/Darwin",
    abbr: "ACST",
    utcOffsetMinutes: 570,
    region: "Australia Central",
    city: "Darwin",
    hasDST: false,
    converterPair: null,
  },
  // UTC+10:00
  {
    iana: "Australia/Sydney",
    abbr: "AEST",
    utcOffsetMinutes: 600,
    region: "Australia East",
    city: "Sydney",
    hasDST: true,
    converterPair: "aest-to-est",
  },
  // UTC+10:30
  {
    iana: "Pacific/Norfolk",
    abbr: "NFT",
    utcOffsetMinutes: 630,
    region: "Norfolk Island",
    city: "Kingston",
    hasDST: true,
    converterPair: null,
  },
  // UTC+11:00
  {
    iana: "Pacific/Noumea",
    abbr: "NCT",
    utcOffsetMinutes: 660,
    region: "New Caledonia",
    city: "Noumea",
    hasDST: false,
    converterPair: null,
  },
  // UTC+12:00
  {
    iana: "Pacific/Auckland",
    abbr: "NZST",
    utcOffsetMinutes: 720,
    region: "New Zealand",
    city: "Auckland",
    hasDST: true,
    converterPair: null,
  },
  // UTC+12:45 (quarter-hour zone — TZD-03)
  {
    iana: "Pacific/Chatham",
    abbr: "CHAST",
    utcOffsetMinutes: 765,
    region: "Chatham Islands",
    city: "Waitangi",
    hasDST: true,
    converterPair: null,
  },
  // UTC+13:00
  {
    iana: "Pacific/Tongatapu",
    abbr: "TOT",
    utcOffsetMinutes: 780,
    region: "Tonga",
    city: "Nuku\u02bbalofa",
    hasDST: false,
    converterPair: null,
  },
  // UTC+14:00
  {
    iana: "Pacific/Kiritimati",
    abbr: "LINT",
    utcOffsetMinutes: 840,
    region: "Kiribati (Line Is.)",
    city: "Christmas Island",
    hasDST: false,
    converterPair: null,
  },
];

/**
 * Format a UTC offset in minutes as a display label.
 * Examples: 0 → "UTC+0", 330 → "UTC+5:30", -300 → "UTC-5", 765 → "UTC+12:45"
 *
 * This is a display utility only. Never use minute values for time math.
 */
export function formatOffsetLabel(minutes: number): string {
  const sign = minutes >= 0 ? "+" : "-";
  const abs = Math.abs(minutes);
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  return m === 0 ? `UTC${sign}${h}` : `UTC${sign}${h}:${String(m).padStart(2, "0")}`;
}
