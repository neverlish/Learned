const { interval, Subject } = require('rxjs');
const { take, tap, multicast, publish, refCount } = require('rxjs/operators');

// 커넥터블 옵저버블에 refCount 연산자 추가
// const testSource$ = interval(500).pipe(
//   take(5),
//   tap(x => console.log(`tap ${x}`)),
//   multicast(() => new Subject()),
//   refCount()
// );
/*
tap 0
a: 0
b: 0
tap 1
a: 1
b: 1
tap 2
a: 2
b: 2
tap 3
a: 3
b: 3
tap 4
a: 4
b: 4
timeout
tap 0
c: 0
tap 1
c: 1
tap 2
c: 2
tap 3
c: 3
tap 4
c: 4
*/

const testSource$ = interval(500).pipe(
  take(5),
  tap(x => console.log(`tap ${x}`)),
  publish(),
  refCount()
);
/*
tap 0
a: 0
b: 0
tap 1
a: 1
b: 1
tap 2
a: 2
b: 2
tap 3
a: 3
b: 3
tap 4
a: 4
b: 4
timeout
*/

const a = testSource$.subscribe(x => console.log(`a: ${x}`));
const b = testSource$.subscribe(x => console.log(`b: ${x}`));

setTimeout(() => {
  console.log('timeout');
  testSource$.subscribe(x => console.log(`c: ${x}`));
}, 3000);
