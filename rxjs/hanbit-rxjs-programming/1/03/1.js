// create 함수로 옵저버블 생성

const { Observable } = require('rxjs');

const observable1to10$ = Observable.create(function(observer) {
  console.log('[observable1to10] BEGIN subscribe function');

  for (let value = 1; value <= 10; value++) {
    observer.next(value);
  }

  observer.complete();

  // 실행되지 않음
  observer.next(11);
  observer.error(new Error('error'));
  observer.complete();

  console.log('[observable1to10] END subscribe function');

  return function() {
    console.log('observable1to10 unsubscribed');
  }
});

observable1to10$.subscribe(
  function next(value) {
    console.log(`next value: ${value}`);
  },
  function error(err) {
    console.error(`error`, err.message);
  },
  function complete() {
    console.log('complete!');
  }
);

/*
[observable1to10] BEGIN subscribe function
next value: 1
next value: 2
next value: 3
next value: 4
next value: 5
next value: 6
next value: 7
next value: 8
next value: 9
next value: 10
complete!
[observable1to10] END subscribe function
observable1to10 unsubscribed
*/

// 에러 발생을 확인할 수 있는 create 함수 사용
const observable1to10_2$ = Observable.create(observer => {
  try {
    console.log('[observable1to10_2] BEGIN subscribe function');
    for (let value = 1; value <= 10; value++) {
      observer.next(value);
      consloe.log(`observer.next(${value})`); // 오타
    }
  } catch (e) {
    observer.error(e);
  }
  // observer.complete();
  console.log('[observable1to10_2] END subscribe function');
  
  return () => {
    console.log('observable1to10_2 unsubscribed');
  }
});

observable1to10_2$.subscribe(
  value => console.log(`next value: ${value}`),
  err => console.error(`error`, err.message),
  () => console.log('complete!')
);

/*
[observable1to10_2] BEGIN subscribe function
next value: 1
error consloe is not defined
[observable1to10_2] END subscribe function
observable1to10_2 unsubscribed
*/

// try-catch문 없이 에러가 발생하는 create 함수
const observable1to10_3$ = Observable.create(observer => {
  console.log('[observable1to10_3] BEGIN subscribe function');
  for (let value = 1; value <= 10; value++) {
    observer.next(value);
    consloe.log(`observer.next(${value})`); // 오타
  }
  observer.complete();
  console.log('[observable1to10_3] END subscribe function');
  
  return () => {
    console.log('observable1to10_3 unsubscribed');
  }
});

observable1to10_3$.subscribe(
  value => console.log(`next value: ${value}`),
  err => console.error(`error`, err.message),
  () => console.log('complete!')
);

/*
[observable1to10_3] BEGIN subscribe function
next value: 1
error consloe is not defined
*/
