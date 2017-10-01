// 5 함수로 함수 만들기 - 3 부분 적용

var _ = require('underscore');

function divPart(n) {
  return function(d) {
    return n / d;
  };
}

var over10Part = divPart(10);
console.log(over10Part(2)); // 5
