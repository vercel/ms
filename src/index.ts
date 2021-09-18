type Unit =
    | 'Years'
    | 'Year'
    | 'Yrs'
    | 'Yr'
    | 'Y'
    | 'Weeks'
    | 'Week'
    | 'W'
    | 'Days'
    | 'Day'
    | 'D'
    | 'Hours'
    | 'Hour'
    | 'Hrs'
    | 'Hr'
    | 'H'
    | 'Minutes'
    | 'Minute'
    | 'Mins'
    | 'Min'
    | 'M'
    | 'Seconds'
    | 'Second'
    | 'Secs'
    | 'Sec'
    | 's'
    | 'Milliseconds'
    | 'Millisecond'
    | 'Msecs'
    | 'Msec'
    | 'Ms';
type UnitAnyCase = Unit | Uppercase<Unit> | Lowercase<Unit> | string;
export type StringValue = `${number}` | `${number}${UnitAnyCase}` | `${number} ${UnitAnyCase}`;

function ms(value: StringValue): number;
function ms(value: number, { fullDuration, compactDuration }?: { fullDuration?: boolean, compactDuration?: boolean }): string;
/**
 * Convert seconds, minutes, hours, days and weeks to milliseconds and vice versa
 * @param {string | number} value - string time support: second, minute, hour, day, week.
 * @param {boolean} [fullDuration] - Display the full duration
 * @param {boolean} [compactDuration] - Write the duration format in short 
 * @returns {string | number | undefined}
 */
function ms(value: StringValue | number, { fullDuration, compactDuration }: { fullDuration?: boolean, compactDuration?: boolean } = {}): string | number | undefined {
    try {
        if(typeof value === 'string') return /^\d+$/.test(value) 
            ? Number(value) 
            : value
                .split(/(?<=\d+\s*?[smhdwy]).*?(?=\d+\s*?[smhdwy])/gi)
                .reduce((a, b) => a + toMS(b), 0);
        if(typeof value === 'number') return toDuration(value, { fullDuration, compactDuration });
    } catch(error) {
        throw new Error(error);
    };
};
export default ms;

/**
 * Convert Durations to milliseconds
 * @param {string} string - Duration to convert
 * @returns {number}
 */
function toMS(value: string): number {
    if(!/^-?\s*?\d*\.?\d+\s*?(years?|yrs?|weeks?|days?|hours?|hrs?|minutes?|mins?|seconds?|secs?|milliseconds?|msecs?|ms|[smhdwy])\s*?$/i.test(value)) return;
    const number = Number(value.replace(/[^-.0-9]+/g, ''));
    value = value.replace(/\s+/g, '');
    if(/\d+(?=ms|milliseconds?)/i.test(value)) return number;
    else if(/\d+(?=s)/i.test(value)) return number * 1000;
    else if(/\d+(?=m)/i.test(value)) return number * 60000;
    else if(/\d+(?=h)/i.test(value)) return number * 3.6e+6;
    else if(/\d+(?=d)/i.test(value)) return number * 8.64e+7;
    else if(/\d+(?=w)/i.test(value)) return number * 6.048e+8;
    else if(/\d+(?=y)/i.test(value)) return number * 3.154e+10;
};

/**
 * Convert milliseconds to durations
 * @param {number} value - Millisecond to convert
 * @param {boolean} [fullDuration] - Display the full duration
 * @param {boolean} [compactDuration] - Write the duration format in short 
 * @returns {string}
 */
function toDuration(value: number, { fullDuration, compactDuration }: { fullDuration?: boolean, compactDuration?: boolean } = {}): string {
    const absMs = Math.abs(value);
    const duration = [
        { short: 'd', long: 'day', ms: Math.floor(absMs / 8.64e+7) },
        { short: 'h', long: 'hour', ms: Math.floor(absMs / 3.6e+6) % 24 },
        { short: 'm', long: 'minute', ms: Math.floor(absMs / 60000) % 60 },
        { short: 's', long: 'second', ms: Math.floor(absMs / 1000) % 60 },
        { short: 'ms', long: 'millisecond', ms: Math.floor(absMs) % 1000 },
    ];
    const mappedDuration = duration
        .filter(obj => obj.ms !== 0)
        .map(obj => `${Math.sign(value) === -1 ? '-' : ''}${compactDuration ? `${obj.ms}${obj.short}` : `${obj.ms} ${obj.long}${obj.ms === 1 ? '' : 's'}`}`);
    return fullDuration ? mappedDuration.join(compactDuration ? ' ' : ', ') : mappedDuration[0];
};
