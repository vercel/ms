import { describe, expect, it } from '@jest/globals';
import { format, zh } from '../index';

describe('format(number, { locale: zh, long: true })', () => {
  it('should not throw an error', () => {
    expect(() => {
      format(500, { locale: zh, long: true });
    }).not.toThrow();
  });

  it('should support milliseconds', () => {
    expect(format(1, { locale: zh, long: true })).toBe('1 毫秒');
    expect(format(500, { locale: zh, long: true })).toBe('500 毫秒');

    expect(format(-1, { locale: zh, long: true })).toBe('-1 毫秒');
    expect(format(-500, { locale: zh, long: true })).toBe('-500 毫秒');
  });

  it('should support seconds', () => {
    expect(format(1000, { locale: zh, long: true })).toBe('1 秒');
    expect(format(1200, { locale: zh, long: true })).toBe('1 秒');
    expect(format(10000, { locale: zh, long: true })).toBe('10 秒');

    expect(format(-1000, { locale: zh, long: true })).toBe('-1 秒');
    expect(format(-1200, { locale: zh, long: true })).toBe('-1 秒');
    expect(format(-10000, { locale: zh, long: true })).toBe('-10 秒');
  });

  it('should support minutes', () => {
    expect(format(60 * 1000, { locale: zh, long: true })).toBe('1 分钟');
    expect(format(60 * 1200, { locale: zh, long: true })).toBe('1 分钟');
    expect(format(60 * 10000, { locale: zh, long: true })).toBe('10 分钟');

    expect(format(-1 * 60 * 1000, { locale: zh, long: true })).toBe('-1 分钟');
    expect(format(-1 * 60 * 1200, { locale: zh, long: true })).toBe('-1 分钟');
    expect(format(-1 * 60 * 10000, { locale: zh, long: true })).toBe(
      '-10 分钟',
    );
  });

  it('should support hours', () => {
    expect(format(60 * 60 * 1000, { locale: zh, long: true })).toBe('1 小时');
    expect(format(60 * 60 * 1200, { locale: zh, long: true })).toBe('1 小时');
    expect(format(60 * 60 * 10000, { locale: zh, long: true })).toBe('10 小时');

    expect(format(-1 * 60 * 60 * 1000, { locale: zh, long: true })).toBe(
      '-1 小时',
    );
    expect(format(-1 * 60 * 60 * 1200, { locale: zh, long: true })).toBe(
      '-1 小时',
    );
    expect(format(-1 * 60 * 60 * 10000, { locale: zh, long: true })).toBe(
      '-10 小时',
    );
  });

  it('should support days', () => {
    expect(format(1 * 24 * 60 * 60 * 1000, { locale: zh, long: true })).toBe(
      '1 天',
    );
    expect(format(1 * 24 * 60 * 60 * 1200, { locale: zh, long: true })).toBe(
      '1 天',
    );
    expect(format(6 * 24 * 60 * 60 * 1000, { locale: zh, long: true })).toBe(
      '6 天',
    );

    expect(
      format(-1 * 1 * 24 * 60 * 60 * 1000, { locale: zh, long: true }),
    ).toBe('-1 天');
    expect(
      format(-1 * 1 * 24 * 60 * 60 * 1200, { locale: zh, long: true }),
    ).toBe('-1 天');
    expect(
      format(-1 * 6 * 24 * 60 * 60 * 1000, { locale: zh, long: true }),
    ).toBe('-6 天');
  });

  it('should support weeks', () => {
    expect(
      format(1 * 7 * 24 * 60 * 60 * 1000, { locale: zh, long: true }),
    ).toBe('1 周');
    expect(
      format(2 * 7 * 24 * 60 * 60 * 1000, { locale: zh, long: true }),
    ).toBe('2 周');

    expect(
      format(-1 * 1 * 7 * 24 * 60 * 60 * 1000, { locale: zh, long: true }),
    ).toBe('-1 周');
    expect(
      format(-1 * 2 * 7 * 24 * 60 * 60 * 1000, { locale: zh, long: true }),
    ).toBe('-2 周');
  });

  it('should support months', () => {
    expect(
      format(30.4375 * 24 * 60 * 60 * 1000, { locale: zh, long: true }),
    ).toBe('1 月');
    expect(
      format(30.4375 * 24 * 60 * 60 * 1200, { locale: zh, long: true }),
    ).toBe('1 月');
    expect(
      format(30.4375 * 24 * 60 * 60 * 10000, { locale: zh, long: true }),
    ).toBe('10 月');

    expect(
      format(-1 * 30.4375 * 24 * 60 * 60 * 1000, { locale: zh, long: true }),
    ).toBe('-1 月');
    expect(
      format(-1 * 30.4375 * 24 * 60 * 60 * 1200, { locale: zh, long: true }),
    ).toBe('-1 月');
    expect(
      format(-1 * 30.4375 * 24 * 60 * 60 * 10000, { locale: zh, long: true }),
    ).toBe('-10 月');
  });

  it('should support years', () => {
    expect(
      format(365.25 * 24 * 60 * 60 * 1000 + 1, { locale: zh, long: true }),
    ).toBe('1 年');
    expect(
      format(365.25 * 24 * 60 * 60 * 1200 + 1, { locale: zh, long: true }),
    ).toBe('1 年');
    expect(
      format(365.25 * 24 * 60 * 60 * 10000 + 1, { locale: zh, long: true }),
    ).toBe('10 年');

    expect(
      format(-1 * 365.25 * 24 * 60 * 60 * 1000 - 1, {
        locale: zh,
        long: true,
      }),
    ).toBe('-1 年');
    expect(
      format(-1 * 365.25 * 24 * 60 * 60 * 1200 - 1, {
        locale: zh,
        long: true,
      }),
    ).toBe('-1 年');
    expect(
      format(-1 * 365.25 * 24 * 60 * 60 * 10000 - 1, {
        locale: zh,
        long: true,
      }),
    ).toBe('-10 年');
  });

  it('should round', () => {
    expect(format(234234234, { locale: zh, long: true })).toBe('3 天');

    expect(format(-234234234, { locale: zh, long: true })).toBe('-3 天');
  });
});

describe('format(number, { locale: zh })', () => {
  it('should not throw an error', () => {
    expect(() => {
      format(500, { locale: zh });
    }).not.toThrow();
  });

  it('should support milliseconds', () => {
    expect(format(500, { locale: zh })).toBe('500毫秒');

    expect(format(-500, { locale: zh })).toBe('-500毫秒');
  });

  it('should support seconds', () => {
    expect(format(1000, { locale: zh })).toBe('1秒');
    expect(format(10000, { locale: zh })).toBe('10秒');

    expect(format(-1000, { locale: zh })).toBe('-1秒');
    expect(format(-10000, { locale: zh })).toBe('-10秒');
  });

  it('should support minutes', () => {
    expect(format(60 * 1000, { locale: zh })).toBe('1分');
    expect(format(60 * 10000, { locale: zh })).toBe('10分');

    expect(format(-1 * 60 * 1000, { locale: zh })).toBe('-1分');
    expect(format(-1 * 60 * 10000, { locale: zh })).toBe('-10分');
  });

  it('should support hours', () => {
    expect(format(60 * 60 * 1000, { locale: zh })).toBe('1时');
    expect(format(60 * 60 * 10000, { locale: zh })).toBe('10时');

    expect(format(-1 * 60 * 60 * 1000, { locale: zh })).toBe('-1时');
    expect(format(-1 * 60 * 60 * 10000, { locale: zh })).toBe('-10时');
  });

  it('should support days', () => {
    expect(format(24 * 60 * 60 * 1000, { locale: zh })).toBe('1天');
    expect(format(24 * 60 * 60 * 6000, { locale: zh })).toBe('6天');

    expect(format(-1 * 24 * 60 * 60 * 1000, { locale: zh })).toBe('-1天');
    expect(format(-1 * 24 * 60 * 60 * 6000, { locale: zh })).toBe('-6天');
  });

  it('should support weeks', () => {
    expect(format(1 * 7 * 24 * 60 * 60 * 1000, { locale: zh })).toBe('1周');
    expect(format(2 * 7 * 24 * 60 * 60 * 1000, { locale: zh })).toBe('2周');

    expect(format(-1 * 1 * 7 * 24 * 60 * 60 * 1000, { locale: zh })).toBe(
      '-1周',
    );
    expect(format(-1 * 2 * 7 * 24 * 60 * 60 * 1000, { locale: zh })).toBe(
      '-2周',
    );
  });

  it('should support months', () => {
    expect(format(30.4375 * 24 * 60 * 60 * 1000, { locale: zh })).toBe('1月');
    expect(format(30.4375 * 24 * 60 * 60 * 1200, { locale: zh })).toBe('1月');
    expect(format(30.4375 * 24 * 60 * 60 * 10000, { locale: zh })).toBe('10月');

    expect(format(-1 * 30.4375 * 24 * 60 * 60 * 1000, { locale: zh })).toBe(
      '-1月',
    );
    expect(format(-1 * 30.4375 * 24 * 60 * 60 * 1200, { locale: zh })).toBe(
      '-1月',
    );
    expect(format(-1 * 30.4375 * 24 * 60 * 60 * 10000, { locale: zh })).toBe(
      '-10月',
    );
  });

  it('should support years', () => {
    expect(format(365.25 * 24 * 60 * 60 * 1000 + 1, { locale: zh })).toBe(
      '1年',
    );
    expect(format(365.25 * 24 * 60 * 60 * 1200 + 1, { locale: zh })).toBe(
      '1年',
    );
    expect(format(365.25 * 24 * 60 * 60 * 10000 + 1, { locale: zh })).toBe(
      '10年',
    );

    expect(format(-1 * 365.25 * 24 * 60 * 60 * 1000 - 1, { locale: zh })).toBe(
      '-1年',
    );
    expect(format(-1 * 365.25 * 24 * 60 * 60 * 1200 - 1, { locale: zh })).toBe(
      '-1年',
    );
    expect(format(-1 * 365.25 * 24 * 60 * 60 * 10000 - 1, { locale: zh })).toBe(
      '-10年',
    );
  });

  it('should round', () => {
    expect(format(234234234, { locale: zh })).toBe('3天');

    expect(format(-234234234, { locale: zh })).toBe('-3天');
  });
});
