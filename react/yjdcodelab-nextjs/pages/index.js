import React from 'react';
import Layout from '../components/Layout';
import store from '../common/store';
import firebase from '../common/firebase';

class Index extends React.Component {
  login = () => {
    store.user = { name: 'John' }
  }
  render() {
    return (
      <Layout>
        <h1>Index Page</h1>
        <button className='btn btn-primary' onClick={this.login}>로그인</button>
      </Layout>
    );
  }
}

export default Index;