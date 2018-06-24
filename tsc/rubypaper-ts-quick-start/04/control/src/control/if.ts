// 04-1-1 if 문 사용 시 타입 제약 - if 문의 조건으로 사용될 수 있는 불리언 타입과 숫자 타입

let text: string = "";
let statusActive: number = 0;
let isEnabled: boolean = true;

// 첫번째 if 문
if (statusActive || text) {
  console.log("1");
}

// 두번째 if 문
if (isEnabled && 2 > 1) {
  console.log("2");
}

// 2
