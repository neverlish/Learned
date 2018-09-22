// 애스펙트는 타깃에서 받은 값을 반환

Aop = {
  around: function(fnName, advice, fnObj) {
    var originalFn = fnObj[fnName];
    fnObj[fnName] = function() {
      var targetContext = {}; // 잘못되었다, 나중에 다시 설명한다.
      return advice.call(targetContext, { fn: originalFn, args: arguments });
    };
  }
};
