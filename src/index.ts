import { StringValue, compactUnitAnyCase, durationInterface } from "./@types/index";

function MS(value: StringValue): number;
function MS(value: number, { compactDuration, fullDuration }?: { compactDuration?: boolean, fullDuration?: boolean }): string;
function MS(value: number, { fullDuration, avoidDuration }?: { compactDuration?: boolean, fullDuration: boolean, avoidDuration: Array<compactUnitAnyCase> }): string;
function MS(value: StringValue | number, { compactDuration, fullDuration, avoidDuration }: { compactDuration?: boolean, fullDuration?: boolean, avoidDuration?: Array<compactUnitAnyCase> } = {}): string | number | undefined {
    try {
        if(typeof value === 'string') {
            if(/^\d+$/.test(value)) return Number(value);
            const durations = value.match(/-?\d*\.?\d+\s*?(years?|yrs?|weeks?|days?|hours?|hrs?|minutes?|mins?|seconds?|secs?|milliseconds?|msecs?|ms|[smhdwy])/gi);
            return durations ? durations.reduce((a, b) => a + toMS(b), 0) : null;
        };
        if(typeof value === 'number') return toDuration(value, { compactDuration, fullDuration, avoidDuration });
        throw new Error('Value is not a string or a number');
    } catch(err) {  
        const message = isError(err)
        ? `${err.message}. Value = ${JSON.stringify(value)}`
        : 'An unknown error has occured.';
        throw new Error(message);
    };
};
export default MS;

/**
 * Convert Durations to milliseconds
 */
function toMS(value: string): number | undefined {
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
 */
function toDuration(value: number, { compactDuration, fullDuration, avoidDuration }: { compactDuration?: boolean, fullDuration?: boolean, avoidDuration?: Array<compactUnitAnyCase> } = {}): string {
    const absMs = Math.abs(value);
    const duration: Array<durationInterface> = [
        { short: 'd', long: 'day', ms: absMs / 8.64e+7 },
        { short: 'h', long: 'hour', ms: absMs / 3.6e+6 % 24 },
        { short: 'm', long: 'minute', ms: absMs / 60000 % 60 },
        { short: 's', long: 'second', ms: absMs / 1000 % 60 },
        { short: 'ms', long: 'millisecond', ms: absMs % 1000 },
    ];
    const mappedDuration = duration
        .filter(obj => obj.ms !== 0 && avoidDuration ? fullDuration && !avoidDuration.map(v => v.toLowerCase()).includes(obj.short) : obj.ms)
        .map(obj => `${Math.sign(value) === -1 ? '-' : ''}${compactDuration ? `${Math.floor(obj.ms)}${obj.short}` : `${Math.floor(obj.ms)} ${obj.long}${obj.ms === 1 ? '' : 's'}`}`);
    return fullDuration ? mappedDuration.join(compactDuration ? ' ' : ', ') : mappedDuration[0];
};

/**
 * A type guard for errors.
 */
function isError(error: unknown): error is Error {
    return typeof error === 'object' && error !== null && 'message' in error;
};