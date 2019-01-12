// 객체 리터럴로 공유 캐시 구현
var Aspects = Aspects || {};

Aspects.returnValueCache = function (sharedCache) {
  'use strict';

  // 주어진 sharedCache가 있다면 사용한다.
  var cache = sharedCache || {};

  return {
    advice: function(targetInfo) {
      // 함수에 넘긴 인자를 캐시 키로 이용한다. (객체 참조값 비교가 아닌 문자열 비교를 위해 문자열로 바꾼다.)
      var cacheKey = JSON.stringify(targetInfo.args);

      if (cache.hasOwnProperty(cacheKey)) {
        return cache[cacheKey];
      }

      // 장식된 함수를 가져와 실행한 뒤 그 반환값을 캐시에 저장한다.
      var returnValue = Aop.next(targetInfo);
      cache[cacheKey] = returnValue;
      return returnValue;
    }
  }
}
