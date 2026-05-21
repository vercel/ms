import { describe, expect, it } from '@jest/globals';
import { es, format, parse } from '../index';

// parse() is English-only. These tests document which strings produced by
// format() with the Spanish locale can be round-tripped through parse().

describe('parse — es short format', () => {
  it('should round-trip milliseconds (ms = "ms")', () => {
    expect(parse(format(500, { locale: es }))).toBe(500); // '500ms'
    expect(parse(format(-500, { locale: es }))).toBe(-500); // '-500ms'
  });

  it('should round-trip seconds (s = "s")', () => {
    expect(parse(format(1000, { locale: es }))).toBe(1000); // '1s'
    expect(parse(format(10000, { locale: es }))).toBe(10000); // '10s'
  });

  it('should round-trip minutes (m = "min")', () => {
    expect(parse(format(60 * 1000, { locale: es }))).toBe(60 * 1000); // '1min'
    expect(parse(format(60 * 10000, { locale: es }))).toBe(60 * 10000); // '10min'
  });

  it('should round-trip hours (h = "h")', () => {
    expect(parse(format(60 * 60 * 1000, { locale: es }))).toBe(60 * 60 * 1000); // '1h'
    expect(parse(format(60 * 60 * 10000, { locale: es }))).toBe(
      60 * 60 * 10000,
    ); // '10h'
  });

  it('should round-trip days (d = "d" — same as English)', () => {
    expect(parse(format(24 * 60 * 60 * 1000, { locale: es }))).toBe(
      24 * 60 * 60 * 1000,
    ); // '1d'
    expect(parse(format(6 * 24 * 60 * 60 * 1000, { locale: es }))).toBe(
      6 * 24 * 60 * 60 * 1000,
    ); // '6d'
  });

  it('should return NaN for weeks (w = "sem" — not an English unit)', () => {
    expect(
      Number.isNaN(parse(format(7 * 24 * 60 * 60 * 1000, { locale: es }))),
    ).toBe(true); // '1sem'
  });

  it('should return NaN for months (mo = "mes" — not an English unit)', () => {
    expect(
      Number.isNaN(
        parse(format(30.4375 * 24 * 60 * 60 * 1000, { locale: es })),
      ),
    ).toBe(true); // '1mes'
  });

  it('should return NaN for years (y = "año" — not an English unit)', () => {
    expect(
      Number.isNaN(
        parse(format(365.25 * 24 * 60 * 60 * 1000 + 1, { locale: es })),
      ),
    ).toBe(true); // '1año'
  });
});

describe('parse — es long format', () => {
  it('should return NaN for Spanish millisecond words', () => {
    expect(Number.isNaN(parse('1 milisegundo'))).toBe(true);
    expect(Number.isNaN(parse('10 milisegundos'))).toBe(true);
  });

  it('should return NaN for Spanish second words', () => {
    expect(Number.isNaN(parse('1 segundo'))).toBe(true);
    expect(Number.isNaN(parse('10 segundos'))).toBe(true);
  });

  it('should return NaN for Spanish minute words', () => {
    expect(Number.isNaN(parse('1 minuto'))).toBe(true);
    expect(Number.isNaN(parse('10 minutos'))).toBe(true);
  });

  it('should return NaN for Spanish hour, day, week, month, year words', () => {
    expect(Number.isNaN(parse('1 hora'))).toBe(true);
    expect(Number.isNaN(parse('1 día'))).toBe(true);
    expect(Number.isNaN(parse('1 semana'))).toBe(true);
    expect(Number.isNaN(parse('1 mes'))).toBe(true);
    expect(Number.isNaN(parse('1 año'))).toBe(true);
  });
});
