// 03-1-3 상수 선언 - const로 선언한 변수의 값이 객체 리터럴일 때의 속성값 변경

const birthMonth = 9;

if (true) {
  const birthMonth = 12;
}

console.log(birthMonth); // 9

const profile = {
  name: 'happy',
  month: birthMonth
};

// const profile = 'happy'; // error TS2451: Cannot redeclare block-scoped variable 'profile'

profile.name = 'happy2';
profile.month--;

console.log(profile); // { name: 'happy2', month: 8 }
