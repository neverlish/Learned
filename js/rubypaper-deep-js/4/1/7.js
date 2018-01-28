// 4 프로토타입과 객체지향, 그리고 상속 - 1 프로토타입을 통한 객체 지향 - 7 프로토타입과 상속자

// 함수 및 객체의 생성자 속성 출력
function Person(name, blog) {
  this.name = name;
  this.blog = blog;
}
var unikys = new Person('unikys', 'unikys.tistory.com');
console.log(Person);
console.log(unikys.constructor);

// 변수의 constructor.prototype 순환 구조 확인
console.log(unikys.constructor === Person); // true
console.log(unikys.constructor.prototype === Person.prototype); // true
console.log(unikys.constructor === unikys.constructor.prototype.constructor); /// true

// 프로토타입 변숫값을 수정하는 예
function Person() {};
var unikys = new Person(),
    stranger = new Person();
Person.prototype.gender = 'male';
stranger.gender = 'female';

// 프로토타입에 있는 변숫값을 직접 변경하는 예
function Person() {};
Person.prototype.gender = 'male';
var unikys = new Person(),
    stranger = new Person();
console.log(unikys.gender); // male 
console.log(stranger.gender); // male 

Person.prototype.gender = 'female';
console.log(unikys.gender); // female 
console.log(stranger.gender); // female 
