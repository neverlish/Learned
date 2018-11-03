const { range } = require('rxjs');
const { count } = require('rxjs/operators');

// predicate 함수를 사용해 짝수만 세기
range(1, 7).pipe(count(x => x % 2 === 0)).subscribe(x => console.log(x)); // 3
