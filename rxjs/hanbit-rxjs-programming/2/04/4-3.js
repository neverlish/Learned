const { interval } = require('rxjs');
const { filter, takeWhile } = require('rxjs/operators');

// takeWhile 연산자의 사용 예
interval(300).pipe(
  filter(x => x >= 7 || x % 2 === 0),
  takeWhile(x => x <= 10)
).subscribe(x => console.log(x));

/*
0
2
4
6
7
8
9
10
*/
