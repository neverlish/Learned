const { interval, of } = require('rxjs');
const { take, mergeMap, tap, retry, catchError } = require('rxjs/operators');

// retry 연산자의 사용 예
interval(100).pipe(
  take(30),
  mergeMap(x => {
    return of(x).pipe(
      tap(value => {
        if (Math.random() <= 0.3) {
          throw new Error(`RANDOM ERROR ${value}`);
        }
      }),
      retry(10),
      catchError(err => of(err.message))
    );
  })
).subscribe(x => console.log(x), err => console.error(err));
/*
0
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
*/
