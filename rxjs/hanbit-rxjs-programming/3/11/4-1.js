const { BehaviorSubject, interval } = require('rxjs');
const { take, map } = require('rxjs/operators');

// BehaviorSubject의 기본 동작 예
const behaviorSubject = new BehaviorSubject('초깃값');

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

const observerC = {
  next: x => console.log(`observerC: ${x}`),
  error: e => console.error(`observerC: ${e}`),
  complete: () => console.log('observerC: complete')
};

behaviorSubject.subscribe(observerA);
behaviorSubject.next('값1');

behaviorSubject.subscribe(observerB);
behaviorSubject.next('값2');

behaviorSubject.subscribe(observerC);
behaviorSubject.next('값3');
behaviorSubject.next('값4');
behaviorSubject.next('값5');
/*
observerA: 초깃값
observerA: 값1
observerB: 값1
observerA: 값2
observerB: 값2
observerC: 값2
observerA: 값3
observerB: 값3
observerC: 값3
observerA: 값4
observerB: 값4
observerC: 값4
observerA: 값5
observerB: 값5
observerC: 값5
*/

// BehaviorSubject를 이용하여 구현한 숫자 동작
const behaviorSubject2 = new BehaviorSubject(0);
const incrementInterval$ =
  interval(1000).pipe(
    take(5),
    map(x => behaviorSubject2.value + 1)
    // map(x => behaviorSubject2.getValue() + 1)
  );

incrementInterval$.subscribe(behaviorSubject2);
behaviorSubject2.subscribe(observerA);

setTimeout(() => behaviorSubject2.subscribe(observerB), 3200);
/*
observerA: 0
observerA: 1
observerA: 2
observerA: 3
observerB: 3
observerA: 4
observerB: 4
observerA: 5
observerB: 5
observerA: complete
observerB: complete
*/
