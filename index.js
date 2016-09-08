/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;
var separators = [' ', '.', ','];

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} options
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options){
  options = options || {};
  if ('string' === typeof val) return parse(val);
  return options['long']
    ? fmtLong(val)
    : fmtShort(val);
};

/**
 * Parse the given `str` and return milliseconds. Can contain multiple units.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  var units = tokenize(str);
  if (!units.length) { return; }

  var ms = 0;
  var parsed, i;
  for (i = 0; i < units.length; i++) {
    parsed = parseString(units[i]);
    if ('undefined' === typeof parsed) { return; }
    ms += parsed;
  }
  return ms;
}

/**
 * Splits the given `str` into multiple unit/value tokens.
 *
 * @param {String} str
 * @return {Array}
 * @api private
 */

function tokenize(str) {
  var units = [];
  var buf = '';
  var sawLetter = false;
  var i, c;
  for (i = 0; i < str.length; i++) {
    c = str[i];
    if (~separators.indexOf(c)) {
      buf += c;
    } else if (isNaN(c)) {
      sawLetter = true;
      buf += c;
    } else {
      if (sawLetter) {
        units.push(buf.trim());
        buf = '';
      }
      sawLetter = false;
      buf += c;
    }
  }
  if (buf.length) { units.push(buf.trim()); }
  return units;
}

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parseString(str) {
  str = '' + str;
  if (str.length > 10000) return;
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
  if (!match) return;
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
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  if (ms >= d) return Math.round(ms / d) + 'd';
  if (ms >= h) return Math.round(ms / h) + 'h';
  if (ms >= m) return Math.round(ms / m) + 'm';
  if (ms >= s) return Math.round(ms / s) + 's';
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  return plural(ms, d, 'day')
    || plural(ms, h, 'hour')
    || plural(ms, m, 'minute')
    || plural(ms, s, 'second')
    || ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) return;
  if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name;
  return Math.ceil(ms / n) + ' ' + name + 's';
}
