import type { LocaleDefinition } from '../index';

export const de: LocaleDefinition = {
  shortUnits: {
    ms: 'ms',
    s: 's',
    m: 'min',
    h: 'Std',
    d: 'T',
    w: 'W',
    mo: 'Mo',
    y: 'J',
  },
  longUnits: {
    millisecond: ['Millisekunde', 'Millisekunden'],
    second: ['Sekunde', 'Sekunden'],
    minute: ['Minute', 'Minuten'],
    hour: ['Stunde', 'Stunden'],
    day: ['Tag', 'Tage'],
    week: ['Woche', 'Wochen'],
    month: ['Monat', 'Monate'],
    year: ['Jahr', 'Jahre'],
  },
  isPlural: (v) => v !== 1,
};
