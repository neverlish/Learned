// 3 변수 스코프와 클로저 - 4 함수 스코프

var _ = require('underscore');

function strangerIdentity(n) {
  // 의도적으로 이상한 동작 수행
  for (var i=0; i < n; i++);
  return i;
}

console.log(strangerIdentity(138)); // 138

function strangerIdentity2(n) {
  // 이번에도 의도적으로 이상한 동작 수행
  for (this['i'] = 0; this['i'] < n; this['i']++);
  return this['i'];
}

console.log(strangerIdentity2(108)); // 108
console.log(i); // 108

console.log(strangerIdentity.call({}, 10000)); // 10000
console.log(i); // 108

//////////

function f() {
  this['a'] = 200;
  return this['a'] + this['b'];
}

var globals = {'b': 2};

console.log(f.call(_.clone(globals))); // 202
console.log(globals); // { b: 2 }
