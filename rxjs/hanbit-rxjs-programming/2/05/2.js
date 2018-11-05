// pluck 연산자 사용 예
const { range } = require('rxjs');
const { map, pluck } = require('rxjs/operators');

const source$ = range(0, 5).pipe(map(x => ({ x, isEven: x % 2 === 0 })));
source$.pipe(pluck('isEven')).subscribe(isEven =>
  console.log(`${isEven ? '짝수' : '홀수'} 입니다.`)
);
/*
짝수 입니다.
홀수 입니다.
짝수 입니다.
홀수 입니다.
짝수 입니다.
*/

source$.pipe(pluck('x')).subscribe(x => console.log(`${x} 입니다.`));
/*
0 입니다.
1 입니다.
2 입니다.
3 입니다.
4 입니다.
*/

// 중첩 속성이 있는 객체에 pluck 연산자 사용
const source2$ = range(0, 5).pipe(map(x => 
  ({ x, numberProperty: {
    isEven: x % 2 === 0,
  }})));

source2$.pipe(pluck('numberProperty', 'isEven'))
  .subscribe(isEven => console.log(`${isEven ? '짝수' : '홀수'} 입니다.`));

/*
짝수 입니다.
홀수 입니다.
짝수 입니다.
홀수 입니다.
짝수 입니다.
*/
