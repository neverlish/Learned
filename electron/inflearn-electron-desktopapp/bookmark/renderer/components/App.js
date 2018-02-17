import React from 'react';
import { ipcRenderer } from 'electron';

import Item from './Item';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: 'home',
      data: []
    };
    
    ipcRenderer.on('update',(event, data) => {
      this.setState({data: data});
    });
  }
  render() {
    const items = this.state.data.filter((item, index) => {
      item.removeId = index;
      return item.type === this.state.type;
    }).map(item => {
      return <Item url={item.url} title={item.title} removeId={item.removeId} key={item.removeId} />
    });
    return (
      <div className="window">
        <header className="toolbar toolbar-header">
          <div className="toolbar-actions">
            <h1 className="title">Jinho's Bookmark</h1>
          
            <div className="btn-group">
              <button className="btn btn-default" id='btn-home'>
                <span className="icon icon-home"></span>
              </button>
              <button className="btn btn-default" id='btn-github'>
                <span className="icon icon-github"></span>
              </button>
            </div>
          </div>
        </header>

        <div className="window-content">
          <ul className="list-group" id='data'>
            {items}
          </ul>
        </div>
      </div>
    );
  }
}

