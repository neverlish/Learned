import React from 'react';
import { Formik, Field } from 'formik';
import { NextContext } from 'next';
import Router from 'next/router';

import Layout from '../components/Layout';
import { InputField } from '../components/fields/InputField';
import { ChangePasswordComponent } from '../generated/apolloComponents';

const ChangePassword = ({ token }: { token: string }) => {
  return (
    <Layout title='Change Password page'>
      <ChangePasswordComponent>
        {(changePassword) => (
          <Formik
            onSubmit={async (data) => {
              const response = await changePassword({
                variables: {
                  data: {
                    password: data.password,
                    token,
                  }
                },
              });
              console.log(response);
              Router.push('/');
            }}
            initialValues={{
              password: '',
            }}
          >
            {({ handleSubmit }) => <form onSubmit={handleSubmit}>
              <Field
                name='password'
                placeholder='password'
                component={InputField}
                type='password'
              />
              <button type='submit'>change password</button>
            </form>}
          </Formik>
        )}
      </ChangePasswordComponent>
    </Layout>
  )
}

ChangePassword.getInitialProps = ({
  query: { token }
}: NextContext<{ token: string }>) => {
  return {
    token
  }
}

export default ChangePassword;