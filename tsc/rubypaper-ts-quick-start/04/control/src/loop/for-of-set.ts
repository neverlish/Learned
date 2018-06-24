// 04-2-1 for 문과 이터러블 객체 - 맵과 셋을 for of 문에 적용 - 셋의 선언과 순회(for of 문)

let itSet = new Set(["a", "b", "c", "d", "a", "b", "c"]);

for (let value of itSet) {
  console.log(value);
}

/*
a
b
c
d
*/
