import React from 'react';
import { RouteComponentProps } from 'react-router';
import AddPlacesPresenter from './AddPlacesPresenter';

interface IState {
  address: string;
  name: string;
}

interface IProps extends RouteComponentProps<any> {}

class AddPlacesContainer extends React.Component<IProps, IState> {
  public state = {
    address: '',
    name: ''
  };
  
  public render() {
    const { address, name } = this.state;
    return (
      <AddPlacesPresenter
        onInputChange={this.onInputChange}
        address={address}
        name={name}
      />
    );
  }

  public onInputChange: React.ChangeEventHandler<
    HTMLInputElement
  > = async event => {
    const {
      target: { name, value }
    } = event;
    this.setState({
      [name]: value
    } as any);
  }
}

export default AddPlacesContainer;
