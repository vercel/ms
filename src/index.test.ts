import ms from './index';

describe('ms(string)', () => {
  it('should not throw an error', () => {
    expect(() => {
      ms('1m');
    }).not.toThrowError();
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
    expect(isNaN(ms('☃'))).toBe(true);
    // @ts-expect-error - We expect this to fail.
    expect(isNaN(ms('10-.5'))).toBe(true);
    // @ts-expect-error - We expect this to fail.
    expect(isNaN(ms('ms'))).toBe(true);
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
});

// long strings

describe('ms(long string)', () => {
  it('should not throw an error', () => {
    expect(() => {
      ms('53 milliseconds');
    }).not.toThrowError();
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
    }).not.toThrowError();
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

    expect(ms(-1 * 60 * 1000, { long: true })).toBe('-1 minute');
    expect(ms(-1 * 60 * 1200, { long: true })).toBe('-1 minute');
    expect(ms(-1 * 60 * 10000, { long: true })).toBe('-10 minutes');
  });

  it('should support hours', () => {
    expect(ms(60 * 60 * 1000, { long: true })).toBe('1 hour');
    expect(ms(60 * 60 * 1200, { long: true })).toBe('1 hour');
    expect(ms(60 * 60 * 10000, { long: true })).toBe('10 hours');

    expect(ms(-1 * 60 * 60 * 1000, { long: true })).toBe('-1 hour');
    expect(ms(-1 * 60 * 60 * 1200, { long: true })).toBe('-1 hour');
    expect(ms(-1 * 60 * 60 * 10000, { long: true })).toBe('-10 hours');
  });

  it('should support days', () => {
    expect(ms(24 * 60 * 60 * 1000, { long: true })).toBe('1 day');
    expect(ms(24 * 60 * 60 * 1200, { long: true })).toBe('1 day');
    expect(ms(24 * 60 * 60 * 10000, { long: true })).toBe('10 days');

    expect(ms(-1 * 24 * 60 * 60 * 1000, { long: true })).toBe('-1 day');
    expect(ms(-1 * 24 * 60 * 60 * 1200, { long: true })).toBe('-1 day');
    expect(ms(-1 * 24 * 60 * 60 * 10000, { long: true })).toBe('-10 days');
  });

  it('should round', () => {
    expect(ms(234234234, { long: true })).toBe('3 days');

    expect(ms(-234234234, { long: true })).toBe('-3 days');
  });
});

// numbers

describe('ms(number)', () => {
  it('should not throw an error', () => {
    expect(() => {
      ms(500);
    }).not.toThrowError();
  });

  it('should support milliseconds', () => {
    expect(ms(500)).toBe('500ms');

    expect(ms(-500)).toBe('-500ms');
  });

  it('should support seconds', () => {
    expect(ms(1000)).toBe('1s');
    expect(ms(10000)).toBe('10s');

    expect(ms(-1000)).toBe('-1s');
    expect(ms(-10000)).toBe('-10s');
  });

  it('should support minutes', () => {
    expect(ms(60 * 1000)).toBe('1m');
    expect(ms(60 * 10000)).toBe('10m');

    expect(ms(-1 * 60 * 1000)).toBe('-1m');
    expect(ms(-1 * 60 * 10000)).toBe('-10m');
  });

  it('should support hours', () => {
    expect(ms(60 * 60 * 1000)).toBe('1h');
    expect(ms(60 * 60 * 10000)).toBe('10h');

    expect(ms(-1 * 60 * 60 * 1000)).toBe('-1h');
    expect(ms(-1 * 60 * 60 * 10000)).toBe('-10h');
  });

  it('should support days', () => {
    expect(ms(24 * 60 * 60 * 1000)).toBe('1d');
    expect(ms(24 * 60 * 60 * 10000)).toBe('10d');

    expect(ms(-1 * 24 * 60 * 60 * 1000)).toBe('-1d');
    expect(ms(-1 * 24 * 60 * 60 * 10000)).toBe('-10d');
  });

  it('should round', () => {
    expect(ms(234234234)).toBe('3d');

    expect(ms(-234234234)).toBe('-3d');
  });
});

// invalid inputs

describe('ms(invalid inputs)', () => {
  it('should throw an error, when ms("")', () => {
    expect(() => {
      // @ts-expect-error - We expect this to throw.
      ms('');
    }).toThrowError();
  });

  it('should throw an error, when ms(undefined)', () => {
    expect(() => {
      // @ts-expect-error - We expect this to throw.
      ms(undefined);
    }).toThrowError();
  });

  it('should throw an error, when ms(null)', () => {
    expect(() => {
      // @ts-expect-error - We expect this to throw.
      ms(null);
    }).toThrowError();
  });

  it('should throw an error, when ms([])', () => {
    expect(() => {
      // @ts-expect-error - We expect this to throw.
      ms([]);
    }).toThrowError();
  });

  it('should throw an error, when ms({})', () => {
    expect(() => {
      // @ts-expect-error - We expect this to throw.
      ms({});
    }).toThrowError();
  });

  it('should throw an error, when ms(NaN)', () => {
    expect(() => {
      ms(NaN);
    }).toThrowError();
  });

  it('should throw an error, when ms(Infinity)', () => {
    expect(() => {
      ms(Infinity);
    }).toThrowError();
  });

  it('should throw an error, when ms(-Infinity)', () => {
    expect(() => {
      ms(-Infinity);
    }).toThrowError();
  });
});
