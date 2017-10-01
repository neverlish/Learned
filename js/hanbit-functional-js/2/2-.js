// 2 일급 함수와 응용형 프로그래밍 - 2 응용형 프로그래밍

var _ = require('underscore');

var nums = [1, 2, 3, 4, 5];

function doubleAll(array) {
  return _.map(array, function(n) { return n*2 });
}

console.log(
  doubleAll(nums)
); // [ 2, 4, 6, 8, 10 ]

function average(array) {
  var sum = _.reduce(array, function(a, b) { return a+b });
  return sum / _.size(array);
}

console.log(
  average(nums)
); // 3

function onlyEven(array) {
  return _.filter(array, function(n) {
    return (n%2) === 0;
  });
}

console.log(
  onlyEven(nums)
); // [2, 4]
