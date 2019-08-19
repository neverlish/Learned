import React from 'react';
import PropTypes from 'prop-types';

const MyButton = ({ onClick }) => (
  <button onClick={onClick}>My Button</button>
);

MyButton.propTypes = {
  onClick: PropTypes.func
}

export default MyButton;