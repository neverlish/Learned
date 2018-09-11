// 12-2-4 RxJS 연산자를 활용한 데이터 스트림 처리 - 조건 연산자 - every 연산자를 이용해 조건에 부합하는지 검사

import * as Rx from '@reactivex/rxjs';

const source = Rx.Observable.of(1, 10, 20, 30, 40);
const $every = source.every(val => val %2 === 0);
$every.subscribe(val => console.log(val)); // false
