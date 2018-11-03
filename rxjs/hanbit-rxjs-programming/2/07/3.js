const { range, from } = require('rxjs');
const { min } = require('rxjs/operators');

// comparer 함수를 사용하지 않는 예
range(1, 10).pipe(min()).subscribe(x => console.log(x)); // 1

// comparer 함수를 사용하는 min 연산자 예
const movies = [
  { title: '영화 1', avg: 5.12 },
  { title: '영화 2', avg: 9.14 },
  { title: '영화 3', avg: 8.28 }
];
from(movies).pipe(min((x, y) => x.avg - y.avg))
  .subscribe(x => console.log(JSON.stringify(x))); // {"title":"영화 1","avg":5.12}

// 같은 값으로 평가하는 다른 객체를 min 연산자로 처리
const movies2 = [
  { title: '영화 1', avg: 5.12 },
  { title: '영화 2', avg: 9.14 },
  { title: '영화 3', avg: 5.12 }
];
from(movies2).pipe(min((x, y) => x.avg - y.avg))
  .subscribe(x => console.log(JSON.stringify(x))); // {"title":"영화 3","avg":5.12}
