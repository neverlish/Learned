// 8 흐름 기반 프로그래밍 - 1 체이닝 - 1 게으른 체인

var _ = require('underscore');
var {cat} = require('../functions');

function LazyChain(obj) {
  this._calls = [];
  this._target = obj;
}

LazyChain.prototype.invoke = function(methodName /* args */) {
  var args = _.rest(arguments);

  this._calls.push(function(target) {
    var meth = target[methodName];

    return meth.apply(target, args);
  });

  return this;
}

console.log(new LazyChain([2,1,3]).invoke('sort')._calls); // [Function]

// console.log(new LazyChain([2,1,3]).invoke('sort')._calls[0]()); // TypeError: Cannot read property 'sort' of undefined

console.log(
  new LazyChain([2,1,3]).invoke('sort')._calls[0]([2,1,3])
); // [ 1, 2, 3 ]

////////////

LazyChain.prototype.force = function() {
  return _.reduce(this._calls, function(target, thunk) {
    return thunk(target);
  }, this._target);
}

console.log(
  new LazyChain([2,1,3]).invoke('sort').force()
); // [ 1, 2, 3 ]

console.log(
  new LazyChain([2,1,3])
    .invoke('concat', [8,5,7,6])
    .invoke('sort')
    .invoke('join', ' ')
    .force()
); // 1 2 3 5 6 7 8

////////////

LazyChain.prototype.tap = function(fun) {
  this._calls.push(function(target) {
    fun(target);
    return target;
  });

  return this;
}

console.log(
  new LazyChain([2,1,3])
    .invoke('sort')
    .tap(console.log)
    .force()
);
/*
[ 1, 2, 3 ]
[ 1, 2, 3 ]
*/

var deferredSort = new LazyChain([2,1,3])
  .invoke('sort')
  .tap(console.log);

console.log(deferredSort); // LazyChain

deferredSort.force(); // [ 1, 2, 3 ]

//////////////

function LazyChainChainChain(obj) {
  var isLC = (obj instanceof LazyChain)
  
  this._calls = isLC ? cat(obj._calls, []) : [];
  this._target = isLC ? obj._target : obj;
}

LazyChainChainChain.prototype = LazyChain.prototype;

console.log(
  new LazyChainChainChain(deferredSort)
    .invoke('toString')
    .force()
); // 1,2,3
