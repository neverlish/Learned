// 13-3-3 자바스크립트 라이브러리 호출 - 네임스페이스를 포함할 때 타입이 정의되지 않는 문제 - test-js.ts 파일에서 my.js 파일 호출(타입 에러 발생)

import * as my from './library/my';

var result = my.MyLibrary.getMaxNumber([10, 20, 30, 1, 40]); // 타입 정보가 없음
