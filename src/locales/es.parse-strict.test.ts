import { describe, expect, it } from '@jest/globals';
import { parseStrict } from '../index';

// parseStrict() is typed to only accept StringValue (English units).
// Locale-specific strings that fall outside StringValue are marked @ts-expect-error.

describe('parseStrict — es short format', () => {
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

  it('should round-trip days (d = "d" — valid StringValue)', () => {
    expect(parseStrict('1d')).toBe(24 * 60 * 60 * 1000);
    expect(parseStrict('6d')).toBe(6 * 24 * 60 * 60 * 1000);
  });

  it('should return NaN for weeks (w = "sem" — type error: not a StringValue)', () => {
    // @ts-expect-error — '1sem' is not a StringValue; locale unit not English
    expect(Number.isNaN(parseStrict('1sem'))).toBe(true);
  });

  it('should return NaN for months (mo = "mes" — type error: not a StringValue)', () => {
    // @ts-expect-error — '1mes' is not a StringValue; locale unit not English
    expect(Number.isNaN(parseStrict('1mes'))).toBe(true);
  });

  it('should return NaN for years (y = "año" — type error: not a StringValue)', () => {
    // @ts-expect-error — '1año' is not a StringValue; locale unit not English
    expect(Number.isNaN(parseStrict('1año'))).toBe(true);
  });
});

describe('parseStrict — es long format', () => {
  it('should return NaN for Spanish millisecond words (type errors)', () => {
    // @ts-expect-error — not a StringValue
    expect(Number.isNaN(parseStrict('1 milisegundo'))).toBe(true);
    // @ts-expect-error — not a StringValue
    expect(Number.isNaN(parseStrict('10 milisegundos'))).toBe(true);
  });

  it('should return NaN for Spanish second words (type errors)', () => {
    // @ts-expect-error — not a StringValue
    expect(Number.isNaN(parseStrict('1 segundo'))).toBe(true);
    // @ts-expect-error — not a StringValue
    expect(Number.isNaN(parseStrict('10 segundos'))).toBe(true);
  });

  it('should return NaN for Spanish minute words (type errors)', () => {
    // @ts-expect-error — not a StringValue
    expect(Number.isNaN(parseStrict('1 minuto'))).toBe(true);
    // @ts-expect-error — not a StringValue
    expect(Number.isNaN(parseStrict('10 minutos'))).toBe(true);
  });

  it('should return NaN for Spanish hour, day, week, month, year words (type errors)', () => {
    // @ts-expect-error — not a StringValue
    expect(Number.isNaN(parseStrict('1 hora'))).toBe(true);
    // @ts-expect-error — not a StringValue
    expect(Number.isNaN(parseStrict('1 día'))).toBe(true);
    // @ts-expect-error — not a StringValue
    expect(Number.isNaN(parseStrict('1 semana'))).toBe(true);
    // @ts-expect-error — not a StringValue
    expect(Number.isNaN(parseStrict('1 mes'))).toBe(true);
    // @ts-expect-error — not a StringValue
    expect(Number.isNaN(parseStrict('1 año'))).toBe(true);
  });
});
