import React, { Component } from 'react';
import Search from './components/Search';
import ShortList from './components/ShortList';
import NamesList from './components/NamesList';
import Credit from './components/Credit';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filterText: ''
    }
  }

  filterUpdate(value) {
    this.setState({
      filterText: value
    })
  }

  render() {
    return (
      <div>
        <Search 
          filterText={this.state.filterText} 
          filterUpdate={this.filterUpdate.bind(this)}
        />
        <main>
          <ShortList />
          <NamesList 
            data={this.props.data} 
            filterText={this.state.filterText}
          />
          <Credit />
        </main>
      </div>
    )
  }
}

export default App;
