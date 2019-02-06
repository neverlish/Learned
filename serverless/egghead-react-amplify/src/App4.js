import React, { Component } from 'react';

import { withAuthenticator } from 'aws-amplify-react';
import { Storage } from 'aws-amplify';

class App extends Component {
  state = {
    fileUrl: '',
    file: '',
    filename: ''
  }

  componentDidMount() {
    Storage.get('a_2mb.png')
      .then(data => {
        this.setState({
          fileUrl: data
        })
      })
      .catch(err => {
        console.log('error fetching image');
      })
  }

  handleChange = e => {
    const file = e.target.files[0];
    this.setState({
      fileUrl: URL.createObjectURL(file),
      file,
      filename: file.name
    });
  }

  saveFile = () => {
    Storage.put(this.state.filename, this.state.file)
      .then(() => {
        console.log('successfully saved file!')
        this.setState({ fileUrl: '', file: '', filename: '' });
      })
      .catch(err => {
        console.log('error uploading file!', err);
      })
  }

  render() {
    return (
      <div className="App">
        <input type='file' onChange={this.handleChange} />
        <img src={this.state.fileUrl} />
        <button onClick={this.saveFile}>Save File</button>
      </div>
    );
  }
}

export default withAuthenticator(App, { includeGreetings: true });
