// 13-3-4 라이브러리 호출 시 d.ts 파일 사용 - 생성된 타입 정의 파일을 이용해 자바스크립트 호출하기 - 자바스크립트 파일 호출 시 타입이 인식되도록 하기

import * as my from './dts/my';
var result = my.MyLibrary.getMaxNumber([10, 20, 30, 1, 40]);
console.log(result); // 40
