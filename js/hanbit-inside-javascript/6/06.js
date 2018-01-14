// 프로토타입을 이용한 상속 3

var person = {
  name: 'zzoon',
  getName: function() {
    return this.name;
  },
  setName: function(arg) {
    this.name = arg;
  }
};

function create_object(o) {
  function F() {};
  F.prototype = o;
  return new F();
}

function extend(obj, prop) {
  if ( !prop ) { prop = obj; obj = this; }
  for ( var i in prop ) obj[i] = prop[i];
  return obj;
};

var student = create_object(person);
var added = {
  setAge: function(age) {
    this.age = age;
  },
  getAge: function() {
    return this.age;
  }
};

extend(student, added);

student.setAge(25);
console.log(student.getAge());
