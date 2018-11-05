const { range } = require('rxjs');
const { first } = require('rxjs/operators');

// 조건이 없는 first 연산자 사용
range(1, 10).pipe(first())
  .subscribe(x => console.log(`result: ${x}`)); // result: 1

// 조건이 있는 first 연산자 사용
range(1, 10).pipe(first(x => x >= 3))
  .subscribe(x => console.log(`result: ${x}`)); // result: 3
