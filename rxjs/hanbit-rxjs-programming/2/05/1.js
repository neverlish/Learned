const { from, range } = require('rxjs');
const { map } = require('rxjs/operators');

// 옵저버블을 사용한 map 연산자
const source$ = from([1, 2, 3, 4, 5]);
const resultSource$ = source$.pipe(
  map(x => x + 1),
  map(x => x * 2)
);

resultSource$.subscribe(x => console.log(x));
/*
4
6
8
10
12
*/

// 배열을 사용한 map 연산자
const sourceArray = [1, 2, 3, 4, 5];
const resultArray = sourceArray.map(x => x + 1).map(x => x * 2);

for (let i = 0; i < resultArray.length; i++) {
  console.log(resultArray[i]);
}
/*
4
6
8
10
12
*/

// 배열 요소 각각을 바로 출력하기
const func1 = x => x + 1;
const func2 = x => x * 2;

for (let i = 0; i < sourceArray.length; i++) {
  console.log(func2(func1(sourceArray[i])));
}
/*
4
6
8
10
12
*/

const source2$ = range(0, 5).pipe(map(x => ({ x, isEven: x % 2 === 0 })));
source2$.subscribe(result => 
  console.log(`${result.x}은(는) ${result.isEven ? '짝수' : '홀수'}입니다.`)
);
/*
0은(는) 짝수입니다.
1은(는) 홀수입니다.
2은(는) 짝수입니다.
3은(는) 홀수입니다.
4은(는) 짝수입니다.
*/
