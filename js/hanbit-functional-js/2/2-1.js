// 2 일급 함수와 응용형 프로그래밍 - 2 응용형 프로그래밍 - 1 컬렉션 중심 프로그래밍

var _ = require('underscore');

console.log(
  _.map({a: 1, b: 2}, _.identity)
); // [1, 2]

console.log(
  _.map({a: 1, b: 2}, function(v, k) {
    return [k, v];
  })
); // [ [ 'a', 1 ], [ 'b', 2 ] ]

console.log(
  _.map({a: 1, b: 2}, function(v, k, coll) {
    return [k, v, _.keys(coll)];
  })
); // [ [ 'a', 1, [ 'a', 'b' ] ], [ 'b', 2, [ 'a', 'b' ] ] ]

