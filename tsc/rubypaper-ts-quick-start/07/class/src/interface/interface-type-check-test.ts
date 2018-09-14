// 0-2-2 인터페이스의 역할과 컴파일 결과 분석 - 인터페이스 타입 테스트(타입스크립트)

interface ICar { name: string; }
class MyCar { }

let mCar: ICar = { name: 'car' };
console.log(typeof mCar); // object

console.log(typeof MyCar); // function
// console.log(typeof ICar);
