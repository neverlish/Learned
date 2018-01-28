// 4 프로토타입과 객체지향, 그리고 상속 - 1 프로토타입을 통한 객체 지향 - 2 자바스크립트와 자바에서의 객체 생성

// function을 이용한 new 키워드 활용
function Person(name, blog) {
  this.name = name;
  this.blog = blog;
}

var unikys = new Person('unikys', 'unikys.tistory.com');
console.log(unikys.name); // unikys

// 자바에서의 new 키워드 활용
/*
class Person {
  String name;
  String blog;

  public Person(String name, String blog) {
    this.name = name;
    this.blog = blog;
  }

  public String getName(String name) {
    this.name = name;
  }

  public String getBlog(String blog) {
    this.blog = blog;
  }

  public void main(String [] args) {
    Person unikys = new Person('unikys', 'unikys.tistory.com');
    System.out.println(unikys.getName());
  }
}
*/

// class를 이용한 new ㅋ워드 활용

class Person {
  constructor(name, blog) {
    this.name = name;
    this.blog = blog;
  }
}

var unikys = new Person('unikys', 'unikys.tistory.com');
console.log(unikys.name); // unikys
