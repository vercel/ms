import type { LocaleDefinition } from '../index';

export const es: LocaleDefinition = {
  shortUnits: {
    ms: 'ms',
    s: 's',
    m: 'min',
    h: 'h',
    d: 'd',
    w: 'sem',
    mo: 'mes',
    y: 'año',
  },
  longUnits: {
    millisecond: ['milisegundo', 'milisegundos'],
    second: ['segundo', 'segundos'],
    minute: ['minuto', 'minutos'],
    hour: ['hora', 'horas'],
    day: ['día', 'días'],
    week: ['semana', 'semanas'],
    month: ['mes', 'meses'],
    year: ['año', 'años'],
  },
  isPlural: (v) => v !== 1,
};
