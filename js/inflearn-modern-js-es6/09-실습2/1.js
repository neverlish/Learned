// 09 실습2 Destructuring 과 Set 을 활용한 로또 번호 생성기 - 1 로또 번호 생성기

// 1. 유일할 값을 추출하는 과정에서 set을 사용합니다.
// 2. getRandomNumber 함수에 변수를 전달하는 과정에서 destructing 을 사용해봅니다.

const SETTING = {
  name: 'LUCKY LOTTO!',
  count: 6,
  maxNumber: 45
}

function getRandomNumber(maxNumber) {

}

for (let i=0; i < SETTING.count; i++) {
  getRandomNumber(maxNumber);
}

console.log(colorSet.values())
