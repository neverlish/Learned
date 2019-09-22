import React, { Component } from 'react';
import { Text, View } from 'react-native';
import AddToDo from './AddToDo';
import ToDoList from './ToDoList';

export default class App extends Component {
  state = {
    items: [],
  };

  onAdded = (text) => {
    this.setState({
      items: [
        { text, completed: false },
        ...this.state.items,
      ],
    });
  };

  onCompleted = (index) => {
    this.setState({
      items: this.state.items.map((item, i) => {
        if (index != i) return item;
        return {
          ...item,
          completed: !item.completed,
        };
      }),
    });
  };

  onDeleted = (index) => {
    this.setState({
      items: [...this.state.items.slice(0, index), ...this.state.items.slice(index + 1)],
    });
  }

  render() {
    const { items } = this.state;
    return (
      <View testID='welcome'>
        <Text>Todo TDD</Text>
        <AddToDo onAdded={this.onAdded}></AddToDo>
        <ToDoList items={items} onCompleted={this.onCompleted} onDeleted={this.onDeleted} />
      </View>
    );
  }
}
