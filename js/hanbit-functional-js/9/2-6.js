// 9 클래스를 이용하지 않는 프로그래밍 - 2 믹스인 - 6 믹스인 믹싱을 이용한 새로운 형식

var _ = require('underscore');
var {
  Hole, HoleMixin, ObserverMixin, ValidateMixin, SwapMixin, SnapshotMixin, always,
  CAS, CASMixin
} = require('../functions');

_.extend(CAS.prototype
  , HoleMixin
  , ValidateMixin
  , ObserverMixin
  , SwapMixin
  , CASMixin
  , SnapshotMixin
);

var c = new CAS(42);
console.log(c.swap(42, always(-1))) // -1;
console.log(c.snapshot()); // -1

console.log(c.swap('not the value', always(100000))); // undefined
console.log(c.snapshot()); // -1
