import { format } from './index';

// numbers

describe('format(number, { long: true })', () => {
  it('should not throw an error', () => {
    expect(() => {
      format(500, { long: true });
    }).not.toThrowError();
  });

  it('should support milliseconds', () => {
    expect(format(500, { long: true })).toBe('500 ms');

    expect(format(-500, { long: true })).toBe('-500 ms');
  });

  it('should support seconds', () => {
    expect(format(1000, { long: true })).toBe('1 second');
    expect(format(1200, { long: true })).toBe('1 second');
    expect(format(10000, { long: true })).toBe('10 seconds');

    expect(format(-1000, { long: true })).toBe('-1 second');
    expect(format(-1200, { long: true })).toBe('-1 second');
    expect(format(-10000, { long: true })).toBe('-10 seconds');
  });

  it('should support minutes', () => {
    expect(format(60 * 1000, { long: true })).toBe('1 minute');
    expect(format(60 * 1200, { long: true })).toBe('1 minute');
    expect(format(60 * 10000, { long: true })).toBe('10 minutes');

    expect(format(-1 * 60 * 1000, { long: true })).toBe('-1 minute');
    expect(format(-1 * 60 * 1200, { long: true })).toBe('-1 minute');
    expect(format(-1 * 60 * 10000, { long: true })).toBe('-10 minutes');
  });

  it('should support hours', () => {
    expect(format(60 * 60 * 1000, { long: true })).toBe('1 hour');
    expect(format(60 * 60 * 1200, { long: true })).toBe('1 hour');
    expect(format(60 * 60 * 10000, { long: true })).toBe('10 hours');

    expect(format(-1 * 60 * 60 * 1000, { long: true })).toBe('-1 hour');
    expect(format(-1 * 60 * 60 * 1200, { long: true })).toBe('-1 hour');
    expect(format(-1 * 60 * 60 * 10000, { long: true })).toBe('-10 hours');
  });

  it('should support days', () => {
    expect(format(24 * 60 * 60 * 1000, { long: true })).toBe('1 day');
    expect(format(24 * 60 * 60 * 1200, { long: true })).toBe('1 day');
    expect(format(24 * 60 * 60 * 10000, { long: true })).toBe('10 days');

    expect(format(-1 * 24 * 60 * 60 * 1000, { long: true })).toBe('-1 day');
    expect(format(-1 * 24 * 60 * 60 * 1200, { long: true })).toBe('-1 day');
    expect(format(-1 * 24 * 60 * 60 * 10000, { long: true })).toBe('-10 days');
  });

  it('should round', () => {
    expect(format(234234234, { long: true })).toBe('3 days');

    expect(format(-234234234, { long: true })).toBe('-3 days');
  });
});

// numbers

describe('format(number)', () => {
  it('should not throw an error', () => {
    expect(() => {
      format(500);
    }).not.toThrowError();
  });

  it('should support milliseconds', () => {
    expect(format(500)).toBe('500ms');

    expect(format(-500)).toBe('-500ms');
  });

  it('should support seconds', () => {
    expect(format(1000)).toBe('1s');
    expect(format(10000)).toBe('10s');

    expect(format(-1000)).toBe('-1s');
    expect(format(-10000)).toBe('-10s');
  });

  it('should support minutes', () => {
    expect(format(60 * 1000)).toBe('1m');
    expect(format(60 * 10000)).toBe('10m');

    expect(format(-1 * 60 * 1000)).toBe('-1m');
    expect(format(-1 * 60 * 10000)).toBe('-10m');
  });

  it('should support hours', () => {
    expect(format(60 * 60 * 1000)).toBe('1h');
    expect(format(60 * 60 * 10000)).toBe('10h');

    expect(format(-1 * 60 * 60 * 1000)).toBe('-1h');
    expect(format(-1 * 60 * 60 * 10000)).toBe('-10h');
  });

  it('should support days', () => {
    expect(format(24 * 60 * 60 * 1000)).toBe('1d');
    expect(format(24 * 60 * 60 * 10000)).toBe('10d');

    expect(format(-1 * 24 * 60 * 60 * 1000)).toBe('-1d');
    expect(format(-1 * 24 * 60 * 60 * 10000)).toBe('-10d');
  });

  it('should round', () => {
    expect(format(234234234)).toBe('3d');

    expect(format(-234234234)).toBe('-3d');
  });
});

// invalid inputs

describe('format(invalid inputs)', () => {
  it('should throw an error, when format("")', () => {
    expect(() => {
      // @ts-expect-error - We expect this to throw.
      format('');
    }).toThrowError();
  });

  it('should throw an error, when format(undefined)', () => {
    expect(() => {
      // @ts-expect-error - We expect this to throw.
      format(undefined);
    }).toThrowError();
  });

  it('should throw an error, when format(null)', () => {
    expect(() => {
      // @ts-expect-error - We expect this to throw.
      format(null);
    }).toThrowError();
  });

  it('should throw an error, when format([])', () => {
    expect(() => {
      // @ts-expect-error - We expect this to throw.
      format([]);
    }).toThrowError();
  });

  it('should throw an error, when format({})', () => {
    expect(() => {
      // @ts-expect-error - We expect this to throw.
      format({});
    }).toThrowError();
  });

  it('should throw an error, when format(NaN)', () => {
    expect(() => {
      format(NaN);
    }).toThrowError();
  });

  it('should throw an error, when format(Infinity)', () => {
    expect(() => {
      format(Infinity);
    }).toThrowError();
  });

  it('should throw an error, when format(-Infinity)', () => {
    expect(() => {
      format(-Infinity);
    }).toThrowError();
  });
});
