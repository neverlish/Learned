// 4 프로토타입과 객체지향, 그리고 상속 - 1 프로토타입을 통한 객체 지향 - 9 프로토타입의 장단점

// 생성자에서 모든 속성을 설정하는 예
function Person(name, blog) {
  this.name = name;
  this.blog = blog;
  this.getName = function() {
    return this.name;
  };
  this.getBlog = function() {
    return this.blog;
  };
}
var unikys = new Person('unikys', 'unikys.tistory.com');
console.log(unikys.getName()); // unikys
console.log(unikys.getBlog()); // unikys.tistory.com
