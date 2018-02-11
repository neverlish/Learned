// 4 프로토타입과 객체지향, 그리고 상속 - 1 프로토타입을 통한 객체 지향 - 6 프르토타입의 사용 예

// prototype을 사용하는 예
function Person(name, blog) {
  this.name = name;
  this.blog = blog;
}

Person.prototype.getName = function() {
  return this.name;
};
Person.prototype.getBlog = function() {
  return this.blog;
};

var unikys = new Person('unikys', 'unikys.tistory.com');
var stranger = new Person('stranger', 'www.google.com');
console.log(unikys.getName());
console.log(unikys.getBlog());
console.log(stranger.getName());
console.log(stranger.getBlog());

// 객체 생성 후 prototype의 수정 예
Person.prototype.introduce = function() {
  console.log('Hi!, my name is ' + this.name + ', please visit my blog ' + this.blog);
};
unikys.introduce(); // Hi!, my name is unikys, please visit my blog unikys.tistory.com

// 이미 정의된 Prototype의 속성 수정 예
Person.prototype.introduce = function() {
  console.log('Hello, ' + this.name + '!');
}
unikys.introduce(); // Hello, unikys!

// prototype에 변수 추가 예
Person.prototype.gender = 'male';
console.log(unikys.gender); // male
console.log(stranger.gender); // male

// prototype에 정의된 변수를 수정하는 예
stranger.gender = 'female';
console.log(stranger.gender); // female
console.log(unikys.gender); // male
console.log(Person.prototype.gender); // male
