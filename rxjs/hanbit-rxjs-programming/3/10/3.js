const { interval, of } = require('rxjs');
const { take, mergeMap, tap, retryWhen, scan, catchError } = require('rxjs/operators');

// retryWhen 연산자의 사용 예
interval(100).pipe(
  take(30),
  mergeMap(x => {
    return of(x).pipe(
      tap(value => {
        if (Math.random() <= 0.3) {
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
retryCount: 1, error message: RANDOM ERROR 1
1
retryCount: 1, error message: RANDOM ERROR 2
2
3
4
5
6
7
8
retryCount: 1, error message: RANDOM ERROR 9
9
10
11
retryCount: 1, error message: RANDOM ERROR 12
12
13
14
15
16
17
18
retryCount: 1, error message: RANDOM ERROR 19
19
retryCount: 1, error message: RANDOM ERROR 20
retryCount: 2, error message: RANDOM ERROR 20
20
21
retryCount: 1, error message: RANDOM ERROR 22
retryCount: 2, error message: RANDOM ERROR 22
22
retryCount: 1, error message: RANDOM ERROR 23
23
24
25
retryCount: 1, error message: RANDOM ERROR 26
26
27
28
29
*/
