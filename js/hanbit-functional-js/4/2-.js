// 4 고차원 함수 - 2 다른 함수를 반환하는 함수

var _ = require('underscore');
var {repeatedly, always, invoker} = require('../functions');

var f = always(function(){});
console.log(f() === f()); // true

var g = always(function(){});
console.log(f() === g()); // false

console.log(
  repeatedly(3, always('Odelay'))
); // [ 'Odelay', 'Odelay', 'Odelay' ]

////////

var rev = invoker('reverse', Array.prototype.reverse);
console.log(
  _.map([[1,2,3]], rev)
); // [ [ 3, 2, 1 ] ]
