import React from 'react';
import { observer } from 'mobx-react';
import Layout from '../components/Layout';
import db from '../common/db';

@observer
class Feed extends React.Component {
  static async getInitialProps({ query }) {
    const result = await db.collection('feeds')
      .doc(query.feedId)
      .get();
    const props = {
      feedId: query.feedId,
      feed: result.data(),
    };
    return props;
  }

  render() {
    return (
      <Layout>
        Feed Page

        <div>
          {this.props.feed.content}
          <div>
            {this.props.feed.author.displayName}
          </div>
        </div>
      </Layout>
    );
  }
}

export default Feed;