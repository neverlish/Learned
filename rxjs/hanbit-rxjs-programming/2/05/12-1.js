const { interval } = require('rxjs');
const { take, map, windowCount, mergeMap, defaultIfEmpty, filter, scan, last } = require('rxjs/operators');

// windowCount 연산자에 startWindowEvery 파라미터를 사용한 예
const message = '간장공장공장장은강공장장이고공공장공장장은장공장장이다';
const targetWord = '공장장';

interval(10).pipe(
  take(message.length),
  map(charIndex => {
    const character = message.charAt(charIndex);
    console.log(character);
    return character;
  }),
  windowCount(targetWord.length, 1),
  mergeMap(windowObservable => {
    console.log(`windowObservable 넘어옴`);
    return windowObservable.pipe(
      defaultIfEmpty({ empty: true }),
      scan(
        (accString, current) =>
          current.empty ? current : accString + current, ''
      ),
      last()
    );
  }),
  filter(word => {
    if (typeof word === 'string') {
      console.log(`현재단어: ${word}`);
      return word === targetWord;
    }
    return false;
  })
).subscribe(word => console.log(`${word} 발견!`));
/*
windowObservable 넘어옴
간
windowObservable 넘어옴
장
windowObservable 넘어옴
공
현재단어: 간장공
windowObservable 넘어옴
장
현재단어: 장공장
windowObservable 넘어옴
공
현재단어: 공장공
windowObservable 넘어옴
장
현재단어: 장공장
windowObservable 넘어옴
장
현재단어: 공장장
공장장 발견!
windowObservable 넘어옴
은
현재단어: 장장은
windowObservable 넘어옴
강
현재단어: 장은강
windowObservable 넘어옴
공
현재단어: 은강공
windowObservable 넘어옴
장
현재단어: 강공장
windowObservable 넘어옴
장
현재단어: 공장장
공장장 발견!
windowObservable 넘어옴
이
현재단어: 장장이
windowObservable 넘어옴
고
현재단어: 장이고
windowObservable 넘어옴
공
현재단어: 이고공
windowObservable 넘어옴
공
현재단어: 고공공
windowObservable 넘어옴
장
현재단어: 공공장
windowObservable 넘어옴
공
현재단어: 공장공
windowObservable 넘어옴
장
현재단어: 장공장
windowObservable 넘어옴
장
현재단어: 공장장
공장장 발견!
windowObservable 넘어옴
은
현재단어: 장장은
windowObservable 넘어옴
장
현재단어: 장은장
windowObservable 넘어옴
공
현재단어: 은장공
windowObservable 넘어옴
장
현재단어: 장공장
windowObservable 넘어옴
장
현재단어: 공장장
공장장 발견!
windowObservable 넘어옴
이
현재단어: 장장이
windowObservable 넘어옴
다
현재단어: 장이다
windowObservable 넘어옴
현재단어: 이다
현재단어: 다
*/
