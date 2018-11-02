const { from } = require('rxjs');
const { filter, map, bufferCount } = require('rxjs/operators');

// 찾으려는 단어 수만큼 묶고 한 칸씩 시프트 이동
const message = '간장공장공장장은강공장장이고공공장공장장은장공장장이다';
const targetWord = '공장장';

from(message).pipe(
  bufferCount(targetWord.length, 1),
  filter(buffer => buffer.length === targetWord.length),
  map(buffer => {
    const bufferedWord = buffer.join('');
    console.log(`buffer: ${bufferedWord}`);
    return bufferedWord;
  }),
  filter(word => word === targetWord)
).subscribe(word => console.log(`${word} 발견!`));
/*
buffer: 간장공
buffer: 장공장
buffer: 공장공
buffer: 장공장
buffer: 공장장
공장장 발견!
buffer: 장장은
buffer: 장은강
buffer: 은강공
buffer: 강공장
buffer: 공장장
공장장 발견!
buffer: 장장이
buffer: 장이고
buffer: 이고공
buffer: 고공공
buffer: 공공장
buffer: 공장공
buffer: 장공장
buffer: 공장장
공장장 발견!
buffer: 장장은
buffer: 장은장
buffer: 은장공
buffer: 장공장
buffer: 공장장
공장장 발견!
buffer: 장장이
buffer: 장이다
*/
