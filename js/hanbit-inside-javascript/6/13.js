/* 
클래스 기능을 가진 subClass 함수
자식 클래스 생성 및 상속
자식 클래스 확장
생성자 호출
subClass 보완
*/

function subClass(obj) {
  var parent = this === global ? Function : this;
  var F = function() {};

  var child = function() {
    var _parent = child.parent;

    if (_parent && _parent !== Function) {
      _parent.apply(this, arguments);
    }

    if (child.prototype._init) {
      child.prototype._init.apply(this, arguments);
    }
  };

  F.prototype = parent.prototype;
  child.prototype = new F();
  child.prototype.constructor = child;
  child.parent = parent;
  child.subClass = arguments.callee;

  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      child.prototype[i] = obj[i];
    }
  };

  return child;
}
