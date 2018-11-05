// 생성 함수와 파이퍼블 연산자를 연결해 사용하기
const { range } = require('rxjs');
const { filter, map } = require('rxjs/operators');

range(1, 10).pipe(
  filter(function(value) {
    return value % divisor == 0;
  }),
  map(function (value) {
    return value + 1;
  })
);
