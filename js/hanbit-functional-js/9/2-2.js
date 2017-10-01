// 9 클래스를 이용하지 않는 프로그래밍 - 2 믹스인 - 2 클래스 계층

var _ = require('underscore');
var Class = require('class.extend');
var {note, fail} = require('../functions');

function ContainerClass() {}
function ObservedContainerClass() {}
function HoleClass() {}
function CASClass() {}
function TableBaseClass() {}

ObservedContainerClass.prototype = new ContainerClass();
HoleClass.prototype = new ObservedContainerClass();
CASClass.prototype = new HoleClass();
TableBaseClass.prototype = new CASClass();

console.log(
  (new CASClass) instanceof HoleClass
); // true

console.log(
  (new TableBaseClass()) instanceof HoleClass
); // true

console.log(
  (new HoleClass()) instanceof CASClass
); // false

var ContainerClass = Class.extend({
  init: function(val) {
    this._value = val;
  }
});

var c = new ContainerClass(42);
console.log(c); // Class { _value: 42 }

console.log(c instanceof Class); // true

var ObservedContainerClass = ContainerClass.extend({
  observe: function(f) { note('set observer'); },
  notify: function() { note('notifying observers'); }
});

var HoleClass = ObservedContainerClass.extend({
  init: function(val) { this.setValue(val) },
  setValue: function(val) {
    this._value = val;
    this.notify();
    return val;
  }
});

var h = new HoleClass(42); // NOTE: notifying observers

h.observe(null); // NOTE: set observer
console.log(h.setValue(108)); 
/*
NOTE: notifying observers
108
*/

var CASClass = HoleClass.extend({
  swap: function(oldVal, newVal) {
    if (!_.isEqual(oldVal, this._value)) fail('No match');

    return this.setValue(newVal);
  }
});

var c = new CASClass(42); // NOTE: notifying observers

console.log(c.swap(42, 43));
/*
NOTE: notifying observers
43
*/

// c.swap('not the value', 42); // Error: No match

