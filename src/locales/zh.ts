import type { LocaleDefinition } from '../index';

export const zh: LocaleDefinition = {
  shortUnits: {
    ms: '毫秒',
    s: '秒',
    m: '分',
    h: '时',
    d: '天',
    w: '周',
    mo: '月',
    y: '年',
  },
  longUnits: {
    millisecond: ['毫秒', '毫秒'],
    second: ['秒', '秒'],
    minute: ['分钟', '分钟'],
    hour: ['小时', '小时'],
    day: ['天', '天'],
    week: ['周', '周'],
    month: ['月', '月'],
    year: ['年', '年'],
  },
  isPlural: () => false,
};
