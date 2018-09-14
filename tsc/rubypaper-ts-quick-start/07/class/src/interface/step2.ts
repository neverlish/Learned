// 07-2-3 클래스를 배열 요소 타입으로 지정함 - 배열 요소 타입을 객체 리터럴 타입으로 사용하기 - 동일 형태인 객체 리터럴로 초기화

let person2: { name: string, city: string }[];

person2 = [
  { name: 'a', city: 'seoul' },
  { name: 'b', city: 'daejeon' },
  { name: 'c', city: 'daegu' }
];

console.log(JSON.stringify(person2)); // [{"name":"a","city":"seoul"},{"name":"b","city":"daejeon"},{"name":"c","city":"daegu"}]
