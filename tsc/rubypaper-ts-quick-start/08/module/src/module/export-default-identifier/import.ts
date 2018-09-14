// 08-3-5 디폴트 모듈의 이해와 사용법 - 디폴트 모듈로 타입과 모듈을 함께 노출 - 디폴트 모듈을 함께 임포트해 사용하기

import hello from './export';

let helloMessage: hello = hello('hello');
console.log(hello('hello')); // { first: 'hello', second: 'hello' }
console.log(helloMessage); // { first: 'hello', second: 'hello' }
