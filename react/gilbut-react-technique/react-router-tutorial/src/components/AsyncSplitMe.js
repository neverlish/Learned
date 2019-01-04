import React, { Component } from 'react';

class AsyncSplitMe extends Component {
  state = {
    SplitMe: null
  };

  loadSplitMe = () => {
    // 비동기적으로 코드를 불러옵니다. 함수는 Promise를 결과로 반환합니다. import()는 모듈의 전체 네임스페이스를 불러오므로, default를 직접 지정해야 합니다.
    import('./SplitMe').then(({ default: SplitMe }) => {
      this.setState({
        SplitMe
      });
    });
  }

  render() {
    const { SplitMe } = this.state;
    return SplitMe ? <SplitMe /> : <button onClick={this.loadSplitMe}>SplitMe 로딩</button>
  }
}

export default AsyncSplitMe;
