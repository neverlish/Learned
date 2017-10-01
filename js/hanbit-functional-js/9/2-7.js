// 9 클래스를 이용하지 않는 프로그래밍 - 2 믹스인 - 7 메서드는 저수준 동작이다

var _ = require('underscore');
var {
  note, isOdd, invoker, sqr, always,
  Container2, Hole, CAS,
  HoleMixin, ValidateMixin, ObserverMixin,  CASMixin, SnapshotMixin, SwapMixin
} = require('../functions');

_.extend(Hole.prototype
  , HoleMixin
  , ValidateMixin
  , ObserverMixin
  , SwapMixin
  , SnapshotMixin
);

function contain(value) {
  return new Container2(value);
}

console.log(contain(42)); // Container2 { _value: 42 }

//////

function hole(val /* */) {
  var h = new Hole();
  var v = _.toArray(arguments)[1];

  if (v) h.addValidator(v);

  h.setValue(val);

  return h;
}

// var x = hole(42, always(false)); // Error: Attempted to set invalid value 42

var swap = invoker('swap', Hole.prototype.swap)
var x = hole(42);
console.log(swap(x, sqr)); // 1764

////

_.extend(CAS.prototype
  , HoleMixin
  , ValidateMixin
  , ObserverMixin
  , SwapMixin
  , CASMixin
  , SnapshotMixin
);

function cas(val /* args */) {
  var h = hole.apply(this, arguments);
  var c = new CAS(val);
  c._validator = h._validator;

  return c;
}

var compareAndSwap = invoker('swap', CAS.prototype.swap);

function snapshot(o) { return o.snapshot(); }
function addWatcher(o, fun) { o.watch(fun); }

var x2 = hole(42);
addWatcher(x2, note);
console.log(swap(x2, sqr));
/*
NOTE: 42
1764
*/

var y = cas(9, isOdd);
console.log(compareAndSwap(y, 9, always(1))); // 1
console.log(snapshot(y)); // 1
