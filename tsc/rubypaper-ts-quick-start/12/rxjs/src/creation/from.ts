// 12-2-4 RxJS 연산자를 활용한 데이터 스트림 처리 - 생성 연산자 - 생성 연산자인 from의 여러 사용 방법

import * as Rx from '@reactivex/rxjs';

Rx.Observable.from([1, 2, 3]).subscribe(val => console.log(val));
Rx.Observable.from(new Promise(resolve => resolve('Hello!'))).subscribe(val => console.log(val));

const arr = Array.from([100, 200, 300], x => x + x);
Rx.Observable.from(arr).subscribe(val => console.log(val));

/*
1
2
3
200
400
600
Hello!
*/
