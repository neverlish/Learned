import React, { Component } from 'react';
import faker from 'faker';

class Index extends Component {
  state = {
    name: faker.name.findName(),
    avatar: faker.image.avatar(),
    email: faker.internet.email()
  };

  generate = () => {
    this.setState({
      name: faker.name.findName(),
      avatar: faker.image.avatar(),
      email: faker.internet.email()
    });
  }
  render() {
    return (
      <div>
        <h1>Faker Demo</h1>
        <dl className='row'>
          <dt className='col-sm-3'>Avatar</dt>
          <dt className='col-sm-9'>
            <img src={this.state.avatar} />
          </dt>
          <dt className='col-sm-3'>Name</dt>
          <dt className='col-sm-9'>{this.state.name}</dt>
          <dt className='col-sm-3'>Email</dt>
          <dt className='col-sm-9'>{this.state.email}</dt>
        </dl>
        <button onClick={this.generate}>Generate</button>
      </div>
    );
  }
}

export default Index;
