const { of, asyncScheduler } = require('rxjs');
const { observeOn } = require('rxjs/operators');

// observeOn 연산자 안 AsyncScheduler 사용
console.log('start');
of(1, 2, 3).pipe(observeOn(asyncScheduler, 1000)).subscribe(x => console.log(x));
console.log(`actions length : : ${asyncScheduler.actions.length}`);
console.log('end');
/*
start
actions length : : 0
end
1
2
3
*/
