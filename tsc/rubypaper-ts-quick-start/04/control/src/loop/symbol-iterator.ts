// 04-2-1 for 문과 이터러블 객체 - [Symbol.iterator]() 메서드를 이용한 이터러블 객체 사용 - [Symbol.iterator]()의 선언과 사용법

let arr = [1, 2];
let itObj = arr[Symbol.iterator]();

console.log("1:", typeof itObj);
console.log("2:", itObj.next());
console.log("3:", itObj.next());
console.log("4:", itObj.next());

/*
1: object
2: { value: 1, done: false }
3: { value: 2, done: false }
4: { value: undefined, done: true }
*/
