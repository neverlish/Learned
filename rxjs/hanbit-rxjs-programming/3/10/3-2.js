const { interval, of, throwError } = require('rxjs');
const { take, mergeMap, tap, retryWhen, scan, catchError } = require('rxjs/operators');

// 마지막 재시도 후 에러  처리
const n = 2;
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
          scan((acc, error) => {
            return {
              count: acc.count + 1,
              error
            }
          }, { count: 0 }),
          mergeMap(errorInfo => {
            if (errorInfo.count === n + 1) {
              return throwError(errorInfo.error);
            }
            return of(errorInfo);
          }),
          tap(errorInfo => console.error(`retryCount: ${errorInfo.count}, error message: ${errorInfo.error.message}`))
        );
      }),
      catchError(err => of(err.message))
    );
  })
).subscribe(x => console.log(x), err => console.error(err));
/*
retryCount: 1, error message: RANDOM ERROR 0
retryCount: 2, error message: RANDOM ERROR 0
0
1
retryCount: 1, error message: RANDOM ERROR 2
2
retryCount: 1, error message: RANDOM ERROR 3
retryCount: 2, error message: RANDOM ERROR 3
RANDOM ERROR 3
4
retryCount: 1, error message: RANDOM ERROR 5
retryCount: 2, error message: RANDOM ERROR 5
5
retryCount: 1, error message: RANDOM ERROR 6
retryCount: 2, error message: RANDOM ERROR 6
6
7
8
retryCount: 1, error message: RANDOM ERROR 9
9
retryCount: 1, error message: RANDOM ERROR 10
10
11
12
13
14
retryCount: 1, error message: RANDOM ERROR 15
retryCount: 2, error message: RANDOM ERROR 15
RANDOM ERROR 15
16
17
18
retryCount: 1, error message: RANDOM ERROR 19
19
retryCount: 1, error message: RANDOM ERROR 20
20
21
retryCount: 1, error message: RANDOM ERROR 22
retryCount: 2, error message: RANDOM ERROR 22
RANDOM ERROR 22
23
24
retryCount: 1, error message: RANDOM ERROR 25
25
retryCount: 1, error message: RANDOM ERROR 26
26
retryCount: 1, error message: RANDOM ERROR 27
27
28
29
*/
