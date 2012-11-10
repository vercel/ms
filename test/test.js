
/**
 * Dependencies.
 */

if ('undefined' != typeof require) {
  expect = require('expect.js');
  ms = require('../');
}

// strings

describe('ms(string)', function(){
  it('should preserve ms', function () {
    expect(ms('100')).to.be(100);
  });

  it('should convert from m to ms', function () {
    expect(ms('1m')).to.be(60000);
  });

  it('should convert from h to ms', function () {
    expect(ms('1h')).to.be(3600000);
  });

  it('should convert d to ms', function () {
    expect(ms('2d')).to.be(172800000);
  });

  it('should convert s to ms', function () {
    expect(ms('1s')).to.be(1000);
  });

  it('should convert ms to ms', function () {
    expect(ms('100ms')).to.be(100);
  });

  it('should work with decimals', function () {
    expect(ms('1.5h')).to.be(5400000);
  });

  it('should return NaN if invalid', function () {
    expect(isNaN(ms('☃'))).to.be(true);
  });

  it('should be case-insensitive', function () {
    expect(ms('1.5H')).to.be(5400000);
  });

  it('should work with numbers starting with .', function () {
    expect(ms('.5ms')).to.be(.5);
  });
})

// numbers

describe('ms(number, { long: true })', function(){
  it('should support milliseconds', function(){
    expect(ms(500, { long: true })).to.be('500 ms');
  })

  it('should support seconds', function(){
    expect(ms(1000, { long: true })).to.be('1 second');
    expect(ms(10000, { long: true })).to.be('10 seconds');
  })

  it('should support minutes', function(){
    expect(ms(60 * 1000, { long: true })).to.be('1 minute');
    expect(ms(60 * 10000, { long: true })).to.be('10 minutes');
  })

  it('should support hours', function(){
    expect(ms(60 * 60 * 1000, { long: true })).to.be('1 hour');
    expect(ms(60 * 60 * 10000, { long: true })).to.be('10 hours');
  })

  it('should support days', function(){
    expect(ms(24 * 60 * 60 * 1000, { long: true })).to.be('1 day');
    expect(ms(24 * 60 * 60 * 10000, { long: true })).to.be('10 days');
  })

  it('should round', function(){
    expect(ms(234234234, { long: true })).to.be('3 days');
  })
})

// numbers

describe('ms(number)', function(){
  it('should support milliseconds', function(){
    expect(ms(500)).to.be('500ms');
  })

  it('should support seconds', function(){
    expect(ms(1000)).to.be('1s');
    expect(ms(10000)).to.be('10s');
  })

  it('should support minutes', function(){
    expect(ms(60 * 1000)).to.be('1m');
    expect(ms(60 * 10000)).to.be('10m');
  })

  it('should support hours', function(){
    expect(ms(60 * 60 * 1000)).to.be('1h');
    expect(ms(60 * 60 * 10000)).to.be('10h');
  })

  it('should support days', function(){
    expect(ms(24 * 60 * 60 * 1000)).to.be('1d');
    expect(ms(24 * 60 * 60 * 10000)).to.be('10d');
  })

  it('should round', function(){
    expect(ms(234234234)).to.be('3d');
  })
})
