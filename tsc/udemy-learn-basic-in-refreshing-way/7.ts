interface IEngine {
  numCylinders: number;
  volume: number;
}

interface ICar {
  engine: IEngine;
  color: string;
  honk: (sound: string) => string;
  roar: () => string;
}


class SportsCar implements ICar {
  constructor(public engine: IEngine, public color: string) {

  }

  honk(sound: string): string {
    return `${sound} ${sound}`;
  }

  roar(): string {
    return `${this.engine.volume}cc are roaring at you`;
  }
}

const raceCar = new SportsCar({numCylinders: 6, volume: 2000}, 'red');
console.log(raceCar.honk('beep')); // beep beep 
console.log(raceCar.roar()); // 2000cc are roaring at you

interface ITruck extends ICar {
  numWheels: number;
  pullLoad: (weight: number) => string;
}

class HeavyTruck implements ITruck {
  constructor(public engine: IEngine, public color: string, public numWheels: number) {

  }

  honk(sound: string): string {
    return `${sound} ${sound}`;
  }

  roar(): string {
    return `${this.engine.volume}cc are roaring at you`;
  }

  pullLoad(weight: number): string {
    return `${this.numWheels} wheels are pulling ${weight}kg`;
  }
}

const monsterTruck = new HeavyTruck({numCylinders: 6, volume: 10000}, 'white', 16);
console.log(monsterTruck.roar()); // 10000cc are roaring at you
console.log(monsterTruck.pullLoad(2500)); // 6 wheels are pulling 2500kg
