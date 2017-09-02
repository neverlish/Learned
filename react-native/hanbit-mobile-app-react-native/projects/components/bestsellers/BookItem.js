import React, { Component } from 'react';

import { StyleSheet, Text, View, Image, ListView } from 'react-native';

class BookItem extends Component {
  propTypes: {
    coverURL: React.PropTypes.string,
    author: React.PropTypes.string,
    title: React.PropTypes.string
  };
  
  render() {
    return (
      <View style={styles.bookItem}>
        <Image style={styles.cover} source={{ url: this.props.coverURL }}/>
        <View style={styles.info}>
          <Text style={styles.author}>{this.props.author}</Text>
          <Text style={styles.title}>{this.props.title}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bookItem: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#AAAAAA',
    borderBottomWidth: 2,
    padding: 5
  },
  cover: {
    flex: 1,
    height: 150,
    resizeMode: 'contain'
  },
  info: {
    flex: 3,
    alignItems: 'flex-end',
    flexDirection: 'column',
    alignSelf: 'center',
    padding: 20
  },
  author: {
    fontSize: 18,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default BookItem;
