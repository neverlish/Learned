import React, { Component } from 'react';
import faker from 'faker';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import store from '../common/store';

class Data {
  @observable avatar = faker.image.avatar();
  @observable email = faker.internet.email();
  @observable name = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
  };
}

@observer
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
        <div>
          mode: {store.mode}
        </div>
      </div>
    );
  }
}

export default Index;
