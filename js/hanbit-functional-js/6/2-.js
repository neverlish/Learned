// 6 재귀 - 2 상호 재귀 함수(서로를 호출하는 함수)

var _ = require('underscore');

var {cat} = require('../functions');

function evenSteven(n) {
  if (n === 0)
    return true;
  else
    return oddJohn(Math.abs(n) - 1);
}

function oddJohn(n) {
  if (n === 0)
    return false;
  else
    return evenSteven(Math.abs(n) - 1);
}

console.log(evenSteven(4)); // true
console.log(oddJohn(11)); // true

///////////

function flat(array) {
  if (_.isArray(array))
    return cat.apply(cat, _.map(array, flat));
  else
    return [array];
}

console.log(flat([[1,2],[3,4]])); // [ 1, 2, 3, 4 ]
console.log(flat([[1,2],[3,4,[5,6,[[[7]]],8]]])); // [ 1, 2, 3, 4, 5, 6, 7, 8 ]
