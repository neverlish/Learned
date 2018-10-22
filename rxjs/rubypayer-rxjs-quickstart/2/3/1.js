const { interval } = require('rxjs');
const numbers$ = interval(1000);

// Observabl에서 데이터가 전달되지 않는다.
// subscribe에서 호출되는 순간부터 데이터가 전달된다.
numbers$.subscribe(value => console.log(`첫번째 ${value}`));
setTimeout(() => {
  numbers$.subscribe(value => console.log(`두번째 ${value}`));
}, 2000);
/*
첫번째 0
첫번째 1
두번째 0
첫번째 2
두번째 1
첫번째 3
두번째 2
첫번째 4
두번째 3
첫번째 5
...
*/
