const { timer } = require('rxjs');

// 첫 번째 인자만 설정한 timer 함수 예
timer(1000).subscribe(
  x => console.log(`timer(1000) next: ${x}`),
  err => console.error(`error.message: ${err.message}`),
  () => console.log('completed')
);
/*
timer(1000) next: 0
completed
*/

// 두 번째 인자까지 설정한 timer 함수 예
timer(1000, 500).subscribe(
  x => console.log(`timer(1000, 500) next: ${x}`),
  err => console.error(`error.message: ${err.message}`),
  () => console.log('completed')
);
/*
timer(1000, 500) next: 0
timer(1000, 500) next: 1
timer(1000, 500) next: 2
timer(1000, 500) next: 3
timer(1000, 500) next: 4
timer(1000, 500) next: 5
timer(1000, 500) next: 6
timer(1000, 500) next: 7
...
*/
