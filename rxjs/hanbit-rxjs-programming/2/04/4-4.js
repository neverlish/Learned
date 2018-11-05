const { interval } = require('rxjs');
const { filter, takeWhile, takeLast } = require('rxjs/operators');

// takeLast 연산자로 4개 값을 발행
interval(300).pipe(
  filter(x => x >= 7 || x % 2 === 0),
  takeWhile(x => x <= 10),
  takeLast(4)
).subscribe(x => console.log(x));

/*
7
8
9
10
*/
