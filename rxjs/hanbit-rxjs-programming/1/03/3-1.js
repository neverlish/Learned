// 배열 각 요소의 값 발행

const { from } = require('rxjs');

from([1, 2, 3, 4]).subscribe(
  x => console.log(`next: ${x}`),
  null,
  () => console.log('completed')
);

/*
next: 1
next: 2
next: 3
next: 4
completed
*/

// 이터러블 값을 발행
function* forLoopGen(start, end, increment) {
  for (let x = start; x <= end; x += increment) {
    yield x;
  }
}

from(forLoopGen(1, 15, 2)).subscribe(
  x => console.log(`next: ${x}`),
  null,
  () => console.log('completed')
);

/*
next: 1
next: 3
next: 5
next: 7
next: 9
next: 11
next: 13
next: 15
completed
*/

// 문자열의 각 문자를 값으로 발행
from('Hello').subscribe(
  x => console.log(`next: ${x}`),
  null,
  () => console.log('completed')
);

/*
next: H
next: e
next: l
next: l
next: o
completed
*/

// from 함수로 프로미스의 값을 발행

from(new Promise((resolve, reject) => {
  console.log('promise1 function begin');
  setTimeout(() => resolve('promise1 resolve'), 700);
  console.log('promise1 function end');
})
).subscribe(
  x => console.log(`[1] next: ${x}`),
  err => console.error(`[1] error.message: ${err.message}`),
  () => console.log('[1] completed')
);

from(new Promise((resolve, reject) => {
  console.log('promise2 function begin');
  setTimeout(() => reject(new Error('promise2 reject')), 1200);
  console.log('promise2 function end');
})
).subscribe(
  x => console.log(`[2] next: ${x}`),
  err => console.error(`[2] error.message: ${err.message}`),
  () => console.log('[2] completed')
);

/*
promise1 function begin
promise1 function end
promise2 function begin
promise2 function end
[1] next: promise1 resolve
[1] completed
[2] error.message: promise2 reject
*/
