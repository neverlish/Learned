// 02 - 7 실행을 멈출 수 있는 제너레이터

// 02 - 7 - 2 제너레이터 활용하기

//// 제너레이터로 구현한 map, filter, take 함수
function* map(iter, mapper) {
  for (const v of iter) {
    yield mapper(v);
  }
}

function* filter(iter, test) {
  for (const v of iter) {
    if (test(v)) {
      yield v;
    }
  }
}

function* take(n, iter) {
  for (const v of iter) {
    if (n <= 0) return;
    yield v;
    n--;
  }
}

const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const result = take(3, map(filter(values, n => n % 2 === 0), n => n * 10));
console.log([...result]); // [ 20, 40, 60 ]

//// 제너레이터 함수로 자연수의 집합 표현
function* naturalNumbers() {
  let v = 1;
  while (true) {
    yield v++;
  }
}

const values2 = naturalNumbers();
const result2 = take(3, map(filter(values2, n => n % 2 === 0), n => n * 10));
console.log([...result2]); // [ 20, 40, 60 ]

// 제너레이터 함수끼리 호출하기

//// 제너레이터 함수가 다른 제너레이터 함수 호출하기
function* g1() {
  yield 2;
  yield 3;
}

function* g2() {
  yield 1;
  yield* g1();
  yield 4;
}

console.log(...g2()); // 1 2 3 4

//// 반복 가능한 객체를 처리하는 yield* 키워드
function* g2_second() {
  yield 1;
  for (const value of g1()) {
    yield value;
  }
  yield 4;
}

function* g2_third() {
  yield 1;
  yield* [2, 3];
  yield 4;
}

// 제너레이터 함수로 데이터 전달하기
//// next 메서드를 이용해서 제너레이터 함수로 데이터 전달하기
function* f1() {
  const data1 = yield;
  console.log(data1);
  const data2 = yield;
  console.log(data2);
}

const gen = f1();
gen.next();
gen.next(10); // 10
gen.next(20); // 20

// 협업 멀티태스킹
function* minsu() {
  const myMsgList = [
    '안녕 나는 민수야',
    '만나서 반가워',
    '내일 영화 볼래?',
    '시간 안 되니?',
    '내일모레는 어때?',
  ];
  for (const msg of myMsgList) {
    console.log('수지:', yield msg);
  }
}

function suji() {
  const myMsgList = ['', '안녕 나는 수지야', '그래 반가워', '...'];
  const gen = minsu();
  for (const msg of myMsgList) {
    console.log('민수:', gen.next(msg).value);
  }
}
suji();
/*
민수: 안녕 나는 민수야
수지: 안녕 나는 수지야
민수: 만나서 반가워
수지: 그래 반가워
민수: 내일 영화 볼래?
수지: ...
민수: 시간 안 되니?
*/

// 제너레이터 함수의 예외 처리
//// 제너레이터 함수에서 예외가 발생한 경우
function* genFunc() {
  throw new Error('some error');
}
function func() {
  const gen = genFunc();
  try {
    gen.next();
  } catch (e) {
    console.log('in catch:', e);
  }
}
func(); // in catch: Error: some error