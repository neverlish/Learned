const { interval, of } = require('rxjs');
const { take, mergeMap, tap, retryWhen, scan, catchError } = require('rxjs/operators');

// 재시도 후 에러 없이 complete 함수 호출
interval(100).pipe(
  take(30),
  mergeMap(x => {
    return of(x).pipe(
      tap(value => {
        if (Math.random() <= 0.5) {
          throw new Error(`RANDOM ERROR ${value}`);
        }
      }),
      retryWhen(errors => {
        return errors.pipe(
          take(2),
          scan((acc, error) => {
            return {
              count: acc.count + 1,
              error
            }
          }, { count: 0 }),
          tap(errorInfo => console.error(`retryCount: ${errorInfo.count}, error message: ${errorInfo.error.message}`))
        );
      }),
      catchError(err => of(err.message))
    );
  })
).subscribe(x => console.log(x), err => console.error(err));
/*
retryCount: 1, error message: RANDOM ERROR 0
0
1
2
retryCount: 1, error message: RANDOM ERROR 3
retryCount: 2, error message: RANDOM ERROR 3
3
retryCount: 1, error message: RANDOM ERROR 4
4
5
retryCount: 1, error message: RANDOM ERROR 6
retryCount: 2, error message: RANDOM ERROR 6
7
retryCount: 1, error message: RANDOM ERROR 8
retryCount: 2, error message: RANDOM ERROR 8
retryCount: 1, error message: RANDOM ERROR 9
9
retryCount: 1, error message: RANDOM ERROR 10
10
retryCount: 1, error message: RANDOM ERROR 11
retryCount: 2, error message: RANDOM ERROR 11
retryCount: 1, error message: RANDOM ERROR 12
12
retryCount: 1, error message: RANDOM ERROR 13
13
14
15
16
retryCount: 1, error message: RANDOM ERROR 17
17
18
19
20
retryCount: 1, error message: RANDOM ERROR 21
retryCount: 2, error message: RANDOM ERROR 21
retryCount: 1, error message: RANDOM ERROR 22
22
23
24
25
retryCount: 1, error message: RANDOM ERROR 26
26
27
28
29
*/
