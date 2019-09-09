exports.handler = (event, context, callback) => {
  console.log(
    "시작 버전 : " + process.env.AWS_LAMBDA_FUNCTION_VERSION +
    ", 함수 이름 : " + context.functionName +
    ", 리전 : " + process.env.AWS_REGION
  );

  console.log('입력받은 이벤트 : ', JSON.stringify(event, null, 2));
  var error;

  // 연산자는 +, -, /, *, add, sub, mul, div 값 중 하나
  if (isNaN(process.env.NUM1) || isNaN(process.env.NUM2)) {
    console.error('유효하지 않은 숫자');
    error = new Error('유효하지 안은 숫자!');
    callback(error);
  }

  var res = {};
  res.a = Number(process.env.NUM1);
  res.b = Number(process.env.NUM2);

  var result;
  switch (process.env.OPERAND) {
    case '+':
    case 'add':
      result = res.a + res.b;
      break;
    case '-':
    case 'sub':
      result = event.num - res.b;
      break;
    case '*':
    case 'mul':
      result = res.a * res.b;
      break;
    case '/':
    case 'div':
      if (res.b === 0) {
        console.error('나눗셈의 제수는 0이 될 수 없다.');
        error = new Error('나눗셈의 제수는 0이 될 수 없다.');
        callback(error, null);
      } else {
        result = res.a / res.b;
      }
      break;
    default:
      callback('유효하지 않은 연산자');
      break;
  }

  console.log('결과 : ', result);
  callback(null, result);
}