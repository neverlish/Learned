// 08-2-4 네임스페이스 모듈 - car1 파일

export namespace Car {
  export let auto: boolean = false;
  export interface ICar {
    name: string;
    vendor: string;
  }
}
