// uncaughtException 이벤트를 이용한 예외 처리

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

process.on('uncaughtException', (error) => {
  console.log('uncaughtException!!');
});
