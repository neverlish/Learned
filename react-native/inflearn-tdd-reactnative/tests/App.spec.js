import React from 'react';
import App from '../src/App';
import { shallow } from 'enzyme';

describe('App', () => {
  const wrapper = shallow(<App></App>);

  it('is Text visible?', () => {
    expect(wrapper.find('Text').contains('Todo TDD')).toBe(true);
  });

  it('is AddToDo visible?', () => {
    expect(wrapper.find('AddToDo')).toHaveLength(1);
  });

  it('is ToDoList visible?', () => {
    expect(wrapper.find('ToDoList')).toHaveLength(1);
  });
});