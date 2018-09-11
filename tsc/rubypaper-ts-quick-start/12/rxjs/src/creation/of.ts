// 12-2-4 RxJS 연산자를 활용한 데이터 스트림 처리 - 생성 연산자 - 생성 연산자인 of의 여러 사용 방법

import * as Rx from '@reactivex/rxjs';

Rx.Observable.of(1, 2, 3).subscribe(val => console.log(val));
Rx.Observable.of('a', 'b', 'c').subscribe(val => console.log(val));
Rx.Observable.of(['a', 'b'], ['c', 'd']).subscribe(val => console.log(val));

/*
1
2
3
a
b
c
[ 'a', 'b' ]
[ 'c', 'd' ]
*/
