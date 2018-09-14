// 12-2-4 RxJS 연산자를 활용한 데이터 스트림 처리 - 변형 연산자 - map 연산자를 이용한 데이터 스트림(배열)을 처리함

import * as Rx from '@reactivex/rxjs';

const streamData$ = Rx.Observable.from([1, 2, 3, 4, 5]);
const map = streamData$.map(val => val + 10);
const mapSubscribe = map.subscribe(val => console.log(val));

/*
11
12
13
14
15
*/
