const { of, range, queueScheduler } = require('rxjs');
const { observeOn, mergeMap } = require('rxjs/operators');

// observeOn 연산자 안 QueueScheduler 사용
console.log('start');
of(1, 2, 3).pipe(observeOn(queueScheduler)).subscribe(x => console.log(x));
console.log(`actions length : : ${queueScheduler.actions.length}`);
console.log('end');
/*
start
1
2
3
actions length : : 0
end
*/

// range 함수 안에 QueueScheduler 사용
console.log('start queue');
range(0, 3, queueScheduler).pipe(mergeMap(x => range(x, 3, queueScheduler)))
  .subscribe(x => console.log(x));
console.log('end queue');

console.log('start without queue');
range(0, 3).pipe(mergeMap(x => range(x, 3))).subscribe(x => console.log(x));
console.log('end without queue');
/*
start queue
0
1
1
2
2
2
3
3
4
end queue
start without queue
0
1
2
1
2
3
2
3
4
end without queue
*/
