"use strict";
// 13-3-3 자바스크립트 라이브러리 호출 - 네임스페이스를 포함할 때 타입이 정의되지 않는 문제 - 네임스페이스 모듈(MyLibrary) 선언
// tsc my.ts --outDir library
exports.__esModule = true;
// 13-3-4 라이브러리 호출 시 d.ts 파일 사용 - my.ts 파일로부터 타입정의 파일 추출
// tsc my.ts -d --outDir dts
var MyLibrary;
(function (MyLibrary) {
    function getMaxNumber(array) {
        return Math.max.apply(Math, array);
    }
    MyLibrary.getMaxNumber = getMaxNumber;
    function getMinNumber(array) {
        return Math.min.apply(Math, array);
    }
})(MyLibrary = exports.MyLibrary || (exports.MyLibrary = {}));
