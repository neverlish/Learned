// 2 일급 함수와 응용형 프로그래밍 - 2 응용형 프로그래밍 - 3 응용형 함수 만들기

var _ = require('underscore');
var {existy, cat, construct, mapcat} = require('../functions');

console.log(
  cat([1, 2, 3], [4, 5], [6, 7, 8])
); // [ 1, 2, 3, 4, 5, 6, 7, 8 ]

console.log(
  construct(42, [1,2,3])
); // [ 42, 1, 2, 3 ]

console.log(
  mapcat(function(e) {
    return construct(e, [','])
  }, [1,2,3])
); // [ 1, ',', 2, ',', 3, ',' ]

function butLast(coll) {
  return _.toArray(coll).slice(0, -1);
}

function interpose(inter, coll) {
  return butLast(mapcat(function(e) {
    return construct(e, [inter]);
  }, coll));
}

console.log(
  interpose(',', [1,2,3])
); // [ 1, ',', 2, ',', 3 ]
