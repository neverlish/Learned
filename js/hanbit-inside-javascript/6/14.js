/* 
클래스 기능을 가진 subClass 함수
자식 클래스 생성 및 상속
자식 클래스 확장
생성자 호출
subClass 보완
subClass 활용
*/

function subClass(obj) {
  var parent = this === global ? Function : this;
  var F = function() {};

  var child = function() {
    var _parent = child.parent;

    if (_parent && _parent !== Function) {
      _parent.apply(this, arguments);
    }

    if (child.prototype._init) {
      child.prototype._init.apply(this, arguments);
    }
  };

  F.prototype = parent.prototype;
  child.prototype = new F();
  child.prototype.constructor = child;
  child.parent = parent;
  child.subClass = arguments.callee;

  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      child.prototype[i] = obj[i];
    }
  };

  return child;
}

var person_obj = {
  _init: function() {
    console.log('person init');
  },
  getName: function() {
    return this.name;
  },
  setName: function(name) {
    this.name = name;
  }
};

var student_obj = {
  _init: function() {
    console.log('student init');
  },
  getName: function() {
    return "Student Name: " + this.name;
  }
};

var Person = subClass(person_obj); // Person 클래스 정의
var person = new Person(); // person init 출력
person.setName('zzoon');
console.log(person.getName()); // (출력값) zzoon

var Student = Person.subClass(student); // Student 클래스 정의
var student = new Student(); // person init, student init 출력
student.setName('iamhjoo');
console.log(student.getName()); // (출력값) Student Name: iamhjoo

console.log(Person.toString()); // Person이 Function을 상속받는지 확인
