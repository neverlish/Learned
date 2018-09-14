// 13-2-2 패키지로 내려받아 타입 정의 파일 설치(2.x 버전) - 타입 정의 파일 설치하기 - 언더스코어의 reduce 함수 호출

import * as _ from 'underscore';
var sum = _.reduce([1, 2, 3], function(memo, num) { return memo + num; }, 0);
console.log(sum);
