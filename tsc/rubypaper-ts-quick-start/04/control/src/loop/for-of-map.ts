// 04-2-1 for 문과 이터러블 객체 - 맵과 셋을 for of 문에 적용 - target 속성값을 es2015으로 설정해야 컴파일 가능한 맵

let itMap = new Map([["one", 1], ["one", 2]]);
itMap.set("one", 3);

for (let entry of itMap) {
  console.log(entry);
}

console.log(itMap.get("one"));

/*
[ 'one', 3 ]
3
*/
