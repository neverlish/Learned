// 7 순수성, 불변성, 변경 정책 - 2 불변성 - 6 객체는 대체로 저수준 동작이다

var _ = require('underscore');
var {SaferQueue, cat, invoker} = require('../functions');

var q = SaferQueue([1,2,3]);

SaferQueue.prototype = {
  enqueue: function(thing) {
    return new SaferQueue(cat(this._q, [thing]));
  }
}
// console.log(q.enqueue([1,2,3])); // TypeError: Cannot read property 'enqueue' of undefined

////////

function queue() {
  return new SaferQueue(_.toArray(arguments));
}

var q2 = queue(1,2,3);
var enqueue = invoker('enqueue', SaferQueue.prototype.enqueue);
console.log(enqueue(q2, 42)); // { _q: [ 1, 2, 3, 42 ] }
