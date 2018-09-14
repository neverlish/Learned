// 11-3-2 타입 매개변수에 인터페이스를 상속하기 - 특정 메서드만 제네릭 메서드로 사용하기 - 클래스 내부 메서드에 제네릭을 적용하는 것과 적용하지 않는 것의 차이점

interface IName {
  name: string;
}

class Profile implements IName {
  name: string = 'happy!';
}

class Accessor1 {
  getKey<T>(obj: T) {
    return obj['name'];
  }

  getKey2<T extends IName>(obj: T) {
    return obj['name'];
  }

  get(obj) {
    let objName = obj instanceof Profile ? obj.name : obj;
    return objName;
  }
}


let ac = new Accessor1();
console.log(ac.getKey<IName>(new Profile())); // happy!
console.log(ac.getKey2(new Profile())); // happy!
console.log(ac.get(new Profile())); // happy!
