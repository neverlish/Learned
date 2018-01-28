// 4 프로토타입과 객체지향, 그리고 상속 - 2 자바스크립트에서의 상속 활용 - 3 Object.create 함수

// 초기 Object.create 함수
Object.create = function(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

// Object.create 함수를 이용한 상속 예
function Person(name) {
  this.name = name;
}
Person.prototype = {
  yell: function() {
    console.log('My name is ' + this.name);
  }
};

var unikys = Object.create(Person.prototype);
unikys.name = 'Unikys';
unikys.yell(); // My name is Unikys
