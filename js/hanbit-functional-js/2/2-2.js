// 2 일급 함수와 응용형 프로그래밍 - 2 응용형 프로그래밍 - 2 응용형 프로그래밍의 다른 예제

var _ = require('underscore');
var {div, complement} = require('../functions');

// reduceRight

var nums = [100, 2, 25];


console.log(
  _.reduce(nums, div)
); // 2

console.log(
  _.reduceRight(nums, div)
); // 0.125

function allOf(/* funs */) {
  return _.reduceRight(arguments, function(truth, f) {
    return truth && f();
  }, true); 
}

function anyOf(/* funs */) {
  return _.reduceRight(arguments, function(truth, f) {
    return truth || f();
  }, false);
}

function T() { return true; };
function F() { return false; };

console.log(allOf()); // true
console.log(allOf(T, T)); // true
console.log(allOf(T, T, T, T, F)); // false

console.log(anyOf(T, T, F)); // true
console.log(anyOf(F, F, F, F)); // false
console.log(anyOf()); // false

// reject

console.log(
  _.reject(['a', 'b', 3, 'd'], _.isNumber)
); // [ 'a', 'b', 'd' ]


console.log(
  _.filter(['a', 'b', 3, 'd'], complement(_.isNumber))
); // [ 'a', 'b', 'd' ]

// sortBy, groupBy, countBy

var people = [{name: 'Rick', age: 30}, {name: 'Jaka', age: 24}];

console.log(
  _.sortBy(people, function(p) { return p.age; })
); // [ { name: 'Jaka', age: 24 }, { name: 'Rick', age: 30 } ]

var albums = [
  {title: 'Sabbath Bloody Sabbath', genre: 'Metal'},
  {title: 'Scientist', genre: 'Dub'},
  {title: 'Undertow', genre: 'Metal'}
];

console.log(
  _.groupBy(albums, function(a) { return a.genre; })
);
/*
{ Metal: 
   [ { title: 'Sabbath Bloody Sabbath', genre: 'Metal' },
     { title: 'Undertow', genre: 'Metal' } ],
  Dub: [ { title: 'Scientist', genre: 'Dub' } ] }
*/

console.log(
  _.countBy(albums, function(a) { return a.genre; })
); // { Metal: 2, Dub: 1 }
