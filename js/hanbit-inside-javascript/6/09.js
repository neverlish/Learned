// 캡슐화 1

var Person = function(arg) {
  var name = arg ? arg : 'zzoon';
  this.getName = function() {
    return name;
  }
  this.setName = function(arg) {
    name = arg;
  }
};

var me = new Person();
console.log(me.getName());
me.setName('iamjhoo');
console.log(me.getName());
console.log(me.name); // (출력값) undefined
