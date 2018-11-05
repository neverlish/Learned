const { concat, range } = require('rxjs');
const { tap } = require('rxjs/operators');

// concat 연산자를 기준으로 앞과 뒤에서 값 발행
concat(
  range(1, 4).pipe(
    tap(
      x => console.log(`tap next: ${x} STREAM 1`),
      err => console.error(`tap ERROR: ${err} STREAM 1`),
      () => console.log('complete STREAM 1')
    )
  ),
  range(5, 3).pipe(
    tap(
      x => console.log(`  tap next: ${x} STREAM 2`),
      err => console.error(`  tap ERROR: ${err} STREAM 2`),
      () => console.log('  complete STREAM 2')
    )
  )
).subscribe(
  x => console.log(`    result ${x}`),
  err => console.error(`    subscribe ERROR: ${err}`),
  () => console.log('    subscribe complete')
)
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
