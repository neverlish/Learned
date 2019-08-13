import React from 'react';

//// constructor 메서드의 기본 구조

class extends React.Component {
  constructor(props) {
    super(props);
    // ...
  }
}

//// 초기 속상값으로부터 상탯값을 만드는 코드
class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMovie: props.age < 10 ? '뽀로로' : '어벤져스',
    };
  }
}

//// constructor 메서드 없이 속성값을 이용하는 코드
class extends React.Component {
  state = {
    currentMovie: this.props.age < 10 ? '뽀로로' : '어벤져스',
  };
}

// 속성값에 항상 의존적인 상탯값을 함수로 대체한 코드
class extends React.Component {
  getCurrentMovie() {
    const { age } = this.props;
    return age < 10 ? '뽀로로' : '어벤져스';
  }
}

// constuctor 메서드에서는 setState 메서드를 호출하지 말자
//// constuctor 메서드에서 setState 메서드를 호출하는 잘못된 예
class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
    this.setState({ count: 10 });
  }
  render() {
    const { count } = this.state;
    return <div>{count}</div>;
  }
}

//// constructor 메서드에서 API를 호출하는 잘못된 예
class extends React.Component {
  state = {
    products: [],
  };
  constructor(props) {
    super(props);
    callApi('/products').then(data => {
      ///
      this.setState({ products: data });
    });
  }
}