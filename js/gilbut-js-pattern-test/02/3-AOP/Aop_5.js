// 올바른 콘텍스트에서 타깃을 실행

Aop = {
  around: function(fnName, advice, fnObj) {
    var originalFn = fnObj[fnName];
    fnObj[fnName] = function() {
      return advice.call(this, { fn: originalFn, args: arguments });
    };
  }
};
