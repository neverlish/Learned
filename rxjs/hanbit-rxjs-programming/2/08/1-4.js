const { concat, range } = require('rxjs');
const { tap } = require('rxjs/operators');

// 옵저버 객체를 사용하는 tap 연산자
const observer1 = {
  next: x => console.log(`tap next: ${x} STREAM 1`),
  error: err => console.error(`tap ERROR: ${err} STREAM 1`),
  complete: () => console.log('complete STREAM 1')
};
const observer2 = {
  next: x => console.log(`  tap next: ${x} STREAM 2`),
  error: err => console.error(`  tap ERROR: ${err} STREAM 2`),
  complete: () => console.log('  complete STREAM 2')
};

concat(
  range(1, 4).pipe(tap(observer1)),
  range(5, 3).pipe(tap(observer2)),
).subscribe(
  x => console.log(`    result ${x}`),
  err => console.error(`    subscribe ERROR: ${err}`),
  () => console.log('    subscribe complete')
);
/*
tap next: 1 STREAM 1
    result 1
tap next: 2 STREAM 1
    result 2
tap next: 3 STREAM 1
    result 3
tap next: 4 STREAM 1
    result 4
complete STREAM 1
  tap next: 5 STREAM 2
    result 5
  tap next: 6 STREAM 2
    result 6
  tap next: 7 STREAM 2
    result 7
  complete STREAM 2
    subscribe complete
*/
