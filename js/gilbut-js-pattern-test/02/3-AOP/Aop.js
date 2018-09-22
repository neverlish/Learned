// Aop.js 모듈 개발

// 작성자: 프레드릭 아펠버그
// http://fredrik.appelberg.me/2010/05/07/aop-js.html
// 프로토타입을 지원할 수 있게 데이브 클레이턴이 수정함

Aop = {
  around: function(fnName, advice, fnObj) {
    var originalFn = fnObj[fnName];
    fnObj[fnName] = function () {
      return advice.call(this, {fn:originalFn, args:arguments});
    };
  },

  next: function(targetInfo) {
    return targetInfo.fn.apply(this,targetInfo.args);
  }
};

Aop.before = function(fnName, advice, fnObj) {
  Aop.around(fnName,
    function(targetInfo) {
      advice.apply(this,targetInfo.args);
      return Aop.next(targetInfo);
    },
    fnObj);
};

Aop.after = function(fnName, advice, fnObj) {
  Aop.around(fnName,
     function(targetInfo) {
       var ret = Aop.next(targetInfo);
       advice.apply(this, targetInfo.args);
       return ret;
     },
     fnObj);
};
