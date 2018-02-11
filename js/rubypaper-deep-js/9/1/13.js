// 9 자바스크립트 표준 - 1 ECMAScript 6 표준 - 13 프락시 모듈
 
var target = {
  unikys: 'Hello, Unikys'
};

var proxy = new Proxy(target, {
  get(target, name) {
    return name in target ? target[name] : `Nice to mmet you, ${name}`;
  },
  set(target, name, value) {
    if (name === 'age') {
      if (typeof value === 'number') {
        target[name] = value;
      } else {
        console.log('Wrong type, must be number');
      }
    }
  }
});

console.log(proxy.unikys); // Hello, Unikys
console.log(proxy.stranger); // Nice to mmet you, stranger
proxy.age = '4'; // Wrong type, must be number
