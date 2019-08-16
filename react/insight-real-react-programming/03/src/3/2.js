import React from 'react';

//// getDerivedStateFromProps 메서드에서 이전 속성값 이용하기
class extends React.Component {
  state = {
    prevSpeed: this.props.speed,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.speed !== state.prevSpeed) {
      return {
        prevSpeed: props.speed,
      };
    }
    return null;
  }
}

// 속성값 변화에 따른 API 호출
//// componentDidUpdate 메서드에서 API를 호출하는 코드
class extends React.Component {
  componentDidUpdate(prevProps) {
    const { productId } = this.props;
    if (prevProps.productId !== productId) {
      this.requestData(productId);
    }
  }
}

// 속성값을 입력으로 하는 메모이제이션
//// getDerivedStateFromProps 메서드를 이용한 메모이제이션
class extends React.Component {
  static getDerivedStateFromProps(props, state) {
    const { products } = props;
    if (products !== state.prevProducts) {
      return {
        filteredProducts: products.filter(product => product.price < 1000),
        prevProducts: products,
      };
    }
    return null;
  }
  render() {
    const { filteredProducts } = this.state;
    return <div>{filteredProducts.map(/* */)}</div>;
  }
}

//// 로다시 패키지를 이용한 메모이제이션의 예
import memoize from 'lodash/memoize';

class extends React.Component {
  getFilteredProducts = memoize(function (products) {
    return products.filter(product => product.price < 1000);
  });
  render() {
    const { products } = this.props;
    const filteredProducts = this.getFilteredProducts(products);
    return <div>{filteredProducts.map(/* */)}</div>;
  }
}

// 속성값 변경 시 상탯값 초기화
//// 속성값 변경 시 상탯값을 초기화하는 코드
class extends React.Component {
  static getDerivedStateFromProps(props, state) {
    if (props.price !== state.prevPrice) {
      return {
        price: props.price,
        prevPrice: props.price,
      };
    }
    return null;
  }

  onChange = event => {
    const price = Number(event.target.value);
    if (!Number.isNaN(price)) {
      this.setState({ price });
    }
  };

  render() {
    const { price } = this.state;
    return <input onChange={this.onChange} value={price} />;
  }
}

//// key 속성값을 이용한 코드
class extends React.Component {
  render() {
    const { product } = this.props;
    return <PriceInput key={product.id} value={product.price} />;
  }
}

class PriceInput extends React.Component {
  state = {
    price: this.props.price,
  };

  onChange = event => {
    const price = Number(event.target.value);
    if (!Number.isNaN(price)) {
      this.setState({ price });
    }
  };

  render() {
    const { price } = this.state;
    return <input onChange={this.onChange} value={price} />;
  }
}

//// 상탯값을 부모 컴포넌트에서 관리하는 코드
class extends React.Component {
  state = {
    currentPrice: this.props.product.price,
  };
  onChangePrice = event => {
    const currentPrice = Number(event.target.value);
    if (!Number.isNaN(currentPrice)) {
      this.setState({ currentPrice });
    }
  };
  render() {
    const { currentPrice } = this.state;
    return <PriceInput onChange={this.onChangePrice} value={currentPrice} />;
  }
}

function PriceInput({ price, onChange }) {
  return <input onChange={onChange} value={price} />;
}

// getDerivedStateFromProps 메서드가 필요한 경우
//// 상탯값이 전후 속성값에 의존적인 경우
class extends React.Component {
  state = {
    prevSpeed: this.props.speed,
    isMovingFaster: false,
  };
  static getDerivedStateFromProps(props, state) {
    if (props.speed !== state.prevSpeed) {
      return {
        isMovingFaster: state.prevSpeed < props.speed,
        prevSpeed: props.speed,
      };
    }
    return null;
  }
}