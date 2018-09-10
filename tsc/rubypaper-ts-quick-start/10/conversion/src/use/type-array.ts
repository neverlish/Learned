// 10-1-1 타입 에일리어스 - 타입 에일리어스를 이용한 배열 타입 선언 - 타입 에일리어스를 이용해 배열의 타입 제한하기

type MyArrayType = Array<number | boolean>;
let myArray: MyArrayType = [1, true];

console.log(myArray.toString()); // 1,true
console.log(typeof myArray[0], typeof myArray[1]); // number boolean
