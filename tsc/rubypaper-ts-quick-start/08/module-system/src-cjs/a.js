"use strict";
// 08-4-3 특정 모듈 형식을 실행하기 위한 준비 - 모듈 로더에서 사용할 a.ts 파일과 b.ts 파일 준비 - a 모듈(배열의 중복 값을 걸러 냄)
Object.defineProperty(exports, "__esModule", { value: true });
function unique(arr) {
    console.log('a 모듈');
    return arr.filter(function (v, i, a) { return a.indexOf(v) === i; });
}
exports.unique = unique;
