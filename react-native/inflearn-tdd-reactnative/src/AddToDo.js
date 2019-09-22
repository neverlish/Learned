import React, { Component } from 'react';
import { Button, TextInput, View } from 'react-native';

export default class AddToDo extends Component {
  state = {
    text: ''
  };

  onChangeText = (text) => {
    this.setState({ text });
  }
  onPress = () => {
    const { onAdded } = this.props;
    onAdded(this.state.text);
  }

  render() {
    return (
      <View>
        <TextInput testID='textInput' onChangeText={this.onChangeText}></TextInput>
        <Button testID='addButton' title='A' onPress={this.onPress}></Button>
      </View>
    )
  }
}