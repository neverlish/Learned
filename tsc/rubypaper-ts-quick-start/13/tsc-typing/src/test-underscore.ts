// 13-2-1 타이핑을 이용한 타입 정의 파일 설치(1.x 버전) - 언더스코어 패키지에 대한 테스트


// typings install dt~underscore --global --save

import * as _ from 'underscore';

var result = _.map([1, 2, 3], function(num) { return num * 3 });
console.log(result);
