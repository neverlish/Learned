// 5 함수로 함수 만들기 - 2 커링

var _ = require('underscore');
var {invoker} = require('../functions');

function rightAwayInvoker() {
  var args = _.toArray(arguments);
  var method = args.shift();
  var target = args.shift();

  return method.apply(target, args);
}

console.log(
  rightAwayInvoker(Array.prototype.reverse, [1,2,3])
); // [ 3, 2, 1 ]

console.log(
  invoker('reverse', Array.prototype.reverse)([1,2,3])
); // [ 3, 2, 1 ]
