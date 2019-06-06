/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * @param {String|Number} val
 * @param {Boolean} toLong verbose string formatting [false]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

export default function(val, toLong) {
  var abs,
    fmt,
    type = typeof val;

  if (type === 'string' && val.length > 0) {
    return parse(val);
  }

  if (type === 'number' && isFinite(val)) {
    fmt = plural.bind(plural, toLong, val, (abs = Math.abs(val)));

    if (abs >= d) return fmt(d, 'day', 'd');
    if (abs >= h) return fmt(h, 'hour', 'h');
    if (abs >= m) return fmt(m, 'minute', 'm');
    if (abs >= s) return fmt(s, 'second', 's');

    return val + (toLong ? ' ' : '') + 'ms';
  }

  throw new Error(
    'val is an empty string or a invalid number. val=' + JSON.stringify(val)
  );
}

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  if (str.length > 100) {
    return;
  }
  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
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
      return;
  }
}

/**
 * Pluralization helper.
 */

function plural(isLong, ms, abs, interval, l1, l2) {
  return (
    Math.round(ms / interval) +
    (isLong ? ' ' + l1 + (abs >= interval * 1.5 ? 's' : '') : l2)
  );
}
