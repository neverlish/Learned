// 08-3-3 여러 모듈을 함께 export 하기 - 인터페이스와 함수 모듈을 함께 노출하기

interface IProfile { }
function saveName(profile: IProfile, name: string) {
  // 구현
}

export { IProfile, saveName as save };
