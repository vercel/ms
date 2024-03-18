import { parse } from './index';

describe('parse(string)', () => {
  it('should not throw an error', () => {
    expect(() => {
      parse('1m');
    }).not.toThrowError();
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
    expect(isNaN(parse('☃'))).toBe(true);
    expect(isNaN(parse('10-.5'))).toBe(true);
    expect(isNaN(parse('foo'))).toBe(true);
  });

  it('should be case-insensitive', () => {
    expect(parse('1.5H')).toBe(5400000);
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
    }).not.toThrowError();
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
    }).toThrowError();
  });

  it('should throw an error, when parse(undefined)', () => {
    expect(() => {
      // @ts-expect-error - We expect this to throw.
      parse(undefined);
    }).toThrowError();
  });

  it('should throw an error, when parse(null)', () => {
    expect(() => {
      // @ts-expect-error - We expect this to throw.
      parse(null);
    }).toThrowError();
  });

  it('should throw an error, when parse([])', () => {
    expect(() => {
      // @ts-expect-error - We expect this to throw.
      parse([]);
    }).toThrowError();
  });

  it('should throw an error, when parse({})', () => {
    expect(() => {
      // @ts-expect-error - We expect this to throw.
      parse({});
    }).toThrowError();
  });

  it('should throw an error, when parse(NaN)', () => {
    expect(() => {
      // @ts-expect-error - We expect this to throw.
      parse(NaN);
    }).toThrowError();
  });

  it('should throw an error, when parse(Infinity)', () => {
    expect(() => {
      // @ts-expect-error - We expect this to throw.
      parse(Infinity);
    }).toThrowError();
  });

  it('should throw an error, when parse(-Infinity)', () => {
    expect(() => {
      // @ts-expect-error - We expect this to throw.
      parse(-Infinity);
    }).toThrowError();
  });
});
