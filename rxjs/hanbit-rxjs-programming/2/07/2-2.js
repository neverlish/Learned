const { from } = require('rxjs');
const { max } = require('rxjs/operators');

// 같은 값으로 평가하는 다른 객체 처리
const movies = [
  { title: '영화 1', avg: 5.12 },
  { title: '영화 2', avg: 9.14 },
  { title: '영화 3', avg: 9.14 }
];
from(movies).pipe(max((x, y) => x.avg - y.avg))
  .subscribe(x => console.log(JSON.stringify(x))); // {"title":"영화 3","avg":9.14}
