// 08-3-4 모듈을 재노출해 사용하기 - 네임스페이스로 감싸서 재노출하기 - CarInfo 네임스페이스 모듈

import { MyCar as SuperCar, SuperEngine } from './my-car';

export namespace CarInfo {
  export let car = SuperCar;
  export let engine = SuperEngine;
  export function Hello() {
    console.log('hello');
  }
}
