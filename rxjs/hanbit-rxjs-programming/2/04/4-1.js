const { interval } = require('rxjs');
const { take } = require('rxjs/operators');

// 1초마다 숫자를 5회만 반복해서 발행
interval(1000).pipe(take(5))
  .subscribe(x => console.log(`result: ${x}`));

/*
result: 0
result: 1
result: 2
result: 3
result: 4
*/
