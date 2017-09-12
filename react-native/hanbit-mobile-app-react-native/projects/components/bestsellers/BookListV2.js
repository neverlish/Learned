import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, ListView } from 'react-native';

import BookItem from './BookItem'

const API_KEY = "73b19491b83909c7e07016f4bb4644f9:2:60667290";
const QUERY_TYPE = "hardcover-fiction";
const API_STEM = "https://api.nytimes.com/svc/books/v3/lists";
const ENDPOINT = `${API_STEM}/${QUERY_TYPE}?response-format=json&api-key=${API_KEY}`;

class SimpleList extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows([])
    }
  }

  componentDidMount() {
    this._refreshData();
  }

  _refreshData() {
    fetch(ENDPOINT)
      .then((response) => response.json())
      .then((rjson) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(rjson.results.books)
        });
      });
  }

  _renderRow(rowData) {
    return <BookItem
              coverURL={rowData.book_image}
              title={rowData.title}
              author={rowData.author}/>;
  }

  _renderHeader() {
    return (
      <View style={styles.sectionDivider}>
        <Text style={styles.headingText}>
          Bestsellsers in Hardcover fiction
        </Text>
      </View>
    );
  }

  _renderFooter() {
    return (
      <View style={styles.sectionDivider}>
        <Text>
          Data from the New York Times bestsellers list.
        </Text>
      </View>
    );
  }

  render() {
    return (
      <ListView
        style={{marginTop: 24}}
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
        renderHeader={this._renderHeader}
        renderFooter={this._renderFooter}
      />
    );
  }
}

const styles = StyleSheet.create({
  row: {
    fontSize: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#DDDDDD'
  },
  sectionDivider: {
    padding: 8,
    backgroundColor: "#EEEEEE",
    alignItems: "center"
  },
  headingText: { 
    flex: 1,
    fontSize: 24,
    alignSelf: "center" 
  }
})

export default SimpleList
