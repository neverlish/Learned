class Cat {
  a: number = 1;

  constructor() {
    // 생성시 자동으로 호출되는 함수
    console.log("Cat::constructor()", this.a);
  }
}

let obj = new Cat(); // Cat constructor()를 호출하는 것
console.log(obj.a);

class Animal {
  private name: string;
  constructor(theName) {
    this.name = theName;
  }
}

let cat = new Animal('Nabi');
console.log(cat.name);
// 에러 반환. private 으로 선언된 name 변수는 클래스 내에서만 사용 가능.

class Animal2 {
  static name2: string;
  constructor(theName) {
    Animal2.name2 = theName;
    // static으로 지정했기 때문에 this.name2가 안됨
  }

  public call() {
    console.log('call');
  }

  private sound() {
    console.log(Animal2.name2 + ' sound...');
  }

  static bark() {
    console.log(Animal2.name2 + ' barks...');
  }
}

let cat2 = new Animal2('Nabi2');
cat2.call();
cat2.sound();
// 에러 발생

// cat2.bark();
//에러 발생

Animal2.bark();


class Cat2 {
  private name: string = 'Nabi3';

  get Name() : string {
    // get 은 private을 public처럼 사용하고 싶을 때 사용
    return this.name;
  }

  set Name(theName) {
    this.name = theName;
  }
}

let myCat = new Cat2();

console.log(myCat.Name);
// Nabi3

myCat.Name = 'Yaongee';

console.log(myCat.Name);
// Yaongee
