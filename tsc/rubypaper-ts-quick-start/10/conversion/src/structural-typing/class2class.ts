// 10-2-3 구조 타이핑 - 구조가 같은 클래스 간의 구조 타이핑 - 구조가 같은 클래스 간의 타입 호환

class Animal {
  name: number;
  constructor(name: string, weight: number) {}
}

class Bird {
  name: number;
  constructor(speed: number) {}
}

let animal: Animal = new Animal('happy', 100);
let bird: Bird = new Bird(10);

animal = bird;
bird = animal;
