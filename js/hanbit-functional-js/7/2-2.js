// 7 순수성, 불변성, 변경 정책 - 2 불변성 - 2 불변성과 재귀의 관계

var _ = require('underscore');

function summ(array) {
  var result = 0;
  var sz = array.length;

  for(var i = 0; i < sz; i++) {
    result += array[i];
  }

  return result;
}

console.log(summ(_.range(1, 11))); // 55

function summRec(array, seed) {
  if (_.isEmpty(array))
    return seed;
  else
    return summRec(_.rest(array), _.first(array) + seed);
}

console.log(summRec([], 0)); // 0
console.log(summRec(_.range(1, 11), 0)); // 55
