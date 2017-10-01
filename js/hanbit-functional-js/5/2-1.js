// 5 함수로 함수 만들기 - 2 커링 - 1 우향 커리, 좌향 커리

var _ = require('underscore');

function leftCurryDiv(n) {
  return function(d) {
    return n/d;
  }
}

function rightCurryDiv(d) {
  return function(n) {
    return n/d;
  }
}

var divide10By = leftCurryDiv(10);
console.log(divide10By(2)); // 5

var divideBy10 = rightCurryDiv(10);
console.log(divideBy10(2)); // 0.2
