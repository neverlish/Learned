// 9 클래스를 이용하지 않는 프로그래밍 - 2 믹스인 - 1 코어 프로토타입 개조

var _ = require('underscore');
var {Container, polyToString} = require('../functions');

console.log((new Container(42)).toString()); // [object Object]

Container.prototype.toString = function() {
  return ['@<', polyToString(this._value), '>'].join('');
}

console.log((new Container(42)).toString()); // @<42>
console.log((new Container({a: 42, b: [1,2,3]})).toString()); // @<[object Object]>

Array.prototype.toString = function() {
  return "DON'T DO THIS";
}

console.log([1,2,3].toString()); // DON'T DO THIS
