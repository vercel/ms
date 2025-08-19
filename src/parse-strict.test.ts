import { describe, expect, it } from '@jest/globals';
import { parseStrict } from './index';

describe('parseStrict(string)', () => {
  it('should not throw an error', () => {
    expect(() => {
      parseStrict('1m');
    }).not.toThrow();
  });

  it('should preserve ms', () => {
    expect(parseStrict('100')).toBe(100);
  });

  it('should convert from m to ms', () => {
    expect(parseStrict('1m')).toBe(60000);
  });

  it('should convert from h to ms', () => {
    expect(parseStrict('1h')).toBe(3600000);
  });

  it('should convert d to ms', () => {
    expect(parseStrict('2d')).toBe(172800000);
  });

  it('should convert w to ms', () => {
    expect(parseStrict('3w')).toBe(1814400000);
  });

  it('should convert s to ms', () => {
    expect(parseStrict('1s')).toBe(1000);
  });

  it('should convert ms to ms', () => {
    expect(parseStrict('100ms')).toBe(100);
  });

  it('should convert mo to ms', () => {
    expect(parseStrict('1mo')).toBe(2629800000);
  });
  it('should convert y to ms', () => {
    expect(parseStrict('1y')).toBe(31557600000);
  });

  it('should work with ms', () => {
    expect(parseStrict('1.5h')).toBe(5400000);
  });

  it('should work with multiple spaces', () => {
    expect(parseStrict('1   s')).toBe(1000);
  });

  it('should return NaN if invalid', () => {
    // @ts-expect-error - we expect the types to fail but JS users can still use this
    expect(Number.isNaN(parseStrict('☃'))).toBe(true);
    // @ts-expect-error - we expect the types to fail but JS users can still use this
    expect(Number.isNaN(parseStrict('10-.5'))).toBe(true);
    // @ts-expect-error - we expect the types to fail but JS users can still use this
    expect(Number.isNaN(parseStrict('foo'))).toBe(true);
  });

  it('should be case-insensitive', () => {
    // @ts-expect-error - we expect the types to fail but JS users can still use this
    expect(parseStrict('53 YeArS')).toBe(1672552800000);
    // @ts-expect-error - we expect the types to fail but JS users can still use this
    expect(parseStrict('53 WeEkS')).toBe(32054400000);
    // @ts-expect-error - we expect the types to fail but JS users can still use this
    expect(parseStrict('53 DaYS')).toBe(4579200000);
    // @ts-expect-error - we expect the types to fail but JS users can still use this
    expect(parseStrict('53 HoUrs')).toBe(190800000);
    // @ts-expect-error - we expect the types to fail but JS users can still use this
    expect(parseStrict('53 MiLliSeCondS')).toBe(53);
  });

  it('should work with numbers starting with .', () => {
    expect(parseStrict('.5ms')).toBe(0.5);
  });

  it('should work with negative integers', () => {
    expect(parseStrict('-100ms')).toBe(-100);
  });

  it('should work with negative decimals', () => {
    expect(parseStrict('-1.5h')).toBe(-5400000);
    expect(parseStrict('-10.5h')).toBe(-37800000);
  });

  it('should work with negative decimals starting with "."', () => {
    expect(parseStrict('-.5h')).toBe(-1800000);
  });
});

// long strings

describe('parseStrict(long string)', () => {
  it('should not throw an error', () => {
    expect(() => {
      parseStrict('53 milliseconds');
    }).not.toThrow();
  });

  it('should convert milliseconds to ms', () => {
    expect(parseStrict('53 milliseconds')).toBe(53);
  });

  it('should convert msecs to ms', () => {
    expect(parseStrict('17 msecs')).toBe(17);
  });

  it('should convert sec to ms', () => {
    expect(parseStrict('1 sec')).toBe(1000);
  });

  it('should convert from min to ms', () => {
    expect(parseStrict('1 min')).toBe(60000);
  });

  it('should convert from hr to ms', () => {
    expect(parseStrict('1 hr')).toBe(3600000);
  });

  it('should convert days to ms', () => {
    expect(parseStrict('2 days')).toBe(172800000);
  });

  it('should convert weeks to ms', () => {
    expect(parseStrict('1 week')).toBe(604800000);
  });

  it('should convert months to ms', () => {
    expect(parseStrict('1 month')).toBe(2629800000);
  });

  it('should convert years to ms', () => {
    expect(parseStrict('1 year')).toBe(31557600000);
  });

  it('should work with decimals', () => {
    expect(parseStrict('1.5 hours')).toBe(5400000);
  });

  it('should work with negative integers', () => {
    expect(parseStrict('-100 milliseconds')).toBe(-100);
  });

  it('should work with negative decimals', () => {
    expect(parseStrict('-1.5 hours')).toBe(-5400000);
  });

  it('should work with negative decimals starting with "."', () => {
    expect(parseStrict('-.5 hr')).toBe(-1800000);
  });
});

// invalid inputs

describe('parseStrict(invalid inputs)', () => {
  it('should throw an error, when parseStrict("")', () => {
    expect(() => {
      // @ts-expect-error - We expect this to throw.
      parseStrict('');
    }).toThrow();
  });

  it('should throw an error, when parseStrict("...>100 length string...")', () => {
    expect(() => {
      // @ts-expect-error - We expect this to throw.
      parseStrict('▲'.repeat(101));
    }).toThrow();
  });

  it('should throw an error, when parseStrict(undefined)', () => {
    expect(() => {
      // @ts-expect-error - We expect this to throw.
      parseStrict(undefined);
    }).toThrow();
  });

  it('should throw an error, when parseStrict(null)', () => {
    expect(() => {
      // @ts-expect-error - We expect this to throw.
      parseStrict(null);
    }).toThrow();
  });

  it('should throw an error, when parseStrict([])', () => {
    expect(() => {
      // @ts-expect-error - We expect this to throw.
      parseStrict([]);
    }).toThrow();
  });

  it('should throw an error, when parseStrict({})', () => {
    expect(() => {
      // @ts-expect-error - We expect this to throw.
      parseStrict({});
    }).toThrow();
  });

  it('should throw an error, when parseStrict(NaN)', () => {
    expect(() => {
      // @ts-expect-error - We expect this to throw.
      parseStrict(NaN);
    }).toThrow();
  });

  it('should throw an error, when parseStrict(Infinity)', () => {
    expect(() => {
      // @ts-expect-error - We expect this to throw.
      parseStrict(Infinity);
    }).toThrow();
  });

  it('should throw an error, when parseStrict(-Infinity)', () => {
    expect(() => {
      // @ts-expect-error - We expect this to throw.
      parseStrict(-Infinity);
    }).toThrow();
  });
});
