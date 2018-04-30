import React, { Component, PropTypes } from 'react';
import SearchBar from './SearchBar';
import ContactList from './ContactList';
import LoaderHOC from './HOC/LoaderHOC'
import './ContactsApp.css';

@LoaderHOC('contacts')
class ContactsApp extends Component {
  state = {
    filterText: ''
  };

  static propTypes = {
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        thumbnail: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string
      })
    ).isRequired,
    loadTime: PropTypes.string
  }

  handleUserInput = (searchTerm) => {
    this.setState({filterText: searchTerm})
  }

  render() {
    return(
      <div className="contactApp">
        <SearchBar filterText={this.state.filterText}
                   onUserInput={this.handleUserInput} />
        <ContactList contacts={this.props.contacts}
                     filterText={this.state.filterText}/>
        <p>Loading time {this.props.loadTime} seconds</p>
      </div>
    )
  }
}


export default ContactsApp;
