// 06-3-1 익명 함수와 화살표 함수 - 객체 리터럴의 선언과 객체 리터럴 타입의 선언 - 화살표 함수에서 this 사용

interface Persontype {
  name: string;
  hello(this: PersonType, name2: string): string;
}

let typedPerson: PersonType = {
  name: "Happy",
  hello: function (this: PersonType, name2: string): string {
    let message = `Hello, ${this.name + name2}`;
    return message;
  }
};

console.log(typedPerson.hello("World")); // Hello, HappyWorld
