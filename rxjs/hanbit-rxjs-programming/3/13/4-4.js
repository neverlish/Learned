const { of, asapScheduler } = require('rxjs');
const { observeOn } = require('rxjs/operators');

// observeOn 연산자 안 AsapScheduler 사용
console.log('start');
of(1, 2, 3).pipe(observeOn(asapScheduler)).subscribe(x => console.log(x));
console.log(`actions length : : ${asapScheduler.actions.length}`);
console.log('end');
/*
start
actions length : : 4
end
1
2
3
*/
