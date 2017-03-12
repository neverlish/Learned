import React, {Component} from 'react';
import {View, Text, StyleSheet, Platform, ListView, Keyboard} from 'react-native';
import Header from './header';
import Footer from './footer';
import Row from './row';

class App extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      allComplete: false,
      value: "",
      items: [],
      dataSource: ds.cloneWithRows([])
    }
    this.setSource = this.setSource.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.handleToggleComplete = this.handleToggleComplete.bind(this);
    this.handleToggleAllComplete = this.handleToggleAllComplete.bind(this);
  }

  setSource(items, itemsDataSource, otherState={}) {
    this.setState({
      items,
      dataSource: this.state.dataSource.cloneWithRows(itemsDataSource),
      ... otherState
    })
  }

  handleAddItem() {
    if(!this.state.value) return;
    const newItems = [
      ... this.state.items,
      {
        key: Date.now(),
        text: this.state.value,
        complete: false
      }
    ]
    this.setState({
      items: newItems,
      value: ""
    })
    this.setSource(newItems, newItems, {values: ""})
  }

  handleRemoveItem(key) {
    const newItems = this.state.items.filter((item) => {
      return item.key !== key
    })
    this.setSource(newItems, newItems);
  }

  handleToggleComplete(key, complete) {
    const newItems = this.state.items.map((item) => {
      if (item.key !== key) return item;
      return {
        ... item,
        complete
      }
    })
    this.setSource(newItems, newItems);
  }

  handleToggleAllComplete() {
    const complete = !this.state.allComplete;
    const newItems = this.state.items.map((item) => ({
      ... item,
      complete
    }));
    this.setState({
      items: newItems,
      allComplete: complete
    })
    this.setSource(newItems, newItems, {allComplete: complete})
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          value={this.state.value}
          onAddItem={this.handleAddItem}
          onChange={(value) => this.setState({value})}
          onToggleAllComplete={this.handleToggleAllComplete}
        />
        <View style={styles.content}>
          <ListView
            style={styles.list}
            enableEmptySections
            dataSource={this.state.dataSource}
            onScroll={() => Keyboard.dismiss()}
            renderRow={({key, ... value}) => {
              return (
                <Row
                  key={key}
                  onRemove={() => this.handleRemoveItem(key)}
                  onComplete={(complete) => this.handleToggleComplete(key, complete)}
                  {... value}
                />
              )
            }}
            renderSeparator={(sectionId, rowId) => {
              return <View key={rowId} style={styles.separator}/>
            }}
          />
        </View>
        <Footer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    ... Platform.select({
      ios: { paddingTop: 30 }
    })
  },
  content: {
    flex: 1
  },
  list: {
    backgroundColor: '#FFF'
  },
  separator: {
    borderWidth: 1,
    borderColor: '#F5F5F5'
  }
});

export default App;
