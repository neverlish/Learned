// 생성 함수와 파이퍼블 연산자를 함께 사용

const { interval } = require('rxjs');
const { filter } = require('rxjs/operators');

let divisor = 2;
setInterval(function() {
  divisor = (divisor + 1) % 10;
}, 500);

interval(700).pipe(
  filter(function(value) {
    return value % divisor == 0;
  })
).subscribe((value) => console.log(value));

/*
0
6
8
13
14
20
24
27
28
30
32
...
*/
