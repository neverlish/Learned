import React, { Component } from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';
import { customInput, customSelect, discounts } from './fields';
import capitalize from 'capitalize';
import { 
  required,
  minLength,
  maxLength,
  matchesPassword,
  asyncValidate
} from '../validation';
import './RegisterForm.css';

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
          normalize={capitalize}
        />
        <Field
          name='surname'
          component={customInput}
          type='text'
          label='Surname'
          validate={[required]}
          normalize={capitalize}
        />
        <Field
          name='username'
          component={customInput}
          type='text'
          label='User Name'
          validate={[required, minLength, maxLength]}
        />
        <Field
          name='password'
          component={customInput}
          type='password'
          label='Password'
          validate={[required]}
        />
        <Field
          name='confirmPassword'
          component={customInput}
          type='password'
          label='Confirm Password'
          validate={[required, matchesPassword]}
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
        <FieldArray
          name='discountCodes'
          component={discounts}
        />
        <button type='submit'>Submit</button>
      </form>
    )
  }
}

RegisterForm = reduxForm({
  form: 'register',
  asyncValidate,
  asyncBlurFields: ['username']
})(RegisterForm);

export default RegisterForm;
