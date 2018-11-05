const { ReplaySubject, interval } = require('rxjs');
const { take } = require('rxjs/operators');

// ReplaySubject의 기본 사용 예
const replaySubject = new ReplaySubject(3);
const intervalSource$ = interval(500).pipe(take(8));

const observerA = {
  next: x => console.log(`observerA: ${x}`),
  error: e => console.error(`observerA: ${e}`),
  complete: () => console.log('observerA: complete')
};

const observerB = {
  next: x => console.log(`observerB: ${x}`),
  error: e => console.error(`observerB: ${e}`),
  complete: () => console.log('observerB: complete')
};

console.log('try replaySubject.subscribe(observerA)');
replaySubject.subscribe(observerA);

console.log('try intervalSource$.subscribe(replaySubject)');
intervalSource$.subscribe(replaySubject);

setTimeout(() => {
  console.log('try replaySubject.subscribe(observerB), setTimeout 2600 ms');
  replaySubject.subscribe(observerB)
}, 2600);
/*
try replaySubject.subscribe(observerA)
try intervalSource$.subscribe(replaySubject)
observerA: 0
observerA: 1
observerA: 2
observerA: 3
observerA: 4
try replaySubject.subscribe(observerB), setTimeout 2600 ms
observerB: 2
observerB: 3
observerB: 4
observerA: 5
observerB: 5
observerA: 6
observerB: 6
observerA: 7
observerB: 7
observerA: complete
observerB: complete
*/

// 제한 ㅇ벗이 값을 전달하는 ReplaySubject 사용 예
const replaySubject2 = new ReplaySubject();

console.log('try replaySubject2.subscribe(observerA)');
replaySubject2.subscribe(observerA);

console.log('try intervalSource$.subscribe(replaySubject2)');
intervalSource$.subscribe(replaySubject2);

setTimeout(() => {
  console.log('try replaySubject2.subscribe(observerB), setTimeout 2600 ms');
  replaySubject2.subscribe(observerB)
}, 2600);
/*
try replaySubject2.subscribe(observerA)
try intervalSource$.subscribe(replaySubject2)
observerA: 0
observerA: 1
observerA: 2
observerA: 3
observerA: 4
try replaySubject2.subscribe(observerB), setTimeout 2600 ms
observerB: 0
observerB: 1
observerB: 2
observerB: 3
observerB: 4
observerA: 5
observerB: 5
observerA: 6
observerB: 6
observerA: 7
observerB: 7
observerA: complete
observerB: complete
*/
