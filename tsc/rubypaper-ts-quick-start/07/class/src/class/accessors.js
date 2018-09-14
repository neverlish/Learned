// 07-3-4 클래스에서 getter와 setter - 객체 리터럴에서 Get와 Set을 이용한 값 읽기와 값 설정

var obj = {
  set name(name) {
    this.myName = name;
  },
  get name() {
    return this.myName;
  },
  myName: ''
};

obj.name = 'happy';
console.log(obj.name);
