import PropTypes from 'prop-types';
import { Component } from 'react';
import enroute from 'enroute';
import invariant from 'invariant';

export default class Router extends Component {
    static propTypes = {
        children: PropTypes.object,
        location: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);
        this.routes = {};
        this.router = enroute(this.routes);
    }

    cleanPath(path) {
        return path.replace(/\/\//g, '/');
    }

    normalizeRoute(path, parent) {
        if (path[0] === '/') {
            return path;
        }
        if (parent == null) {
            return path;
        }

        return `${parent.route}/${path}`;
    }

    render() {
        const { location } = this.props;
        invariant(location, '<Router /> nned a location to work');
        return this.router(location);
    }
}
