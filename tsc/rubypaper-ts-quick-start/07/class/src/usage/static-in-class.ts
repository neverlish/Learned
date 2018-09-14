// 07-3-5 정적 변수와 정적 메서드 - 클래스에 static 사용

class Circle {
  private static pi: number = 3.14;
  static circleArea: number = 0;

  static getArea(radius: number) {
    this.circleArea = radius * radius * Circle.pi;
    return this.circleArea;
  }

  static set area(pArea: number) {
    Circle.circleArea = pArea;
  }

  get area(): number {
    return Circle.circleArea;
  }
}

// console.log(Circle.pi); // error TS2341: Property 'pi' is private and only accessible within class 'Circle'
console.log('1번 : ' + Circle.getArea(3)); // 1번 : 28.26

// 정적 멤버 변수인 Circle에 값 설정
Circle.area = 100;

let circle = new Circle();
// 정적 멤버 변수인 circle을 통해 클래스와 객체 간에 값으 ㄹ공유함
console.log('2번 : ' + circle.area); // 2번 : 100
