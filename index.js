
/**
 * Helpers.
 */
// Constants for times array
var PLURAL = 0;
var SINGULAR = 1;
var TINY = 2;

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var times = null;

/**
 * Parse or format the given `val`.
 *
 * @param {String|Number} val
 * @param {String} lang
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, lang){
  times = require('./lang/' + (lang || 'en'));
  if ('string' == typeof val) return parse(val);
  return format(val);
}

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  var m = times.regex.exec(str);
  if (!m) return;
  var n = parseFloat(m[1]);
  var type = (m[2] || 'ms').toLowerCase();
  switch (type) {
    case times.years[PLURAL]:
    case times.years[SINGULAR]:
    case times.years[TINY]:
      return n * 31557600000;
    case times.days[PLURAL]:
    case times.days[SINGULAR]:
    case times.days[TINY]:
      return n * 86400000;
    case times.hours[PLURAL]:
    case times.hours[SINGULAR]:
    case times.hours[TINY]:
      return n * 3600000;
    case times.minutes[PLURAL]:
    case times.minutes[SINGULAR]:
    case times.minutes[TINY]:
      return n * 60000;
    case times.seconds[PLURAL]:
    case times.seconds[SINGULAR]:
    case times.seconds[TINY]:
      return n * 1000;
    case times.miliseconds[PLURAL]:
    case times.miliseconds[SINGULAR]:
    case times.miliseconds[TINY]:
      return n;
  }
}

/**
 * Format the given `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api public
 */

function format(ms) {
  if (ms == d) return (ms / d) + ' ' + times.days[SINGULAR];
  if (ms > d) return (ms / d) + ' ' + times.days[PLURAL];
  if (ms == h) return (ms / h) + ' ' + times.hours[SINGULAR];
  if (ms > h) return (ms / h) + ' ' + times.hours[PLURAL];
  if (ms == m) return (ms / m) + ' ' + times.minutes[SINGULAR];
  if (ms > m) return (ms / m) + ' ' + times.minutes[PLURAL];
  if (ms == s) return (ms / s) + ' ' + times.seconds[SINGULAR];
  if (ms > s) return (ms / s) + ' ' + times.seconds[PLURAL];
  return ms + ' ' + times.miliseconds[TINY];
}