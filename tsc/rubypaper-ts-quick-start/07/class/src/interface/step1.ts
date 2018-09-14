// 07-2-3 클래스를 배열 요소 타입으로 지정함 - 배열 타입을 지정하지 않는 문제점 - 배열 타입의 선언 없이 객체 리터럴을 요소로 갖는 배열로 초기화하기

let person = [
  { name: 'a', city: 'seoul' },
  { name: 'b', city: 'daejeon' },
  { name: 'c', city: 'daegu' }
];

console.log(JSON.stringify(person)); // [{"name":"a","city":"seoul"},{"name":"b","city":"daejeon"},{"name":"c","city":"daegu"}]
