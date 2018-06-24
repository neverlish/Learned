// 04-2-1 for 문과 이터러블 객체 - ES5의 for in 문 - for in 문을 이용해 객체 리터럴을 순회

let fruits = { "a": "apple", "b": "banana", "c": "cherry" };

for (let property in fruits) {
  console.log(property, fruits[property]);
}

/*
a apple
b banana
c cherry
*/
