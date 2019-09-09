exports.handler = (event, context, callback) => {
  console.log('테스트 Lambda 함수 : ', context.functionName);
  console.log('두 개의 숫자와 하나의 연산자를 받는 예제');
  // 연산자는 +, -, /, *, add, sub, mul, div 값 중 하나
  console.log('전달받은 이벤트 : ', JSON.stringify(event, null, 2));
  var error, result;
  if (isNaN(event.num1) || isNaN(event.num2)) {
    console.error('유효하지 않은 숫자');
    return callback('유효하지 않은 숫자!');
  }

  switch (event.operand) {
    case '+':
    case 'add':
      result = event.num1 + event.num2;
      break;
    case '-':
    case 'sub':
      result = event.num - event.num2;
      break;
    case '*':
    case 'mul':
      result = event.num1 * event.num2;
      break;
    case '/':
    case 'div':
      if (event.num2 === 0) {
        console.error('나눗셈의 제수는 0이 될 수 없다.');
        return callback('나눗셈의 제수는 0이 될 수 없다.');
      } else {
        result = event.num1 / event.num2;
      }
      break;
    default:
      return callback('유효하지 않은 연산자');
      break;
  }

  console.log('결과 : ', result);
  return callback(null, result);
}