import { describe, expect, it } from '@jest/globals';
import { es, format } from '../index';

describe('format(number, { locale: es, long: true })', () => {
  it('should not throw an error', () => {
    expect(() => {
      format(500, { locale: es, long: true });
    }).not.toThrow();
  });

  it('should support milliseconds', () => {
    expect(format(1, { locale: es, long: true })).toBe('1 milisegundo');
    expect(format(500, { locale: es, long: true })).toBe('500 milisegundos');

    expect(format(-1, { locale: es, long: true })).toBe('-1 milisegundo');
    expect(format(-500, { locale: es, long: true })).toBe('-500 milisegundos');
  });

  it('should support seconds', () => {
    expect(format(1000, { locale: es, long: true })).toBe('1 segundo');
    expect(format(1200, { locale: es, long: true })).toBe('1 segundo');
    expect(format(10000, { locale: es, long: true })).toBe('10 segundos');

    expect(format(-1000, { locale: es, long: true })).toBe('-1 segundo');
    expect(format(-1200, { locale: es, long: true })).toBe('-1 segundo');
    expect(format(-10000, { locale: es, long: true })).toBe('-10 segundos');
  });

  it('should support minutes', () => {
    expect(format(60 * 1000, { locale: es, long: true })).toBe('1 minuto');
    expect(format(60 * 1200, { locale: es, long: true })).toBe('1 minuto');
    expect(format(60 * 10000, { locale: es, long: true })).toBe('10 minutos');

    expect(format(-1 * 60 * 1000, { locale: es, long: true })).toBe(
      '-1 minuto',
    );
    expect(format(-1 * 60 * 1200, { locale: es, long: true })).toBe(
      '-1 minuto',
    );
    expect(format(-1 * 60 * 10000, { locale: es, long: true })).toBe(
      '-10 minutos',
    );
  });

  it('should support hours', () => {
    expect(format(60 * 60 * 1000, { locale: es, long: true })).toBe('1 hora');
    expect(format(60 * 60 * 1200, { locale: es, long: true })).toBe('1 hora');
    expect(format(60 * 60 * 10000, { locale: es, long: true })).toBe(
      '10 horas',
    );

    expect(format(-1 * 60 * 60 * 1000, { locale: es, long: true })).toBe(
      '-1 hora',
    );
    expect(format(-1 * 60 * 60 * 1200, { locale: es, long: true })).toBe(
      '-1 hora',
    );
    expect(format(-1 * 60 * 60 * 10000, { locale: es, long: true })).toBe(
      '-10 horas',
    );
  });

  it('should support days', () => {
    expect(format(1 * 24 * 60 * 60 * 1000, { locale: es, long: true })).toBe(
      '1 día',
    );
    expect(format(1 * 24 * 60 * 60 * 1200, { locale: es, long: true })).toBe(
      '1 día',
    );
    expect(format(6 * 24 * 60 * 60 * 1000, { locale: es, long: true })).toBe(
      '6 días',
    );

    expect(
      format(-1 * 1 * 24 * 60 * 60 * 1000, { locale: es, long: true }),
    ).toBe('-1 día');
    expect(
      format(-1 * 1 * 24 * 60 * 60 * 1200, { locale: es, long: true }),
    ).toBe('-1 día');
    expect(
      format(-1 * 6 * 24 * 60 * 60 * 1000, { locale: es, long: true }),
    ).toBe('-6 días');
  });

  it('should support weeks', () => {
    expect(
      format(1 * 7 * 24 * 60 * 60 * 1000, { locale: es, long: true }),
    ).toBe('1 semana');
    expect(
      format(2 * 7 * 24 * 60 * 60 * 1000, { locale: es, long: true }),
    ).toBe('2 semanas');

    expect(
      format(-1 * 1 * 7 * 24 * 60 * 60 * 1000, { locale: es, long: true }),
    ).toBe('-1 semana');
    expect(
      format(-1 * 2 * 7 * 24 * 60 * 60 * 1000, { locale: es, long: true }),
    ).toBe('-2 semanas');
  });

  it('should support months', () => {
    expect(
      format(30.4375 * 24 * 60 * 60 * 1000, { locale: es, long: true }),
    ).toBe('1 mes');
    expect(
      format(30.4375 * 24 * 60 * 60 * 1200, { locale: es, long: true }),
    ).toBe('1 mes');
    expect(
      format(30.4375 * 24 * 60 * 60 * 10000, { locale: es, long: true }),
    ).toBe('10 meses');

    expect(
      format(-1 * 30.4375 * 24 * 60 * 60 * 1000, { locale: es, long: true }),
    ).toBe('-1 mes');
    expect(
      format(-1 * 30.4375 * 24 * 60 * 60 * 1200, { locale: es, long: true }),
    ).toBe('-1 mes');
    expect(
      format(-1 * 30.4375 * 24 * 60 * 60 * 10000, { locale: es, long: true }),
    ).toBe('-10 meses');
  });

  it('should support years', () => {
    expect(
      format(365.25 * 24 * 60 * 60 * 1000 + 1, { locale: es, long: true }),
    ).toBe('1 año');
    expect(
      format(365.25 * 24 * 60 * 60 * 1200 + 1, { locale: es, long: true }),
    ).toBe('1 año');
    expect(
      format(365.25 * 24 * 60 * 60 * 10000 + 1, { locale: es, long: true }),
    ).toBe('10 años');

    expect(
      format(-1 * 365.25 * 24 * 60 * 60 * 1000 - 1, {
        locale: es,
        long: true,
      }),
    ).toBe('-1 año');
    expect(
      format(-1 * 365.25 * 24 * 60 * 60 * 1200 - 1, {
        locale: es,
        long: true,
      }),
    ).toBe('-1 año');
    expect(
      format(-1 * 365.25 * 24 * 60 * 60 * 10000 - 1, {
        locale: es,
        long: true,
      }),
    ).toBe('-10 años');
  });

  it('should round', () => {
    expect(format(234234234, { locale: es, long: true })).toBe('3 días');

    expect(format(-234234234, { locale: es, long: true })).toBe('-3 días');
  });
});

describe('format(number, { locale: es })', () => {
  it('should not throw an error', () => {
    expect(() => {
      format(500, { locale: es });
    }).not.toThrow();
  });

  it('should support milliseconds', () => {
    expect(format(500, { locale: es })).toBe('500ms');

    expect(format(-500, { locale: es })).toBe('-500ms');
  });

  it('should support seconds', () => {
    expect(format(1000, { locale: es })).toBe('1s');
    expect(format(10000, { locale: es })).toBe('10s');

    expect(format(-1000, { locale: es })).toBe('-1s');
    expect(format(-10000, { locale: es })).toBe('-10s');
  });

  it('should support minutes', () => {
    expect(format(60 * 1000, { locale: es })).toBe('1min');
    expect(format(60 * 10000, { locale: es })).toBe('10min');

    expect(format(-1 * 60 * 1000, { locale: es })).toBe('-1min');
    expect(format(-1 * 60 * 10000, { locale: es })).toBe('-10min');
  });

  it('should support hours', () => {
    expect(format(60 * 60 * 1000, { locale: es })).toBe('1h');
    expect(format(60 * 60 * 10000, { locale: es })).toBe('10h');

    expect(format(-1 * 60 * 60 * 1000, { locale: es })).toBe('-1h');
    expect(format(-1 * 60 * 60 * 10000, { locale: es })).toBe('-10h');
  });

  it('should support days', () => {
    expect(format(24 * 60 * 60 * 1000, { locale: es })).toBe('1d');
    expect(format(24 * 60 * 60 * 6000, { locale: es })).toBe('6d');

    expect(format(-1 * 24 * 60 * 60 * 1000, { locale: es })).toBe('-1d');
    expect(format(-1 * 24 * 60 * 60 * 6000, { locale: es })).toBe('-6d');
  });

  it('should support weeks', () => {
    expect(format(1 * 7 * 24 * 60 * 60 * 1000, { locale: es })).toBe('1sem');
    expect(format(2 * 7 * 24 * 60 * 60 * 1000, { locale: es })).toBe('2sem');

    expect(format(-1 * 1 * 7 * 24 * 60 * 60 * 1000, { locale: es })).toBe(
      '-1sem',
    );
    expect(format(-1 * 2 * 7 * 24 * 60 * 60 * 1000, { locale: es })).toBe(
      '-2sem',
    );
  });

  it('should support months', () => {
    expect(format(30.4375 * 24 * 60 * 60 * 1000, { locale: es })).toBe('1mes');
    expect(format(30.4375 * 24 * 60 * 60 * 1200, { locale: es })).toBe('1mes');
    expect(format(30.4375 * 24 * 60 * 60 * 10000, { locale: es })).toBe(
      '10mes',
    );

    expect(format(-1 * 30.4375 * 24 * 60 * 60 * 1000, { locale: es })).toBe(
      '-1mes',
    );
    expect(format(-1 * 30.4375 * 24 * 60 * 60 * 1200, { locale: es })).toBe(
      '-1mes',
    );
    expect(format(-1 * 30.4375 * 24 * 60 * 60 * 10000, { locale: es })).toBe(
      '-10mes',
    );
  });

  it('should support years', () => {
    expect(format(365.25 * 24 * 60 * 60 * 1000 + 1, { locale: es })).toBe(
      '1año',
    );
    expect(format(365.25 * 24 * 60 * 60 * 1200 + 1, { locale: es })).toBe(
      '1año',
    );
    expect(format(365.25 * 24 * 60 * 60 * 10000 + 1, { locale: es })).toBe(
      '10año',
    );

    expect(format(-1 * 365.25 * 24 * 60 * 60 * 1000 - 1, { locale: es })).toBe(
      '-1año',
    );
    expect(format(-1 * 365.25 * 24 * 60 * 60 * 1200 - 1, { locale: es })).toBe(
      '-1año',
    );
    expect(format(-1 * 365.25 * 24 * 60 * 60 * 10000 - 1, { locale: es })).toBe(
      '-10año',
    );
  });

  it('should round', () => {
    expect(format(234234234, { locale: es })).toBe('3d');

    expect(format(-234234234, { locale: es })).toBe('-3d');
  });
});
