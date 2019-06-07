/**
 * Helpers.
 */

var s = 1e3;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

var rgx = /^(-?(?:\d+)?\.?\d+) *([a-z]+)?$/;

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
    if ((fmt = val.length < 101 && val.toLowerCase().match(rgx))) {
      if ((abs = parseFloat(fmt[1], 10))) {
        return convert(abs, fmt[2]);
      }
    }
    return abs;
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
    'val is an empty string or an invalid number. val=' + JSON.stringify(val)
  );
}

/**
 * Convert the `str` segments into milliseconds.
 *
 * @param {Array} arr  The RegExp matches
 * @return {Number}
 * @api private
 */

function convert(num, type) {
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return num * y;
    case 'weeks':
    case 'week':
    case 'w':
      return num * d * 7;
    case 'days':
    case 'day':
    case 'd':
      return num * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return num * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return num * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return num * s;
  }
  return num;
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
