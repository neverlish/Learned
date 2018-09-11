// 11-4-3 맵 객체의 선언과 타입 지정 방법 - 맵 객체 사용 시 타입을 지정하기 - 키-값에 대해 타입을 지정한 맵 객체

let list: Map<number, string> = new Map<number, string>();
list.set(1, 'one');
list.set(2, 'two');
list.set(3, 'three');

console.log(list); // Map { 1 => 'one', 2 => 'two', 3 => 'three' }

if (list.delete(2)) {
  console.log(list); // Map { 1 => 'one', 3 => 'three' }
}

list.clear();
console.log(list); // Map {}
