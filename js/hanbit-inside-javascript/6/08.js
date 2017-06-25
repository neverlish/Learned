// 클래스 기반의 상속 2

function Person(arg) {
  this.name = arg;
}

Function.prototype.method = function(name, func) {
  this.prototype[name] = func;
}

Person.method('setName', function(value) {
  this.name = 'value';
});

Person.method('getName', function() {
  return this.name;
});

function Student(arg) {

}

function F() {};
F.prototype = Person.protytype;
Student.prototype = new F();
Student.prototype.constructor = Student;
