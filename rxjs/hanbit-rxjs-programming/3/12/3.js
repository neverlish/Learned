const { interval, Subject } = require('rxjs');
const { multicast, take, tap, publish } = require('rxjs/operators');

// 서브젝트 객체를 재구독할 때 발생할 수 있는 문제
const testSource$ = interval(500).pipe(
  take(5),
  tap(x => console.log(`tap ${x}`)),
  multicast(() => new Subject())
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
// const testSource$ = interval(500).pipe(
//   take(5),
//   tap(x => console.log(`tap ${x}`)),
//   // multicast(() => new Subject())
//   publish()
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
tap 1
tap 2
tap 3
tap 4
*/

const a = testSource$.subscribe(x => console.log(`a: ${x}`));
const b = testSource$.subscribe(x => console.log(`b: ${x}`));

testSource$.connect();

setTimeout(() => {
  console.log('timeout');
  a.unsubscribe();
  b.unsubscribe();
  testSource$.subscribe(x => console.log(`c: ${x}`));
  testSource$.connect();
}, 3000);
