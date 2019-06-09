import React from 'react';
import Layout from '../components/Layout';
import store from '../common/store';
import db from '../common/db';
import firebase from '../common/firebase';
import { observer } from 'mobx-react';
import uuid from 'uuid/v4';
import { observable } from 'mobx';

class Data {
  @observable feeds = [];
}

@observer
class Index extends React.Component {
  data = new Data();

  static async getInitialProps() {
    const result = await db.collection('feeds').get();
    const newFeeds = [];
    result.forEach(doc => {
      const docData = doc.data();
      docData.uid = doc.id;
      newFeeds.push(docData);
    });

    return {
      feeds: newFeeds
    };
  }

  constructor(props) {
    super(props);
    this.data.feeds = props.feeds;
  }

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

  write = () => {
    const now = new Date();
    const feed = {
      content: this.textarea.value,
      author: {
        uid: store.user.uid,
        displayName: store.user.displayName,
        photoURL: store.user.photoURL,
        email: store.user.email,
      },
      create_at: now,
      update_at: now,
    };

    const uid = uuid();

    db.collection('feeds')
      .doc(uid)
      .set(feed)
      .then(res => {
        this.textarea.value = '';
      })
      .catch(error => {
        alert('error: ' + error.message);
        console.log(error);
      });
    console.log(this.textarea.value);
  };

  render() {
    return (
      <Layout>
        <h1>Index Page</h1>
        {store.user === null && (
          <button className='btn btn-primary' onClick={this.login}>로그인</button>
        )}
        {store.user !== null && (
          <div>
            <textarea ref={ref => this.textarea = ref} rows='10' className='form-control mb-2' />
            <button className='btn btn-primary' onClick={this.write}>전송</button>
          </div>
        )}

        <ul>
          {this.data.feeds.map(feed => (
            <li key={feed.uid}>
              {feed.content}

              <div>
                {feed.author.displayName}
              </div>
            </li>
          ))}
        </ul>
      </Layout>
    );
  }
}

export default Index;