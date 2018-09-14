// 12-2-4 RxJS 연산자를 활용한 데이터 스트림 처리 - 생성 연산자 - create 생성 연산자의 여러 사용 방법

import * as Rx from '@reactivex/rxjs';

const hello$ = Rx.Observable.create(function (observer) {
  observer.next('a');
  observer.next('b');
});

const subscribeHello = hello$.map(val => val + val).subscribe(val => console.log(val));
/*
aa
bb
*/
