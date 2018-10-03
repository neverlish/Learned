const { Map, fromJS } = Immutable;

// 14 리덕스, 더 편하게 사용 - 1 Immutable.js 익히기 - 2 Map

// const data = Map({
//   a: 1,
//   b: 2,
//   c: Map({
//     d: 3,
//     e: 4,
//     f: 5
//   })
// });

const data = fromJS({
  a: 1,
  b: 2,
  c: {
    d: 3,
    e: 4,
    f: 5
  }
});

// 자바스크립트 객체로 변환
console.log(data.toJS())

// 특정 키의 값 불러오기
console.log(data.get('a'));

// 깊숙이 위치하는 값 불러오기
console.log(data.getIn(['c', 'd']));

// 값 설정
const newData = data.set('a', 4);

console.log(newData === data); // false

// 깊숙이 위치하는 값 수정
const newData2 = data.setIn(['c', 'd'], 10);

// 여러 값 동시에 설정
const newData3 = data.mergeIn(['c'], { d: 10, e: 10 });

const newData4 = data.setIn(['c', 'd'], 10)
                     .setIn(['c', 'e'], 10);

const newData5 = data.merge({ a: 10, b: 10 });
