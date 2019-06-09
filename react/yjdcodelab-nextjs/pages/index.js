import React from 'react';
import Layout from '../components/Layout';
import store from '../common/store';
import firebase from '../common/firebase';
import { observer } from 'mobx-react';

@observer
class Index extends React.Component {
  login = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(provider)
      .then(res => {
        store.user = {
          displayName: res.user.displayName,
          photoURL: res.user.photoURL,
          email: res.user.email,
          uid: res.user.uid,
        }
      })
      .catch(error => {
        alert('login failed: ', error.message);
        console.log(error);
      });
  }

  render() {
    return (
      <Layout>
        <h1>Index Page</h1>
        {store.user === null && (
          <button className='btn btn-primary' onClick={this.login}>로그인</button>
        )}
        {store.user !== null && (
          <div>입력폼</div>
        )}
      </Layout>
    );
  }
}

export default Index;