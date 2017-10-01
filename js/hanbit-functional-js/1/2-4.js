// 1 함수형 자바스크립트 소개 - 2 함수형 프로그래밍 시작하기 - 4 함수 - 동작 단위

var {fail, truthy, nth, second} = require('../functions');

var letters = ['a', 'b', 'c'];
console.log(letters[1]); // b

function naiveNth(a, index) {
  return a[index];
}

console.log(naiveNth(letters, 1)); // b

///////

console.log(nth(letters, 1)); // b
console.log(nth('abc', 0)); // a

// console.log(nth({}, 2)); // Error: Not supported on non-index type
// console.log(nth(letters, 4000)); // Error: Index value is out of boounds
// console.log(nth(letters, 'aaaaa')); // Error: Expected a number as the index

/////////

console.log(second(['a', 'b'])); // b
console.log(second('fogus')); // o
// console.log(second({})); // Error: Not supported on non-index type

/////////////////

console.log([2, 3, -6, 0, -108, 42].sort()); // [ -108, -6, 0, 2, 3, 42 ]
console.log([0, -1, -2].sort()); // [ -1, -2, 0 ]
console.log([2, 3, -1, -6, 0, -108, 42, 10].sort()); // [ -1, -108, -6, 0, 10, 2, 3, 42 ]

console.log(
  [2, 3, -1, -6, 0, -108, 42, 10].sort(function(x, y) {
    if (x < y) return -1;
    if (y < x) return 1;
    return 0;
  })
); // [ -108, -6, -1, 0, 2, 3, 10, 42 ]

function compareLessThanOrEqual(x, y) {
  if (x < y) return -1;
  if (y < x) return 1;
  return 0;
}

console.log(
  [2, 3, -1, -6, 0, -108, 42, 10].sort(compareLessThanOrEqual)
); // [ -108, -6, -1, 0, 2, 3, 10, 42 ]

///////

function lessOrEqual(x, y) {
  return x <= y;
}

console.log(
  [100, 1, 0, 10, -1, -2, -1].sort(lessOrEqual)
); // [ 100, 10, 1, 0, -1, -1, -2 ]

///////

function comparator(pred) {
  return function(x, y) {
    if (truthy(pred(x, y)))
      return -1;
    else if (truthy(pred(y, x)))
      return 1;
    else 
      return 0;
  };
};

console.log(
  [100, 1, 0, 10, -1, -2, -1].sort(comparator(lessOrEqual))
); // [ -2, -1, -1, 0, 1, 10, 100 ]
