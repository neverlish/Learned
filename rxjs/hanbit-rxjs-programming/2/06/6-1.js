const { range } = require('rxjs');
const { startWith, scan } = require('rxjs/operators');

// 여러 개 인자를 사용하는 startWith 연산자 예
range(4, 3).pipe(
  startWith(1, 2, 3),
  scan((x, y) => x + y)
).subscribe(sum => console.log(`range(4, 3).startWith(1, 2, 3) sum: ${sum}`));

range(4, 3).pipe(
  scan((x, y) => x + y)
).subscribe(sum => console.log(`range(4, 3) sum: ${sum}`));
/*
range(4, 3).startWith(1, 2, 3) sum: 1
range(4, 3).startWith(1, 2, 3) sum: 3
range(4, 3).startWith(1, 2, 3) sum: 6
range(4, 3).startWith(1, 2, 3) sum: 10
range(4, 3).startWith(1, 2, 3) sum: 15
range(4, 3).startWith(1, 2, 3) sum: 21
range(4, 3) sum: 4
range(4, 3) sum: 9
range(4, 3) sum: 15
*/
