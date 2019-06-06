/* eslint no-console: 0 */
const { Suite } = require('benchmark');
const ms = require('./dist');

function bench(name) {
  console.log(`\n# ${name}`);
  const suite = new Suite();
  suite.on('cycle', e => console.log('  ' + e.target));
  return suite;
}

bench('string (short) -> number')
  .add('ms  ', () => ms('1d'))
  .run();

bench('string (long) -> number')
  .add('ms  ', () => ms('10 hours'))
  .run();

bench('number -> string (short)')
  .add('ms  ', () => ms(31557600000))
  .run();

bench('number -> string (long)')
  .add('ms  ', () => ms(31557600000, true))
  .run();

bench('Negative :: string (short) -> number')
  .add('ms  ', () => ms('-1d'))
  .run();

bench('Negative :: string (long) -> number')
  .add('ms  ', () => ms('-10 hours'))
  .run();

bench('Negative :: number -> string (short)')
  .add('ms  ', () => ms(-31557600000))
  .run();

bench('Negative :: number -> string (long)')
  .add('ms  ', () => ms(-31557600000, true))
  .run();
