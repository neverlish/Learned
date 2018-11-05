const { of } = require('rxjs');

// of 함수로 값을 발행하는 옵저버블 생성
of(1, 2, 'a', 'b', 3, 4, ['array1', 'array2']).subscribe(
  x => console.log(`next ${x}`),
  err => console.error(err.message),
  () => console.log('completed')
);

/*
next 1
next 2
next a
next b
next 3
next 4
next array1,array2
completed
*/
