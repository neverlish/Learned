const { range } = require('rxjs');
const { map, tap } = require('rxjs/operators');

// error 콜백 함수를 사용하는 예
range(1, 8).pipe(
  map(x => x === 8 ? x.test() : x + 1),
  tap(
    x => console.log(`tap next: ${x}`), 
    err => console.error(`tap ERROR: ${err}`)
  )
).subscribe(
  x => console.log(`result ${x}`),
  err => console.error(`subscribe ERROR: ${err}`)
);
/*
tap next: 2
result 2
tap next: 3
result 3
tap next: 4
result 4
tap next: 5
result 5
tap next: 6
result 6
tap next: 7
result 7
tap next: 8
result 8
tap ERROR: TypeError: x.test is not a function
subscribe ERROR: TypeError: x.test is not a function
*/
