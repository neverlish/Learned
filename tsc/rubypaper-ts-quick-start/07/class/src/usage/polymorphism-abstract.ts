// 07-3-3 클래스와 인터페이스 기반의 다형성 구현하기 - 클래스의 다형성 - 추상 클래스와 일반 클래스 간의 다형성

abstract class Train {
  constructor(protected speed: number) { }
  speedUp(): void {
    this.speed++;
  }
  abstract getSpeed(): number;
}

class Ktx extends Train {
  constructor(protected speed: number) {
    super(speed);
  }
  public getSpeed(): number {
    return this.speed;
  }
  public speedUpUp(): void {
    this.speed += 2;
  }
}

let ktx: Train = new Ktx(300);
console.log('현재 속도 : ' + ktx.getSpeed() + 'km'); // 현재 속도 : 300km
ktx.speedUp();
console.log('현재 속도 : ' + ktx.getSpeed() + 'km'); // 현재 속도 : 301km
