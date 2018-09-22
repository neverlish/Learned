// 인자 체크 기능을 보탠 DiContainer.register

DiContainer = function() {
  // 반드시 생성자로 객체를 생성하기 한다.
  if (!(this instanceof DiContainer)) {
    return new DiContainer();
  }
};

DiContainer.prototype.messages = {
  registerRequiresArgs: '이 생성자 함수는 인자가 3개 있어야 합니다: 문자열, 문자열 배열, 함수.'
};

DiContainer.prototype.register = function(name, dependencies, func) {
  var ix;

  if (typeof name !== 'string' || !Array.isArray(dependencies) || typeof func !== 'function') {
    throw new Error(this.messages.registerRequiresArgs);
  }
  for (ix = 0; ix < dependencies.length; ++ix) {
    if (typeof dependencies[ix] !== 'string') {
      throw new Error(this.messages.registerRequiresArgs);
    }
  }
};
