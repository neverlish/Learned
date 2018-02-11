// 4 프로토타입과 객체지향, 그리고 상속 - 1 프로토타입을 통한 객체 지향 - 8 객체 내의 속성 탐색 순서

// 프로토타입 체인을 통한 속성 공유 예
function Car() {
  this.wheel = 4;
  this.beep = 'BEEP!';
};
Car.prototype.go = function() {
  console.log(this.beep);
};

function Truck() {
  this.wheel = 6;
  this.beep = 'HONK!';
};
Truck.prototype = new Car();
function SUV() {
  this.beep = 'WANK!';
};
SUV.prototype = new Car();

var truck = new Truck(),
    suv = new SUV();

console.log(truck.wheel); // 6
console.log(suv.wheel); // 4
console.log(truck.beep); // HONK!
console.log(suv.beep); // WANK!
truck.go(); // HONK!
suv.go(); // WANK!

// 객체의 모든 속성을 출력하는 예
function Person(name, blog) {
  this.name = name;
  this.blog = blog;
}

Person.prototype.getName = function() {
  return this.name;
};
Person.prototype.getBlog = function() {
  return this.blog;
};

var unikys = new Person('unikys', 'unikys.tistory.com'),
    prop;

for (prop in unikys) {
  console.log("unikys[" + prop + "] = " + unikys[prop]);
}
/*
unikys[name] = unikys
unikys[blog] = unikys.tistory.com
unikys[getName] = function () {
  return this.name;
}
unikys[getBlog] = function () {
  return this.blog;
}
*/

// 객체의 직속 속성만 출력하는 예
for (prop in unikys) {
  if (unikys.hasOwnProperty(prop)) {
    console.log("unikys[" + prop + "] = " + unikys[prop]);
  }
}
/*
unikys[name] = unikys
unikys[blog] = unikys.tistory.com
*/
