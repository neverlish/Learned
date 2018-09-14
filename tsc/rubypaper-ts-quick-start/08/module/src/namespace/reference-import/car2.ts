// 08-2-4 네임스페이스 모듈 - car2 파일

import * as ns from './car1';

namespace Car {
  let wheels: number;
  console.log(ns.Car.auto); // false
  class Taxi implements ns.Car.ICar {
    name: string;
    vendor: string;
  }
}

console.log(ns.Car.auto); // false
