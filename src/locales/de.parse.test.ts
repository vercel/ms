import { describe, expect, it } from '@jest/globals';
import { de, format, parse } from '../index';

// parse() is English-only. These tests document which strings produced by
// format() with the German locale can be round-tripped through parse().
// Note: the English regex is case-insensitive, so "W" matches "w" (week)
// and "Mo" matches "mo" (month).

describe('parse — de short format', () => {
  it('should round-trip milliseconds (ms = "ms")', () => {
    expect(parse(format(500, { locale: de }))).toBe(500); // '500ms'
    expect(parse(format(-500, { locale: de }))).toBe(-500); // '-500ms'
  });

  it('should round-trip seconds (s = "s")', () => {
    expect(parse(format(1000, { locale: de }))).toBe(1000); // '1s'
    expect(parse(format(10000, { locale: de }))).toBe(10000); // '10s'
  });

  it('should round-trip minutes (m = "min")', () => {
    expect(parse(format(60 * 1000, { locale: de }))).toBe(60 * 1000); // '1min'
    expect(parse(format(60 * 10000, { locale: de }))).toBe(60 * 10000); // '10min'
  });

  it('should return NaN for hours (h = "Std" — not an English unit)', () => {
    expect(Number.isNaN(parse(format(60 * 60 * 1000, { locale: de })))).toBe(
      true,
    ); // '1Std'
  });

  it('should return NaN for days (d = "T" — not an English unit)', () => {
    expect(
      Number.isNaN(parse(format(24 * 60 * 60 * 1000, { locale: de }))),
    ).toBe(true); // '1T'
  });

  it('should round-trip weeks (w = "W" — case-insensitively matches English "w")', () => {
    expect(parse(format(7 * 24 * 60 * 60 * 1000, { locale: de }))).toBe(
      7 * 24 * 60 * 60 * 1000,
    ); // '1W'
    expect(parse(format(2 * 7 * 24 * 60 * 60 * 1000, { locale: de }))).toBe(
      2 * 7 * 24 * 60 * 60 * 1000,
    ); // '2W'
  });

  it('should round-trip months (mo = "Mo" — case-insensitively matches English "mo")', () => {
    expect(parse(format(30.4375 * 24 * 60 * 60 * 1000, { locale: de }))).toBe(
      30.4375 * 24 * 60 * 60 * 1000,
    ); // '1Mo'
  });

  it('should return NaN for years (y = "J" — not an English unit)', () => {
    expect(
      Number.isNaN(
        parse(format(365.25 * 24 * 60 * 60 * 1000 + 1, { locale: de })),
      ),
    ).toBe(true); // '1J'
  });
});

describe('parse — de long format', () => {
  it('should return NaN for German millisecond words', () => {
    expect(Number.isNaN(parse('1 Millisekunde'))).toBe(true);
    expect(Number.isNaN(parse('500 Millisekunden'))).toBe(true);
  });

  it('should return NaN for German second words', () => {
    expect(Number.isNaN(parse('1 Sekunde'))).toBe(true);
    expect(Number.isNaN(parse('10 Sekunden'))).toBe(true);
  });

  it('should parse "Minute" (case-insensitively matches English "minute")', () => {
    expect(parse('1 Minute')).toBe(60 * 1000);
  });

  it('should return NaN for "Minuten" (German plural — no English match)', () => {
    expect(Number.isNaN(parse('10 Minuten'))).toBe(true);
  });

  it('should return NaN for German hour, day, week, month, year words', () => {
    expect(Number.isNaN(parse('1 Stunde'))).toBe(true);
    expect(Number.isNaN(parse('1 Tag'))).toBe(true);
    expect(Number.isNaN(parse('1 Woche'))).toBe(true);
    expect(Number.isNaN(parse('1 Monat'))).toBe(true);
    expect(Number.isNaN(parse('1 Jahr'))).toBe(true);
  });
});
