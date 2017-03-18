let a: [number, string];
a[0] = 1234;
a[1] = 'abc';

a[0] = true;
// 숫자가 들어갈 자리에 boolean 을 넣어서 에러

a[2] = 123;
a[2] = 'www.ionickorea.com'
a[2] = true;
// 3번째 항목에 들어갈 값이 정해지지 않았음. 이런 때에는 선언된 유형인 number나 string만 가능.
