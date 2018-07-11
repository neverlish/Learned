import React from 'react';
import {withRouter} from 'react-router-dom';
import {Query} from 'react-apollo';

const Detail = ({
  match: {
    params: { movieId }
  }
}) => {
  console.log(movieId);
  return <div>Detail</div>;
}

export default withRouter(Detail)
