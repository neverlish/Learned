import React from 'react';
import { clipboard, ipcRenderer } from 'electron';

import Item from './Item';
import Button from './Button';

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

    document.addEventListener('paste', () => {
      ipcRenderer.send('paste', {
        type: this.state.type,
        url: clipboard.readText()
      });
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
              <Button type='home' icon='icon-home' active={this.state.type === 'home'} changeType={this.changeType.bind(this)} />
              <Button type='github' icon='icon-github' active={this.state.type === 'github'} changeType={this.changeType.bind(this)} />
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

  changeType(type) {
    this.setState({type});
  }
}

