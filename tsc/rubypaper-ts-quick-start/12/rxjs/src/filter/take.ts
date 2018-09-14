// 12-2-4 RxJS 연산자를 활용한 데이터 스트림 처리 - 필터 연산자 - take 연산자를 이용해 조건에 부합하는 값만 전달

import * as Rx from '@reactivex/rxjs';

const interval = Rx.Observable.interval(100);
const take$ = interval.take(3);
take$.subscribe(val => console.log(val));
/*
0
1
2
*/
