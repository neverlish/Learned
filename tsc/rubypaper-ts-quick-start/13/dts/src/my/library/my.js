"use strict";
// 13-3-3 자바스크립트 라이브러리 호출 - 네임스페이스를 포함할 때 타입이 정의되지 않는 문제 - 네임스페이스 모듈(MyLibrary) 선언
exports.__esModule = true;
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
// tsc my.ts --outDir library
