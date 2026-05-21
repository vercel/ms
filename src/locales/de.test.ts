import { describe, expect, it } from '@jest/globals';
import { de, format } from '../index';

describe('format(number, { locale: de, long: true })', () => {
  it('should not throw an error', () => {
    expect(() => {
      format(500, { locale: de, long: true });
    }).not.toThrow();
  });

  it('should support milliseconds', () => {
    expect(format(1, { locale: de, long: true })).toBe('1 Millisekunde');
    expect(format(500, { locale: de, long: true })).toBe('500 Millisekunden');

    expect(format(-1, { locale: de, long: true })).toBe('-1 Millisekunde');
    expect(format(-500, { locale: de, long: true })).toBe('-500 Millisekunden');
  });

  it('should support seconds', () => {
    expect(format(1000, { locale: de, long: true })).toBe('1 Sekunde');
    expect(format(1200, { locale: de, long: true })).toBe('1 Sekunde');
    expect(format(10000, { locale: de, long: true })).toBe('10 Sekunden');

    expect(format(-1000, { locale: de, long: true })).toBe('-1 Sekunde');
    expect(format(-1200, { locale: de, long: true })).toBe('-1 Sekunde');
    expect(format(-10000, { locale: de, long: true })).toBe('-10 Sekunden');
  });

  it('should support minutes', () => {
    expect(format(60 * 1000, { locale: de, long: true })).toBe('1 Minute');
    expect(format(60 * 1200, { locale: de, long: true })).toBe('1 Minute');
    expect(format(60 * 10000, { locale: de, long: true })).toBe('10 Minuten');

    expect(format(-1 * 60 * 1000, { locale: de, long: true })).toBe(
      '-1 Minute',
    );
    expect(format(-1 * 60 * 1200, { locale: de, long: true })).toBe(
      '-1 Minute',
    );
    expect(format(-1 * 60 * 10000, { locale: de, long: true })).toBe(
      '-10 Minuten',
    );
  });

  it('should support hours', () => {
    expect(format(60 * 60 * 1000, { locale: de, long: true })).toBe('1 Stunde');
    expect(format(60 * 60 * 1200, { locale: de, long: true })).toBe('1 Stunde');
    expect(format(60 * 60 * 10000, { locale: de, long: true })).toBe(
      '10 Stunden',
    );

    expect(format(-1 * 60 * 60 * 1000, { locale: de, long: true })).toBe(
      '-1 Stunde',
    );
    expect(format(-1 * 60 * 60 * 1200, { locale: de, long: true })).toBe(
      '-1 Stunde',
    );
    expect(format(-1 * 60 * 60 * 10000, { locale: de, long: true })).toBe(
      '-10 Stunden',
    );
  });

  it('should support days', () => {
    expect(format(1 * 24 * 60 * 60 * 1000, { locale: de, long: true })).toBe(
      '1 Tag',
    );
    expect(format(1 * 24 * 60 * 60 * 1200, { locale: de, long: true })).toBe(
      '1 Tag',
    );
    expect(format(6 * 24 * 60 * 60 * 1000, { locale: de, long: true })).toBe(
      '6 Tage',
    );

    expect(
      format(-1 * 1 * 24 * 60 * 60 * 1000, { locale: de, long: true }),
    ).toBe('-1 Tag');
    expect(
      format(-1 * 1 * 24 * 60 * 60 * 1200, { locale: de, long: true }),
    ).toBe('-1 Tag');
    expect(
      format(-1 * 6 * 24 * 60 * 60 * 1000, { locale: de, long: true }),
    ).toBe('-6 Tage');
  });

  it('should support weeks', () => {
    expect(
      format(1 * 7 * 24 * 60 * 60 * 1000, { locale: de, long: true }),
    ).toBe('1 Woche');
    expect(
      format(2 * 7 * 24 * 60 * 60 * 1000, { locale: de, long: true }),
    ).toBe('2 Wochen');

    expect(
      format(-1 * 1 * 7 * 24 * 60 * 60 * 1000, { locale: de, long: true }),
    ).toBe('-1 Woche');
    expect(
      format(-1 * 2 * 7 * 24 * 60 * 60 * 1000, { locale: de, long: true }),
    ).toBe('-2 Wochen');
  });

  it('should support months', () => {
    expect(
      format(30.4375 * 24 * 60 * 60 * 1000, { locale: de, long: true }),
    ).toBe('1 Monat');
    expect(
      format(30.4375 * 24 * 60 * 60 * 1200, { locale: de, long: true }),
    ).toBe('1 Monat');
    expect(
      format(30.4375 * 24 * 60 * 60 * 10000, { locale: de, long: true }),
    ).toBe('10 Monate');

    expect(
      format(-1 * 30.4375 * 24 * 60 * 60 * 1000, { locale: de, long: true }),
    ).toBe('-1 Monat');
    expect(
      format(-1 * 30.4375 * 24 * 60 * 60 * 1200, { locale: de, long: true }),
    ).toBe('-1 Monat');
    expect(
      format(-1 * 30.4375 * 24 * 60 * 60 * 10000, { locale: de, long: true }),
    ).toBe('-10 Monate');
  });

  it('should support years', () => {
    expect(
      format(365.25 * 24 * 60 * 60 * 1000 + 1, { locale: de, long: true }),
    ).toBe('1 Jahr');
    expect(
      format(365.25 * 24 * 60 * 60 * 1200 + 1, { locale: de, long: true }),
    ).toBe('1 Jahr');
    expect(
      format(365.25 * 24 * 60 * 60 * 10000 + 1, { locale: de, long: true }),
    ).toBe('10 Jahre');

    expect(
      format(-1 * 365.25 * 24 * 60 * 60 * 1000 - 1, {
        locale: de,
        long: true,
      }),
    ).toBe('-1 Jahr');
    expect(
      format(-1 * 365.25 * 24 * 60 * 60 * 1200 - 1, {
        locale: de,
        long: true,
      }),
    ).toBe('-1 Jahr');
    expect(
      format(-1 * 365.25 * 24 * 60 * 60 * 10000 - 1, {
        locale: de,
        long: true,
      }),
    ).toBe('-10 Jahre');
  });

  it('should round', () => {
    expect(format(234234234, { locale: de, long: true })).toBe('3 Tage');

    expect(format(-234234234, { locale: de, long: true })).toBe('-3 Tage');
  });
});

describe('format(number, { locale: de })', () => {
  it('should not throw an error', () => {
    expect(() => {
      format(500, { locale: de });
    }).not.toThrow();
  });

  it('should support milliseconds', () => {
    expect(format(500, { locale: de })).toBe('500ms');

    expect(format(-500, { locale: de })).toBe('-500ms');
  });

  it('should support seconds', () => {
    expect(format(1000, { locale: de })).toBe('1s');
    expect(format(10000, { locale: de })).toBe('10s');

    expect(format(-1000, { locale: de })).toBe('-1s');
    expect(format(-10000, { locale: de })).toBe('-10s');
  });

  it('should support minutes', () => {
    expect(format(60 * 1000, { locale: de })).toBe('1min');
    expect(format(60 * 10000, { locale: de })).toBe('10min');

    expect(format(-1 * 60 * 1000, { locale: de })).toBe('-1min');
    expect(format(-1 * 60 * 10000, { locale: de })).toBe('-10min');
  });

  it('should support hours', () => {
    expect(format(60 * 60 * 1000, { locale: de })).toBe('1Std');
    expect(format(60 * 60 * 10000, { locale: de })).toBe('10Std');

    expect(format(-1 * 60 * 60 * 1000, { locale: de })).toBe('-1Std');
    expect(format(-1 * 60 * 60 * 10000, { locale: de })).toBe('-10Std');
  });

  it('should support days', () => {
    expect(format(24 * 60 * 60 * 1000, { locale: de })).toBe('1T');
    expect(format(24 * 60 * 60 * 6000, { locale: de })).toBe('6T');

    expect(format(-1 * 24 * 60 * 60 * 1000, { locale: de })).toBe('-1T');
    expect(format(-1 * 24 * 60 * 60 * 6000, { locale: de })).toBe('-6T');
  });

  it('should support weeks', () => {
    expect(format(1 * 7 * 24 * 60 * 60 * 1000, { locale: de })).toBe('1W');
    expect(format(2 * 7 * 24 * 60 * 60 * 1000, { locale: de })).toBe('2W');

    expect(format(-1 * 1 * 7 * 24 * 60 * 60 * 1000, { locale: de })).toBe(
      '-1W',
    );
    expect(format(-1 * 2 * 7 * 24 * 60 * 60 * 1000, { locale: de })).toBe(
      '-2W',
    );
  });

  it('should support months', () => {
    expect(format(30.4375 * 24 * 60 * 60 * 1000, { locale: de })).toBe('1Mo');
    expect(format(30.4375 * 24 * 60 * 60 * 1200, { locale: de })).toBe('1Mo');
    expect(format(30.4375 * 24 * 60 * 60 * 10000, { locale: de })).toBe('10Mo');

    expect(format(-1 * 30.4375 * 24 * 60 * 60 * 1000, { locale: de })).toBe(
      '-1Mo',
    );
    expect(format(-1 * 30.4375 * 24 * 60 * 60 * 1200, { locale: de })).toBe(
      '-1Mo',
    );
    expect(format(-1 * 30.4375 * 24 * 60 * 60 * 10000, { locale: de })).toBe(
      '-10Mo',
    );
  });

  it('should support years', () => {
    expect(format(365.25 * 24 * 60 * 60 * 1000 + 1, { locale: de })).toBe('1J');
    expect(format(365.25 * 24 * 60 * 60 * 1200 + 1, { locale: de })).toBe('1J');
    expect(format(365.25 * 24 * 60 * 60 * 10000 + 1, { locale: de })).toBe(
      '10J',
    );

    expect(format(-1 * 365.25 * 24 * 60 * 60 * 1000 - 1, { locale: de })).toBe(
      '-1J',
    );
    expect(format(-1 * 365.25 * 24 * 60 * 60 * 1200 - 1, { locale: de })).toBe(
      '-1J',
    );
    expect(format(-1 * 365.25 * 24 * 60 * 60 * 10000 - 1, { locale: de })).toBe(
      '-10J',
    );
  });

  it('should round', () => {
    expect(format(234234234, { locale: de })).toBe('3T');

    expect(format(-234234234, { locale: de })).toBe('-3T');
  });
});
