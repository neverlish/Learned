// 2 일급 함수와 응용형 프로그래밍 - 3 데이터 고찰 - 1 '테이블 형식'의 데이터

var _ = require('underscore');
var {existy, truthy, construct, as, project, restrict, rename} = require('../functions');

var library = [
  {title: 'SICP', isbn: '0262010771', ed: 1},
  {title: 'SICP', isbn: '0262510871', ed: 2},
  {title: 'Joy of Clojure', isbn: '1935182641', ed: 1},
];

console.log(
  _.pluck(library, 'title')
); // [ 'SICP', 'SICP', 'Joy of Clojure' ]

var editionResults = project(library, ['title', 'isbn']);
console.log(editionResults);
/*
[ { title: 'SICP', isbn: '0262010771' },
  { title: 'SICP', isbn: '0262510871' },
  { title: 'Joy of Clojure', isbn: '1935182641' } ]
*/

var isbnResults = project(editionResults, ['isbn']);
console.log(isbnResults);
/*
[ { isbn: '0262010771' },
  { isbn: '0262510871' },
  { isbn: '1935182641' } ]
*/

console.log(
  _.pluck(isbnResults, 'isbn')
); // [ '0262010771', '0262510871', '1935182641' ]

///////

console.log(rename({a: 1, b: 2}, {'a': 'AAA'})); // { b: 2, AAA: 1 }


console.log(as(library, {ed: 'edition'}));
/*
[ { title: 'SICP', isbn: '0262010771', edition: 1 },
  { title: 'SICP', isbn: '0262510871', edition: 2 },
  { title: 'Joy of Clojure', isbn: '1935182641', edition: 1 } ]
*/

console.log(
  project(as(library, {ed: 'edition'}), ['edition'])
); // [ { edition: 1 }, { edition: 2 }, { edition: 1 } ]

console.log(
  restrict(library, function(book) {
    return book.ed > 1;
  })
); // [ { title: 'SICP', isbn: '0262510871', ed: 2 } ]

console.log(
  restrict(
    project(
      as(library, {ed: 'edition'}),
      ['title', 'isbn', 'edition']
    ),
    function (book) {
      return book.edition > 1;
    }
  )
); // [ { title: 'SICP', isbn: '0262510871', edition: 2 } ]
