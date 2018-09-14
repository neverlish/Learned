// 10-1-3 타입 캐스팅, 변환, 어설션 - 함수를 이용한 타입 캐스팅과 타입 어설션을 이용한 타입 호환

let myNum: any = '2017';

// 타입 캐스팅
let num1 = + myNum;
let num2 = Number(myNum);
let num3 = parseInt(myNum);

console.log(`num1=${num1}, ${typeof num1}`); // num1=2017, number
console.log(`num2=${num2}, ${typeof num2}`); // num2=2017, number
console.log(`num3=${num3}, ${typeof num3}`); // num3=2017, number

// 타입 호환
let num4: number = <number>myNum;
let num5: number = myNum as number;
console.log(`num4=${num4}, ${typeof num4}`); // num4=2017, string
console.log(`num5=${num5}, ${typeof num5}`); // num5=2017, string
