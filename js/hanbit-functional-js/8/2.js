// 8 흐름 기반 프로그래밍 - 2 파이프라이닝

var _ = require('underscore');

var {rev, as, project, restrict, curry2, pipeline} = require('../functions');

console.log(
  rev(
    _.rest(
      _.initial(
        _.compact([2, 3, null, 1, 42, false])
      )
    )
  )
); // [1, 3]


console.log(pipeline()); // undefined
console.log(pipeline(42)); // 42
console.log(pipeline(42, function(n) { return -n; })); // -42

//////

function fifth(a) {
  return pipeline(a
    , _.rest
    , _.rest
    , _.rest
    , _.rest
    , _.first
  );
}

console.log(fifth([1, 2, 3, 4, 5])); // 5

function negativeFifth(a) {
  return pipeline(a
    , fifth
    , function(n) { return -n }
  );
}

console.log(negativeFifth([1, 2, 3, 4, 5, 6, 7, 8, 9])); // -5

////////

function firstEditions(table) {
  return pipeline(table
    , function(t) { return as(t, {ed: 'edition'}); }
    , function(t) { return project(t, ['title', 'edition', 'isbn']); }
    , function(t) { return restrict(t, function(book) { return book.edition === 1}); }
  );
}

var library = [
  {title: 'SICP', isbn: '0262010771', ed: 1},
  {title: 'SICP', isbn: '0262510871', ed: 2},
  {title: 'Joy of Clojure', isbn: '1935182641', ed: 1},
];

console.log(firstEditions(library));
/*
[ { title: 'SICP', edition: 1, isbn: '0262010771' },
  { title: 'Joy of Clojure', edition: 1, isbn: '1935182641' } ]
*/

var RQL = {
  select: curry2(project),
  as: curry2(as),
  where: curry2(restrict)
};

function allFirstEditions(table) {
  return pipeline(table
    , RQL.as({ed: 'edition'})
    , RQL.select(['title', 'edition', 'isbn'])
    , RQL.where(function(book) { return book.edition === 1; })
  );
}

console.log(allFirstEditions(library));
/*
[ { title: 'SICP', edition: 1, isbn: '0262010771' },
  { title: 'Joy of Clojure', edition: 1, isbn: '1935182641' } ]
*/
