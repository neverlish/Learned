const { Observable, asyncScheduler } = require('rxjs');
const { observeOn } = require('rxjs/operators');

// observeOn 연산자의 사용 예
const source$ = Observable.create(observer => {
  console.log('BEGIN source');
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.complete();
  console.log('END source');
});

console.log('before subscribe');
source$.pipe(observeOn(asyncScheduler, 1000)).subscribe(x => console.log(x));
console.log('after subscribe');
/*
before subscribe
BEGIN source
END source
after subscribe
1
2
3
*/
