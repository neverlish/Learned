// 07-3-1 오버라이딩으로 메서드를 재정의하기 - Bird 클래스의 flight 메서드를 오버라이딩하는 Eagle 클래스

class Bird {
  constructor() { }
  flight(kmDistance: number = 0, kmSpeed: number = 0) {
    console.log(`새가 ${kmDistance}km를 ${kmSpeed}km의 속도로 비행했습니다.`);
  }
}

class Eagle extends Bird {
  constructor() {
    super();
  }

  flight(kmDistance2: number = 0) {
    console.log(`독수리가 ${kmDistance2}km를 비행했습니다.`);
  }
}

let bird = new Bird();
bird.flight(1000, 100); // 새가 1000km를 100km의 속도로 비행했습니다.

let eagle = new Eagle();
eagle.flight(); // 독수리가 0km를 비행했습니다.
eagle.flight(1000); // 독수리가 1000km를 비행했습니다.
