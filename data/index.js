import LOCALES from "./locales";
import TIMEZONES from "./timezones";

/** Note: dateStyle can be used with timeStyle,
 * but not with other options (e.g. weekday, hour, month, etc.). */
const DATE_STYLES = ["full", "long", "medium", "short"];

/**
 * Note: timeStyle can be used with dateStyle,
 * but not with other options (e.g. weekday, hour, month, etc.).
 */
const TIME_STYLES = ["full", "long", "medium", "short"];

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
];

const DAY_PERIODS = ["narrow", "short", "long"];

const WEEK_DAYS = ["narrow", "short", "long"];

export {
  LOCALES,
  DATE_STYLES,
  TIME_STYLES,
  CALENDAR,
  DAY_PERIODS,
  TIMEZONES,
  WEEK_DAYS,
};
