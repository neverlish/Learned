// 12-2-4 RxJS 연산자를 활용한 데이터 스트림 처리 - 콤비네이션 연산자 - concat 연산자를 이용해 옵저버블을 연결함

import * as Rx from '@reactivex/rxjs';

const one = Rx.Observable.of(1, 2, 3);
const two = Rx.Observable.of('a', 'b', 'c');
const sum = one.concat(two);
const subscribe = sum.subscribe(val => console.log(val));

/*
1
2
3
a
b
c
*/
