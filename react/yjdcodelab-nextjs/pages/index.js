import React, { Component } from 'react';
import ProfileImage from '../components/ProfileImage';

class Index extends Component {
  render() {
    return (
      <div>
        <h1>Index</h1>
        <button className='btn btn-primary'>Button</button>

        <div>
          <ProfileImage />
          <ProfileImage url='https://placeimg.com/300/300/animals' />
          <ProfileImage url='https://placeimg.com/400/400/animals' />
        </div>
        <div>
          <ProfileImage size={150} />
          <ProfileImage size={150} url='https://placeimg.com/300/300/animals' />
          <ProfileImage size={150} url='https://placeimg.com/400/400/animals' />
        </div>
        <div>
          <ProfileImage size={100} />
          <ProfileImage size={100} url='https://placeimg.com/300/300/animals' />
          <ProfileImage size={100} url='https://placeimg.com/400/400/animals' />
        </div>
      </div>
    );
  }
}

export default Index;
