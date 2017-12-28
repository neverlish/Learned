// 4 자바스크립트에서의 지연 평가 - 1 지연 평가

// 지연 평가를 시작시키고 유지시키는(이어가는) 함수
// 1) map
// 2) filter, reject

const _ = require('../partial');

var mi = 0, fi = 0;

_.go(
  _.range(100),
  _.map(function(val) {
    ++mi;
    return val * val;
  }),
  _.filter(function(val) {
    ++fi;
    return val % 2;
  }),
  _.take(5),
  console.log); // [ 1, 9, 25, 49, 81 ]

console.log(mi, fi); // 100 100

mi = 0, fi = 0;

_.go(
  _.range(100),
  L.map(function(val) {
    ++mi;
    return val * val;
  }),
  L.filter(function(val) {
    ++fi;
    return val % 2;
  }),
  L.take(5),
  console.log); // [ 1, 9, 25, 49, 81 ]

console.log(mi, fi); // 10 10
