import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { customInput, customSelect } from './fields';
import { 
  required,
  minLength,
  maxLength
} from '../validation';

class RegisterForm extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Field
          name='firstname'
          component={customInput}
          type='text'
          label='First Name'
          validate={[required]}
        />
        <Field
          name='surname'
          component={customInput}
          type='text'
          label='Surname'
          validate={[required]}
        />
        <Field
          name='username'
          component={customInput}
          type='text'
          label='User Name'
          validate={[required, minLength, maxLength]}
        />
        <Field
          name='preferences'
          component={customSelect}
          label='Preferred Formatting'
        />
        <Field
          name='newsletter'
          component={customInput}
          type='checkbox'
          label='Sign up to newsletter?'
        />
        <button type='submit'>Submit</button>
      </form>
    )
  }
}

RegisterForm = reduxForm({
  form: 'register'
})(RegisterForm);

export default RegisterForm;
