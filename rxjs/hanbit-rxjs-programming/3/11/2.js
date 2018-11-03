const { interval, Subject } = require('rxjs');
const { take } = require('rxjs/operators');

// interval 생성 함수를 이용한 콜드 옵저버블 동작
const intervalSource$ = interval(500).pipe(take(5));

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

intervalSource$.subscribe(observerA);
setTimeout(() => intervalSource$.subscribe(observerB), 2000);
/*
observerA: 0
observerA: 1
observerA: 2
observerA: 3
observerB: 0
observerA: 4
observerA: complete
observerB: 1
observerB: 2
observerB: 3
observerB: 4
observerB: complete
*/

// 서브젝트를 새로 선언해 대체
const subject = new Subject();
subject.subscribe(observerA);
setTimeout(() => subject.subscribe(observerB), 2000);

// intervalSource$를 구독해 서브젝트로 보내는 작업 추가

intervalSource$.subscribe({
  next: x => subject.next(x),
  error: e => subject.error(e),
  complete: () => subject.complete()
});
/*
observerA: 0
observerA: 1
observerA: 2
observerA: 3
observerB: 3
observerA: 4
observerB: 4
observerA: complete
observerB: complete
*/

// 옵저버블에서 값을 바로 서브젝트로 전달

intervalSource$.subscribe(subject);
/*
observerA: 0
observerA: 1
observerA: 2
observerA: 3
observerB: 3
observerA: 4
observerB: 4
observerA: complete
observerB: complete
*/
