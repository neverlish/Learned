import React from 'react';
import { graphql } from 'react-apollo';
import { ToastContainer, ToastPosition } from 'react-toastify';
import "react-toastify/dist/ReactToastify.min.css";
import theme from '../../theme';
import { ThemeProvider } from '../../typed-components';
import AppPresenter from './AppPresenter';
import { IS_LOGGED_IN } from './AppQueries.local';

const AppContainer = ({ data }) => (
  <React.Fragment>
    <ThemeProvider theme={theme}>
      <AppPresenter isLoggedIn={data.auth.isLoggedIn}/>
    </ThemeProvider>
    <ToastContainer draggable={true} position={'bottom-center' as ToastPosition} />
  </React.Fragment>
)

export default graphql(IS_LOGGED_IN)(AppContainer)
