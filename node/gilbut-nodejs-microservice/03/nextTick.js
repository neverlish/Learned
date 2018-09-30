// nextTick을 사용한 비동기 프로그래밍

function func(callback) {
  process.nextTick(callback, 'callback!!');
}

try {
  func((param) => {
    a.a = 0;
  });
} catch (e) {
  console.log('exception!!');
}

// ReferenceError: a is not defined
