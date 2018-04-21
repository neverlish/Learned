import React, { Component } from 'react';
import Search from './components/Search';
import ShortList from './components/ShortList';
import NamesList from './components/NamesList';
import Credit from './components/Credit';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filterText: '',
      favourites: []
    }
  }

  filterUpdate(value) {
    this.setState({
      filterText: value
    })
  }

  addFavourite(id) {
    const favList = this.state.favourites.concat([id])
    this.setState({
      favourites: favList
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
          <ShortList 
            favourites={this.state.favourites}
            data={this.props.data}
          />
          <NamesList 
            data={this.props.data} 
            filterText={this.state.filterText}
            addFavourite={this.addFavourite.bind(this)}
          />
          <Credit />
        </main>
      </div>
    )
  }
}

export default App;
