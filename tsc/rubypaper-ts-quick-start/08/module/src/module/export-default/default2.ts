// 08-3-5 디폴트 모듈의 이해와 사용법 - 디폴트 모듈과 명명된 모듈을 함게 가져오기 - 디폴트 모듈 선언(선언과 export를 분리)

const p = {
  name: 'happy',
  age: 30
};

const h: string = 'hello ts!';
export { p as default, h as hello };
