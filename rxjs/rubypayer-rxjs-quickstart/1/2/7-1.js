const { of } = require('rxjs');
const numbers$ = of([1, 2, 3, 4, 5, 6, 7, 8]);

// next, error, complete가 있는 객체를받음
numbers$.subscribe({
  next(v) {
    console.log(v);
  },
  error(e) {
    console.error(e);
  },
  complete() {
    console.log('complete');
  }
});
/*
[ 1, 2, 3, 4, 5, 6, 7, 8 ]
complete
*/

// next 함수만 받음
numbers$.subscribe(v => {
  console.log(v);
});
/*
[ 1, 2, 3, 4, 5, 6, 7, 8 ]
*/

// next, error 함수만 받음
numbers$.subscribe(v => {
  console.log(v);
}, e => {
  console.error(e);
});
/*
[ 1, 2, 3, 4, 5, 6, 7, 8 ]
*/

// next, error, complete 함수를 받음
numbers$.subscribe(v => {
  console.log(v);
}, e => {
  console.error(e);
}, () => {
  console.log('complete');
});
/*
[ 1, 2, 3, 4, 5, 6, 7, 8 ]
complete
*/
