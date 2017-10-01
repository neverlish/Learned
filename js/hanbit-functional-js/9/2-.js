// 9 클래스를 이용하지 않는 프로그래밍 - 2 믹스인

var _ = require('underscore');
var {polyToString, stringifyArray, dispatch, Container} = require('../functions');

function polyToString1(obj) {
  if (obj instanceof String)
    return obj;
  else if (obj instanceof Array)
    return stringifyArray(obj);
  return obj.toString();
}

console.log(polyToString1([1,2,3])); // '[1,2,3]'
console.log(polyToString1([1,2,[3,4]])); // '[1,2,[3,4]]'

var polyToString2 = dispatch(
  function(s) { return _.isString(s) ? s : undefined; },
  function(s) { return _.isArray(s) ? stringifyArray(s) : undefined; },
  function(s) { return s.toString(); }
);

console.log(polyToString2(42)); // '42'
console.log(polyToString2([1,2,[3,4]])); // '[1,2,[3,4]]'

console.log(polyToString2({a: 1, b: 2})); // '[object Object]'


console.log(polyToString({a: 42, b: [4,5,6]})); // {"a":42,"b":[4,5,6]}

console.log(polyToString(new Container(_.range(5)))); // {"_value":[0,1,2,3,4]}

