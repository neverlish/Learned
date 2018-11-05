const { timer, interval, range } = require('rxjs');
const { map, take, concatMap, startWith, tap, skip } = require('rxjs/operators');

// concatMap 연산자로 값 발행 순서를 보장
const requests = [
  timer(2000).pipe(map(value => 'req1')),
  timer(1000).pipe(map(value => 'req2')),
  timer(1500).pipe(map(value => 'req3'))
];

// interval(1000).pipe(take(5))
//   .subscribe(x => console.log(`${x + 1} secs`));

// range(0, 3).pipe(concatMap(x => requests[x]))
//   .subscribe(req => console.log(`response from ${req}`));
/*
1 secs
response from req1
2 secs
response from req2
3 secs
4 secs
response from req3
5 secs
*/

// 비동기 처리의 코드 동작 순서
const FIRST_VALUE = -1;
const requests2 = [
  timer(2000).pipe(
    startWith(FIRST_VALUE),
    tap(x => x === FIRST_VALUE && console.log('req1 subscribed')),
    skip(1),
    map(value => 'req1')
  ),
  timer(1000).pipe(
    startWith(FIRST_VALUE),
    tap(x => x === FIRST_VALUE && console.log('req2 subscribed')),
    skip(1),
    map(value => 'req2')
  ),
  timer(1500).pipe(
    startWith(FIRST_VALUE),
    tap(x => x === FIRST_VALUE && console.log('req3 subscribed')),
    skip(1),
    map(value => 'req3')
  )
];

interval(1000).pipe(take(5))
  .subscribe(x => console.log(`${x + 1} secs`));

range(0, 3).pipe(
  tap(x => console.log(`range next ${x}`)),
  concatMap(x =>
    console.log(`begin concatMap project function ${x}`) || requests2[x]
  )
).subscribe(req => console.log(`response from ${req}`));
/*
range next 0
begin concatMap project function 0
req1 subscribed
range next 1
range next 2
1 secs
response from req1
begin concatMap project function 1
req2 subscribed
2 secs
response from req2
begin concatMap project function 2
req3 subscribed
3 secs
4 secs
response from req3
5 secs
*/
