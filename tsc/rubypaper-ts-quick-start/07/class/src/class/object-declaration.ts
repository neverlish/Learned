// 07-1-2 클래스 선언과 객체 생성 - 객체 생성 - Rectangle 클래스 선언과 객체 생성

class Rectangle {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  getArea() {
    return this.x * this.y;
  }
}

let rectangle = new Rectangle(1, 5);
let area: number = rectangle.getArea();
console.log(area); // 5
