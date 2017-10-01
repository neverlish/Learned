// 6 재귀 - 1 자신을 호출하는 함수

var _ = require('underscore');

var {construct, cycle} = require('../functions');

function myLength(ary) {
  if (_.isEmpty(ary))
    return 0;
  else 
    return 1 + myLength(_.rest(ary));
}

console.log(myLength(_.range(10))); // 10
console.log(myLength([])); // 0
console.log(myLength(_.range(1000))); // 1000

var a = _.range(10);
console.log(myLength(a)); // 10
console.log(a); // [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]

///////

console.log(cycle(2, [1,2,3])); // [ 1, 2, 3, 1, 2, 3 ]
console.log(
  _.take(cycle(20, [1,2,3]), 11)
); // [ 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2 ]

///////////

console.log(
  _.zip(['a','b','c'],[1,2,3])
); // [ [ 'a', 1 ], [ 'b', 2 ], [ 'c', 3 ] ]

var zipped = [['a',1]];

function constructPair(pair, rests) {
  return [
    construct(_.first(pair), _.first(rests)),
    construct(pair[1], rests[1])
  ];
}

console.log(
  constructPair(['a',1], [[],[]])
); // [ [ 'a' ], [ 1 ] ]

console.log(
  _.zip(['a'], [1])
); // [ [ 'a', 1 ] ]

console.log(
  _.zip.apply(null, constructPair(['a', 1], [[],[]]))
); // [ [ 'a', 1 ] ]

console.log(
  constructPair(
    ['a', 1],
    constructPair(
      ['b', 2],
      constructPair(['c',3],[[],[]])
    )
  )
); // [ [ 'a', 'b', 'c' ], [ 1, 2, 3 ] ]

////////////

function unzip(pairs) {
  if (_.isEmpty(pairs)) return [[], []];

  return constructPair(_.first(pairs), unzip(_.rest(pairs)));
}

console.log(
  unzip(_.zip([1,2,3],[4,5,6]))
); // [ [ 1, 2, 3 ], [ 4, 5, 6 ] ]
