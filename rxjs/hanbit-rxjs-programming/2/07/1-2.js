const { of, range } = require('rxjs');
const { reduce } = require('rxjs/operators');

// 초깃값이 있는 reduce 연산자를 사용하는 예
of(0).pipe(reduce((acc, curr) => acc + curr, 1)).subscribe(x => console.log(x)); // 1

// 초깃값 1을 설정해 여러 개 값을 발행하는 예
range(1, 4).pipe(reduce((acc, curr) => acc + curr, 1)).subscribe(x => console.log(x)); // 11
