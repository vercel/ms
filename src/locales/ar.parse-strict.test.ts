import { describe, expect, it } from '@jest/globals';
import { parseStrict } from '../index';

// parseStrict() is typed to only accept StringValue (English units).
// All Arabic locale output uses Arabic script — none are valid StringValue.

describe('parseStrict — ar short format', () => {
  it('should return NaN for all Arabic short units (type errors)', () => {
    // @ts-expect-error — Arabic script, not a StringValue
    expect(Number.isNaN(parseStrict('500مللي ث'))).toBe(true);
    // @ts-expect-error — Arabic script, not a StringValue
    expect(Number.isNaN(parseStrict('1ث'))).toBe(true);
    // @ts-expect-error — Arabic script, not a StringValue
    expect(Number.isNaN(parseStrict('1د'))).toBe(true);
    // @ts-expect-error — Arabic script, not a StringValue
    expect(Number.isNaN(parseStrict('1س'))).toBe(true);
    // @ts-expect-error — Arabic script, not a StringValue
    expect(Number.isNaN(parseStrict('1ي'))).toBe(true);
    // @ts-expect-error — Arabic script, not a StringValue
    expect(Number.isNaN(parseStrict('1أ'))).toBe(true);
    // @ts-expect-error — Arabic script, not a StringValue
    expect(Number.isNaN(parseStrict('1شه'))).toBe(true);
    // @ts-expect-error — Arabic script, not a StringValue
    expect(Number.isNaN(parseStrict('1سن'))).toBe(true);
  });
});

describe('parseStrict — ar long format', () => {
  it('should return NaN for all Arabic long unit words (type errors)', () => {
    // @ts-expect-error — not a StringValue
    expect(Number.isNaN(parseStrict('1 مللي ثانية'))).toBe(true);
    // @ts-expect-error — not a StringValue
    expect(Number.isNaN(parseStrict('1 ثانية'))).toBe(true);
    // @ts-expect-error — not a StringValue
    expect(Number.isNaN(parseStrict('1 دقيقة'))).toBe(true);
    // @ts-expect-error — not a StringValue
    expect(Number.isNaN(parseStrict('1 ساعة'))).toBe(true);
    // @ts-expect-error — not a StringValue
    expect(Number.isNaN(parseStrict('1 يوم'))).toBe(true);
    // @ts-expect-error — not a StringValue
    expect(Number.isNaN(parseStrict('1 أسبوع'))).toBe(true);
    // @ts-expect-error — not a StringValue
    expect(Number.isNaN(parseStrict('1 شهر'))).toBe(true);
    // @ts-expect-error — not a StringValue
    expect(Number.isNaN(parseStrict('1 سنة'))).toBe(true);
  });
});
