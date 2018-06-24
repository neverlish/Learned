// 03-4-1 any 타입 - any 타입과 유사하지만 동작 방식이 다른 object 타입 - 타입에 따른 속성에 접근(메서드)할 수 있는지를 확인하기

let number = 50;
console.log(typeof number, number.toFixed(1)); // number 50.0

let number2: Object = 50;
console.log(typeof number2); // number

let number3: any = 50;
console.log(typeof number3, number3.toFixed(1)); // number 50.0

let number4: any = "happy";
console.log(typeof number4, number4.charAt(0)); // string 
