// 08-3-3 여러 모듈을 함께 export 하기 - 임포트한 변수를 출력하기

import { ver, author, extensions, display } from './export-variables';

console.log('Api Name : ', ver); // Api Name :  1.0
console.log('Api Version : ', author); // Api Version :  happy
extensions.forEach(s => {
  console.log('extensions : ', s);
  /*
  extensions :  jpg
  extensions :  bmp
  extensions :  png
  */
});
console.log('display() : ', display()); // display() :  hello world
