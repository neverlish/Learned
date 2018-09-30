// 비동기 프로그래밍

function func(callback) {
  callback('callback!!');
}

func((param) => {
  console.log(param);
});
