const { Subject } = require('rxjs');

// 옵저버블로 사용하는 서브젝트
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

subject.subscribe(observerA);
subject.subscribe(observerB);
subject.subscribe(observerC);

// 옵저버로 사용하는 프로젝트
subject.next(1);
/*
observerA: 1
observerB: 1
observerC: 1
*/
subject.next(2);
/*
observerA: 2
observerB: 2
observerC: 2
*/
subject.next(3);
/*
observerA: 3
observerB: 3
observerC: 3
*/

// error 함수 호출 후 next 함수 호출
// subject.error(new Error('error!'));
/*
observerA: Error: error!
observerB: Error: error!
observerC: Error: error!
*/
// subject.next(4);
// subject.complete();

// complete 함수 호출 후 next 함수 호출
subject.complete();
/*
observerA: complete
observerB: complete
observerC: complete
*/
subject.next(4);
subject.error(new Error('error!'));
