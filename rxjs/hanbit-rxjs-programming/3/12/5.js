const { interval, Subject } = require('rxjs');
const { take, tap, publish, refCount, share } = require('rxjs/operators');

// share 연산자와 publish, refCoount를 사용했을 때의 차이

// const testSource$ = interval(500).pipe(
//   take(5),
//   tap(x => console.log(`tap ${x}`)),
//   publish(),
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
*/

const testSource$ = interval(500).pipe(
  take(5),
  tap(x => console.log(`tap ${x}`)),
  share()
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

const a = testSource$.subscribe(x => console.log(`a: ${x}`));
const b = testSource$.subscribe(x => console.log(`b: ${x}`));

setTimeout(() => {
  console.log('timeout');
  testSource$.subscribe(x => console.log(`c: ${x}`));
}, 3000);

