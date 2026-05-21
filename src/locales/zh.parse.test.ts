import { describe, expect, it } from '@jest/globals';
import { format, parse, zh } from '../index';

// parse() is English-only. All Chinese locale output uses CJK characters,
// so no locale-formatted strings can be round-tripped through parse().

describe('parse — zh short format', () => {
  it('should return NaN for all Chinese short units', () => {
    expect(Number.isNaN(parse(format(500, { locale: zh })))).toBe(true); // '500毫秒'
    expect(Number.isNaN(parse(format(1000, { locale: zh })))).toBe(true); // '1秒'
    expect(Number.isNaN(parse(format(60 * 1000, { locale: zh })))).toBe(true); // '1分'
    expect(Number.isNaN(parse(format(60 * 60 * 1000, { locale: zh })))).toBe(
      true,
    ); // '1时'
    expect(
      Number.isNaN(parse(format(24 * 60 * 60 * 1000, { locale: zh }))),
    ).toBe(true); // '1天'
    expect(
      Number.isNaN(parse(format(7 * 24 * 60 * 60 * 1000, { locale: zh }))),
    ).toBe(true); // '1周'
    expect(
      Number.isNaN(
        parse(format(30.4375 * 24 * 60 * 60 * 1000, { locale: zh })),
      ),
    ).toBe(true); // '1月'
    expect(
      Number.isNaN(
        parse(format(365.25 * 24 * 60 * 60 * 1000 + 1, { locale: zh })),
      ),
    ).toBe(true); // '1年'
  });
});

describe('parse — zh long format', () => {
  it('should return NaN for all Chinese long unit words', () => {
    expect(Number.isNaN(parse('1 毫秒'))).toBe(true);
    expect(Number.isNaN(parse('1 秒'))).toBe(true);
    expect(Number.isNaN(parse('1 分钟'))).toBe(true);
    expect(Number.isNaN(parse('1 小时'))).toBe(true);
    expect(Number.isNaN(parse('1 天'))).toBe(true);
    expect(Number.isNaN(parse('1 周'))).toBe(true);
    expect(Number.isNaN(parse('1 月'))).toBe(true);
    expect(Number.isNaN(parse('1 年'))).toBe(true);
  });
});
