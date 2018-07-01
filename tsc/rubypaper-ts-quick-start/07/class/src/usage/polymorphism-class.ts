// 07-3-3 클래스와 인터페이스 기반의 다형성 구현하기 - 클래스의 다형성 - 부모 클래스와 자식 클래스 간의 다형성

class Planet {
  public diameter: number; // 지름
  protected isTransduction: boolean = true; // 공전

  getIsTransduction(): boolean {
    return this.isTransduction;
  }

  stopTransduction(): void {
    console.log('stop1');
    this.isTransduction = false;
  }
}

class Earch extends Planet {
  private features: string[] = ['soil', 'water', 'oxyzen'];
  stopTransduction(): void {
    console.log('stop2');
    this.isTransduction = false;
  }
}

let earth = new Earch();
earth.diameter = 12656.2;
console.log('1번 : ' + earth.diameter); // 1번 : 12656.2
console.log('2번 : ' + earth.getIsTransduction()); // 2번 : true
earth.stopTransduction(); // stop2
console.log('3번 : ' + earth.getIsTransduction()); // 3번 : false
// console.log(earth.features);


