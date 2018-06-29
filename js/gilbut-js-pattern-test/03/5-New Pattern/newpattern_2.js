// new를 사용하도록 강제 - instanceof 연산자로 new 사용을 강제

function Marsupial(name, nocturnal) {
  if (!(this instanceof Marsupial)) {
    throw new Error('이 객체를 new를 사용하여 생성해야 합니다.');
  }
  this.name = name;
  this.isNocturnal = nocturnal;
}

var slider = Marsupial('슬라이더', true); // Error: 이 객체를 new를 사용하여 생성해야 합니다.
