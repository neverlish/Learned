// 7 순수성, 불변성, 변경 정책 - 1 순수성 - 4 순수성

var _ = require('underscore');

var {second, nth} = require('../functions');

console.log(nth(['a', 'b', 'c'], 1)); // b
console.log(nth(['a', 'b', 'c'], 1)); // b

var a = ['a', 'b', 'c'];

console.log(nth(a, 1)); // b
console.log(a === a); // true
console.log(nth(a, 1)); // b
console.log(_.isEqual(a, ['a', 'b', 'c'])); // true

console.log(nth([{a: 1}, {b: 2}], 0)); // {a: 1}
console.log(nth([function() {console.log('blah')}], 0)); // [Function]

function second(a) {
  return a[1];
}

function second(a) {
  return _.first(_.rest(a));
}
