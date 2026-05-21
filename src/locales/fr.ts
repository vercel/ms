import type { LocaleDefinition } from '../index';

export const fr: LocaleDefinition = {
  shortUnits: {
    ms: 'ms',
    s: 's',
    m: 'min',
    h: 'h',
    d: 'j',
    w: 'sem',
    mo: 'mois',
    y: 'an',
  },
  longUnits: {
    millisecond: ['milliseconde', 'millisecondes'],
    second: ['seconde', 'secondes'],
    minute: ['minute', 'minutes'],
    hour: ['heure', 'heures'],
    day: ['jour', 'jours'],
    week: ['semaine', 'semaines'],
    month: ['mois', 'mois'],
    year: ['an', 'ans'],
  },
  isPlural: (v) => v !== 1,
};
