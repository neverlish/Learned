// 4 프로토타입과 객체지향, 그리고 상속 - 2 자바스크립트에서의 상속 활용 - 9 생성자 vs Object.create 성능 비교

// 성능 비교를 위한 기본 설정
function Person(name, blog) {
  this.name = name;
  this.blog = blog;
}
Person.prototype = {
  yell: function() {
    console.log('My name is ' + this.name);
  }
}

// new 키워드 성능 시험 소스
var unikys = new Person('Unikys', 'http://unikys.tistory.com');

// Object.create 함수 성능 시험 소스
var unikys = Object.create(Person.prototype, {
  name: {
    value: 'Unikys',
    configurable: true,
    enumerable: true,
    writable: true
  },
  blog: {
    value: 'http://unikys.tistory.com',
    configurable: true,
    enumerable: true,
    writable: true
  }
});
