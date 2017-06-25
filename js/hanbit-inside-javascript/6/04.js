// 프로토타입을 이용한 상속 1

function create_object(o) {
  function F() {};
  F.prototype = o;
  return new F();
}
