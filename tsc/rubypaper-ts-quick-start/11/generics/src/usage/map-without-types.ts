// 11-4-3 맵 객체의 선언과 타입 지정 방법 - 맵 객체의 선언과 사용 방법 - 타입이 없는 맵 객체에 대한 키-값 객체를 추가하기

let myMap = new Map();
myMap.set(1, 'one');
myMap.set(2, 'two');

// 내장 이터레이터와 for of를 이용해 맵을 순회하기
for (let v of myMap) {
  console.log(v);
}
/*
[ 1, 'one' ]
[ 2, 'two' ]
*/

// 내장 이터레이터를 이용해 맵을 순회하기
let mapIter = myMap[Symbol.iterator]();
console.log(mapIter.next().value); // [ 1, 'one' ]
console.log(mapIter.next().value); // [ 2, 'two' ]
