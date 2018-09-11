// 11-3-2 타입 매개변수에 인터페이스를 상속하기 - 특정 메서드만 제네릭 메서드로 사용하기 - 인터페이스 타입을 추가해 명시적으로 프로퍼티에 접근

interface IName {
  name: string;
}

class Profile2 implements IName {
  name: string = 'happy!';
}

class Accessor2<T extends IName> {
  getKey(obj: T) {
    return obj.name;
  }
}

let ac2 = new Accessor2();
console.log(ac2.getKey(new Profile2())); // happy!
