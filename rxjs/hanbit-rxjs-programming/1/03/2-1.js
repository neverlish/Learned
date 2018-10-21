const { of, asapScheduler } = require('rxjs');

console.log('BEFORE call subscribe()');

// of 함수를 이용하는 비동기 스케줄러
of(1, 2, 'a', 'b', 3, 4, ['array1', 'array2'], asapScheduler).subscribe(
  x => console.log(`next ${x}`),
  err => console.error(err.message),
  () => console.log('completed')
);

console.log('AFTER call subscribe()');

/*
BEFORE call subscribe()
AFTER call subscribe()
next 1
next 2
next a
next b
next 3
next 4
next array1,array2
completed
*/
