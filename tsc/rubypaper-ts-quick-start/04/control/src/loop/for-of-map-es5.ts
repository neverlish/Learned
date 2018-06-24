// 04-2-1 for 문과 이터러블 객체 - 맵과 셋을 for of 문에 적용 - target 속성값이 es5일때 사용할 맵의 구현

let map: { [key: string]: number; } = {};
map["one"] = 1;
map["one"] = 2;
map["one"] = 3;

for (let entry in map) {
  console.log(entry);
}

console.log(map["one"]);

/*
one
3
*/
