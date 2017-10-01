// 9 클래스를 이용하지 않는 프로그래밍 - 2 믹스인 - 4 믹스인으로 계층 구조를 수평화하기

var _ = require('underscore');
var {
  always, isEven, note,
  Container2, Hole, HoleMixin, ObserverMixin, ValidateMixin
} = require('../functions');

var c = new Container2(42);
console.log(c); // Container2 { _value: 42 }

// var h = new Hole(42); // TypeError: this.init is not a function

_.extend(Hole.prototype
  , HoleMixin
  , ValidateMixin
  , ObserverMixin
);

var h = new Hole(42);
h.addValidator(always(false));
// h.setValue(9); // Error: Attempted to set invalid value 9

var h2 = new Hole(42);
h2.addValidator(isEven);
// h.setValue(9); // Error: Attempted to set invalid value 9
console.log(h2.setValue(108)); // 108

console.log(h2); // Hole { _value: 108, _validator: [Function: isEven] }

console.log(
  h2.watch(function(old, nu) {
    note(['Changing', old, 'to', nu].join(' '));
  })
); // 1

h2.setValue(42); // NOTE: Changing 108 to 42

console.log(
  h2.watch(function(old, nu) {
    note(['Veranderende', old, 'tot', nu].join(' '));
  })
); // 2

h2.setValue(36);
/*
NOTE: Changing 42 to 36
NOTE: Veranderende 42 tot 36
*/
