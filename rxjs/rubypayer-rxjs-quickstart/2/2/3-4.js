const { from } = require('rxjs');

// 배열, 배열 같은 객체
from([10, 20, 30])
  .subscribe({
    next: console.log,
    error: console.error,
    complete: () => console.log('완료')
  });

/*
10
20
30
완료
*/

const arguments$ = (function() {
  return from(arguments);
})(1, 2, 3)
.subscribe({
  next: console.log,
  error: console.error,
  complete: () => console.log('완료')
});

/*
1
2
3
완료
*/

// Iterable 객체
const map$ = from(new Map([[1, 2], [2, 4], [4, 8]]));
map$.subscribe({
  next: console.log,
  error: console.error,
  complete: () => console.log('완료')
});

/*
[ 1, 2 ]
[ 2, 4 ]
[ 4, 8 ]
완료
*/

// Promise
const success$ = from(Promise.resolve(100));
success$.subscribe({
  next: v => console.log(v),
  error: e => console.error(e),
  complete: () => console.log('완료')
});

/*
완료
100
*/

const fail$ = from(Promise.reject('에러'));
fail$.subscribe({
  next: v => console.log(v),
  error: e => console.error(e),
  complete: () => console.log('완료')  
});

/*
완료
에러
*/
