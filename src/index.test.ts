import { describe, expect, it } from '@jest/globals';
import { ms } from './index';

describe('ms(string)', () => {
  it('should not throw an error', () => {
    expect(() => {
      ms('1m');
    }).not.toThrow();
  });

  it('should preserve ms', () => {
    expect(ms('100')).toBe(100);
  });

  it('should convert from m to ms', () => {
    expect(ms('1m')).toBe(60000);
  });

  it('should convert from h to ms', () => {
    expect(ms('1h')).toBe(3600000);
  });

  it('should convert d to ms', () => {
    expect(ms('2d')).toBe(172800000);
  });

  it('should convert w to ms', () => {
    expect(ms('3w')).toBe(1814400000);
  });

  it('should convert s to ms', () => {
    expect(ms('1s')).toBe(1000);
  });

  it('should convert ms to ms', () => {
    expect(ms('100ms')).toBe(100);
  });

  it('should convert y to ms', () => {
    expect(ms('1y')).toBe(31557600000);
  });

  it('should work with decimals', () => {
    expect(ms('1.5h')).toBe(5400000);
  });

  it('should work with multiple spaces', () => {
    expect(ms('1   s')).toBe(1000);
  });

  it('should return NaN if invalid', () => {
    // @ts-expect-error - We expect this to fail.
    expect(Number.isNaN(ms('☃'))).toBe(true);
    // @ts-expect-error - We expect this to fail.
    expect(Number.isNaN(ms('10-.5'))).toBe(true);
    // @ts-expect-error - We expect this to fail.
    expect(Number.isNaN(ms('ms'))).toBe(true);
  });

  it('should be case-insensitive', () => {
    expect(ms('1.5H')).toBe(5400000);
  });

  it('should work with numbers starting with .', () => {
    expect(ms('.5ms')).toBe(0.5);
  });

  it('should work with negative integers', () => {
    expect(ms('-100ms')).toBe(-100);
  });

  it('should work with negative decimals', () => {
    expect(ms('-1.5h')).toBe(-5400000);
    expect(ms('-10.5h')).toBe(-37800000);
  });

  it('should work with negative decimals starting with "."', () => {
    expect(ms('-.5h')).toBe(-1800000);
  });
  
  it('should match README example ms(ms("10 hours"))', () => {
    expect(ms(ms('10 hours'))).toBe('10h');
  });
});

// long strings

describe('ms(long string)', () => {
  it('should not throw an error', () => {
    expect(() => {
      ms('53 milliseconds');
    }).not.toThrow();
  });

  it('should convert milliseconds to ms', () => {
    expect(ms('53 milliseconds')).toBe(53);
  });

  it('should convert msecs to ms', () => {
    expect(ms('17 msecs')).toBe(17);
  });

  it('should convert sec to ms', () => {
    expect(ms('1 sec')).toBe(1000);
  });

  it('should convert from min to ms', () => {
    expect(ms('1 min')).toBe(60000);
  });

  it('should convert from hr to ms', () => {
    expect(ms('1 hr')).toBe(3600000);
  });

  it('should convert days to ms', () => {
    expect(ms('2 days')).toBe(172800000);
  });

  it('should convert weeks to ms', () => {
    expect(ms('1 week')).toBe(604800000);
  });

  it('should convert years to ms', () => {
    expect(ms('1 year')).toBe(31557600000);
  });

  it('should work with decimals', () => {
    expect(ms('1.5 hours')).toBe(5400000);
  });

  it('should work with negative integers', () => {
    expect(ms('-100 milliseconds')).toBe(-100);
  });

  it('should work with negative decimals', () => {
    expect(ms('-1.5 hours')).toBe(-5400000);
  });

  it('should work with negative decimals starting with "."', () => {
    expect(ms('-.5 hr')).toBe(-1800000);
  });
});

// numbers

describe('ms(number, { long: true })', () => {
  it('should not throw an error', () => {
    expect(() => {
      ms(500, { long: true });
    }).not.toThrow();
  });

  it('should support milliseconds', () => {
    expect(ms(500, { long: true })).toBe('500 ms');
    expect(ms(-500, { long: true })).toBe('-500 ms');
  });

  it('should support seconds', () => {
    expect(ms(1000, { long: true })).toBe('1 second');
    expect(ms(1200, { long: true })).toBe('1 second');
    expect(ms(10000, { long: true })).toBe('10 seconds');

    expect(ms(-1000, { long: true })).toBe('-1 second');
    expect(ms(-1200, { long: true })).toBe('-1 second');
    expect(ms(-10000, { long: true })).toBe('-10 seconds');
  });

  it('should support minutes', () => {
    expect(ms(60 * 1000, { long: true })).toBe('1 minute');
    expect(ms(60 * 1200, { long: true })).toBe('1 minute');
    expect(ms(60 * 10000, { long: true })).toBe('10 minutes');

    expect(ms(-60 * 1000, { long: true })).toBe('-1 minute');
    expect(ms(-60 * 1200, { long: true })).toBe('-1 minute');
    expect(ms(-60 * 10000, { long: true })).toBe('-10 minutes');
  });

  it('should support hours', () => {
    expect(ms(60 * 60 * 1000, { long: true })).toBe('1 hour');
    expect(ms(60 * 60 * 1200, { long: true })).toBe('1 hour');
    expect(ms(60 * 60 * 10000, { long: true })).toBe('10 hours');

    expect(ms(-60 * 60 * 1000, { long: true })).toBe('-1 hour');
    expect(ms(-60 * 60 * 1200, { long: true })).toBe('-1 hour');
    expect(ms(-60 * 60 * 10000, { long: true })).toBe('-10 hours');
  });

  it('should support days', () => {
    expect(ms(24 * 60 * 60 * 1000, { long: true })).toBe('1 day');
    expect(ms(24 * 60 * 60 * 1200, { long: true })).toBe('1 day');
    expect(ms(6 * 24 * 60 * 60 * 1000, { long: true })).toBe('6 days');

    expect(ms(-24 * 60 * 60 * 1000, { long: true })).toBe('-1 day');
    expect(ms(-24 * 60 * 60 * 1200, { long: true })).toBe('-1 day');
    expect(ms(-6 * 24 * 60 * 60 * 1000, { long: true })).toBe('-6 days');
  });

  it('should support weeks', () => {
    expect(ms(7 * 24 * 60 * 60 * 1000, { long: true })).toBe('1 week');
    expect(ms(2 * 7 * 24 * 60 * 60 * 1000, { long: true })).toBe('2 weeks');

    expect(ms(-7 * 24 * 60 * 60 * 1000, { long: true })).toBe('-1 week');
    expect(ms(-2 * 7 * 24 * 60 * 60 * 1000, { long: true })).toBe('-2 weeks');
  });

  it('should support months', () => {
    expect(ms(30.4375 * 24 * 60 * 60 * 1000, { long: true })).toBe('1 month');
    expect(ms(30.4375 * 24 * 60 * 60 * 1200, { long: true })).toBe('1 month');
    expect(ms(30.4375 * 24 * 60 * 60 * 10000, { long: true })).toBe('10 months');

    expect(ms(-30.4375 * 24 * 60 * 60 * 1000, { long: true })).toBe('-1 month');
    expect(ms(-30.4375 * 24 * 60 * 60 * 1200, { long: true })).toBe('-1 month');
    expect(ms(-30.4375 * 24 * 60 * 60 * 10000, { long: true })).toBe('-10 months');
  });

  it('should support years', () => {
    expect(ms(365.25 * 24 * 60 * 60 * 1000 + 1, { long: true })).toBe('1 year');
    expect(ms(365.25 * 24 * 60 * 60 * 1200 + 1, { long: true })).toBe('1 year');
    expect(ms(365.25 * 24 * 60 * 60 * 10000 + 1, { long: true })).toBe('10 years');

    expect(ms(-365.25 * 24 * 60 * 60 * 1000 - 1, { long: true })).toBe('-1 year');
    expect(ms(-365.25 * 24 * 60 * 60 * 1200 - 1, { long: true })).toBe('-1 year');
    expect(ms(-365.25 * 24 * 60 * 60 * 10000 - 1, { long: true })).toBe('-10 years');
  });

  it('should round', () => {
    expect(ms(234234234, { long: true })).toBe('3 days');
    expect(ms(-234234234, { long: true })).toBe('-3 days');
  });
});

// invalid inputs

describe('ms(invalid inputs)', () => {
  it('should throw an error, when ms("")', () => {
    // @ts-expect-error
    expect(() => ms('')).toThrow();
  });

  it('should throw an error, when ms(undefined)', () => {
    // @ts-expect-error
    expect(() => ms(undefined)).toThrow();
  });

  it('should throw an error, when ms(null)', () => {
    // @ts-expect-error
    expect(() => ms(null)).toThrow();
  });

  it('should throw an error, when ms([])', () => {
    // @ts-expect-error
    expect(() => ms([])).toThrow();
  });

  it('should throw an error, when ms({})', () => {
    // @ts-expect-error
    expect(() => ms({})).toThrow();
  });

  it('should throw an error, when ms(NaN)', () => {
    expect(() => ms(NaN)).toThrow();
  });

  it('should throw an error, when ms(Infinity)', () => {
    expect(() => ms(Infinity)).toThrow();
  });

  it('should throw an error, when ms(-Infinity)', () => {
    expect(() => ms(-Infinity)).toThrow();
  });
});
