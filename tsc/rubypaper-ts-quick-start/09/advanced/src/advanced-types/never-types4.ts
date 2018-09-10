// 09-2-4 네버 타입 - 닿을 수 잇는 코드가 있을 때 네버 타입을 쓰는 경우

function neverTouch2(): never { // A function returning 'never' cannot have a reachable end point.
  // 닿을 수 있는 코드 영역
}

neverTouch2();
