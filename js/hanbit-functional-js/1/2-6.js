// 1 함수형 자바스크립트 소개 - 2 함수형 프로그래밍 시작하기 - 6 함수형 자바스크립트 맛보기

var _ = require('underscore');
var {existy, truthy, doWhen} = require('../functions');

console.log(existy(null)); // false
console.log(existy(undefined)); // false
console.log(existy({}.notHere)); // false
console.log(existy((function(){})())); // false
console.log(existy(0)); // true
console.log(existy(false)); // true

console.log(truthy(false)); // false
console.log(truthy(undefined)); // false
console.log(truthy(0)); // true
console.log(truthy('')); // true

///////


function executeIfHasField(target, name) {
  return doWhen(existy(target[name]), function() {
    var result = _.result(target, name);
    console.log(['The result is', result].join(' '));
    return result;
  });
}

console.log(
  executeIfHasField([1,2,3], 'reverse')
); 
/*
The result is 3,2,1 
[3, 2, 1]
*/

console.log(
  executeIfHasField({foo:42}, 'foo')
); 
/* 
The result is 42
42
*/

console.log(
  executeIfHasField([1,2,3], 'notHere')
); // undefined

////////////

console.log(
  [null, undefined, 1, 2, false].map(existy)
); // [ false, false, true, true, true ]

console.log(
  [null, undefined, 1, 2, false].map(truthy)
); // [ false, false, true, true, false ]
