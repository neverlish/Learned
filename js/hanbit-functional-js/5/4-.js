// 5 함수로 함수 만들기 - 4 함수의 끝을 서로 연결하는 함수 조립 방법

var _ = require('underscore');

var {cat} = require('../functions');

function isntString(str) {
  return !_.isString(str);
}

console.log(isntString(1)); // true

var isntString2 = _.compose(function(x) { return !x }, _.isString);
console.log(isntString2([])); // true

function not(x) { return !x; }

var isntString3 = _.compose(not, _.isString);

/////////

function splat(fun) {
  return function(array) {
    return fun.apply(null, array);
  };
}

var composedMapCat = _.compose(splat(cat), _.map)
console.log(
  composedMapCat([[1,2],[3,4],[5]], _.identity)
); // [ 1, 2, 3, 4, 5 ]

