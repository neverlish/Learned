import React, { Component } from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  default: {
    backgroundColor: 'white',
  },
  completed: {
    backgroundColor: 'red',
  },
});

export default class TodoItem extends Component {
  onCompleted = () => {
    const { onCompleted, index } = this.props;
    onCompleted(index);
  };

  onDeleted = () => {
    const { onDeleted, index } = this.props;
    onDeleted(index);
  };

  render() {
    const { item } = this.props;
    return (
      <View style={item.completed ? styles.completed : styles.default}>
        <Text></Text>
        <Button title='C' onPress={this.onCompleted} />
        <Button title='D' onPress={this.onDeleted} />
      </View>
    );
  }
}