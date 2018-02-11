// 9 자바스크립트 표준 - 1 ECMAScript 6 표준 - 10 Binary/Octal 표현식 추가

// 2진수와 8진수 표현식 예
console.log(0b1001101010 === 618); // true
console.log(0o1152 === 618); // true
console.log(0x26A === 618); // true

console.log(parseInt('1001101010', 2) === 618); // true
console.log(parseInt('1152', 8) === 618); // true
console.log(parseInt('26A', 16) === 618); // true
