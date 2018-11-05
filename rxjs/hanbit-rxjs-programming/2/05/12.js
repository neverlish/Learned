const { interval } = require('rxjs');
const { take, map, windowCount, concatMap, filter, scan, last } = require('rxjs/operators');

// windowCount 연산자의 사용 예
const message = '안녕하세요. RxJS 테스트 입니다';
interval(90).pipe(
  take(message.length),
  map(x => {
    const character = message.charAt(x);
    console.log(character);
    return character;
  }),
  windowCount(5),
  concatMap(windowObservable => {
    console.log(`windowObservable 넘어옴`);
    return windowObservable.pipe(
      filter(x => x != ' '),
      take(3),
      scan((accString, current) => accString + current, ''),
      last()
    );
  })
).subscribe(string => console.log(`결과: ${string}`));
/*
windowObservable 넘어옴
안
녕
하
결과: 안녕하
세
요
windowObservable 넘어옴
.

R
x
결과: .Rx
J
windowObservable 넘어옴
S

테
스
결과: S테스
트
windowObservable 넘어옴

입
니
다
결과: 입니다
*/
