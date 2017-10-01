// 9 클래스를 이용하지 않는 프로그래밍 - 1 데이터 지향 - 1 함수를 이용하는 프로그래밍

var _ = require('underscore');
var {lazyChain, validator, partial1, condition1, second, pipeline, invoker} = require('../functions');
var {JSDOM} = require('jsdom');
var {window} = new JSDOM();
var $ = require('jquery')(window)

function deferredSort(ary) {
  return lazyChain(ary).invoke('sort');
}

var deferredSorts = _.map([[2,1,3],[7,7,1],[0,9,5]], deferredSort);
console.log(deferredSorts);
/*
[ { invoke: [Function: invoke], force: [Function: force] },
  { invoke: [Function: invoke], force: [Function: force] },
  { invoke: [Function: invoke], force: [Function: force] } ]
*/

function force(thunk) {
  return thunk.force();
}

console.log(
  _.map(deferredSorts, force)
); // [ [ 1, 2, 3 ], [ 1, 7, 7 ], [ 0, 5, 9 ] ]

//////////

var validateTriples = validator(
  'Each array should have three elements',
  function (arrays) {
    return _.every(arrays, function(a) { 
      return a.length === 3;
    });
  }
)

var validateTripleStore = partial1(condition1(validateTriples), _.identity);

console.log(
  validateTripleStore([[2,1,3],[7,7,1],[0,9,5]])
); // [ [ 2, 1, 3 ], [ 7, 7, 1 ], [ 0, 9, 5 ] ]

/*
console.log(
  validateTripleStore([[2,1,3],[7,7,1],[0,9,5,7,7,7,7,7,7]])
); // Error: Each array should have three elements
*/

//////////

function postProcess(arrays) {
  return _.map(arrays, second);
}

function processTriples(data) {
  return pipeline(data
    , JSON.parse
    , validateTripleStore
    , deferredSort
    , force
    , postProcess
    , invoker('sort', Array.prototype.sort)
    , String
  )
}

console.log(
  processTriples('[[2,1,3],[7,7,1],[0,9,5]]')
); // 1,7,9

/*
console.log(
  processTriples('[[2,1,3],[7,7,1],[0,9,5,7,7,7,7,7,7]]')
); // Error: Each array should have three elements
*/

/*
$.get('http://djhkjhkdj.com', function(data) {
  console.log(processTriples(data));
}); // Error: Error: getaddrinfo ENOTFOUND djhkjhkdj.com djhkjhkdj.com:80
*/

var reportDataPackets = _.compose(
  function(s) { return s },
  processTriples
);

// $.get('http://djhkjhkdj.com', reportDataPackets); // Error: Error: getaddrinfo ENOTFOUND djhkjhkdj.com djhkjhkdj.com:80

