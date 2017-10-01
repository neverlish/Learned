// 7 순수성, 불변성, 변경 정책 - 2 불변성 - 5 객체의 불변성 관찰

var _ = require('underscore');
var {cat, sqr, SaferQueue} = require('../functions');

function Point(x, y) {
  this._x = x;
  this._y = y;
}

Point.prototype = {
  withX: function(val) {
    return new Point(val, this._y)
  },
  withY: function(val) {
    return new Point(this._x, val);
  }
}

var p = new Point(0, 1);
console.log(p.withX(1000)); // { _x: 1000, _y: 1 }
console.log(p); // { _x: 0, _y: 1 }

console.log(
  (new Point(0, 1))
    .withX(100)
    .withY(-100)
); // { _x: 100, _y: -100 }

function Queue(elems) {
  this._q = elems;
}

Queue.prototype = {
  enqueue: function(thing) {
    return new Queue(cat(this._q, [thing]));
  }
}

var seed = [1, 2, 3];
var q = new Queue(seed);
console.log(q); // { _q: [ 1, 2, 3 ] }

var q2 = q.enqueue(108);
console.log(q2); // { _q: [ 1, 2, 3, 108 ] }
console.log(q); // { _q: [ 1, 2, 3 ] }

seed.push(10000);
console.log(q); // { _q: [ 1, 2, 3, 10000 ] }

///////////

SaferQueue.prototype = {
  enqueue: function(thing) {
    return new SaferQueue(cat(this._q, [thing]));
  }
}

var seed2 = [1, 2, 3];
var q3 = new SaferQueue(seed2);
var q4 = q3.enqueue(36);
console.log(q4); // { _q: [ 1, 2, 3, 36 ] }

seed2.push(1000);
console.log(q3); // { _q: [ 1, 2, 3 ] }

q3._q.push(-1111);
console.log(q3); // { _q: [ 1, 2, 3, -1111 ] }

SaferQueue.prototype.enqueue = sqr;
console.log(q4.enqueue(42)); // 1764
