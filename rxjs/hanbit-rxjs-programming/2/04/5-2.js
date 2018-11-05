const { interval } = require('rxjs');
const { skipUntil, take } = require('rxjs/operators');

// skipUntil 연산자로 인자의 옵저버블 값만 발행
const sourceIntervalTime = 300;
interval(sourceIntervalTime).pipe(
  skipUntil(interval(sourceIntervalTime * 5)),
  take(3)
).subscribe(x => console.log(x));

/*
4
5
6
*/
