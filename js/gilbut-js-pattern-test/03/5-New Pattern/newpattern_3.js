// new를 자동 삽입하여 인스턴스를 생성

function Marsupial(name, nocturnal) {
  if (!(this instanceof Marsupial)) {
    return new Marsupial(name, nocturnal);
  }
  this.name = name;
  this.isNocturnal = nocturnal;
}

var slider = Marsupial('슬라이더', true); 

console.log(slider.name); // 슬라이더
