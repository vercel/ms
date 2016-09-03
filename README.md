# ms.js
> miliseconds conversion utility

[![npm version](https://badge.fury.io/js/ms.svg)](https://badge.fury.io/js/ms)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?maxAge=2592000)]()


## Features

- [x] If a number is supplied to ms, a string with a unit is returned.
- [x] If a string that contains the number is supplied, it returns it as a number (e.g: it returns 100 for '100').
- [x] If you pass a string with a number and a valid unit, the number of equivalent ms is returned.

## Installation
Install via NPM:

```ruby
npm install ms

```

## Usage

```js
ms('2 days')  // 172800000
ms('1d')      // 86400000
ms('10h')     // 36000000
ms('2.5 hrs') // 9000000
ms('2h')      // 7200000
ms('1m')      // 60000
ms('5s')      // 5000
ms('100')     // 100
```

```js
ms(60000)             // "1m"
ms(2 * 60000)         // "2m"
ms(ms('10 hours'))    // "10h"
```

```js
ms(60000, { long: true })             // "1 minute"
ms(2 * 60000, { long: true })         // "2 minutes"
ms(ms('10 hours'), { long: true })    // "10 hours"
```


## Contribute

We would love for you to contribute to **ms.js**, check the ``LICENSE`` file for more info.

## Meta

Guillermo Rauch – [@rauchg](https://twitter.com/rauchg) – rauchg@gmail.com

Distributed under the MIT license. See ``LICENSE`` for more information.

[https://github.com/rauchg/ms.js](https://github.com/rauchg/ms.js)
