// 2 함수형으로 전환하기 - 5 reduce

var {_reduce} = require('../_');

var add = function(a, b) { return a + b};

console.log(
  _reduce([1, 2, 3, 4], add, 0)); // 10

console.log(
  _reduce([1, 2, 3, 4], add)); // 10

  console.log(
    _reduce([1, 2, 3, 4], add, 10)); // 20
  