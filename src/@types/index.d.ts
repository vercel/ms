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
type UnitAnyCase = Unit | Uppercase<Unit> | Lowercase<Unit>;
export type StringValue = `${number}` | `${number}${UnitAnyCase}` | `${number} ${UnitAnyCase}` | string;

type compactUnit = 'ms' | 's' | 'm' | 'h' | 'd' | 'w' | 'y';
export type compactUnitAnyCase = compactUnit | Uppercase<compactUnit>;

export interface durationInterface {
    short: compactUnitAnyCase
    long: UnitAnyCase
    ms: number;
}