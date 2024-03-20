# ms

![CI](https://github.com/vercel/ms/workflows/CI/badge.svg)
![Edge Runtime Compatible](https://img.shields.io/badge/edge--runtime-%E2%9C%94%20compatible-black)

Use this package to easily convert various time formats to milliseconds.

## Examples

<!-- prettier-ignore -->
```js
ms('2 days')  // 172800000
ms('1d')      // 86400000
ms('10h')     // 36000000
ms('2.5 hrs') // 9000000
ms('2h')      // 7200000
ms('1m')      // 60000
ms('5s')      // 5000
ms('1y')      // 31557600000
ms('100')     // 100
ms('-3 days') // -259200000
ms('-1h')     // -3600000
ms('-200')    // -200
```

### Convert from Milliseconds

<!-- prettier-ignore -->
```js
ms(60000)             // "1m"
ms(2 * 60000)         // "2m"
ms(-3 * 60000)        // "-3m"
ms(ms('10 hours'))    // "10h"
```

### Time Format Written-Out

<!-- prettier-ignore -->
```js
ms(60000, { long: true })             // "1 minute"
ms(2 * 60000, { long: true })         // "2 minutes"
ms(-3 * 60000, { long: true })        // "-3 minutes"
ms(ms('10 hours'), { long: true })    // "10 hours"
```

## Features

- Works both in [Node.js](https://nodejs.org) and in the browser
- If a number is supplied to `ms`, a string with a unit is returned
- If a string that contains the number is supplied, it returns it as a number (e.g.: it returns `100` for `'100'`)
- If you pass a string with a number and a valid unit, the number of equivalent milliseconds is returned

## TypeScript support

As of `v3.0`, this package includes TypeScript definitions.

For added safety, we're using [Template Literal Types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html) (added in [TypeScript 4.1](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html)). This ensures that you don't accidentally pass `ms` values that it can't process.

This won't require you to do anything special in most situations, but you can also import the `StringValue` type from `ms` if you need to use it.

```ts
import ms, { StringValue } from 'ms';

// Using the exported type.
function example(value: StringValue) {
  ms(value);
}

// This function will only accept a string compatible with `ms`.
example('1 h');
```

In this example, we use a [Type Assertion](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions) to coerce a `string`.

```ts
import ms, { StringValue } from 'ms';

// Type assertion with the exported type.
function example(value: string) {
  try {
    // A string could be "wider" than the values accepted by `ms`, so we assert
    // that our `value` is a `StringValue`.
    //
    // It's important to note that this can be dangerous (see below).
    ms(value as StringValue);
  } catch (error: Error) {
    // Handle any errors from invalid values.
    console.error(error);
  }
}

// This function will accept any string, which may result in a bug.
example('any value');
```

You may also create a custom Template Literal Type.

```ts
import ms from 'ms';

type OnlyDaysAndWeeks = `${number} ${'days' | 'weeks'}`;

// Using a custom Template Literal Type.
function example(value: OnlyDaysAndWeeks) {
  // The type of `value` is narrower than the values `ms` accepts, which is
  // safe to use without coercion.
  ms(value);
}

// This function will accept "# days" or "# weeks" only.
example('5.2 days');
```

## Advanced Usage

As of `v3.0`, you can import `parse` and `format` separately.

```ts
import { parse, format } from 'ms';

parse('1h'); // 3600000

format(2000); // "2s"
```

If you want strict type checking for the input value, you can use `parseStrict`.

```ts
import { parseStrict } from 'ms';

parseStrict('1h'); // 3600000

function example(s: string) {
  return parseStrict(str); // tsc error
}
```

## Edge Runtime Support

`ms` is compatible with the [Edge Runtime](https://edge-runtime.vercel.app/). It can be used inside environments like [Vercel Edge Functions](https://vercel.com/edge) as follows:

```js
// Next.js (pages/api/edge.js) (npm i next@canary)
// Other frameworks (api/edge.js) (npm i -g vercel@canary)

import ms from 'ms';
const start = Date.now();

export default (req) => {
  return new Response(`Alive since ${ms(Date.now() - start)}`);
};

export const config = {
  runtime: 'experimental-edge',
};
```

## Related Packages

- [ms.macro](https://github.com/knpwrs/ms.macro) - Run `ms` as a macro at build-time.

## Caught a Bug?

1. [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device
2. Link the package to the global module directory: `npm link`
3. Within the module you want to test your local development instance of ms, just link it to the dependencies: `npm link ms`. Instead of the default one from npm, Node.js will now use your clone of ms!

As always, you can run the tests using: `npm test`
