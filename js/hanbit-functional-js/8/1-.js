// 8 흐름 기반 프로그래밍 - 1 체이닝 

var _ = require('underscore');
var {note} = require('../functions');

function createPerson() {
  var firstName = '';
  var lastName = '';
  var age = 0;
  
  return {
    setFirstName: function(fn) {
      firstName = fn;
      return this;
    },
    setLastName: function(ln) {
      lastName = ln;
      return this;
    },
    setAge: function(a) {
      age = a;
      return this;
    },
    toString: function() { 
      return [firstName, lastName, age].join(' ');
    }
  };
}

console.log(
  createPerson()
    .setFirstName('Mike')
    .setLastName('Fogus')
    .setAge(108)
    .toString()
); // Mike Fogus 108

var library = [
  {title: 'SICP', isbn: '0262010771', ed: 1},
  {title: 'SICP', isbn: '0262510871', ed: 2},
  {title: 'Joy of Clojure', isbn: '1935182641', ed: 1},
];

console.log(
  _.chain(library)
   .pluck('title')
   .sort()
   .value()
); // [ 'Joy of Clojure', 'SICP', 'SICP' ]

var TITLE_KEY = 'titel';

console.log(
  _.chain(library)
   .pluck(TITLE_KEY)
   .sort()
   .value()
); // [ undefined, undefined, undefined ]

///////////

console.log(
  _.tap([1,2,3], note)
);
/*
NOTE: 1,2,3
[ 1, 2, 3 ]
*/

console.log(
  _.chain(library)
   .tap(function(o) {console.log(o)})
   .pluck(TITLE_KEY)
   .sort()
   .value()
);
/*
[ { title: 'SICP', isbn: '0262010771', ed: 1 },
  { title: 'SICP', isbn: '0262510871', ed: 2 },
  { title: 'Joy of Clojure', isbn: '1935182641', ed: 1 } ]
[ undefined, undefined, undefined ]
*/

console.log(
  _.chain(library)
   .pluck(TITLE_KEY)
   .tap(note)
   .sort()
   .value()
);
/*
NOTE: ,,
[ undefined, undefined, undefined ]
*/

console.log(
  _.chain(library)
   .pluck('title')
   .tap(note)
   .sort()
); 
/*
NOTE: SICP,SICP,Joy of Clojure
_ { _wrapped: [ 'Joy of Clojure', 'SICP', 'SICP' ], _chain: true }
*/
