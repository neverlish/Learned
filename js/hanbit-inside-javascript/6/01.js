// 클래스, 생성자, 메서드 1

function Person(arg) {
  this.name = arg;

  this.getName = function() {
    return this.name;
  }

  this.setName = function(value) {
    this.name = value;
  }
}

var me = new Person('zzoon');
console.log(me.getName()); // (출력값) zzoon

me.setName('iamhjoo');
console.log(me.getName()); // (출력값) iamhjoo
