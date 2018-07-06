// 08-2-3 네임스페이스 하나를 여러 파일에 선언하기 - 참조 경로를 추가하는 상황 - car2.ts 파일

/// <reference path="car1.ts" />

namespace Car {
  let wheels: number;
  console.log(auto); // undefined

  class Taxi implements ICar {
    name: string;
    vendor: string;
  }
}

console.log(Car.auto); // undefined 
// tsc --out out.js car2.ts 를 해야 Car.auto 내용이 보임

// console.log(Car.wheels); // Property 'wheels' does not exist on type 'typeof Car'
