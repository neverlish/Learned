const { Subject } = require('rxjs');

// 서브젝트의 에러 발생 상황을 전파
const subject = new Subject();

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

subject.error('error');
subject.subscribe(observerA);
subject.subscribe(observerB);
/*
observerA: error
observerB: error
*/

// 서브젝트의 구독 완료 상황을 전파
const subject2 = new Subject();
subject2.complete();
subject2.subscribe(observerA);
subject2.subscribe(observerB);
/*
observerA: complete
observerB: complete
*/

// 서브젝트의 unsubscribe 함수의 동작
const subject3 = new Subject();
subject3.subscribe(observerA);
subject3.subscribe(observerB);

subject3.unsubscribe();
subject3.subscribe(observerC);

// subject3.next(1); // ObjectUnsubscribedError: object unsubscribed
// subject3.error('error'); // ObjectUnsubscribedError: object unsubscribed
// subject3.complete(); // ObjectUnsubscribedError: object unsubscribed
