import { describe, expect, it } from '@jest/globals';
import { ar, format } from '../index';

describe('format(number, { locale: ar, long: true })', () => {
  it('should not throw an error', () => {
    expect(() => {
      format(500, { locale: ar, long: true });
    }).not.toThrow();
  });

  it('should support milliseconds', () => {
    expect(format(1, { locale: ar, long: true })).toBe('1 مللي ثانية');
    expect(format(500, { locale: ar, long: true })).toBe('500 مللي ثانية');

    expect(format(-1, { locale: ar, long: true })).toBe('-1 مللي ثانية');
    expect(format(-500, { locale: ar, long: true })).toBe('-500 مللي ثانية');
  });

  it('should support seconds', () => {
    expect(format(1000, { locale: ar, long: true })).toBe('1 ثانية');
    expect(format(1200, { locale: ar, long: true })).toBe('1 ثانية');
    expect(format(10000, { locale: ar, long: true })).toBe('10 ثوانٍ');

    expect(format(-1000, { locale: ar, long: true })).toBe('-1 ثانية');
    expect(format(-1200, { locale: ar, long: true })).toBe('-1 ثانية');
    expect(format(-10000, { locale: ar, long: true })).toBe('-10 ثوانٍ');
  });

  it('should support minutes', () => {
    expect(format(60 * 1000, { locale: ar, long: true })).toBe('1 دقيقة');
    expect(format(60 * 1200, { locale: ar, long: true })).toBe('1 دقيقة');
    expect(format(60 * 10000, { locale: ar, long: true })).toBe('10 دقائق');

    expect(format(-1 * 60 * 1000, { locale: ar, long: true })).toBe('-1 دقيقة');
    expect(format(-1 * 60 * 1200, { locale: ar, long: true })).toBe('-1 دقيقة');
    expect(format(-1 * 60 * 10000, { locale: ar, long: true })).toBe(
      '-10 دقائق',
    );
  });

  it('should support hours', () => {
    expect(format(60 * 60 * 1000, { locale: ar, long: true })).toBe('1 ساعة');
    expect(format(60 * 60 * 1200, { locale: ar, long: true })).toBe('1 ساعة');
    expect(format(60 * 60 * 10000, { locale: ar, long: true })).toBe(
      '10 ساعات',
    );

    expect(format(-1 * 60 * 60 * 1000, { locale: ar, long: true })).toBe(
      '-1 ساعة',
    );
    expect(format(-1 * 60 * 60 * 1200, { locale: ar, long: true })).toBe(
      '-1 ساعة',
    );
    expect(format(-1 * 60 * 60 * 10000, { locale: ar, long: true })).toBe(
      '-10 ساعات',
    );
  });

  it('should support days', () => {
    expect(format(1 * 24 * 60 * 60 * 1000, { locale: ar, long: true })).toBe(
      '1 يوم',
    );
    expect(format(1 * 24 * 60 * 60 * 1200, { locale: ar, long: true })).toBe(
      '1 يوم',
    );
    expect(format(6 * 24 * 60 * 60 * 1000, { locale: ar, long: true })).toBe(
      '6 أيام',
    );

    expect(
      format(-1 * 1 * 24 * 60 * 60 * 1000, { locale: ar, long: true }),
    ).toBe('-1 يوم');
    expect(
      format(-1 * 1 * 24 * 60 * 60 * 1200, { locale: ar, long: true }),
    ).toBe('-1 يوم');
    expect(
      format(-1 * 6 * 24 * 60 * 60 * 1000, { locale: ar, long: true }),
    ).toBe('-6 أيام');
  });

  it('should support weeks', () => {
    expect(
      format(1 * 7 * 24 * 60 * 60 * 1000, { locale: ar, long: true }),
    ).toBe('1 أسبوع');
    expect(
      format(2 * 7 * 24 * 60 * 60 * 1000, { locale: ar, long: true }),
    ).toBe('2 أسابيع');

    expect(
      format(-1 * 1 * 7 * 24 * 60 * 60 * 1000, { locale: ar, long: true }),
    ).toBe('-1 أسبوع');
    expect(
      format(-1 * 2 * 7 * 24 * 60 * 60 * 1000, { locale: ar, long: true }),
    ).toBe('-2 أسابيع');
  });

  it('should support months', () => {
    expect(
      format(30.4375 * 24 * 60 * 60 * 1000, { locale: ar, long: true }),
    ).toBe('1 شهر');
    expect(
      format(30.4375 * 24 * 60 * 60 * 1200, { locale: ar, long: true }),
    ).toBe('1 شهر');
    expect(
      format(30.4375 * 24 * 60 * 60 * 10000, { locale: ar, long: true }),
    ).toBe('10 أشهر');

    expect(
      format(-1 * 30.4375 * 24 * 60 * 60 * 1000, { locale: ar, long: true }),
    ).toBe('-1 شهر');
    expect(
      format(-1 * 30.4375 * 24 * 60 * 60 * 1200, { locale: ar, long: true }),
    ).toBe('-1 شهر');
    expect(
      format(-1 * 30.4375 * 24 * 60 * 60 * 10000, { locale: ar, long: true }),
    ).toBe('-10 أشهر');
  });

  it('should support years', () => {
    expect(
      format(365.25 * 24 * 60 * 60 * 1000 + 1, { locale: ar, long: true }),
    ).toBe('1 سنة');
    expect(
      format(365.25 * 24 * 60 * 60 * 1200 + 1, { locale: ar, long: true }),
    ).toBe('1 سنة');
    expect(
      format(365.25 * 24 * 60 * 60 * 10000 + 1, { locale: ar, long: true }),
    ).toBe('10 سنوات');

    expect(
      format(-1 * 365.25 * 24 * 60 * 60 * 1000 - 1, {
        locale: ar,
        long: true,
      }),
    ).toBe('-1 سنة');
    expect(
      format(-1 * 365.25 * 24 * 60 * 60 * 1200 - 1, {
        locale: ar,
        long: true,
      }),
    ).toBe('-1 سنة');
    expect(
      format(-1 * 365.25 * 24 * 60 * 60 * 10000 - 1, {
        locale: ar,
        long: true,
      }),
    ).toBe('-10 سنوات');
  });

  it('should round', () => {
    expect(format(234234234, { locale: ar, long: true })).toBe('3 أيام');

    expect(format(-234234234, { locale: ar, long: true })).toBe('-3 أيام');
  });
});

describe('format(number, { locale: ar })', () => {
  it('should not throw an error', () => {
    expect(() => {
      format(500, { locale: ar });
    }).not.toThrow();
  });

  it('should support milliseconds', () => {
    expect(format(500, { locale: ar })).toBe('500مللي ث');

    expect(format(-500, { locale: ar })).toBe('-500مللي ث');
  });

  it('should support seconds', () => {
    expect(format(1000, { locale: ar })).toBe('1ث');
    expect(format(10000, { locale: ar })).toBe('10ث');

    expect(format(-1000, { locale: ar })).toBe('-1ث');
    expect(format(-10000, { locale: ar })).toBe('-10ث');
  });

  it('should support minutes', () => {
    expect(format(60 * 1000, { locale: ar })).toBe('1د');
    expect(format(60 * 10000, { locale: ar })).toBe('10د');

    expect(format(-1 * 60 * 1000, { locale: ar })).toBe('-1د');
    expect(format(-1 * 60 * 10000, { locale: ar })).toBe('-10د');
  });

  it('should support hours', () => {
    expect(format(60 * 60 * 1000, { locale: ar })).toBe('1س');
    expect(format(60 * 60 * 10000, { locale: ar })).toBe('10س');

    expect(format(-1 * 60 * 60 * 1000, { locale: ar })).toBe('-1س');
    expect(format(-1 * 60 * 60 * 10000, { locale: ar })).toBe('-10س');
  });

  it('should support days', () => {
    expect(format(24 * 60 * 60 * 1000, { locale: ar })).toBe('1ي');
    expect(format(24 * 60 * 60 * 6000, { locale: ar })).toBe('6ي');

    expect(format(-1 * 24 * 60 * 60 * 1000, { locale: ar })).toBe('-1ي');
    expect(format(-1 * 24 * 60 * 60 * 6000, { locale: ar })).toBe('-6ي');
  });

  it('should support weeks', () => {
    expect(format(1 * 7 * 24 * 60 * 60 * 1000, { locale: ar })).toBe('1أ');
    expect(format(2 * 7 * 24 * 60 * 60 * 1000, { locale: ar })).toBe('2أ');

    expect(format(-1 * 1 * 7 * 24 * 60 * 60 * 1000, { locale: ar })).toBe(
      '-1أ',
    );
    expect(format(-1 * 2 * 7 * 24 * 60 * 60 * 1000, { locale: ar })).toBe(
      '-2أ',
    );
  });

  it('should support months', () => {
    expect(format(30.4375 * 24 * 60 * 60 * 1000, { locale: ar })).toBe('1شه');
    expect(format(30.4375 * 24 * 60 * 60 * 1200, { locale: ar })).toBe('1شه');
    expect(format(30.4375 * 24 * 60 * 60 * 10000, { locale: ar })).toBe('10شه');

    expect(format(-1 * 30.4375 * 24 * 60 * 60 * 1000, { locale: ar })).toBe(
      '-1شه',
    );
    expect(format(-1 * 30.4375 * 24 * 60 * 60 * 1200, { locale: ar })).toBe(
      '-1شه',
    );
    expect(format(-1 * 30.4375 * 24 * 60 * 60 * 10000, { locale: ar })).toBe(
      '-10شه',
    );
  });

  it('should support years', () => {
    expect(format(365.25 * 24 * 60 * 60 * 1000 + 1, { locale: ar })).toBe(
      '1سن',
    );
    expect(format(365.25 * 24 * 60 * 60 * 1200 + 1, { locale: ar })).toBe(
      '1سن',
    );
    expect(format(365.25 * 24 * 60 * 60 * 10000 + 1, { locale: ar })).toBe(
      '10سن',
    );

    expect(format(-1 * 365.25 * 24 * 60 * 60 * 1000 - 1, { locale: ar })).toBe(
      '-1سن',
    );
    expect(format(-1 * 365.25 * 24 * 60 * 60 * 1200 - 1, { locale: ar })).toBe(
      '-1سن',
    );
    expect(format(-1 * 365.25 * 24 * 60 * 60 * 10000 - 1, { locale: ar })).toBe(
      '-10سن',
    );
  });

  it('should round', () => {
    expect(format(234234234, { locale: ar })).toBe('3ي');

    expect(format(-234234234, { locale: ar })).toBe('-3ي');
  });
});
