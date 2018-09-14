// 11-2-2 타입 매개변수의 확장 - 유니언 타입을 이용해 여러 타입을 허용하기 - 유니언 타입을 이용해 제네릭 타입 설정

function concat6<T extends string | number>(strs: T, strs2: T): T;
function concat6(strs: any, strs2: any) {
  return strs + strs2;
}

console.log(concat6<string | number>('abc', 123)); // abc123
