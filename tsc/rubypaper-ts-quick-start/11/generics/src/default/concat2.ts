// 11-1-1 any로 타입을 느슨하게 만들기 - 두 문자열을 합치는 concat2 함수

function concat2(strs: string, strs2: string): string {
  return strs + strs2;
}

console.log(concat2('abc', '1')); // abc1
console.log(concat2('abc', '123')); // abc123
