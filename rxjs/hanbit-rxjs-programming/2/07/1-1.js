const { of, range } = require('rxjs');
const { reduce } = require('rxjs/operators');

// 초깃값 없이 reduce 연산자를 사용하는 예
of(0).pipe(reduce((acc, curr) => acc + curr)).subscribe(x => console.log(x)); // 0

// reduce 연산자와 range 함수로 4개 값을 발행하는 예
range(1, 4).pipe(reduce((acc, curr) => acc + curr)).subscribe(x => console.log(x)); // 10
