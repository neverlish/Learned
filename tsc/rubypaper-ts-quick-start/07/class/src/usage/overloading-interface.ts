// 07-3-2 오버로딩을 구현하는 여러 방법 - 인터페이스를 클래스에서 구현하여 오버로딩하기 - 인터페이스에 정의한 메서드를 구현 클래스에서 오버로딩함

interface IPoint {
  getX(x: any): any
}

class Point implements IPoint {
  getX(x?: number | string): any {
    if (typeof x === 'number') {
      return x;
    } else if (typeof x === 'string') {
      return x;
    }
  }
}

let p = new Point();
console.log(p.getX()); // undefined
console.log(p.getX('hello')); // hello
console.log(p.getX(123)); // 123
