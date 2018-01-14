// 실행 컨텍스트 개념

console.log('This is global context');

function ExContext1() {
  console.log('This is ExContext1');
};

function ExContext2() {
  ExContext1();
  console.log('This is ExContext2');
};

ExContext2();
