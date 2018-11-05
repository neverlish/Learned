const { interval } = require('rxjs');
const { take, map, bufferCount } = require('rxjs/operators');

// 특정 수의 값을 정확하게 묶는 bufferCount 연산자
const message = '안녕하세요. RxJS 테스트 입니다';

interval(90).pipe(
  take(message.length),
  map(x => {
    const character = message.charAt(x);
    console.log(character);
    return character;
  }),
  bufferCount(5)
).subscribe(x => console.log(`buffer: [${x}]`));
/*
안
녕
하
세
요
buffer: [안,녕,하,세,요]
.

R
x
J
buffer: [., ,R,x,J]
S

테
스
트
buffer: [S, ,테,스,트]

입
니
다
buffer: [ ,입,니,다]
*/
