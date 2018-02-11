// 4 프로토타입과 객체지향, 그리고 상속 - 2 자바스크립트에서의 상속 활용 - 5 Object.create의 객체 초기화

// Object.create 함수로 값을 초기화하는 예
function Person(name) {
  this.name = name;
}
Person.prototype = {
  yell: function() {
    console.log('My name is ' + this.name);
  }
};

var unikys = Object.create(Person.prototype, {
  name: {
    value: 'Unikys'
  }
});

unikys.yell(); // My name is Unikys
unikys.name = 'Suniky';
unikys.yell(); // My name is Unikys

// Object.create 함수로 수정 가능한 속성 초기화 예
var unikys = Object.create(Person.prototype, {
  name: {
    value: 'Unikys',
    configurable: true,
    enumerable: true,
    writable: true
  }
});

// 접근자 활용 예
Object.defineProperties(unikys, {
  firstName: {
    value: 'Sung-ihk',
    writable: true
  },
  lastName: {
    value: 'Yang',
    writable: true
  },
  fullName: {
    get: function() {
      return this.firstName + ' ' + this.lastName;
    },
    set: function(value) {
      var res = value.split(' ');
      if (res.length > 1) {
        this.firstName = res[0];
        this.lastName = res[1];
      } else {
        console.log('Wrong format');
      }
    }
  }
});

console.log(unikys.fullName); // Sung-ihk Yang
unikys.fullName = 'Hello world';
console.log(unikys.firstName); // Hello 
console.log(unikys.last); // world
