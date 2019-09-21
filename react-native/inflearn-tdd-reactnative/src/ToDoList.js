import React, { Component } from 'react';
import { FlatList } from 'react-native';

export default class ToDoList extends Component {
  render() {
    const { items } = this.props;
    return (
      <FlatList data={items}>

      </FlatList>
    )
  }
}