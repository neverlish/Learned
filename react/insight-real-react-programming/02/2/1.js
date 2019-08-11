// 02 - 2 객체와 배열의 사용성 개선

// 02 - 2 - 1 객체와 배열을 간편하게 생성하고 수정하기

// 단축 속성명

//// 단축 속성명을 사용해서 객체를 생성하기
const name = 'mike';
const obj = {
  age: 21,
  name,
  getName() { return this.name; }
};

//// 단축 속성명을 사용하지 않은 코드와 사용한 코드를 비교하기
function makePerson1(age, name) {
  return { age: age, name: name };
}
function makePerson2(age, name) {
  return { age, name };
}

//// 콘솔 로그 출력 시 단축 속성명 활용하기
const age = 21;
console.log('name = ', name, ' age =', age); // name =  mike  age = 21
console.log(({ name, age })); // { name: 'mike', age: 21 }

//// 계산된 속성명
function makeObject1(key, value) {
  const obj = {};
  obj[key] = value;
  return obj;
}
function makeObject2(key, value) {
  return { [key]: value };
}

//// 계산된 속성명을 사용해서 컴포넌트 상탯값 변경하기
class MyComponent extends React.Component {
  state = {
    count1: 0,
    count2: 0,
    count3: 0,
  };
  onClick = index => {
    const key = `count${inderx}`;
    const value = this.state[key];
    this.setState({ [key]: value + 1 });
  }
}