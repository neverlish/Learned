// 07-3-3 클래스와 인터페이스 기반의 다형성 구현하기 - 인터페이스의 다형성 - 인터페이스를 이용한 다형성 구현

interface IPerson {
  height: number;
  getAlias: () => string;
  getAge(): number;
}

class PoliceOfficer implements IPerson {
  height: number;
  getAlias = () => 'happy';
  getAge(): number {
    return 10;
  }
  hasClub() {
    return true;
  }
}

let policeMan: IPerson = new PoliceOfficer();
console.log(policeMan.getAlias()); // happy
console.log(policeMan.getAge()); // 10
// console.log(policeMan.hasClub()); // error TS2339: Property 'hasClub' does not exist on type 'IPerson'.
