import { describe, expect, it } from '@jest/globals';
import { format } from './index';

// numbers

describe('format(number, { long: true })', () => {
  it('should not throw an error', () => {
    expect(() => {
      format(500, { long: true });
    }).not.toThrow();
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
    expect(format(1 * 24 * 60 * 60 * 1000, { long: true })).toBe('1 day');
    expect(format(1 * 24 * 60 * 60 * 1200, { long: true })).toBe('1 day');
    expect(format(6 * 24 * 60 * 60 * 1000, { long: true })).toBe('6 days');

    expect(format(-1 * 1 * 24 * 60 * 60 * 1000, { long: true })).toBe('-1 day');
    expect(format(-1 * 1 * 24 * 60 * 60 * 1200, { long: true })).toBe('-1 day');
    expect(format(-1 * 6 * 24 * 60 * 60 * 1000, { long: true })).toBe(
      '-6 days',
    );
  });

  it('should support weeks', () => {
    expect(format(1 * 7 * 24 * 60 * 60 * 1000, { long: true })).toBe('1 week');
    expect(format(2 * 7 * 24 * 60 * 60 * 1000, { long: true })).toBe('2 weeks');

    expect(format(-1 * 1 * 7 * 24 * 60 * 60 * 1000, { long: true })).toBe(
      '-1 week',
    );
    expect(format(-1 * 2 * 7 * 24 * 60 * 60 * 1000, { long: true })).toBe(
      '-2 weeks',
    );
  });

  it('should support months', () => {
    expect(format(30.4375 * 24 * 60 * 60 * 1000, { long: true })).toBe(
      '1 month',
    );
    expect(format(30.4375 * 24 * 60 * 60 * 1200, { long: true })).toBe(
      '1 month',
    );
    expect(format(30.4375 * 24 * 60 * 60 * 10000, { long: true })).toBe(
      '10 months',
    );

    expect(format(-1 * 30.4375 * 24 * 60 * 60 * 1000, { long: true })).toBe(
      '-1 month',
    );
    expect(format(-1 * 30.4375 * 24 * 60 * 60 * 1200, { long: true })).toBe(
      '-1 month',
    );
    expect(format(-1 * 30.4375 * 24 * 60 * 60 * 10000, { long: true })).toBe(
      '-10 months',
    );
  });

  it('should support years', () => {
    expect(format(365.25 * 24 * 60 * 60 * 1000 + 1, { long: true })).toBe(
      '1 year',
    );
    expect(format(365.25 * 24 * 60 * 60 * 1200 + 1, { long: true })).toBe(
      '1 year',
    );
    expect(format(365.25 * 24 * 60 * 60 * 10000 + 1, { long: true })).toBe(
      '10 years',
    );

    expect(format(-1 * 365.25 * 24 * 60 * 60 * 1000 - 1, { long: true })).toBe(
      '-1 year',
    );
    expect(format(-1 * 365.25 * 24 * 60 * 60 * 1200 - 1, { long: true })).toBe(
      '-1 year',
    );
    expect(format(-1 * 365.25 * 24 * 60 * 60 * 10000 - 1, { long: true })).toBe(
      '-10 years',
    );
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
    }).not.toThrow();
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
    expect(format(24 * 60 * 60 * 6000)).toBe('6d');

    expect(format(-1 * 24 * 60 * 60 * 1000)).toBe('-1d');
    expect(format(-1 * 24 * 60 * 60 * 6000)).toBe('-6d');
  });

  it('should support weeks', () => {
    expect(format(1 * 7 * 24 * 60 * 60 * 1000)).toBe('1w');
    expect(format(2 * 7 * 24 * 60 * 60 * 1000)).toBe('2w');

    expect(format(-1 * 1 * 7 * 24 * 60 * 60 * 1000)).toBe('-1w');
    expect(format(-1 * 2 * 7 * 24 * 60 * 60 * 1000)).toBe('-2w');
  });

  it('should support months', () => {
    expect(format(30.4375 * 24 * 60 * 60 * 1000)).toBe('1mo');
    expect(format(30.4375 * 24 * 60 * 60 * 1200)).toBe('1mo');
    expect(format(30.4375 * 24 * 60 * 60 * 10000)).toBe('10mo');

    expect(format(-1 * 30.4375 * 24 * 60 * 60 * 1000)).toBe('-1mo');
    expect(format(-1 * 30.4375 * 24 * 60 * 60 * 1200)).toBe('-1mo');
    expect(format(-1 * 30.4375 * 24 * 60 * 60 * 10000)).toBe('-10mo');
  });

  it('should support years', () => {
    expect(format(365.25 * 24 * 60 * 60 * 1000 + 1)).toBe('1y');
    expect(format(365.25 * 24 * 60 * 60 * 1200 + 1)).toBe('1y');
    expect(format(365.25 * 24 * 60 * 60 * 10000 + 1)).toBe('10y');

    expect(format(-1 * 365.25 * 24 * 60 * 60 * 1000 - 1)).toBe('-1y');
    expect(format(-1 * 365.25 * 24 * 60 * 60 * 1200 - 1)).toBe('-1y');
    expect(format(-1 * 365.25 * 24 * 60 * 60 * 10000 - 1)).toBe('-10y');
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
    }).toThrow();
  });

  it('should throw an error, when format(undefined)', () => {
    expect(() => {
      // @ts-expect-error - We expect this to throw.
      format(undefined);
    }).toThrow();
  });

  it('should throw an error, when format(null)', () => {
    expect(() => {
      // @ts-expect-error - We expect this to throw.
      format(null);
    }).toThrow();
  });

  it('should throw an error, when format([])', () => {
    expect(() => {
      // @ts-expect-error - We expect this to throw.
      format([]);
    }).toThrow();
  });

  it('should throw an error, when format({})', () => {
    expect(() => {
      // @ts-expect-error - We expect this to throw.
      format({});
    }).toThrow();
  });

  it('should throw an error, when format(NaN)', () => {
    expect(() => {
      format(NaN);
    }).toThrow();
  });

  it('should throw an error, when format(Infinity)', () => {
    expect(() => {
      format(Infinity);
    }).toThrow();
  });

  it('should throw an error, when format(-Infinity)', () => {
    expect(() => {
      format(-Infinity);
    }).toThrow();
  });
});
