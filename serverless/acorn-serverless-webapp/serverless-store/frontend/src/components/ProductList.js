import React, { Component } from 'react';
import Product from './Product';

class ProductList extends Component {
  render() {
    const onSelect = this.props.onSelect;
    const onComment = this.props.onComment;
    const productList = this.props.products.map(product => {
      return (
        <div key={product.id} className="product-box">
          <Product 
            product={product}
            fromList={true}
            onSelect={onSelect}
            onComment={onComment} />
        </div>
      )
    });

    return (
      <div>
        {productList}
      </div>
    );
  }
}

export default ProductList;
