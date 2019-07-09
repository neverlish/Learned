import PropTypes from 'prop-types';
import { Children, cloneElement } from 'react';
import { navigate } from '../../history';

function Link({ to, children }) {
    return cloneElement(Children.only(children), {
        onClick: () => navigate(to)
    })
}

Link.propTypes = {
    to: PropTypes.string,
    children: PropTypes.node
}

export default Link;
