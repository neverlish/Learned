// 03-4-3 튜플 타입 - 튜플의 선언과 초기화

let x: [string, number] = ["tuple", 100];
console.log(typeof x, typeof x[0], typeof x[1]); // object string number
console.log(x[0].substr(0, 2), x[1].toFixed(2)); // tu 100.00
