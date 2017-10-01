// 3 변수 스코프와 클로저 - 3 동적 스코프

var _ = require('underscore');

function globalThis() { return this; };

console.log(globalThis()); // 전역 객체
console.log(globalThis.call('barnabas')); // [String: 'barnabas']
console.log(globalThis.apply('orsulak', [])); // [String: 'orsulak']

var nopeThis = _.bind(globalThis, 'nope');
console.log(nopeThis.call('wat')); // [String: 'nope']

var target = {
  name: 'the right value',
  aux: function() { return this.name },
  act: function() { return this.aux() }
};

// console.log(target.act.call('wat')); // TypeError: this.aux is not a function

_.bindAll(target, 'aux', 'act');
console.log(target.act.call('wat')); // the right value

