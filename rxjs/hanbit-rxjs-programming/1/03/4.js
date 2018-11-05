// 팩토리 함수로 프로미스를 리턴하는 defer 함수

const { defer } = require('rxjs');

const source1$ = defer(() => new Promise((resolve, reject) => {
  console.log('promise1 function begin');
  setTimeout(() => resolve('promise1 resolve'), 700);
  console.log('promise1 function end');
}));
console.log('source1$ created');

const source2$ = defer(() => new Promise((resolve, reject) => {
  console.log('promise2 function begin');
  setTimeout(() => reject(new Error('promise2 reject')), 1200);
  console.log('promise2 function end');
}));
console.log('source2$ created');
console.log('before source1$.subscribe()');

source1$.subscribe(
  x => console.log(`[1] next: ${x}`),
  err => console.error(`[1] error.mesage: ${err.message}`),
  () => console.log('[1] completed')
);
console.log('after source1$.subscribe()');
console.log('before source2$.subscribe()');

source2$.subscribe(
  x => console.log(`[2] next: ${x}`),
  err => console.error(`[2] error.mesage: ${err.message}`),
  () => console.log('[2] completed')
);

console.log('after source2$.subscribe()');

/*
source1$ created
source2$ created
before source1$.subscribe()
promise1 function begin
promise1 function end
after source1$.subscribe()
before source2$.subscribe()
promise2 function begin
promise2 function end
after source2$.subscribe()
[1] next: promise1 resolve
[1] completed
[2] error.mesage: promise2 reject
*/
