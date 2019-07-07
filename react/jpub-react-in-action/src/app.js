import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ErrorMessage from './components/error/Error';
import Nav from './components/nav/navbar';
import Loader from './components/Loader';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            loading: false
        }
    }

    static propTypes = {
        children: PropTypes.node
    };

    componentDidCatch(err, info) {
        console.error(err);
        console.error(info);
        this.setState(() => ({
            error: err
        }));
    }

    render() {
        if (this.state.error) {
            return (
                <div className="app">
                    <ErrorMessage error={this.state.error} />
                </div>
            );
        }
        return (
            <div className='app'>
                <Nav user={this.props.user} />
                {this.state.loading ? (
                    <div className='loading'>
                        <Loader />
                    </div>
                ) : (
                        this.props.children
                    )}
            </div>
        );
    }
}

export default App;
