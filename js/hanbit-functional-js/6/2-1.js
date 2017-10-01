// 6 재귀 - 2 상호 재귀 함수(서로를 호출하는 함수) - 1 재귀를 이용한 깊은 복제

var _ = require('underscore');

var {existy, deepClone} = require('../functions');

var x = [{a: [1, 2, 3], b: 42}, {c: []}];
var y = _.clone(x);
console.log(y); // [ { a: [ 1, 2, 3 ], b: 42 }, { c: [] } ]
x[1]['c']['d'] = 1000000;
console.log(y); // [ { a: [ 1, 2, 3 ], b: 42 }, { c: [ d: 1000000 ] } ]


var x2 = [{a: [1, 2, 3], b: 42}, {c: []}];
var y2 = deepClone(x2);

console.log(_.isEqual(x2, y2)); // true
y2[1]['c']['d'] = 42;
console.log(_.isEqual(x2, y2)); // false
