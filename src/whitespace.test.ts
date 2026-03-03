import { describe, expect, it } from '@jest/globals';
import { ms, parse } from './index';

describe('ms whitespace handling (bug fix)', () => {
  it('trims leading, trailing whitespace, newlines and tabs', () => {
    expect(ms(' 1h ')).toBe(3600000);
    expect(ms('\t1 h\n')).toBe(3600000);
    expect(ms(' 5m ')).toBe(300000);
    expect(parse(' 1.5s ')).toBe(1500);
    expect(ms(' -3d ')).toBe(-259200000);
  });

  it('still throws on pure whitespace after trim', () => {
    expect(() => ms('   ')).toThrow();
    expect(() => parse('\n\t ')).toThrow();
  });
});
