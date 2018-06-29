// 생성자 함수 프로토타입에 함수를 추가

function Marsupial(name, nocturnal) {
  if (!(this instanceof Marsupial)) {
    throw new Error('이 객체를 new를 사용하여 생성해야 합니다.');
  }
  this.name = name;
  this.isNocturnal = nocturnal;
}

// 각 객체는 isAwake 사본 하나를 공유한다.
Marsupial.prototype.isAwake = function(isNight) {
  return isNight === this.isNocturnal;
}

var maverick = new Marsupial('매버릭', true);
var slider = new Marsupial('슬라이더', false);

var isNightTime = true;

console.log(maverick.isAwake(isNightTime)); // true
console.log(slider.isAwake(isNightTime)); // false

// 객체들은 isAwake의 단일 인스턴스를 공유한다.
console.log(maverick.isAwake === slider.isAwake); // true
