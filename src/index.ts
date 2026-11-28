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

interface Options {
  /**
   * Set to `true` to use verbose formatting. Defaults to `false`.
   */
  long?: boolean;
}

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
    `Value provided to ms() must be a string or number. value=${serializeValue(value)}`,
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
      `Value provided to ms.parse() must be a string with length between 1 and 99. value=${serializeValue(str)}`,
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
        `Unknown unit "${matchUnit}" provided to ms.parse(). value=${serializeValue(str)}`,
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
function fmtShort(ms: number): StringValue {
  const msAbs = Math.abs(ms);
  if (msAbs >= y) {
    return `${Math.round(ms / y)}y`;
  }
  if (msAbs >= mo) {
    return `${Math.round(ms / mo)}mo`;
  }
  if (msAbs >= w) {
    return `${Math.round(ms / w)}w`;
  }
  if (msAbs >= d) {
    return `${Math.round(ms / d)}d`;
  }
  if (msAbs >= h) {
    return `${Math.round(ms / h)}h`;
  }
  if (msAbs >= m) {
    return `${Math.round(ms / m)}m`;
  }
  if (msAbs >= s) {
    return `${Math.round(ms / s)}s`;
  }
  return `${ms}ms`;
}

/**
 * Long format for `ms`.
 */
function fmtLong(ms: number): StringValue {
  const msAbs = Math.abs(ms);
  if (msAbs >= y) {
    return plural(ms, msAbs, y, 'year');
  }
  if (msAbs >= mo) {
    return plural(ms, msAbs, mo, 'month');
  }
  if (msAbs >= w) {
    return plural(ms, msAbs, w, 'week');
  }
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return `${ms} ms`;
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

  return options?.long ? fmtLong(ms) : fmtShort(ms);
}

/**
 * Pluralization helper.
 */
function plural(
  ms: number,
  msAbs: number,
  n: number,
  name: string,
): StringValue {
  const isPlural = msAbs >= n * 1.5;
  return `${Math.round(ms / n)} ${name}${isPlural ? 's' : ''}` as StringValue;
}

/**
 * Safely serialize any value to a bounded string for error messages,
 * preventing thread-blocking serialization on sparse arrays or huge objects,
 * and avoiding throwing on circular references or BigInt values.
 */
function serializeValue(value: unknown): string {
  const str = safeStringify(value);
  return str.length > 100 ? `${str.slice(0, 97)}...` : str;
}

function safeStringify(
  value: unknown,
  seen: Set<unknown> = new Set(),
  depth = 0,
): string {
  if (value === null) {
    return 'null';
  }
  if (value === undefined) {
    return 'undefined';
  }
  if (typeof value === 'string') {
    return JSON.stringify(
      value.length > 100 ? `${value.slice(0, 97)}...` : value,
    );
  }
  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }
  if (typeof value === 'bigint') {
    const str = `${value}n`;
    return str.length > 100 ? `${str.slice(0, 97)}...` : str;
  }
  if (typeof value === 'symbol') {
    return String(value);
  }
  if (typeof value === 'function') {
    return '[Function]';
  }

  if (seen.has(value)) {
    return '[Circular]';
  }
  if (depth >= 2) {
    return Array.isArray(value) ? '[...]' : '{...}';
  }

  seen.add(value);
  try {
    if (Array.isArray(value)) {
      const items: string[] = [];
      const limit = Math.min(value.length, 10);
      for (let i = 0; i < limit; i++) {
        try {
          items.push(
            i in value ? safeStringify(value[i], seen, depth + 1) : 'null',
          );
        } catch {
          items.push('[Unserializable]');
        }
      }
      if (value.length > 10) {
        items.push('...');
      }
      return `[${items.join(',')}]`;
    }

    let keys: string[];
    try {
      keys = Object.keys(value);
    } catch {
      return '[Unserializable]';
    }

    const entries: string[] = [];
    const limit = Math.min(keys.length, 10);
    for (let i = 0; i < limit; i++) {
      const key = keys[i];
      try {
        const valStr = safeStringify(
          (value as Record<string, unknown>)[key],
          seen,
          depth + 1,
        );
        entries.push(`${JSON.stringify(key)}:${valStr}`);
      } catch {
        entries.push(`${JSON.stringify(key)}:[Unserializable]`);
      }
    }
    if (keys.length > 10) {
      entries.push('...');
    }
    return `{${entries.join(',')}}`;
  } finally {
    seen.delete(value);
  }
}
