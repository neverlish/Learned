// 01 Understand Reactive Programming using RxJS

const Rx = require('rxjs/Rx');

var array = ['1', '1', 'foo', '2', '3', '5', 'bar', '8', '13']

var source = Rx.Observable.interval(400).take(9)
  .map(i => array[i]);

var result = source;
result.subscribe(x => console.log(x));


var result2 = array
  .map(x => parseInt(x))
  .filter(x => !isNaN(x))
  .reduce((x, y) => x + y);

console.log(result2);

var result3 = source
  .map(x => parseInt(x))
  .filter(x => !isNaN(x))
  .reduce((x, y) => x + y);

result3.subscribe(x => console.log(x));