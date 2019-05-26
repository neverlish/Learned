// 03 Reactive Programming - Why choose RxJS?

const Rx = require('rxjs/Rx');

var streamA = Rx.Observable.of(3);
var streamB = streamA.map(a => 10 * a);

streamB.subscribe(b => console.log(b));