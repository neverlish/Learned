// 08-3-5 디폴트 모듈의 이해와 사용법 - 디폴트 모듈과 명명된 모듈을 함게 가져오기 - 디폴트 모듈의 호출

import profile from './default';
import p, { hello } from './default2';

console.log(profile); // { name: 'happy', age: 30 }
console.log(hello, p); // hello ts! { name: 'happy', age: 30 }
