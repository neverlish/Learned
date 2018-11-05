const { from, of } = require('rxjs');
const { mergeMap, tap, catchError } = require('rxjs/operators');

// mergeMap 연산자 안에서 catchError 연산자 사용

from(['1', '2', '3', 'r', '5', '6', 'u', '8']).pipe(mergeMap(x => {
  return of(x).pipe(
    tap(value => {
      if (!Number.isInteger(parseInt(value, 10))) {
        throw new TypeError(`${value}은(는) 정수가 아닙니다`);
      }
    }),
    catchError(err => of(err.message))
  );
})).subscribe(x => console.log(x), err => console.error(err));
/*
1
2
3
r은(는) 정수가 아닙니다
5
6
u은(는) 정수가 아닙니다
8
*/
