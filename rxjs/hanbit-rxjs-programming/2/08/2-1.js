const { range } = require('rxjs');
const { tap, finalize } = require('rxjs/operators');

// 에러가 발생했을 때 finalize 연산자 사용 예
range(1, 3).pipe(
  tap(x => x === 3 && x.test()),
  finalize(() => console.log('FINALLY CALLBACK'))
).subscribe(
  x => console.log(x),
  err => console.error(`ERROR: ${err}`)
);
/*
1
2
ERROR: TypeError: x.test is not a function
FINALLY CALLBACK
 jinhohyeon  ~/Desktop/
*/
