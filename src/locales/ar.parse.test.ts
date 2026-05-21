import { describe, expect, it } from '@jest/globals';
import { ar, format, parse } from '../index';

// parse() is English-only. All Arabic locale output uses Arabic script,
// so no locale-formatted strings can be round-tripped through parse().

describe('parse — ar short format', () => {
  it('should return NaN for all Arabic short units', () => {
    expect(Number.isNaN(parse(format(500, { locale: ar })))).toBe(true); // '500مللي ث'
    expect(Number.isNaN(parse(format(1000, { locale: ar })))).toBe(true); // '1ث'
    expect(Number.isNaN(parse(format(60 * 1000, { locale: ar })))).toBe(true); // '1د'
    expect(Number.isNaN(parse(format(60 * 60 * 1000, { locale: ar })))).toBe(
      true,
    ); // '1س'
    expect(
      Number.isNaN(parse(format(24 * 60 * 60 * 1000, { locale: ar }))),
    ).toBe(true); // '1ي'
    expect(
      Number.isNaN(parse(format(7 * 24 * 60 * 60 * 1000, { locale: ar }))),
    ).toBe(true); // '1أ'
    expect(
      Number.isNaN(
        parse(format(30.4375 * 24 * 60 * 60 * 1000, { locale: ar })),
      ),
    ).toBe(true); // '1شه'
    expect(
      Number.isNaN(
        parse(format(365.25 * 24 * 60 * 60 * 1000 + 1, { locale: ar })),
      ),
    ).toBe(true); // '1سن'
  });
});

describe('parse — ar long format', () => {
  it('should return NaN for all Arabic long unit words', () => {
    expect(Number.isNaN(parse('1 مللي ثانية'))).toBe(true);
    expect(Number.isNaN(parse('1 ثانية'))).toBe(true);
    expect(Number.isNaN(parse('1 دقيقة'))).toBe(true);
    expect(Number.isNaN(parse('1 ساعة'))).toBe(true);
    expect(Number.isNaN(parse('1 يوم'))).toBe(true);
    expect(Number.isNaN(parse('1 أسبوع'))).toBe(true);
    expect(Number.isNaN(parse('1 شهر'))).toBe(true);
    expect(Number.isNaN(parse('1 سنة'))).toBe(true);
  });
});
