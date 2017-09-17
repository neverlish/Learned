// 08 Map & WeakMap - WeakMap 클래스 인스턴스 변수 보호하기

function Area(height, width) {
  this.height = height;
  this.width = width;
}

Area.prototype.getArea = function() {
  return this.height * this.width;
}

let myarea = new Area(10, 20);
console.log(myarea.getArea()); // 200
console.log(myarea.height); // 10

///////////////////

const wm = new WeakMap();
function Area2(height, width) {
  wm.set(this, {height, width});
}

Area2.prototype.getArea = function() {
  const {height, width} = wm.get(this);
  return height * width;
}

let myarea2 = new Area2(30, 40);
console.log(myarea2.getArea()); // 1200
console.log(myarea2.height); // undefined

console.log(wm.has(myarea2)); // true
myarea2 = null;
console.log(wm.has(myarea2)); // false

///////////////////

const obj = {};

function Area3(height, width) {
  obj.height = height;
  obj.width = width;
}

Area3.prototype.getArea = function() {
  return obj.height * obj.width;
}

let myarea3 = new Area(10, 20);
console.log(myarea3.getArea()); // 200
