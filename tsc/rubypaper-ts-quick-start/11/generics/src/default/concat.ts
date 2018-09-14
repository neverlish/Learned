// 11-1-1 any로 타입을 느슨하게 만들기 - 두 문자열을 합치는 concat 함수 선언 및 사용

function concat(strs: any, strs2: any): any {
  return strs + strs2;
}

console.log(concat(10, 100)); // 110
console.log(concat('abc', 1)); // abc1
console.log(concat('abc', true)); // abctrue
