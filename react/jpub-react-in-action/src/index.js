import React from 'react';
import { render } from 'react-dom';

import App from './app';
import Home from './pages/Home';
import Router from './components/router/Router';
import Route from './components/router/Route';
import { history } from './history';

import './shared/crash';
import './shared/service-worker';
import './shared/vendor';
import './styles/styles.scss';

export const renderApp = (state, callback = () => { }) => {
    render(
        <Router {...state}>
            <Route path='' component={App}>
                <Route path='/' component={Home} />
            </Route>
        </Router>,
        document.getElementById('app'),
        callback
    );
};

let state = {
    location: window.location.pathname,
};

history.listen(location => {
    state = Object.assign({}, state, {
        location: location.pathname
    });
    renderApp(state);
});

renderApp(state);
