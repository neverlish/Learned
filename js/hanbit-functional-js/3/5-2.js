// 3 변수 스코프와 클로저 - 5 클로저 - 2 클로저 사용하기

var _ = require('underscore');
var {complement, isEven, isOdd} = require('../functions');

console.log(isOdd(2)); // false
console.log(isOdd(413)); // true

function isEven(n) { return false; };
console.log(isEven(10)); // false

console.log(isOdd(13)); // true
console.log(isOdd(12)); // false

///////

function showObject(OBJ) {
  return function() {
    return OBJ;
  };
}

var o = {a: 42};
var showO = showObject(o);

console.log(showO()); // { a: 42 }

o.newField = 108;
console.log(showO()); // { a: 42, newField: 108 }

var pingpong = (function() {
  var PRIVATE = 0;

  return {
    inc: function(n) {
      return PRIVATE += n;
    },
    dec: function(n) {
      return PRIVATE -= n;
    }
  }
})();

console.log(pingpong.inc(10)); // 10
console.log(pingpong.dec(3)); // 7

pingpong.div = function(n) { return PRIVATE / n; };

// console.log(pingpong.div(3)); // ReferenceError: PRIVATE is not defined
