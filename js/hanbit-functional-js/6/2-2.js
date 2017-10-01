// 6 재귀 - 2 상호 재귀 함수(서로를 호출하는 함수) - 2 중첩된 배열 탐색

var _ = require('underscore');

var {partial1, visit, rev, influencedWithStrategy, preDepth} = require('../functions');

console.log(visit(_.identity, _.isNumber, 42)); // true
console.log(visit(_.isNumber, _.identity, [1, 2, null ,3])); // [ true, true, false, true ]
console.log(visit(function(n) {return n*2}, rev, _.range(10))); // [ 18, 16, 14, 12, 10, 8, 6, 4, 2, 0 ]

/////////////

function postDepth(fun, ary) {
  return visit(partial1(postDepth, fun), fun, ary);
}

var influences = [
  ['Lisp', 'Smalltalk'],
  ['Lisp', 'Scheme'],
  ['Smalltalk', 'Self'],
  ['Scheme', 'JavaScript'],
  ['Scheme', 'Lua'],
  ['Self', 'Lua'],
  ['Self', 'Javascript']
];

console.log(postDepth(_.identity, influences));
/*
[ [ 'Lisp', 'Smalltalk' ],
  [ 'Lisp', 'Scheme' ],
  [ 'Smalltalk', 'Self' ],
  [ 'Scheme', 'JavaScript' ],
  [ 'Scheme', 'Lua' ],
  [ 'Self', 'Lua' ],
  [ 'Self', 'Javascript' ] ]
*/

console.log(
  postDepth(
    function(x) {
      if (x === 'Lisp')
        return 'LISP';
      else
        return x;
    },
    influences
  )
)
/*
[ [ 'LISP', 'Smalltalk' ],
  [ 'LISP', 'Scheme' ],
  [ 'Smalltalk', 'Self' ],
  [ 'Scheme', 'JavaScript' ],
  [ 'Scheme', 'Lua' ],
  [ 'Self', 'Lua' ],
  [ 'Self', 'Javascript' ] ]
*/

////////

console.log(
  influencedWithStrategy(postDepth, 'Lisp', influences)
); // [ 'Smalltalk', 'Scheme' ]
