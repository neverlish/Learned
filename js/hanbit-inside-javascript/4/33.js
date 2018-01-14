// slice() 메서드 사용 예제

var arrA = [1, 2, 3];
console.log(arrA)
var arrB = arrA.slice(0); // [1, 2, 3]
console.log(arrB)
var arrC = arrA.slice(); // [1, 2, 3]
console.log(arrC)
var arrD = arrA.slice(1); // [2, 3]
console.log(arrD)
var arrE = arrA.slice(1, 2); // [2]
console.log(arrE)