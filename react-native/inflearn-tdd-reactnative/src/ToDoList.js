import React, { Component } from 'react';
import { FlatList } from 'react-native';
import ToDoItem from './ToDoItem';

export default class ToDoList extends Component {
  renderItem = ({ item, index }) => {
    const { onCompleted, onDeleted } = this.props;
    return <ToDoItem
      item={item}
      index={index}
      onCompleted={onCompleted}
      onDeleted={onDeleted}
    />;
  };

  keyExtractor = (item, index) => {
    return index.toString();
  }

  render() {
    const { items } = this.props;
    return (
      <FlatList
        testID='toDoList'
        data={items}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        extraData={this.state}
      />
    );
  }
}