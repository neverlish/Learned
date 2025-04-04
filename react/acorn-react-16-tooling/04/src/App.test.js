import React from 'react';
import renderer from 'react-test-renderer';
import App from './App';

it('renders the App component', () => {
  const tree = renderer
    .create(<App />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
