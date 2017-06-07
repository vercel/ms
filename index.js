'use strict';

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

var scales = new Map(
	[
    ['years', y],
    ['year', y],
    ['yrs', y],
    ['yr', y],
    ['y', y],
    ['days', d],
    ['day', d],
    ['d', d],
    ['hours', h],
    ['hour', h],
    ['hrs', h],
    ['hr', h],
    ['h', h],
    ['minutes', m],
    ['minute', m],
    ['mins', m],
    ['min', m],
    ['m', m],
    ['seconds', s],
    ['second', s],
    ['secs', s],
    ['sec', s],
    ['s', s],
    ['milliseconds', 1],
    ['millisecond', 1],
    ['msecs', 1],
    ['msec', 1],
    ['ms', 1]
	]
);

var parseExp = /^((?:\d+)?\.?\d+)\s*(\w{0,12})?$/i;

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */
function parse(str) {
	str = String(str);
	var match = str.match(parseExp);
	if (match) {
		var num = parseFloat(Number(match[1]));
		if (isFinite(num)) {
			var scale = scales.get((match[2] || 'ms').toLowerCase());
			if (scale) {
				return num * scale;
			}
		}
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
	if (ms >= d) {
		return Math.round(ms / d) + 'd';
	}
	if (ms >= h) {
		return Math.round(ms / h) + 'h';
	}
	if (ms >= m) {
		return Math.round(ms / m) + 'm';
	}
	if (ms >= s) {
		return Math.round(ms / s) + 's';
	}
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
	return (
    plural(ms, d, 'day') || plural(ms, h, 'hour') || plural(ms, m, 'minute') || plural(ms, s, 'second') || ms + ' ms'
	);
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
	if (ms < n) {
		return;
	}
	if (ms < n * 1.5) {
		return Math.floor(ms / n) + ' ' + name;
	}
	return Math.ceil(ms / n) + ' ' + name + 's';
}

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function (val, options) {
	options = options || {};
	var type = typeof val;
	if (type === 'string' && val.length > 0) {
		return parse(val);
	} else if (type === 'number' && isFinite(val)) {
		return options.long ? fmtLong(val) : fmtShort(val);
	}
	throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val));
};
