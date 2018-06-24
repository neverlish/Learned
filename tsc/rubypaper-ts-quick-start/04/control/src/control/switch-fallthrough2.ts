// 04-1-2 switch 문과 폴스루 - 폴스루에 대한 이해와 폴스루의 사용 여부 설정 - noFallthroughCasesInSwitch 옵션이 true 일때 폴스루를 허용하는 경우

let input2 = 0;

switch (input2) {
  case 0:
  case 1:
    console.log("숫자 1");
    break;
}

// 숫자 1
