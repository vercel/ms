import { describe, expect, it } from '@jest/globals';
import { parse } from './index';

describe('parse(string)', () => {
  it('should not throw an error', () => {
    expect(() => {
      parse('1m');
    }).not.toThrow();
  });

  it('should preserve ms', () => {
    expect(parse('100')).toBe(100);
  });

  it('should convert from m to ms', () => {
    expect(parse('1m')).toBe(60000);
  });

  it('should convert from h to ms', () => {
    expect(parse('1h')).toBe(3600000);
  });

  it('should convert d to ms', () => {
    expect(parse('2d')).toBe(172800000);
  });

  it('should convert w to ms', () => {
    expect(parse('3w')).toBe(1814400000);
  });

  it('should convert s to ms', () => {
    expect(parse('1s')).toBe(1000);
  });

  it('should convert ms to ms', () => {
    expect(parse('100ms')).toBe(100);
  });

  it('should convert y to ms', () => {
    expect(parse('1y')).toBe(31557600000);
  });

  it('should work with ms', () => {
    expect(parse('1.5h')).toBe(5400000);
  });

  it('should work with multiple spaces', () => {
    expect(parse('1   s')).toBe(1000);
  });

  it('should return NaN if invalid', () => {
    expect(Number.isNaN(parse('☃'))).toBe(true);
    expect(Number.isNaN(parse('10-.5'))).toBe(true);
    expect(Number.isNaN(parse('foo'))).toBe(true);
  });

  it('should be case-insensitive', () => {
    expect(parse('53 YeArS')).toBe(1672552800000);
    expect(parse('53 WeEkS')).toBe(32054400000);
    expect(parse('53 DaYS')).toBe(4579200000);
    expect(parse('53 HoUrs')).toBe(190800000);
    expect(parse('53 MiLliSeCondS')).toBe(53);
  });

  it('should work with numbers starting with .', () => {
    expect(parse('.5ms')).toBe(0.5);
  });

  it('should work with negative integers', () => {
    expect(parse('-100ms')).toBe(-100);
  });

  it('should work with negative decimals', () => {
    expect(parse('-1.5h')).toBe(-5400000);
    expect(parse('-10.5h')).toBe(-37800000);
  });

  it('should work with negative decimals starting with "."', () => {
    expect(parse('-.5h')).toBe(-1800000);
  });
});

// long strings

describe('parse(long string)', () => {
  it('should not throw an error', () => {
    expect(() => {
      parse('53 milliseconds');
    }).not.toThrow();
  });

  it('should convert milliseconds to ms', () => {
    expect(parse('53 milliseconds')).toBe(53);
  });

  it('should convert msecs to ms', () => {
    expect(parse('17 msecs')).toBe(17);
  });

  it('should convert sec to ms', () => {
    expect(parse('1 sec')).toBe(1000);
  });

  it('should convert from min to ms', () => {
    expect(parse('1 min')).toBe(60000);
  });

  it('should convert from hr to ms', () => {
    expect(parse('1 hr')).toBe(3600000);
  });

  it('should convert days to ms', () => {
    expect(parse('2 days')).toBe(172800000);
  });

  it('should convert weeks to ms', () => {
    expect(parse('1 week')).toBe(604800000);
  });

  it('should convert months to ms', () => {
    expect(parse('1 month')).toBe(2629800000);
  });

  it('should convert years to ms', () => {
    expect(parse('1 year')).toBe(31557600000);
  });

  it('should work with decimals', () => {
    expect(parse('1.5 hours')).toBe(5400000);
  });

  it('should work with negative integers', () => {
    expect(parse('-100 milliseconds')).toBe(-100);
  });

  it('should work with negative decimals', () => {
    expect(parse('-1.5 hours')).toBe(-5400000);
  });

  it('should work with negative decimals starting with "."', () => {
    expect(parse('-.5 hr')).toBe(-1800000);
  });
});

// invalid inputs

describe('parse(invalid inputs)', () => {
  it('should throw an error, when parse("")', () => {
    expect(() => {
      parse('');
    }).toThrow();
  });

  it('should throw an error, when parseStrict("...>100 length string...")', () => {
    expect(() => {
      parse('▲'.repeat(101));
    }).toThrow();
  });

  it('should throw an error, when parse(undefined)', () => {
    expect(() => {
      // @ts-expect-error - We expect this to throw.
      parse(undefined);
    }).toThrow();
  });

  it('should throw an error, when parse(null)', () => {
    expect(() => {
      // @ts-expect-error - We expect this to throw.
      parse(null);
    }).toThrow();
  });

  it('should throw an error, when parse([])', () => {
    expect(() => {
      // @ts-expect-error - We expect this to throw.
      parse([]);
    }).toThrow();
  });

  it('should throw an error, when parse({})', () => {
    expect(() => {
      // @ts-expect-error - We expect this to throw.
      parse({});
    }).toThrow();
  });

  it('should throw an error, when parse(NaN)', () => {
    expect(() => {
      // @ts-expect-error - We expect this to throw.
      parse(NaN);
    }).toThrow();
  });

  it('should throw an error, when parse(Infinity)', () => {
    expect(() => {
      // @ts-expect-error - We expect this to throw.
      parse(Infinity);
    }).toThrow();
  });

  it('should throw an error, when parse(-Infinity)', () => {
    expect(() => {
      // @ts-expect-error - We expect this to throw.
      parse(-Infinity);
    }).toThrow();
  });
});
