!function (g) {
  var r = /(\d*.?\d+)([mshd]+)/
    , _ = {}
    , m;

  _.ms = 1;
  _.s = 1000;
  _.m = _.s * 60;
  _.h = _.m * 60;
  _.d = _.h * 24;

  function ms (s) {
    return +s || ((m = r.exec(s.toLowerCase())) ? m[1] * _[m[2]] : NaN);
  }

  g.top ? g.ms = ms : module.exports = ms;
}(this);