const s = 1000;
const m = s * 60;
const h = m * 60;
const d = h * 24;
const w = d * 7;
const y = d * 365.25;
const mo = y / 12;

type Years = 'years' | 'year' | 'yrs' | 'yr' | 'y';
type Months = 'months' | 'month' | 'mo';
type Weeks = 'weeks' | 'week' | 'w';
type Days = 'days' | 'day' | 'd';
type Hours = 'hours' | 'hour' | 'hrs' | 'hr' | 'h';
type Minutes = 'minutes' | 'minute' | 'mins' | 'min' | 'm';
type Seconds = 'seconds' | 'second' | 'secs' | 'sec' | 's';
type Milliseconds = 'milliseconds' | 'millisecond' | 'msecs' | 'msec' | 'ms';
type Unit =
  | Years
  | Months
  | Weeks
  | Days
  | Hours
  | Minutes
  | Seconds
  | Milliseconds;

type UnitAnyCase = Capitalize<Unit> | Uppercase<Unit> | Unit;

export type StringValue =
  | `${number}`
  | `${number}${UnitAnyCase}`
  | `${number} ${UnitAnyCase}`;

export interface LocaleDefinition {
  shortUnits: {
    ms: string;
    s: string;
    m: string;
    h: string;
    d: string;
    w: string;
    mo: string;
    y: string;
  };
  longUnits: {
    millisecond: [string, string];
    second: [string, string];
    minute: [string, string];
    hour: [string, string];
    day: [string, string];
    week: [string, string];
    month: [string, string];
    year: [string, string];
  };
  /**
   * Receives rounded abs display value, returns true if plural form should be used.
   * Defaults to English-style: `msAbs >= unit * 1.5`.
   */
  isPlural?: (value: number) => boolean;
}

export interface Options {
  /**
   * Set to `true` to use verbose formatting. Defaults to `false`.
   */
  long?: boolean;
  /**
   * Locale definition for formatting. Defaults to English.
   */
  locale?: LocaleDefinition;
}

export const en: LocaleDefinition = {
  shortUnits: {
    ms: 'ms',
    s: 's',
    m: 'm',
    h: 'h',
    d: 'd',
    w: 'w',
    mo: 'mo',
    y: 'y',
  },
  longUnits: {
    millisecond: ['ms', 'ms'],
    second: ['second', 'seconds'],
    minute: ['minute', 'minutes'],
    hour: ['hour', 'hours'],
    day: ['day', 'days'],
    week: ['week', 'weeks'],
    month: ['month', 'months'],
    year: ['year', 'years'],
  },
};

export { ar } from './locales/ar';
export { de } from './locales/de';
export { es } from './locales/es';
export { fr } from './locales/fr';
export { zh } from './locales/zh';

/**
 * Parse or format the given value.
 *
 * @param value - The string or number to convert
 * @param options - Options for the conversion
 * @throws Error if `value` is not a non-empty string or a number
 */
export function ms(value: StringValue, options?: Options): number;
export function ms(value: number, options?: Options): string;
export function ms(
  value: StringValue | number,
  options?: Options,
): number | string {
  if (typeof value === 'string') {
    return parse(value);
  } else if (typeof value === 'number') {
    return format(value, options);
  }
  throw new Error(
    `Value provided to ms() must be a string or number. value=${JSON.stringify(value)}`,
  );
}

/**
 * Parse the given string and return milliseconds.
 *
 * @param str - A string to parse to milliseconds
 * @returns The parsed value in milliseconds, or `NaN` if the string can't be
 * parsed
 */
export function parse(str: string): number {
  if (typeof str !== 'string' || str.length === 0 || str.length > 100) {
    throw new Error(
      `Value provided to ms.parse() must be a string with length between 1 and 99. value=${JSON.stringify(str)}`,
    );
  }
  const match =
    /^(?<value>-?\d*\.?\d+) *(?<unit>milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|months?|mo|years?|yrs?|y)?$/i.exec(
      str,
    );

  if (!match?.groups) {
    return NaN;
  }

  // Named capture groups need to be manually typed today.
  // https://github.com/microsoft/TypeScript/issues/32098
  const { value, unit = 'ms' } = match.groups as {
    value: string;
    unit: string | undefined;
  };

  const n = parseFloat(value);

  const matchUnit = unit.toLowerCase() as Lowercase<Unit>;

  /* istanbul ignore next - istanbul doesn't understand, but thankfully the TypeScript the exhaustiveness check in the default case keeps us type safe here */
  switch (matchUnit) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'months':
    case 'month':
    case 'mo':
      return n * mo;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      matchUnit satisfies never;
      throw new Error(
        `Unknown unit "${matchUnit}" provided to ms.parse(). value=${JSON.stringify(str)}`,
      );
  }
}

/**
 * Parse the given StringValue and return milliseconds.
 *
 * @param value - A typesafe StringValue to parse to milliseconds
 * @returns The parsed value in milliseconds, or `NaN` if the string can't be
 * parsed
 */
export function parseStrict(value: StringValue): number {
  return parse(value);
}

/**
 * Short format for `ms`.
 */
function fmtShort(ms: number, locale: LocaleDefinition): string {
  const msAbs = Math.abs(ms);
  const u = locale.shortUnits;
  if (msAbs >= y) {
    return `${Math.round(ms / y)}${u.y}`;
  }
  if (msAbs >= mo) {
    return `${Math.round(ms / mo)}${u.mo}`;
  }
  if (msAbs >= w) {
    return `${Math.round(ms / w)}${u.w}`;
  }
  if (msAbs >= d) {
    return `${Math.round(ms / d)}${u.d}`;
  }
  if (msAbs >= h) {
    return `${Math.round(ms / h)}${u.h}`;
  }
  if (msAbs >= m) {
    return `${Math.round(ms / m)}${u.m}`;
  }
  if (msAbs >= s) {
    return `${Math.round(ms / s)}${u.s}`;
  }
  return `${ms}${u.ms}`;
}

/**
 * Long format for `ms`.
 */
function fmtLong(ms: number, locale: LocaleDefinition): string {
  const msAbs = Math.abs(ms);
  const { longUnits, isPlural } = locale;
  if (msAbs >= y) {
    return fmtPlural(ms, msAbs, y, longUnits.year, isPlural);
  }
  if (msAbs >= mo) {
    return fmtPlural(ms, msAbs, mo, longUnits.month, isPlural);
  }
  if (msAbs >= w) {
    return fmtPlural(ms, msAbs, w, longUnits.week, isPlural);
  }
  if (msAbs >= d) {
    return fmtPlural(ms, msAbs, d, longUnits.day, isPlural);
  }
  if (msAbs >= h) {
    return fmtPlural(ms, msAbs, h, longUnits.hour, isPlural);
  }
  if (msAbs >= m) {
    return fmtPlural(ms, msAbs, m, longUnits.minute, isPlural);
  }
  if (msAbs >= s) {
    return fmtPlural(ms, msAbs, s, longUnits.second, isPlural);
  }
  const shouldBePlural = isPlural ? isPlural(msAbs) : msAbs >= 1.5;
  return `${ms} ${shouldBePlural ? longUnits.millisecond[1] : longUnits.millisecond[0]}`;
}

/**
 * Format the given integer as a string.
 *
 * @param ms - milliseconds
 * @param options - Options for the conversion
 * @returns The formatted string
 */
export function format(ms: number, options?: Options): string {
  if (typeof ms !== 'number' || !Number.isFinite(ms)) {
    throw new Error('Value provided to ms.format() must be of type number.');
  }

  const locale = options?.locale ?? en;
  return options?.long ? fmtLong(ms, locale) : fmtShort(ms, locale);
}

/**
 * Pluralization helper.
 */
function fmtPlural(
  ms: number,
  msAbs: number,
  n: number,
  units: [string, string],
  isPlural?: (value: number) => boolean,
): string {
  const value = Math.round(ms / n);
  const absValue = Math.abs(value);
  const shouldBePlural = isPlural ? isPlural(absValue) : msAbs >= n * 1.5;
  return `${value} ${shouldBePlural ? units[1] : units[0]}`;
}
