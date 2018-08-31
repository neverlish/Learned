import React from 'react';
import { Mutation } from 'react-apollo';
import { RouteComponentProps } from 'react-router';
import { toast } from 'react-toastify';
import { GET_PLACES } from '../../sharedQueries';
import { addPlace, addPlaceVariables } from '../../types/api';
import AddPlacesPresenter from './AddPlacesPresenter';
import { ADD_PLACE } from './AddPlacesQuery';

interface IState {
  address: string;
  lat: number;
  lng: number;
  name: string;
}

interface IProps extends RouteComponentProps<any> {}

class AddPlaceQuery extends Mutation<addPlace, addPlaceVariables> {}

class AddPlacesContainer extends React.Component<IProps, IState> {
  public state = {
    address: '',
    lat: 1.34,
    lng: 1.34,
    name: ''
  };
  
  public render() {
    const { address, lat, lng, name } = this.state;
    const { history } = this.props;
    return (
      <AddPlaceQuery
        mutation={ADD_PLACE}
        onCompleted={data => {
          const { AddPlace } = data;
          if (AddPlace.ok) {
            toast.success('Place added');
            setTimeout(() => {
              history.push('/places')
            }, 2000);
          } else {
            toast.error(AddPlace.error);
          }
        }}
        refetchQueries={[{ query: GET_PLACES }]}
        variables={{
          address,
          isFav: false,
          lat,
          lng,
          name
        }}
      >
        {(addPlaceFn, { loading }) => (
          <AddPlacesPresenter
            onInputChange={this.onInputChange}
            address={address}
            name={name}
            loading={loading}
            onSubmit={addPlaceFn}
          />
        )}
      </AddPlaceQuery>
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
