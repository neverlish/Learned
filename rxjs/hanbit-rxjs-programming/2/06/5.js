const { of, zip } = require('rxjs');
const fruits$ = of('오렌지', '바나나', '키위');

const numbers$ = of(5, 3, 2, 10, 11);
zip(fruits$, numbers$, (fruit, number) => `${fruit} ${number}개`)
  .subscribe(combination => console.log(`${combination} 착즙`));
/*
오렌지 5개 착즙
바나나 3개 착즙
키위 2개 착즙
*/
