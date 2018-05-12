import React, { Component } from 'react';
import RegisterForm from './components/RegisterForm';

class RegisterFormContainer extends Component {
  submit = values => {
    window.alert(JSON.stringify(values), null, 4)
  }
  render() {
    return <RegisterForm onSubmit={this.submit} />
  }
}

export default RegisterFormContainer
