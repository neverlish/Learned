const { Observable, asyncScheduler } = require('rxjs');
const { subscribeOn } = require('rxjs/operators');

const source$ = Observable.create(observer => {
  console.log('BEGIN source');
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.complete();
  console.log('END source');
});

console.log('before subscribe');
source$.pipe(subscribeOn(asyncScheduler, 1000)).subscribe(x => console.log(x));
console.log('after subscribe');
/*
before subscribe
after subscribe
BEGIN source
1
2
3
END source
*/
