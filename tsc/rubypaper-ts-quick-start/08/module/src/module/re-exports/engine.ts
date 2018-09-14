// 08-3-4 모듈을 재노출해 사용하기 - 네임스페이스로 감싸서 재노출하기

export class Engine {
  constructor(public name: string) { }
  getName() {
    return this.name;
  }
}
