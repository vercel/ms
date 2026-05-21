import { describe, expect, it } from '@jest/globals';
import { format, fr } from '../index';

describe('format(number, { locale: fr, long: true })', () => {
  it('should not throw an error', () => {
    expect(() => {
      format(500, { locale: fr, long: true });
    }).not.toThrow();
  });

  it('should support milliseconds', () => {
    expect(format(1, { locale: fr, long: true })).toBe('1 milliseconde');
    expect(format(500, { locale: fr, long: true })).toBe('500 millisecondes');

    expect(format(-1, { locale: fr, long: true })).toBe('-1 milliseconde');
    expect(format(-500, { locale: fr, long: true })).toBe('-500 millisecondes');
  });

  it('should support seconds', () => {
    expect(format(1000, { locale: fr, long: true })).toBe('1 seconde');
    expect(format(1200, { locale: fr, long: true })).toBe('1 seconde');
    expect(format(10000, { locale: fr, long: true })).toBe('10 secondes');

    expect(format(-1000, { locale: fr, long: true })).toBe('-1 seconde');
    expect(format(-1200, { locale: fr, long: true })).toBe('-1 seconde');
    expect(format(-10000, { locale: fr, long: true })).toBe('-10 secondes');
  });

  it('should support minutes', () => {
    expect(format(60 * 1000, { locale: fr, long: true })).toBe('1 minute');
    expect(format(60 * 1200, { locale: fr, long: true })).toBe('1 minute');
    expect(format(60 * 10000, { locale: fr, long: true })).toBe('10 minutes');

    expect(format(-1 * 60 * 1000, { locale: fr, long: true })).toBe(
      '-1 minute',
    );
    expect(format(-1 * 60 * 1200, { locale: fr, long: true })).toBe(
      '-1 minute',
    );
    expect(format(-1 * 60 * 10000, { locale: fr, long: true })).toBe(
      '-10 minutes',
    );
  });

  it('should support hours', () => {
    expect(format(60 * 60 * 1000, { locale: fr, long: true })).toBe('1 heure');
    expect(format(60 * 60 * 1200, { locale: fr, long: true })).toBe('1 heure');
    expect(format(60 * 60 * 10000, { locale: fr, long: true })).toBe(
      '10 heures',
    );

    expect(format(-1 * 60 * 60 * 1000, { locale: fr, long: true })).toBe(
      '-1 heure',
    );
    expect(format(-1 * 60 * 60 * 1200, { locale: fr, long: true })).toBe(
      '-1 heure',
    );
    expect(format(-1 * 60 * 60 * 10000, { locale: fr, long: true })).toBe(
      '-10 heures',
    );
  });

  it('should support days', () => {
    expect(format(1 * 24 * 60 * 60 * 1000, { locale: fr, long: true })).toBe(
      '1 jour',
    );
    expect(format(1 * 24 * 60 * 60 * 1200, { locale: fr, long: true })).toBe(
      '1 jour',
    );
    expect(format(6 * 24 * 60 * 60 * 1000, { locale: fr, long: true })).toBe(
      '6 jours',
    );

    expect(
      format(-1 * 1 * 24 * 60 * 60 * 1000, { locale: fr, long: true }),
    ).toBe('-1 jour');
    expect(
      format(-1 * 1 * 24 * 60 * 60 * 1200, { locale: fr, long: true }),
    ).toBe('-1 jour');
    expect(
      format(-1 * 6 * 24 * 60 * 60 * 1000, { locale: fr, long: true }),
    ).toBe('-6 jours');
  });

  it('should support weeks', () => {
    expect(
      format(1 * 7 * 24 * 60 * 60 * 1000, { locale: fr, long: true }),
    ).toBe('1 semaine');
    expect(
      format(2 * 7 * 24 * 60 * 60 * 1000, { locale: fr, long: true }),
    ).toBe('2 semaines');

    expect(
      format(-1 * 1 * 7 * 24 * 60 * 60 * 1000, { locale: fr, long: true }),
    ).toBe('-1 semaine');
    expect(
      format(-1 * 2 * 7 * 24 * 60 * 60 * 1000, { locale: fr, long: true }),
    ).toBe('-2 semaines');
  });

  it('should support months', () => {
    expect(
      format(30.4375 * 24 * 60 * 60 * 1000, { locale: fr, long: true }),
    ).toBe('1 mois');
    expect(
      format(30.4375 * 24 * 60 * 60 * 1200, { locale: fr, long: true }),
    ).toBe('1 mois');
    expect(
      format(30.4375 * 24 * 60 * 60 * 10000, { locale: fr, long: true }),
    ).toBe('10 mois');

    expect(
      format(-1 * 30.4375 * 24 * 60 * 60 * 1000, { locale: fr, long: true }),
    ).toBe('-1 mois');
    expect(
      format(-1 * 30.4375 * 24 * 60 * 60 * 1200, { locale: fr, long: true }),
    ).toBe('-1 mois');
    expect(
      format(-1 * 30.4375 * 24 * 60 * 60 * 10000, { locale: fr, long: true }),
    ).toBe('-10 mois');
  });

  it('should support years', () => {
    expect(
      format(365.25 * 24 * 60 * 60 * 1000 + 1, { locale: fr, long: true }),
    ).toBe('1 an');
    expect(
      format(365.25 * 24 * 60 * 60 * 1200 + 1, { locale: fr, long: true }),
    ).toBe('1 an');
    expect(
      format(365.25 * 24 * 60 * 60 * 10000 + 1, { locale: fr, long: true }),
    ).toBe('10 ans');

    expect(
      format(-1 * 365.25 * 24 * 60 * 60 * 1000 - 1, {
        locale: fr,
        long: true,
      }),
    ).toBe('-1 an');
    expect(
      format(-1 * 365.25 * 24 * 60 * 60 * 1200 - 1, {
        locale: fr,
        long: true,
      }),
    ).toBe('-1 an');
    expect(
      format(-1 * 365.25 * 24 * 60 * 60 * 10000 - 1, {
        locale: fr,
        long: true,
      }),
    ).toBe('-10 ans');
  });

  it('should round', () => {
    expect(format(234234234, { locale: fr, long: true })).toBe('3 jours');

    expect(format(-234234234, { locale: fr, long: true })).toBe('-3 jours');
  });
});

describe('format(number, { locale: fr })', () => {
  it('should not throw an error', () => {
    expect(() => {
      format(500, { locale: fr });
    }).not.toThrow();
  });

  it('should support milliseconds', () => {
    expect(format(500, { locale: fr })).toBe('500ms');

    expect(format(-500, { locale: fr })).toBe('-500ms');
  });

  it('should support seconds', () => {
    expect(format(1000, { locale: fr })).toBe('1s');
    expect(format(10000, { locale: fr })).toBe('10s');

    expect(format(-1000, { locale: fr })).toBe('-1s');
    expect(format(-10000, { locale: fr })).toBe('-10s');
  });

  it('should support minutes', () => {
    expect(format(60 * 1000, { locale: fr })).toBe('1min');
    expect(format(60 * 10000, { locale: fr })).toBe('10min');

    expect(format(-1 * 60 * 1000, { locale: fr })).toBe('-1min');
    expect(format(-1 * 60 * 10000, { locale: fr })).toBe('-10min');
  });

  it('should support hours', () => {
    expect(format(60 * 60 * 1000, { locale: fr })).toBe('1h');
    expect(format(60 * 60 * 10000, { locale: fr })).toBe('10h');

    expect(format(-1 * 60 * 60 * 1000, { locale: fr })).toBe('-1h');
    expect(format(-1 * 60 * 60 * 10000, { locale: fr })).toBe('-10h');
  });

  it('should support days', () => {
    expect(format(24 * 60 * 60 * 1000, { locale: fr })).toBe('1j');
    expect(format(24 * 60 * 60 * 6000, { locale: fr })).toBe('6j');

    expect(format(-1 * 24 * 60 * 60 * 1000, { locale: fr })).toBe('-1j');
    expect(format(-1 * 24 * 60 * 60 * 6000, { locale: fr })).toBe('-6j');
  });

  it('should support weeks', () => {
    expect(format(1 * 7 * 24 * 60 * 60 * 1000, { locale: fr })).toBe('1sem');
    expect(format(2 * 7 * 24 * 60 * 60 * 1000, { locale: fr })).toBe('2sem');

    expect(format(-1 * 1 * 7 * 24 * 60 * 60 * 1000, { locale: fr })).toBe(
      '-1sem',
    );
    expect(format(-1 * 2 * 7 * 24 * 60 * 60 * 1000, { locale: fr })).toBe(
      '-2sem',
    );
  });

  it('should support months', () => {
    expect(format(30.4375 * 24 * 60 * 60 * 1000, { locale: fr })).toBe('1mois');
    expect(format(30.4375 * 24 * 60 * 60 * 1200, { locale: fr })).toBe('1mois');
    expect(format(30.4375 * 24 * 60 * 60 * 10000, { locale: fr })).toBe(
      '10mois',
    );

    expect(format(-1 * 30.4375 * 24 * 60 * 60 * 1000, { locale: fr })).toBe(
      '-1mois',
    );
    expect(format(-1 * 30.4375 * 24 * 60 * 60 * 1200, { locale: fr })).toBe(
      '-1mois',
    );
    expect(format(-1 * 30.4375 * 24 * 60 * 60 * 10000, { locale: fr })).toBe(
      '-10mois',
    );
  });

  it('should support years', () => {
    expect(format(365.25 * 24 * 60 * 60 * 1000 + 1, { locale: fr })).toBe(
      '1an',
    );
    expect(format(365.25 * 24 * 60 * 60 * 1200 + 1, { locale: fr })).toBe(
      '1an',
    );
    expect(format(365.25 * 24 * 60 * 60 * 10000 + 1, { locale: fr })).toBe(
      '10an',
    );

    expect(format(-1 * 365.25 * 24 * 60 * 60 * 1000 - 1, { locale: fr })).toBe(
      '-1an',
    );
    expect(format(-1 * 365.25 * 24 * 60 * 60 * 1200 - 1, { locale: fr })).toBe(
      '-1an',
    );
    expect(format(-1 * 365.25 * 24 * 60 * 60 * 10000 - 1, { locale: fr })).toBe(
      '-10an',
    );
  });

  it('should round', () => {
    expect(format(234234234, { locale: fr })).toBe('3j');

    expect(format(-234234234, { locale: fr })).toBe('-3j');
  });
});
