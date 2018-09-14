// 08-2-3 네임스페이스 하나를 여러 파일에 선언하기 - 참조 경로를 추가하는 상황 - car1.ts 파일

namespace Car {
  export let auto: boolean = false;

  export interface ICar {
    name: string;
    vendor: string;
  }
}
