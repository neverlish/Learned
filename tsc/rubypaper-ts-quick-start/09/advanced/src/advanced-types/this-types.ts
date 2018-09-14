// 09-2-5 this 타입 - 플루언트 인터페이스 패턴을 활용한 메서드 체이닝 구현

class AddCalc {
  public constructor(public value: number = 0) {}
  public add(operand: number): this {
    this.value += operand;
    return this;
  }
}

class MyCalc extends AddCalc {
  public multiply(operand: number): this {
    this.value *= operand;
    return this;
  }
}

let calc = new MyCalc(3).multiply(5).add(10);
console.log(calc.value); // 25
