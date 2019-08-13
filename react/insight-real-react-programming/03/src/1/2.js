import React from 'react';

// 속성값과 상탯값으로 관리하는 UI 데이터

//// 컴포넌트의 상탯값을 사용하지 않은 코드
class extends React.Component {
  color = 'red';
  onClick = () => {
    this.color = 'blue';
  };
  render() {
    return (
      <div>
        <button style={{ backgroundColor: this.color }} onClick={this.onClick}>
          좋아요
        </button>
      </div>
    );
  }
}

//// 컴포넌트의 상탯값을 사용하는 코드
class extends React.Component {
  state = { color: 'red' };
  onClick = () => {
    this.setState({ color: 'blue' });
  };
  render() {
    return (
      <div>
        <button style={{ backgroundColor: this.state.color }} onClick={this.onClick}>
          좋아요
        </button>
      </div>
    );
  }
}

//// 속성값을 사용한 코드
function Title(props) {
  return <p>{props.title}</p>;
}

class extends React.Component {
  state = { count: 0 };
  onClick = () => {
    const { count } = this.state;
    this.setState({ count: count + 1 });
  };
  render() {
    const { count } = this.state;
    return (
      <div>
        <Title title={`현재 카운트: ${count}`} />
        <button onClick={this.onClick}>증가</button>
      </div>
    );
  }
}

//// React.memo와 React.PureComponent를 사용한 코드
const Title = React.memo(Title);

class extends React.PureComponent {
  render() {
    return <p>{this.props.title}</p>;
  }
}

//// 컴포넌트를 사용한 만큼 인스턴스 생성하기
function App() {
  return (
    <div>
      <MyComponent2 />
      <MyComponent2 />
    </div>
  )
}

// setState 메서드 이해하기
//// 상탯값을 일부만 변경하는 코드
class extends React.Component {
  state = {
    count1: 0,
    count2: 0,
  }
  onClick = () => {
    const { count1 } = this.state;
    this.setState({ count1: count1 + 1 });
  }
}

//// setState 메서드를 연속해서 호출하는 코드
class extends React.Component {
  state = {
    count1: 0,
    count2: 0,
  }
  onClick = () => {
    this.setState({ count1: this.state.count1 + 1 });
    this.setState({ count1: this.state.count1 + 1 });
  }
}

//// setState 메서드의 인수로 함수를 사용한 코드
class extends React.Component {
  state = {
    count1: 0,
    count2: 0,
  }
  onClick = () => {
    this.setState(prevState => ({ count1: prevState.count1 + 1 }));
    this.setState(prevState => ({ count1: prevState.count1 + 1 }));
  }
}

/// 상탯값 로직을 분리해서 사용하는 패턴
const actions = {
  init() {
    return { count: 0 };
  },
  increment(state) {
    return { count: state.count + 1 };
  },
  decrement(state) {
    return { count: state.count - 1 };
  },
};

class extends React.Component {
  state = actions.init();

  onIncrement = () => {
    this.setState(actions.increment);
  };

  onDecrement = () => {
    this.setState(actions.decrement);
  };
}

//// 호출 순서가 보장되는 setState 메서드
class extends React.Component {
  state = {
    count1: 0,
    count2: 0,
  }
  onClick = () => {
    const { count1, count2 } = this.state;
    this.setState({ count1: count1 + 1 });
    // ...
    this.setState({ count2: count2 + 1 });
  };
  render() {
    const { count1, count2 } = this.state;
    const result = count1 >= count2;
    // ...v
  }
}

//// setState 메서드의 두 번째 매개변수는 처리가 끝났을 때 호출된다
class extends React.Component {
  state = {
    count: 0,
  }
  onClick = () => {
    this.setState({ count: 123 }, () => console.log('count is 123'));
  };
}

// 불변 객체로 관리하는 속성값과 상탯값
//// 속성값 변경을 시도하는 코드
function Title(props) {
  props.title = 'abc';
}

// 상탯값을 직접 수정하는 코드
class extends React.Component {
  state = {
    comment: '',
  }
  onClick = () => {
    this.state.comment = 'Hello';
    this.forceUpdate();
  };
}