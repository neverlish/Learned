// 4 고차원 함수 - 1 다른 함수를 인자로 취하는 함수 - 2 함수를 다른 인자에 전달하는 상황에 대한 더 깊은 고찰: repeat, repeatedly, iterateUntil

var _ = require('underscore');
var {repeatedly} = require('../functions');

function repeat(times, VALUE) {
  return _.map(_.range(times), function() { return VALUE; });
}

console.log(repeat(4, 'Major')); // [ 'Major', 'Major', 'Major', 'Major' ]

///// 값 대신 함수를 사용하라

console.log(
  repeatedly(3, function() {
    return Math.floor((Math.random() * 10) + 1);
  })
); // ex) [4, 2, 5]

console.log(
  repeatedly(
    3, function() { return 'Odelay!'; }
  )
); // [ 'Odelay!', 'Odelay!', 'Odelay!' ]

console.log(
  repeatedly(
    3, function(n) {
      var id = 'id' + n;
      return id;
    }
  )
); // [ 'id0', 'id1', 'id2' ]

// 단언컨대 '값 대신 함수를 사용하라'

function iterateUntil(fun, check, init) {
  var ret = [];
  var result = fun(init);

  while (check(result)) {
    ret.push(result);
    result = fun(result);
  }

  return ret;
}

console.log(
  iterateUntil(
    function(n) { return n+n; },
    function(n) { return n <= 1024; },
    1
  )
); // [ 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024 ]

console.log(
  repeatedly(
    10,
    function(exp) { return Math.pow(2, exp+1); }
  )
); // [ 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024 ]
