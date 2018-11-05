const { range } = require('rxjs');
const { last } = require('rxjs/operators');

// 조건이 없는 last 연산자 사용
range(1, 10).pipe(last())
  .subscribe(x => console.log(`result: ${x}`)); // result: 10

// 조건이 있는 last 연산자 사용
range(1, 10).pipe(last(x => x <= 3))
  .subscribe(x => console.log(`result: ${x}`)); // result: 3
