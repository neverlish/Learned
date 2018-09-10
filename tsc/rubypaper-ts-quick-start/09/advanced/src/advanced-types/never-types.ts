// 09-2-4 네버 타입 - 닿을 수 없는 코드를 만드는 무한 루프

const neverTouch = function(): never {
  while (true) {
    console.log('Never');
  }
  // console.log(); // 닿을 수 없는 코드
};

let resultNever: never = neverTouch();title = 'Typescript Programming!';
title = null;
