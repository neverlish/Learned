"use strict";
// 08-4-3 특정 모듈 형식을 실행하기 위한 준비 - 모듈 로더에서 사용할 a.ts 파일과 b.ts 파일 준비 - a 모듈을 재노출하는 b 모듈
// tsc b.ts --outDir src-es6 --module es2015 --target es2015
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var data = [1, 2, 3, 1, 2, 3, 4, 5, 6, 4, 5, 6];
console.log('b 모듈');
__export(require("./a"));
// 08-5-2 CommonJS 모듇 형식
// tsc b.ts --outDir src-cjs --module commonjs --target es5
