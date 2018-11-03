const { range } = require('rxjs');
const { filter, toArray } = require('rxjs/operators');

// toArray 연산자의 사용 예
range(1, 30).pipe(
  filter(x => x % 2 === 0),
  toArray()
).subscribe(
  value => console.log(`배열여부: ${Array.isArray(value)}, 값: ${value}`)
); // 배열여부: true, 값: 2,4,6,8,10,12,14,16,18,20,22,24,26,28,30
