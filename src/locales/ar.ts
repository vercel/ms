import type { LocaleDefinition } from '../index';

export const ar: LocaleDefinition = {
  shortUnits: {
    ms: 'مللي ث',
    s: 'ث',
    m: 'د',
    h: 'س',
    d: 'ي',
    w: 'أ',
    mo: 'شه',
    y: 'سن',
  },
  longUnits: {
    millisecond: ['مللي ثانية', 'مللي ثانية'],
    second: ['ثانية', 'ثوانٍ'],
    minute: ['دقيقة', 'دقائق'],
    hour: ['ساعة', 'ساعات'],
    day: ['يوم', 'أيام'],
    week: ['أسبوع', 'أسابيع'],
    month: ['شهر', 'أشهر'],
    year: ['سنة', 'سنوات'],
  },
  isPlural: (v) => v !== 1,
};
