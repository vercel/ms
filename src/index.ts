// Helpers.
const s = 1000;
const m = s * 60;
const h = m * 60;
const d = h * 24;
const w = d * 7;
const y = d * 365.25;

type Unit =
  | 'Years'
  | 'Year'
  | 'Yrs'
  | 'Yr'
  | 'Y'
  | 'Weeks'
  | 'Week'
  | 'W'
  | 'Days'
  | 'Day'
  | 'D'
  | 'Hours'
  | 'Hour'
  | 'Hrs'
  | 'Hr'
  | 'H'
  | 'Minutes'
  | 'Minute'
  | 'Mins'
  | 'Min'
  | 'M'
  | 'Seconds'
  | 'Second'
  | 'Secs'
  | 'Sec'
  | 's'
  | 'Milliseconds'
  | 'Millisecond'
  | 'Msecs'
  | 'Msec'
  | 'Ms';

type UnitAnyCase = Unit | Uppercase<Unit> | Lowercase<Unit>;

export type StringValue =
  | `${number}`
  | `${number}${UnitAnyCase}`
  | `${number} ${UnitAnyCase}`;

interface Options {
  /**
   * Set to `true` to use verbose formatting.
   *
   * @defaultValue `false`
   */
  long?: boolean;

  /**
   * Set to `true` to enable rounding.
   * @example
   * ```
   * ms(4567, { round: false }) // 4567ms
   * ```
   *
   * When set to a `number`, it will be used to set the precision.
   * @example
   * ```
   * ms(4567, { round: 1 }) // 4.6s
   * ms(4567, { round: 2 }) // 4.57s
   * ms(4567, { round: 3 }) // 4.567s
   * ```
   *
   * @defaultValue `true`
   */
  round?: boolean | number;
}

/**
 * Parse or format the given value.
 *
 * @param value - The string or number to convert
 * @param options - Options for the conversion
 * @throws Error if `value` is not a non-empty string or a number
 */
function msFn(value: StringValue, options?: Options): number;
function msFn(value: number, options?: Options): string;
function msFn(
  value: StringValue | number,
  options: Options = { round: true, long: false },
): number | string {
  try {
    if (typeof value === 'string' && value.length > 0) {
      return parse(value);
    } else if (typeof value === 'number' && isFinite(value)) {
      return options.long
        ? fmtLong(value, options.round ?? true)
        : fmtShort(value, options.round ?? true);
    }
    throw new Error('Value is not a string or number.');
  } catch (error) {
    const message = isError(error)
      ? `${error.message}. value=${JSON.stringify(value)}`
      : 'An unknown error has occurred.';
    throw new Error(message);
  }
}

/**
 * Parse the given string and return milliseconds.
 *
 * @param str - A string to parse to milliseconds
 * @returns The parsed value in milliseconds, or `NaN` if the string can't be
 * parsed
 */
function parse(str: string): number {
  if (str.length > 100) {
    throw new Error('Value exceeds the maximum length of 100 characters.');
  }
  const match =
    /^(?<value>-?(?:\d+)?\.?\d+) *(?<type>milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
      str,
    );
  // Named capture groups need to be manually typed today.
  // https://github.com/microsoft/TypeScript/issues/32098
  const groups = match?.groups as { value: string; type?: string } | undefined;
  if (!groups) {
    return NaN;
  }
  const n = parseFloat(groups.value);
  const type = (groups.type || 'ms').toLowerCase() as Lowercase<Unit>;
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
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
      // This should never occur.
      throw new Error(
        `The unit ${type as string} was matched, but no matching case exists.`,
      );
  }
}

// eslint-disable-next-line import/no-default-export
export default msFn;

function shouldRound(value: number, round: boolean | number): number {
  if (typeof round === 'number') {
    return value.toFixed(round) as unknown as number; // Required to display the correct decimal point.
  } else if (typeof round === 'boolean' && round) {
    return Math.round(value);
  }

  return value;
}

/**
 * Short format for `ms`.
 */
function fmtShort(ms: number, round: boolean | number): StringValue {
  const msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return `${shouldRound(ms / d, round)}d`;
  }
  if (msAbs >= h) {
    return `${shouldRound(ms / h, round)}h`;
  }
  if (msAbs >= m) {
    return `${shouldRound(ms / m, round)}m`;
  }
  if (msAbs >= s) {
    return `${shouldRound(ms / s, round)}s`;
  }
  return `${ms}ms`;
}

/**
 * Long format for `ms`.
 */
function fmtLong(ms: number, round: boolean | number): StringValue {
  const msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day', round);
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour', round);
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute', round);
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second', round);
  }
  return `${ms} ms`;
}

/**
 * Pluralization helper.
 */
function plural(
  ms: number,
  msAbs: number,
  n: number,
  name: string,
  round: boolean | number,
): StringValue {
  const isPlural = msAbs >= n * 1.5;
  return `${shouldRound(ms / n, round)} ${name}${
    isPlural ? 's' : ''
  }` as StringValue;
}

/**
 * A type guard for errors.
 *
 * @param value - The value to test
 * @returns A boolean `true` if the provided value is an Error-like object
 */
function isError(value: unknown): value is Error {
  return typeof value === 'object' && value !== null && 'message' in value;
}
