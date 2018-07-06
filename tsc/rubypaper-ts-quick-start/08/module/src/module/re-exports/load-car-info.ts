// 08-3-4 모듈을 재노출해 사용하기 - 네임스페이스로 감싸서 재노출하기 - CarInfo 네임스페이스 모듈을 임포트해 사용

import { CarInfo } from './car-info.module';

CarInfo.Hello(); // hello

let car = new CarInfo.car('My Car');
console.log(car.name); // My Car

let engine = new CarInfo.engine('My Engine');
console.log(engine.name); // My Engine
