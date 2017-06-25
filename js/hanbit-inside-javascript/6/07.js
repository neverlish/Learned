// 클래스 기반의 상속 1

function Person(arg) {
  this.name = arg;
}

Person.prototype.setName = function(value) {
  this.name = value;
};

Person.prototype.getName = function() {
  return this.name;
};

function Student(arg) {
  Person.apply(this, arguments);
}

var you = new Person('iamhjoo');
Student.prototype = you;

var me = new Student('zzoon');
// me.setName('zzoon');
console.log(me.getName());
