import React from 'react';
import AddTodo from '../src/AddTodo';
import { shallow } from 'enzyme';

describe('App', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<AddTodo></AddTodo>);
  });

  it('is TextInput visible?', () => {
    expect(wrapper.find('TextInput')).toHaveLength(1);
  });

  it('is Button visible?', () => {
    expect(wrapper.find('Button')).toHaveLength(1);
  });
});

describe('Interaction', () => {
  let wrapper;
  let props;
  const text = 'some Todo';

  beforeEach(() => {
    props = {
      onAdded: jest.fn(),
    };

    wrapper = shallow(<AddTodo {...props}></AddTodo>);

    wrapper.find('TextInput').simulate('changeText', text);
    wrapper.find('Button').prop('onPress')();
  });

  it('should call the onAdded callback with input text', () => {
    expect(props.onAdded).toHaveBeenCalledTimes(1);
    expect(props.onAdded).toHaveBeenCalledWith(text);
  });
});