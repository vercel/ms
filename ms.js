!function (g) {
  var r = /(\d*.?\d+)([mshd]+)/
    , _ = {}
    , m;

  _.ms = 1;
  _.s = 1000;
  _.m = _.s * 60;
  _.h = _.m * 60;
  _.d = _.h * 24;

  function ms (val) {
    if ('number' == typeof val) {
      if (val == _.s) return (val / _.s) + ' second';
      if (val > _.s) return (val / _.s) + ' seconds';
      return val + ' ms';
    } else {
      return +val || ((m = r.exec(val.toLowerCase())) ? m[1] * _[m[2]] : NaN);
    }
  }

  g.top ? g.ms = ms : module.exports = ms;
}(this);