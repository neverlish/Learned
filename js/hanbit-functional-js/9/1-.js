// 9 클래스를 이용하지 않는 프로그래밍 - 1 데이터 지향

var _ = require('underscore');
var {lazyChain} = require('../functions');

var lazyOp = lazyChain([2,1,3])
  .invoke('concat', [7,7,8,9,0])
  .invoke('sort');

console.log(lazyOp.force()); // [ 0, 1, 2, 3, 7, 7, 8, 9 ]
