// 11-4-1 룩업 타입을 제네릭 클래스에 적용 - keyof를 이용해 타입 매개변수를 제약함

function getValue<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

let numberKeys = { one: 1, two: 2, three: 3 };
console.log(getValue(numberKeys, 'one')); // 1
// console.log(getValue(numberKeys, 'happy'));
