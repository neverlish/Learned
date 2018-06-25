// 06-3-1 익명 함수와 화살표 함수 - 객체 리터럴의 선언과 객체 리터럴 타입의 선언 - this를 이용해 다른 객체 속성을 참조해 사용하기

let person = {
  name: "Happy",
  hello: function (name2: string) {
    console.log("Hello, " + this.name + name2);
  }
};

person.hello("World"); // Hello, HappyWorld
