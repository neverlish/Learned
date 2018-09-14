// 07-2-4 인터페이스를 배열 타입으로 지정함 - 인터페이스 배열 타입을 추가해 배열 요소의 구조를 강제함

interface Person {
  name: string;
  city: string;
}

let person4: Person[] = [
  { name: 'a', city: 'seoul' },
  { name: 'b', city: 'daejeon' },
  { name: 'c', city: 'daegu' }
];

console.log(JSON.stringify(person4)); // [{"name":"a","city":"seoul"},{"name":"b","city":"daejeon"},{"name":"c","city":"daegu"}]
