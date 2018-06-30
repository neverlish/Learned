// 07-2-3 클래스를 배열 요소 타입으로 지정함 - 클래스를 배열 요소로 보고 배열 타입을 선언하기 - 클래스를 이용해 배열 타입을 지정하고 객체 리터럴을 출력

class Person3 {
  public full: string;
  constructor(public name: string, public city: string) {
    this.full = name + '(' + city + ')';
  }
}

let person3: Person3[] = [
  new Person3('kim', 'seoul'),
  new Person3('park', 'daejeon'),
  new Person3('jeong', 'daegu')
];

console.log(JSON.stringify(person3)); // [{"name":"kim","city":"seoul","full":"kim(seoul)"},{"name":"park","city":"daejeon","full":"park(daejeon)"},{"name":"jeong","city":"daegu","full":"jeong(daegu)"}]
