import React, { Component } from 'react';
import faker from 'faker';

class Index extends Component {
  state = {
    name: {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    },
    avatar: faker.image.avatar(),
    email: faker.internet.email()
  };

  generate = () => {
    this.setState({
      name: {
        firstName: faker.name.firstName(),
        lastName: this.state.name.lastName,
      },
    }, () => {
      this.setState({ email: faker.internet.email() }, () => {
        this.setState({ avatar: faker.image.avatar() });
      });
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
          <dt className='col-sm-9'>{this.state.name.firstName} {this.state.name.lastName}</dt>
          <dt className='col-sm-3'>Email</dt>
          <dt className='col-sm-9'>{this.state.email}</dt>
        </dl>
        <button onClick={this.generate}>Generate</button>
      </div>
    );
  }
}

export default Index;
