// 4 프로토타입과 객체지향, 그리고 상속 - 2 자바스크립트에서의 상속 활용 - 8 Object.creage 함수 크로스 브라우저 호환성 보완

// 크로스 브라우징을 위한 Object.create 함수 정의
(function() {
  if (!Object.create) {
    Object.create = function() {
      function F() {};
      return function (o) {
        F.prototype = o;
        return new F();
      }
    }
  }
}());
