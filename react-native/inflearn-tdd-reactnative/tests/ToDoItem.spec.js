import React from 'react';
import ToDoItem, { styles } from '../src/ToDoItem';
import { shallow } from 'enzyme';

describe('rendering', () => {
  let props;

  let wrapper;

  beforeEach(() => {
    props = {
      item: {},
    };

    wrapper = shallow(<ToDoItem {...props}></ToDoItem>);
  });

  it('should render a Text', () => {
    expect(wrapper.find('Text')).toHaveLength(1);
  });

  it('should render two buttons', () => {
    expect(wrapper.find('Button')).toHaveLength(2);
  });

  describe('Uncomplete', () => {
    it('should have the default style', () => {
      expect(wrapper.prop('style')).toBe(styles.default);
    });
  });

  describe('Completed', () => {
    beforeEach(() => {
      props.item.completed = true;
      wrapper = shallow(<ToDoItem {...props}></ToDoItem>);
    })
    it('should have the completed style', () => {
      expect(wrapper.prop('style')).toBe(styles.completed);
    });
  });
});

describe('Interaction', () => {
  let wrapper;
  let props;

  describe('Complete feature', () => {
    beforeEach(() => {
      props = {
        item: {
          text: 'first ToDo',
          completed: false
        },
        index: 0,
        onCompleted: jest.fn(),
        onDeleted: jest.fn(),
      };

      wrapper = shallow(<ToDoItem {...props}></ToDoItem>);
      wrapper.find('Button').at(0).prop('onPress')();
    });

    it('should call the onCompleted callback with index', () => {
      expect(props.onCompleted).toHaveBeenCalledTimes(1);
      expect(props.onCompleted).toHaveBeenCalledWith(props.index);
    });
  });

  describe('Delete feature', () => {
    beforeEach(() => {
      props = {
        item: {
          text: 'first ToDo',
          completed: false
        },
        index: 0,
        onCompleted: jest.fn(),
        onDeleted: jest.fn(),
      };

      wrapper = shallow(<ToDoItem {...props}></ToDoItem>);
      wrapper.find('Button').at(1).prop('onPress')();
    });

    it('should call the onDeleted callback with index', () => {
      expect(props.onDeleted).toHaveBeenCalledTimes(1);
      expect(props.onDeleted).toHaveBeenCalledWith(props.index);
    });
  });
});