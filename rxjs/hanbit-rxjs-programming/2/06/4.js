const { timer, combineLatest } = require('rxjs');
const { take } = require('rxjs/operators');

// combineLatest 연산자의 사용 예
const req1$ = timer(0, 400).pipe(take(6));
const req2$ = timer(0, 300).pipe(take(10));
const req3$ = timer(0, 500).pipe(take(7));

combineLatest(req1$, req2$, req3$).subscribe(result => console.log(result));
/*
[ 0, 0, 0 ]
[ 0, 1, 0 ]
[ 1, 1, 0 ]
[ 1, 1, 1 ]
[ 1, 2, 1 ]
[ 2, 2, 1 ]
[ 2, 3, 1 ]
[ 2, 3, 2 ]
[ 3, 3, 2 ]
[ 3, 4, 2 ]
[ 3, 5, 2 ]
[ 3, 5, 3 ]
[ 4, 5, 3 ]
[ 4, 6, 3 ]
[ 5, 6, 3 ]
[ 5, 6, 4 ]
[ 5, 7, 4 ]
[ 5, 8, 4 ]
[ 5, 8, 5 ]
[ 5, 9, 5 ]
[ 5, 9, 6 ]
*/

// project 함수를 인자로 사용한 예
combineLatest(req1$, req2$, req3$, (a, b, c) => `${a}, ${b}, ${c}`).subscribe(result => console.log(result));
/*
0, 0, 0
0, 1, 0
1, 1, 0
1, 1, 1
1, 2, 1
2, 2, 1
2, 3, 1
2, 3, 2
3, 3, 2
3, 4, 2
3, 4, 3
3, 5, 3
4, 5, 3
4, 6, 3
4, 6, 4
5, 6, 4
5, 7, 4
5, 8, 4
5, 8, 5
5, 9, 5
5, 9, 6
*/
