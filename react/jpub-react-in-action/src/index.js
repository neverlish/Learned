import React from 'react';
import { render } from 'react-dom';

import * as API from './shared/http';
import { history } from './history';
import Route from './components/router/Route';
import Router from './components/router/Router';
import App from './app';
import Home from './pages/Home';
import SinglePost from './pages/Post';
import NotFound from './pages/404';

import './shared/crash';
import './shared/service-worker';
import './shared/vendor';
import './styles/styles.scss';

export const renderApp = (state, callback = () => { }) => {
    render(
        <Router {...state}>
            <Route path='' component={App}>
                <Route path='/' component={Home} />
                <Route path='/posts/:postId' component={SinglePost} />
                <Route path='*' component={NotFound} />
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
