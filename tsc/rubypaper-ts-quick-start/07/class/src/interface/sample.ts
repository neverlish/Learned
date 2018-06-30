// 07-2-1 인터페이스 소개

interface Car { speed: number; }
interface SportsCar { acceleration: number; }

interface MyOptimizedCar extends Car, SportsCar {
  waterproof: boolean;
}

let myCar = <MyOptimizedCar>{};
myCar.speed = 100;
myCar.acceleration = 100;
myCar.waterproof = true;

console.log(myCar); // { speed: 100, acceleration: 100, waterproof: true }

//////

interface Dog {
  run(): void;
  getStatus(): { runningSpeed: number; };
}

interface Bird {
  fly(): void;
  getStatus(): { flightSpeed: number; };
}

interface DogBird extends Dog, Bird {
  getStatus(): { runningSpeed: number, flightSpeed: number; }
}

class NewAnimal implements DogBird {
  run(): void { }
  fly(): void { }
  getStatus(): { runningSpeed: number, flightSpeed: number; } {
    return { runningSpeed: 10, flightSpeed: 20 };
  }
}
