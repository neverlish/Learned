import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Messages from '../components/Messages';

const MessageContainer = ({ data: { loading, messages } }) => (loading
  ? null
  : (
    <Messages>
      {JSON.stringify(messages)}
    </Messages>
  )
);

const messagesQuery = gql`
  query($channelId: Int!){
    messages(channelId: $channelId) {
      text
      id
      user {
        username
      }
      createdAt
    }
  }
`;

export default graphql(messagesQuery, {
  variables: props => ({
    channelId: props.channelId,
  }),
})(MessageContainer);
