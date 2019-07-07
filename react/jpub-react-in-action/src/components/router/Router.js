import PropTypes from 'prop-types';
import { Component } from 'react';

export default class Router extends Component {
    static propTypes = {
        children: PropTypes.object,
        location: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);
        this.routes = {};
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

    render() { }
}
