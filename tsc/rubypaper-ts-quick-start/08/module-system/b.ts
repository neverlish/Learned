// 08-4-3 특정 모듈 형식을 실행하기 위한 준비 - 모듈 로더에서 사용할 a.ts 파일과 b.ts 파일 준비 - a 모듈을 재노출하는 b 모듈

import { unique } from './a';
var data = [1, 2, 3, 1, 2, 3, 4, 5, 6, 4, 5, 6];
console.log('b 모듈');
export * from './a';
