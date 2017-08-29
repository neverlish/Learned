import React, {Component} from 'react';

class Language extends Component {
  render() {
    return <li>{this.props.item.name} <span className="lang-desc">({this.props.item.details})</span></li>;
  }
}

export default Language;
