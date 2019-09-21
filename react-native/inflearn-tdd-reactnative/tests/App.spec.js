import React from 'react';
import { Text } from 'react-native';
import App from '../src/App';

import { shallow } from 'enzyme';

describe('Jest', () => {
  it('is it working?', () => {
    const a = 1;
    expect(a + 1).toBe(2);
  });
});

describe('Enzyme', () => {
  it('is it working?', () => {
    const text = 'some text';
    const wrapper = shallow(<Text>{text}</Text>);
    expect(wrapper.text()).toBe(text);
  });
});