import axios from 'axios';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import Product from './Product';
import ProductList from './ProductList';
import ShoppingCart from './ShoppingCart';

const apiAddress = 'https://ht3xa0px32.execute-api.us-east-1.amazonaws.com';
const stage = 'dev';

class App extends Component {

  constructor() {
    super();
    this.state = {
      products: [],
      ready: false,
      hasSaved: false
    };

    // bind the component's "this" to the callback
    this.handleSelect = this.handleSelect.bind(this);
    this.handleDeselect = this.handleDeselect.bind(this);
  }

  handleSelect(product) {
    // create a copy of the products array
    const products = this.state.products.slice();

    // find the index of the product to modify
    const index = products.map(i => i.id).indexOf(product.id);

    // modify the selection state
    products[index].isSelected = product.isSelected;

    // make React aware that the state has changed
    this.setState({ products: products });
  }

  handleDeselect(product) {
    this.handleSelect(product);
  }

  handleSave(products) {
    axios
      .post(`${apiAddress}/${stage}/store/save`, products)
      .then(res => {
        this.setState({
          products: this.state.products,
          hasSaved: true
        })
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <Router>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Header />
            </div>
          </div>
          <div className="row">
            <div className="col-md-8">
              {
                this.state.ready
                  ?
                  <Switch>
                    <Route path="/" exact render={
                      () => <ProductList
                        products={this.state.products}
                        onSelect={this.handleSelect} />
                    } />
                    <Route path="/product/:id" render={
                      (props) => <Product
                        product={this.state.products.find(x => x.id == props.match.params.id)}
                        onSelect={this.handleSelect} />
                    } />
                    <Route path="/shopping-cart" render={
                      () => <ShoppingCart
                        selectedProducts={this.state.products.filter(p => p.isSelected)}
                        onDeselect={this.handleDeselect}
                        onSave={this.handleSave}
                        onCheckout={this.handleCheckout} />
                    } />
                  </Switch>
                  :
                  <div>
                    <span className="glyphicon glyphicon-refresh spin"></span>
                  </div>
              }
            </div>
          </div>
        </div>
      </Router>
    );
  }

  componentDidMount() {
    axios
      .get(`${apiAddress}/${stage}/store/products`)
      .then(res => {
        this.setState({
          products: res.data.products,
          ready: true
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
}

export default App;
