// 12 객체 - 1 class를 통한 객체생성


function Health(name) {
  this.name = name;
}

Health.prototype.showHealth = function() {
  console.log(this.name + ' 님 안녕하세요');
}

const h = new Health('crong');
h.showHealth();


class Health2 {
  constructor(name, lastTime) {
    this.name = name;
    this.lastTime = lastTime;
  }

  showHealth() {
    console.log('안녕하세요' + this.name);
  }
}

const myHealth = new Health2('crong');
myHealth.showHealth();
console.log(toString.call(Health2)); // [object Function]
