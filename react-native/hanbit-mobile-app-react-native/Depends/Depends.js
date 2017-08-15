import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

var _ = require('lodash');

export default class Depends extends Component {
  constructor() {
    super();
    console.log('Random number: ' + _.random(0, 5))
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

