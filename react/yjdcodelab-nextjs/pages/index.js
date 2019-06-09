import React, { Component } from 'react';
import faker from 'faker';
import { observable, decorate } from 'mobx';
import { observer } from 'mobx-react';

class Data {
  name = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
  };
  avatar = faker.image.avatar();
  email = faker.internet.email();
}

decorate(Data, {
  name: observable,
  avatar: observable,
  email: observable
});

class Index extends Component {
  data = new Data();

  generate = () => {
    this.data.avatar = faker.image.avatar();
    this.data.email = faker.internet.email();
    this.data.name.firstName = faker.name.firstName();
  }

  render() {
    return (
      <div>
        <h1>Faker Demo</h1>
        <dl className='row'>
          <dt className='col-sm-3'>Avatar</dt>
          <dt className='col-sm-9'>
            <img src={this.data.avatar} />
          </dt>
          <dt className='col-sm-3'>Name</dt>
          <dt className='col-sm-9'>{this.data.name.firstName} {this.data.name.lastName}</dt>
          <dt className='col-sm-3'>Email</dt>
          <dt className='col-sm-9'>{this.data.email}</dt>
        </dl>
        <button onClick={this.generate}>Generate</button>
      </div>
    );
  }
}

Index = observer(Index);

export default Index;
