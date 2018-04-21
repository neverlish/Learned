import React, { Component } from 'react';
import Search from './components/Search';
import ShortList from './components/ShortList';
import NamesList from './components/NamesList';
import Credit from './components/Credit';

class App extends Component {
  render() {

    return (
      <div>
        <Search />
        <main>
          <ShortList />
          <NamesList data={this.props.data} />
          <Credit />
        </main>
      </div>
    )
  }
}

export default App;
