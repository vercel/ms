import { describe, expect, it } from '@jest/globals';
import { parseStrict } from '../index';

// parseStrict() is typed to only accept StringValue (English units).
// All Chinese locale output uses CJK characters — none are valid StringValue.

describe('parseStrict — zh short format', () => {
  it('should return NaN for all Chinese short units (type errors)', () => {
    // @ts-expect-error — CJK characters, not a StringValue
    expect(Number.isNaN(parseStrict('500毫秒'))).toBe(true);
    // @ts-expect-error — CJK characters, not a StringValue
    expect(Number.isNaN(parseStrict('1秒'))).toBe(true);
    // @ts-expect-error — CJK characters, not a StringValue
    expect(Number.isNaN(parseStrict('1分'))).toBe(true);
    // @ts-expect-error — CJK characters, not a StringValue
    expect(Number.isNaN(parseStrict('1时'))).toBe(true);
    // @ts-expect-error — CJK characters, not a StringValue
    expect(Number.isNaN(parseStrict('1天'))).toBe(true);
    // @ts-expect-error — CJK characters, not a StringValue
    expect(Number.isNaN(parseStrict('1周'))).toBe(true);
    // @ts-expect-error — CJK characters, not a StringValue
    expect(Number.isNaN(parseStrict('1月'))).toBe(true);
    // @ts-expect-error — CJK characters, not a StringValue
    expect(Number.isNaN(parseStrict('1年'))).toBe(true);
  });
});

describe('parseStrict — zh long format', () => {
  it('should return NaN for all Chinese long unit words (type errors)', () => {
    // @ts-expect-error — not a StringValue
    expect(Number.isNaN(parseStrict('1 毫秒'))).toBe(true);
    // @ts-expect-error — not a StringValue
    expect(Number.isNaN(parseStrict('1 秒'))).toBe(true);
    // @ts-expect-error — not a StringValue
    expect(Number.isNaN(parseStrict('1 分钟'))).toBe(true);
    // @ts-expect-error — not a StringValue
    expect(Number.isNaN(parseStrict('1 小时'))).toBe(true);
    // @ts-expect-error — not a StringValue
    expect(Number.isNaN(parseStrict('1 天'))).toBe(true);
    // @ts-expect-error — not a StringValue
    expect(Number.isNaN(parseStrict('1 周'))).toBe(true);
    // @ts-expect-error — not a StringValue
    expect(Number.isNaN(parseStrict('1 月'))).toBe(true);
    // @ts-expect-error — not a StringValue
    expect(Number.isNaN(parseStrict('1 年'))).toBe(true);
  });
});
