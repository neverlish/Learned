// 6 재귀 - 4 재귀는 저수준 동작이다

var _ = require('underscore');

var {curry2, second, influencedWithStrategy, visit, preDepth} = require('../functions');

var groupFrom = curry2(_.groupBy)(_.first);
var groupTo = curry2(_.groupBy)(second);

var influences = [
  ['Lisp', 'Smalltalk'],
  ['Lisp', 'Scheme'],
  ['Smalltalk', 'Self'],
  ['Scheme', 'JavaScript'],
  ['Scheme', 'Lua'],
  ['Self', 'Lua'],
  ['Self', 'Javascript']
];

console.log(groupFrom(influences));
/*
{ Lisp: [ [ 'Lisp', 'Smalltalk' ], [ 'Lisp', 'Scheme' ] ],
  Smalltalk: [ [ 'Smalltalk', 'Self' ] ],
  Scheme: [ [ 'Scheme', 'JavaScript' ], [ 'Scheme', 'Lua' ] ],
  Self: [ [ 'Self', 'Lua' ], [ 'Self', 'Javascript' ] ] }
*/
console.log(groupTo(influences));
/*
{ Smalltalk: [ [ 'Lisp', 'Smalltalk' ] ],
  Scheme: [ [ 'Lisp', 'Scheme' ] ],
  Self: [ [ 'Smalltalk', 'Self' ] ],
  JavaScript: [ [ 'Scheme', 'JavaScript' ] ],
  Lua: [ [ 'Scheme', 'Lua' ], [ 'Self', 'Lua' ] ],
  Javascript: [ [ 'Self', 'Javascript' ] ] }
*/

//////

function influenced(graph, node) {
  return _.map(groupFrom(graph)[node], second);
}

console.log(influencedWithStrategy(preDepth, 'Lisp', influences)); // [ 'Smalltalk', 'Smalltalk', 'Scheme', 'Scheme' ]
console.log(influenced(influences, 'Lisp')); // [ 'Smalltalk', 'Scheme' ]

