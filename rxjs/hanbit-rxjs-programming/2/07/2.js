const { range } = require('rxjs');
const { max } = require('rxjs/operators');

// comparer 함수를 사용하지 않는 예
range(1, 10).pipe(max()).subscribe(x => console.log(x)); // 10
