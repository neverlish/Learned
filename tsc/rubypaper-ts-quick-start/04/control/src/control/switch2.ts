// 04-1-2 switch 문과 폴스루 - switch 문의 조건 변수가 any 타입이므로 case 절 값의 타입 제약이 사라짐

let command2: any = "hi";

switch (command2) {
  case "hi":
    console.log("hi");
    break;
  case 0:
    console.log(0);
    break;
}

// hi
