const { interval } = require('rxjs');
const { take, startWith } = require('rxjs/operators');

// startWith 연산자의 사용 예
interval(1000).pipe(
  take(5),
  startWith('대기 중.. 구독됨.. Waiting... subscribed.')
).subscribe(value => console.log(value));
/*
대기 중.. 구독됨.. Waiting... subscribed.
0
1
2
3
4
*/
