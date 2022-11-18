import LOCALES from "./locales";
import TIMEZONES from "./timezones";

/** Note: dateStyle can be used with timeStyle,
 * but not with other options (e.g. weekday, hour, month, etc.). */
const DATE_STYLES = ["full", "long", "medium", "short"] as const;

/**
 * Note: timeStyle can be used with dateStyle,
 * but not with other options (e.g. weekday, hour, month, etc.).
 */
const TIME_STYLES = ["full", "long", "medium", "short"] as const;

/**Might be relevant later */
const CALENDAR = [
  "buddhist",
  "chinese",
  "coptic",
  "dangi",
  "ethioaa",
  "ethiopic",
  "gregory",
  "hebrew",
  "indian",
  "islamic",
  "islamic-umalqura",
  "islamic-tbla",
  "islamic-civil",
  "islamic-rgsa",
  "iso8601",
  "japanese",
  "persian",
  "roc",
  "islamic-civil",
] as const;

const DAY_PERIODS = ["narrow", "short", "long"] as const;

const WEEK_DAYS = ["narrow", "short", "long"] as const;

const YEARS = ["numeric", "2-digit"] as const;

const ERAS = ["narrow", "short", "long"] as const;

const MONTHS = ["numeric", "2-digit", "narrow", "short", "long"] as const;

const DAYS = ["numeric", "2-digit"] as const;

const HOURS = ["numeric", "2-digit"] as const;

const MINUTES = ["numeric", "2-digit"] as const;

const SECONDS = ["numeric", "2-digit"] as const;

const FRACTIONAL_SECOND_DIGITS = [1, 2, 3] as const;

export {
  LOCALES,
  DATE_STYLES,
  TIME_STYLES,
  CALENDAR,
  DAY_PERIODS,
  TIMEZONES,
  WEEK_DAYS,
  YEARS,
  ERAS,
  MONTHS,
  DAYS,
  HOURS,
  MINUTES,
  SECONDS,
  FRACTIONAL_SECOND_DIGITS,
};
