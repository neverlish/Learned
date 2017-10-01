// 5 함수로 함수 만들기 - 3 부분 적용 - 1 한두 개의 알려진 인자를 부분 적용

var _ = require('underscore');
var {partial1, div, cat} = require('../functions');

var over10Part1 = partial1(div, 10);
console.log(over10Part1(5)); // 2

function partial2(fun, arg1, arg2) {
  return function(/* args */) {
    var args = cat([arg1, arg2], arguments);
    return fun.apply(fun, args);
  }
}

var div10By2 = partial2(div, 10, 2);
console.log(div10By2()); // 5
