// 07-1-3 상속 관계와 포함 관계 - 상속 관계와 포함 관계를 모두 고려해 구현하기 - IS-A 관계와 HAS-A 관계를 동시에 구현함

class FlashLight {
  constructor(public lightIntensity) {}
}

class Bicycle {
  constructor(public numberOfWheel: number) {}

  getNumberOfWheel(): number {
    return this.numberOfWheel;
  }
}

// Bicycle 클래스를 상속함(IS-A 관계)
class MountainBike extends Bicycle {
  flashlight: FlashLight;

  constructor(public numberOfWheel: number, public hasBackSaddle: boolean) {
    super(numberOfWheel);

    // 자전거가 후레쉬 라이트를 포함함(HAS-A 관계)
    this.flashlight = new FlashLight(90);
  }

  getHasBackSaddle() {
    return this.hasBackSaddle;
  }

  getNumberOfWheel() {
    return this.numberOfWheel;
  }
}

let hasBackSaddle = true;
let numberOfWheel = 2;
let mountainBike = new MountainBike(numberOfWheel, hasBackSaddle);
console.log('자전거의 안장 유무 : ' + mountainBike.getHasBackSaddle()); // 자전거의 안장 유무 : true
console.log('자전거의 바퀴 개수 : ' + mountainBike.getNumberOfWheel()); // 자전거의 바퀴 개수 : 2
