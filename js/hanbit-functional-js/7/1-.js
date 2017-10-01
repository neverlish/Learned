// 7 순수성, 불변성, 변경 정책 - 1 순수성

var _ = require('underscore');
var {rand, repeatedly, partial1} = require('../functions');

console.log(rand(10)); // ex) 5

console.log(repeatedly(10, partial1(rand, 10))); // ex) [ 3, 10, 2, 6, 7, 7, 10, 4, 8, 3 ]
console.log(_.take(repeatedly(100, partial1(rand, 10)), 5)); // ex) [ 3, 8, 1, 1, 7 ]

function randString(len) {
  var ascii = repeatedly(len, partial1(rand, 26));
  return _.map(ascii, function(n) {
    return n.toString(36);
  }).join('');
}

console.log(randString(0)); // ''
console.log(randString(1)); // ex) p
console.log(randString(10)); // ex) k9bc94flbn
