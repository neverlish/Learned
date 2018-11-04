const { interval } = require('rxjs');
const { take } = require('rxjs/operators');

// await 키워드와 forEAch 연산자를 함께 사용
(async function (params) {
  await interval(500).pipe(take(3)).forEach(i => console.log(i));
  console.log('완료!');
})();
/*
0
1
2
완료!
*/
