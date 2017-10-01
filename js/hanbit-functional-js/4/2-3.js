// 4 고차원 함수 - 2 다른 함수를 반환하는 함수 - 3 값이 존재하지 않는 상황을 지켜 주는 함수: null

var _ = require('underscore');
var {existy} = require('../functions');

var nums = [1, 2, 3, null, 5];

console.log(
  _.reduce(nums, function(total, n) { return total * n})
); // 0

function fnull(fun /* 기본값 */) {
  var defaults = _.rest(arguments);

  return function(/* 인자 */) {
    var args = _.map(arguments, function(e, i) {
      return existy(e) ? e : defaults[i];
    });

    return fun.apply(null, args);
  }
}

var safeMult = fnull(function(total, n) { return total * n }, 1, 1);
console.log(
  _.reduce(nums, safeMult)
); // 30

function defaults(d) {
  return function(o, k) {
    var val = fnull(_.identity, d[k]);
    return o && val(o[k]);
  };
}

function doSomething(config) {
  var lookup = defaults({critical: 108});

  return lookup(config, 'critical');
}

console.log(doSomething({critical: 9})); // 9
console.log(doSomething({})); // 108
