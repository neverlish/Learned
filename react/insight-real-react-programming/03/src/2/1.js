// 리액트 요소 이해하기
//// JSX 코드가 createElement 함수를 사용하는 코드로 변경된 예
const element1 = <a href="http://google.com">click here</a>;
const element2 = React.createElement(
  'a',
  { href: 'http://google.com' },
  'click here'
);

//// 리액트 요소의 구조
const element3 = (
  <a key="key1" style={{ width: 100 }} href="http://google.com">
    click here
  </a>
);
console.log(element3);
/*
{
  type: 'a',
  key: 'key1',
  ref: null,
  props: {
    href: 'http://google.com',
    style: {
      width: 100,
    },
    children: 'click here',
  },
  // ...
},
*/

//// JSX 코드에서 태그 사이에 표현식을 넣은 코드
const element4 = <h1>제 나이는 {20 + 5} 세입니다</h1>;
console.log(element4);
/*
{
  type: 'h1',
  props: { children: ['제 나이는 ', 25, ' 세입니다'] },
  // ...
}
*/

//// 컴포넌트가 리액트 요소로 변경된 예
function Title({ title, color }) {
  return <p style={{ color }}>{title}</p>;
}
const element5 = <Title title='안녕하세요' color='blue' />;
console.log(element5);
/*
{
  type: Title,
  props: { title: '안녕하세요', color: 'blue' },
  // ...
}
*/

//// 리액트 요소는 불변 객체이다
let seconds = 0;
function update() {
  seconds += 1;
  const element = (
    <div>
      <h1>안녕하세요</h1>
      <h2>지금까지 {seconds}초가 지났습니다.</h2>
    </div>
  );
  ReactDOM.render(element, document.getElementById('root'));
}

setInterval(update, 1000);