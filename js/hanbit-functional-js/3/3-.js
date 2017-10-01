// 3 변수 스코프와 클로저 - 3 동적 스코프

var _ = require('underscore');

var globals = {};

function makeBindFun(resolver) {
  return function(k, v) {
    var stack = globals[k] || [];
    globals[k] = resolver(stack, v);
    return globals;
  }
}

var stackBinder = makeBindFun(function(stack, v) {
  stack.push(v);
  return stack;
});

var stackUnbinider = makeBindFun(function(stack) {
  stack.pop();
  return stack;
});

var dynamicLook = function(k) {
  var slot = globals[k] || [];
  return _.last(slot);
}

stackBinder('a', 1)
stackBinder('b', 100);
console.log(dynamicLook('a')); // 1
console.log(globals); // { a: [ 1 ], b: [ 100 ] }

stackBinder('a', '*');
console.log(dynamicLook('a')); // *
console.log(globals); // { a: [ 1, '*' ], b: [ 100 ] }

stackUnbinider('a');
console.log(dynamicLook('a')); // 1

function f() { return dynamicLook('a'); };
function g() { stackBinder('a', 'g'); return f(); };

console.log(f()); // 1
console.log(g()); // g
console.log(globals); // { a: [ 1, 'g' ], b: [ 100 ] }

