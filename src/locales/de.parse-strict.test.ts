import { describe, expect, it } from '@jest/globals';
import { parseStrict } from '../index';

// parseStrict() is typed to only accept StringValue (English units).
// Note: "W" is Capitalize<"w"> and "Mo" is Capitalize<"mo">, both valid StringValue.

describe('parseStrict — de short format', () => {
  it('should round-trip milliseconds (ms = "ms")', () => {
    expect(parseStrict('500ms')).toBe(500);
    expect(parseStrict('-500ms')).toBe(-500);
  });

  it('should round-trip seconds (s = "s")', () => {
    expect(parseStrict('1s')).toBe(1000);
    expect(parseStrict('10s')).toBe(10000);
  });

  it('should round-trip minutes (m = "min")', () => {
    expect(parseStrict('1min')).toBe(60 * 1000);
    expect(parseStrict('10min')).toBe(60 * 10000);
  });

  it('should return NaN for hours (h = "Std" — type error: not a StringValue)', () => {
    // @ts-expect-error — '1Std' is not a StringValue; locale unit not English
    expect(Number.isNaN(parseStrict('1Std'))).toBe(true);
  });

  it('should return NaN for days (d = "T" — type error: not a StringValue)', () => {
    // @ts-expect-error — '1T' is not a StringValue; locale unit not English
    expect(Number.isNaN(parseStrict('1T'))).toBe(true);
  });

  it('should round-trip weeks (w = "W" — valid StringValue: Capitalize<"w">)', () => {
    expect(parseStrict('1W')).toBe(7 * 24 * 60 * 60 * 1000);
    expect(parseStrict('2W')).toBe(2 * 7 * 24 * 60 * 60 * 1000);
  });

  it('should round-trip months (mo = "Mo" — valid StringValue: Capitalize<"mo">)', () => {
    expect(parseStrict('1Mo')).toBe(30.4375 * 24 * 60 * 60 * 1000);
  });

  it('should return NaN for years (y = "J" — type error: not a StringValue)', () => {
    // @ts-expect-error — '1J' is not a StringValue; locale unit not English
    expect(Number.isNaN(parseStrict('1J'))).toBe(true);
  });
});

describe('parseStrict — de long format', () => {
  it('should return NaN for German millisecond words (type errors)', () => {
    // @ts-expect-error — not a StringValue
    expect(Number.isNaN(parseStrict('1 Millisekunde'))).toBe(true);
    // @ts-expect-error — not a StringValue
    expect(Number.isNaN(parseStrict('500 Millisekunden'))).toBe(true);
  });

  it('should return NaN for German second words (type errors)', () => {
    // @ts-expect-error — not a StringValue
    expect(Number.isNaN(parseStrict('1 Sekunde'))).toBe(true);
    // @ts-expect-error — not a StringValue
    expect(Number.isNaN(parseStrict('10 Sekunden'))).toBe(true);
  });

  it('should parse "Minute" (valid StringValue: Capitalize<"minute">)', () => {
    expect(parseStrict('1 Minute')).toBe(60 * 1000);
  });

  it('should return NaN for "Minuten" (type error: not a StringValue)', () => {
    // @ts-expect-error — 'Minuten' is not in UnitAnyCase
    expect(Number.isNaN(parseStrict('10 Minuten'))).toBe(true);
  });

  it('should return NaN for German hour, day, week, month, year words (type errors)', () => {
    // @ts-expect-error — not a StringValue
    expect(Number.isNaN(parseStrict('1 Stunde'))).toBe(true);
    // @ts-expect-error — not a StringValue
    expect(Number.isNaN(parseStrict('1 Tag'))).toBe(true);
    // @ts-expect-error — not a StringValue
    expect(Number.isNaN(parseStrict('1 Woche'))).toBe(true);
    // @ts-expect-error — not a StringValue
    expect(Number.isNaN(parseStrict('1 Monat'))).toBe(true);
    // @ts-expect-error — not a StringValue
    expect(Number.isNaN(parseStrict('1 Jahr'))).toBe(true);
  });
});
