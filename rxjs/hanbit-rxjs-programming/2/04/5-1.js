const { interval } = require('rxjs');
const { skip, take } = require('rxjs/operators');

// take 연산자와 skip 연산자를 조합한 예
interval(300).pipe(
  skip(3),
  take(2)
).subscribe(x => console.log(x));

/*
3
4
*/
