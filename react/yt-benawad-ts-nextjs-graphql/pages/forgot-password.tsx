import React from 'react';
import { Formik, Field } from 'formik';
import Router from 'next/router';

import Layout from '../components/Layout';
import { InputField } from '../components/fields/InputField';
import { ForgotPasswordComponent } from '../generated/apolloComponents';

export default () => {
  return (
    <Layout title='Forgot Password page'>
      <ForgotPasswordComponent>
        {(forgotPassword) => (
          <Formik
            onSubmit={async (data) => {
              const response = await forgotPassword({
                variables: data,
              });
              console.log(response);
              Router.push('/check-email');
            }}
            initialValues={{
              email: '',
            }}
          >
            {({ handleSubmit }) => <form onSubmit={handleSubmit}>
              <Field
                name='email'
                placeholder='email'
                component={InputField}
              />
              <button type='submit'>send email</button>
            </form>}
          </Formik>
        )}
      </ForgotPasswordComponent>
    </Layout>
  )
}