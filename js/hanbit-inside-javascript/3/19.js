// 배열의 프로토타입과 객체의 프로토타입 비교

var emptyArray = []; // 배열 리터럴을 통한 빈 배열 생성
var emptyObj = {}; // 객체 리터럴을 통한 빈 객체 생성

console.log(emptyArray.__proto__); // 배열의 프로토타입(Array.prototype) 출력
console.log(emptyObj.__proto__); // 객체의 프로토타입(Object.protptype) 출력

// 브라우저에서 실행할 것