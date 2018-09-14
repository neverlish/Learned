// 04-1-2 switch 문과 폴스루 - 폴스루에 대한 이해와 폴스루의 사용 여부 설정 - break 문이 누락돼 폴스루가 발생함

let input = 2;

switch (input % 2) {
  case 0:
    console.log('숫자 0'); // Fallthrough case in switch.
  case 1:
    console.log('숫자 1');
    break;
}

/*
숫자 0
숫자 1
*/
