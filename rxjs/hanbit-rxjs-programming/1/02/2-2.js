// 옵저버블의 생성과 실행
const { Observable } = require('rxjs');

const observableCreated$ = Observable.create(function(observer) {
  console.log('BEGIN Observable');
  observer.next(1);
  observer.next(2);
  observer.complete();
  console.log('END Observable');
});

observableCreated$.subscribe(
  function next(item) { console.log(item); },
  function error(e) { },
  function complete() { console.log('complete'); }
);

/*
BEGIN Observable
1
2
complete
END Observable
*/
