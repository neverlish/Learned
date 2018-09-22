// 타깃에 인자를 전달

Aop = {
  around: function(fnName, advice, fnObj) {
    var originalFn = fnObj[fnName];
    fnObj[fnName] = function() {
      var targetContext = {}; // 잘못되었다, 나중에 다시 설명한다.
      advice.call(targetContext, { fn: originalFn, args: arguments });
    }
  }
}
