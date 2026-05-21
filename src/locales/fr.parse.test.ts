import { describe, expect, it } from '@jest/globals';
import { format, fr, parse } from '../index';

// parse() is English-only. These tests document which strings produced by
// format() with the French locale can be round-tripped through parse().

describe('parse — fr short format', () => {
  it('should round-trip milliseconds (ms = "ms")', () => {
    expect(parse(format(500, { locale: fr }))).toBe(500); // '500ms'
    expect(parse(format(-500, { locale: fr }))).toBe(-500); // '-500ms'
  });

  it('should round-trip seconds (s = "s")', () => {
    expect(parse(format(1000, { locale: fr }))).toBe(1000); // '1s'
    expect(parse(format(10000, { locale: fr }))).toBe(10000); // '10s'
  });

  it('should round-trip minutes (m = "min")', () => {
    expect(parse(format(60 * 1000, { locale: fr }))).toBe(60 * 1000); // '1min'
    expect(parse(format(60 * 10000, { locale: fr }))).toBe(60 * 10000); // '10min'
  });

  it('should round-trip hours (h = "h")', () => {
    expect(parse(format(60 * 60 * 1000, { locale: fr }))).toBe(60 * 60 * 1000); // '1h'
    expect(parse(format(60 * 60 * 10000, { locale: fr }))).toBe(
      60 * 60 * 10000,
    ); // '10h'
  });

  it('should return NaN for days (d = "j" — not an English unit)', () => {
    expect(
      Number.isNaN(parse(format(24 * 60 * 60 * 1000, { locale: fr }))),
    ).toBe(true); // '1j'
  });

  it('should return NaN for weeks (w = "sem" — not an English unit)', () => {
    expect(
      Number.isNaN(parse(format(7 * 24 * 60 * 60 * 1000, { locale: fr }))),
    ).toBe(true); // '1sem'
  });

  it('should return NaN for months (mo = "mois" — not an English unit)', () => {
    expect(
      Number.isNaN(
        parse(format(30.4375 * 24 * 60 * 60 * 1000, { locale: fr })),
      ),
    ).toBe(true); // '1mois'
  });

  it('should return NaN for years (y = "an" — not an English unit)', () => {
    expect(
      Number.isNaN(
        parse(format(365.25 * 24 * 60 * 60 * 1000 + 1, { locale: fr })),
      ),
    ).toBe(true); // '1an'
  });
});

describe('parse — fr long format', () => {
  it('should return NaN for French millisecond words', () => {
    expect(Number.isNaN(parse('1 milliseconde'))).toBe(true);
    expect(Number.isNaN(parse('500 millisecondes'))).toBe(true);
  });

  it('should return NaN for French second words', () => {
    expect(Number.isNaN(parse('1 seconde'))).toBe(true);
    expect(Number.isNaN(parse('10 secondes'))).toBe(true);
  });

  it('should parse "minute" and "minutes" (coincidental English match)', () => {
    expect(parse('1 minute')).toBe(60 * 1000);
    expect(parse('10 minutes')).toBe(60 * 10000);
  });

  it('should return NaN for French hour, day, week, month, year words', () => {
    expect(Number.isNaN(parse('1 heure'))).toBe(true);
    expect(Number.isNaN(parse('1 jour'))).toBe(true);
    expect(Number.isNaN(parse('1 semaine'))).toBe(true);
    expect(Number.isNaN(parse('1 mois'))).toBe(true);
    expect(Number.isNaN(parse('1 an'))).toBe(true);
  });
});
