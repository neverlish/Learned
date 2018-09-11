// 12-2-2 RxJS 소개와 설치 - rxjs 테스트를 위한 hello rxjs

import * as Rx from '@reactivex/rxjs';
Rx.Observable.of('a', 'b', 'c').subscribe((v) => console.log(v));

/*
a
b
c
*/
