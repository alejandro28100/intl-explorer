import LOCALES from "./locales";

/** Note: dateStyle can be used with timeStyle,
 * but not with other options (e.g. weekday, hour, month, etc.). */
const DATE_STYLES = ["full", "long", "medium", "short"];

/**
 * Note: timeStyle can be used with dateStyle,
 * but not with other options (e.g. weekday, hour, month, etc.).
 */
const TIME_STYLES = ["full", "long", "medium", "short"];

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
export { LOCALES, DATE_STYLES, TIME_STYLES, CALENDAR };
