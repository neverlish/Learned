// 5 함수로 함수 만들기 - 2 커링 - 커링을 이용한 플루언트 API

var _ = require('underscore');

var {curry2, validator, checker, greaterThan} = require('../functions');

var lessThan = curry2(function (lhs, rhs) { return lhs < rhs });

var withinRange = checker(
  validator('args must be greater than 10', greaterThan(10)),
  validator('arg must be less than 20', lessThan(20))
);

console.log(withinRange(15)); // []
console.log(withinRange(100)); // [ 'arg must be less than 20' ]
