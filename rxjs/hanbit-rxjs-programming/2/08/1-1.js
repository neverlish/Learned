const { range } = require('rxjs');
const { tap, filter, map } = require('rxjs/operators');

// next 함수에서 발행하는 값만 부수 효과로 처리
range(1, 10).pipe(
  tap(x => console.log(`Stream 1 (range 1, 10) ${x}`)),
  filter(x => x % 2 === 0),
  tap(x => console.log(` Stream 2 (filter x % 2 === 0) ${x}`)),
  map(x => x + 1),
  tap(x => console.log(`  Stream 3 (map x+1) ${x}`))
).subscribe(x => console.log(`    result: ${x}`));
/*
Stream 1 (range 1, 10) 1
Stream 1 (range 1, 10) 2
 Stream 2 (filter x % 2 === 0) 2
  Stream 3 (map x+1) 3
    result: 3
Stream 1 (range 1, 10) 3
Stream 1 (range 1, 10) 4
 Stream 2 (filter x % 2 === 0) 4
  Stream 3 (map x+1) 5
    result: 5
Stream 1 (range 1, 10) 5
Stream 1 (range 1, 10) 6
 Stream 2 (filter x % 2 === 0) 6
  Stream 3 (map x+1) 7
    result: 7
Stream 1 (range 1, 10) 7
Stream 1 (range 1, 10) 8
 Stream 2 (filter x % 2 === 0) 8
  Stream 3 (map x+1) 9
    result: 9
Stream 1 (range 1, 10) 9
Stream 1 (range 1, 10) 10
 Stream 2 (filter x % 2 === 0) 10
  Stream 3 (map x+1) 11
    result: 11
*/
