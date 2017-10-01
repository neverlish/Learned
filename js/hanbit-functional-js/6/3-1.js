// 6 재귀 - 3 너무 깊은 재귀! - 1 발생기

var _ = require('underscore');

var {partial, trampoline, cat, cycle} = require('../functions');

console.log(_.take(cycle(20, [1,2,3]), 11)); // [ 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2 ]

///////

function generator(seed, current, step) {
  return {
    head: current(seed),
    tail: function() {
      console.log('forced');
      return generator(step(seed), current, step);
    }
  }
}

function genHead(gen) { return gen.head; };
function genTail(gen) { return gen.tail(); };

var ints = generator(0, _.identity, function(n) { return n+1 });
console.log(genHead(ints)); // 0
console.log(genTail(ints));
/*
forced
{ head: 1, tail: [Function: tail] }
*/
console.log(genTail(genTail(ints)));
/*
forced
forced
{ head: 2, tail: [Function: tail] }
*/

function genTake(n, gen) {
  var doTake = function(x, g, ret) {
    if (x === 0)
      return ret;
    else
      return partial(doTake, x-1, genTail(g), cat(ret, genHead(g)));
  };

  return trampoline(doTake, n, gen, []);
}

console.log(genTake(10, ints));
/*
forced X 10
[ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
*/

console.log(genTake(100, ints));
/*
forced X 100
[ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, ...., 98, 99 ]
*/
