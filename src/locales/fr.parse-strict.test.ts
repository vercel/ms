import { describe, expect, it } from '@jest/globals';
import { parseStrict } from '../index';

// parseStrict() is typed to only accept StringValue (English units).
// Locale-specific strings that fall outside StringValue are marked @ts-expect-error.

describe('parseStrict — fr short format', () => {
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

  it('should round-trip hours (h = "h")', () => {
    expect(parseStrict('1h')).toBe(60 * 60 * 1000);
    expect(parseStrict('10h')).toBe(60 * 60 * 10000);
  });

  it('should return NaN for days (d = "j" — type error: not a StringValue)', () => {
    // @ts-expect-error — '1j' is not a StringValue; locale unit not English
    expect(Number.isNaN(parseStrict('1j'))).toBe(true);
  });

  it('should return NaN for weeks (w = "sem" — type error: not a StringValue)', () => {
    // @ts-expect-error — '1sem' is not a StringValue; locale unit not English
    expect(Number.isNaN(parseStrict('1sem'))).toBe(true);
  });

  it('should return NaN for months (mo = "mois" — type error: not a StringValue)', () => {
    // @ts-expect-error — '1mois' is not a StringValue; locale unit not English
    expect(Number.isNaN(parseStrict('1mois'))).toBe(true);
  });

  it('should return NaN for years (y = "an" — type error: not a StringValue)', () => {
    // @ts-expect-error — '1an' is not a StringValue; locale unit not English
    expect(Number.isNaN(parseStrict('1an'))).toBe(true);
  });
});

describe('parseStrict — fr long format', () => {
  it('should return NaN for French millisecond words (type errors)', () => {
    // @ts-expect-error — not a StringValue
    expect(Number.isNaN(parseStrict('1 milliseconde'))).toBe(true);
    // @ts-expect-error — not a StringValue
    expect(Number.isNaN(parseStrict('500 millisecondes'))).toBe(true);
  });

  it('should return NaN for French second words (type errors)', () => {
    // @ts-expect-error — not a StringValue
    expect(Number.isNaN(parseStrict('1 seconde'))).toBe(true);
    // @ts-expect-error — not a StringValue
    expect(Number.isNaN(parseStrict('10 secondes'))).toBe(true);
  });

  it('should parse "minute" and "minutes" (valid StringValue — coincidental English match)', () => {
    expect(parseStrict('1 minute')).toBe(60 * 1000);
    expect(parseStrict('10 minutes')).toBe(60 * 10000);
  });

  it('should return NaN for French hour, day, week, month, year words (type errors)', () => {
    // @ts-expect-error — not a StringValue
    expect(Number.isNaN(parseStrict('1 heure'))).toBe(true);
    // @ts-expect-error — not a StringValue
    expect(Number.isNaN(parseStrict('1 jour'))).toBe(true);
    // @ts-expect-error — not a StringValue
    expect(Number.isNaN(parseStrict('1 semaine'))).toBe(true);
    // @ts-expect-error — not a StringValue
    expect(Number.isNaN(parseStrict('1 mois'))).toBe(true);
    // @ts-expect-error — not a StringValue
    expect(Number.isNaN(parseStrict('1 an'))).toBe(true);
  });
});
