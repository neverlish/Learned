// 6 재귀 - 3 너무 깊은 재귀!

var _ = require('underscore');

var {partial1, trampoline} = require('../functions');

function evenOline(n) {
  if (n === 0)
    return true;
  else
    return partial1(oddOline, Math.abs(n) - 1);
}

function oddOline(n) {
  if (n === 0)
    return false;
  else
    return partial1(evenOline, Math.abs(n) - 1);
}

console.log(evenOline(0)); // true
console.log(oddOline(0)); // false

//////////

console.log(trampoline(oddOline, 3)); // true
console.log(trampoline(evenOline, 200000)); // true
console.log(trampoline(oddOline, 300000)); // false
console.log(trampoline(evenOline, 2000000)); // true

function isEvenSafe(n) {
  if (n === 0)
    return true;
  else
    return trampoline(partial1(oddOline, Math.abs(n) - 1));
}

function isOddSafe(n) {
  if (n === 0)
    return false;
  else
    return trampoline(partial1(evenOline, Math.abs(n) - 1));
}

console.log(isOddSafe(200001)); // true
console.log(isEvenSafe(2000001)); // false
