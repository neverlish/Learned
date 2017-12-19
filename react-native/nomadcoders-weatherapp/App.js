import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Weather from './Weather';

export default class App extends React.Component {
  state = {
    isLoaded: true
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          isLoaded: true
        });
      },
      error => {
        console.log(error);
      }
    );
  }
  render() {
    const { isLoaded } = this.state;
    return (
      <View style={styles.container}>
      <StatusBar hidden={true}/>
        {isLoaded ? (
          <Weather/> 
        ) : (
          <View style={styles.loading}>
            <Text style={styles.loadingText}>Getting the fucking weather</Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  loading: {
    flex: 1,
    backgroundColor: '#FDF6AA',
    justifyContent: 'flex-end',
    paddingLeft: 25
  },
  loadingText: {
    fontSize: 38,
    marginBottom: 100
  }
});
