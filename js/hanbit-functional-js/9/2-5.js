// 9 클래스를 이용하지 않는 프로그래밍 - 2 믹스인 - 5 믹스인 확장을 이용해서 새 기능 추가

var _ = require('underscore');
var {
  Hole, HoleMixin, ValidateMixin, ObserverMixin, always, construct, 
  SnapshotMixin, SwapMixin
} = require('../functions');

var o = {_value: 0, setValue: _.identity};

_.extend(o, SwapMixin)
console.log(o.swap(construct, [1,2,3])); // [ 0, 1, 2, 3 ]

_.extend(Hole.prototype
  , HoleMixin
  , ValidateMixin
  , ObserverMixin
  , SwapMixin
  , SnapshotMixin
);

var h = new Hole(42);
console.log(h.snapshot()); // 42

console.log(h.swap(always(99))); // 99

console.log(h.snapshot()); // 99
