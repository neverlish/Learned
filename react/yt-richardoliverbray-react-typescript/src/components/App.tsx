import * as React from 'react';

export class App extends React.Component<IProps, {}> {
  render() {
    return <h1>Hello {this.props.name}</h1>;
  }
}

interface IProps {
  name: string;
}
