// 11-2-1 제네릭 함수 선언 - 오버로드 함수를 이용한 타입 매개벼ㅐㄴ수 간의 연산

function concat5<T>(strs: T, strs2: T): T;
function concat5(strs: any, strs2: any) {
  return strs + strs2;
}

console.log(concat5<string>('abc', '123')); // abc123
