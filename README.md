
# ms.js: miliseconds conversion utility

```js
ms('1d')      // 86400000
ms('10h')     // 36000000
ms('2h')      // 7200000
ms('1m')      // 60000
ms('5ms')     // 5000
ms('100')     // '100'
ms(100)       // 100
```

- Node/Browser compatible. Published as `ms` in NPM.
- If a number is supplied to `ms`, it returns it immediately.
- If a string that contains the number is supplied, it returns it as
a number (e.g: it returns `100` for `'100'`).
- If you pass a string with a number and a valid unit, hte number of
equivalent ms is returned.
