import React from 'react';
import { Query } from 'react-apollo';
import ReactDOM from "react-dom";
import { RouteComponentProps } from 'react-router';
import { geoCode } from '../../mapHelpers';
import { USER_PROFILE } from '../../sharedQueries';
import { userProfile } from '../../types/api';
import HomePresenter from './HomePresenter';

interface IState {
  isMenuOpen: boolean;
  toAddress: string;
  toLat: number;
  toLng: number;
  lat: number;
  lng: number;
}

interface IProps extends RouteComponentProps<any> {
  google: any;
}

class ProfileQuery extends Query<userProfile> {}

class HomeContainer extends React.Component<IProps, IState> {
  public mapRef: any;
  public map: google.maps.Map;
  public userMarker: google.maps.Marker;
  public toMarker: google.maps.Marker;

  public state = {
    isMenuOpen: false,
    lat: 0,
    lng: 0,
    toAddress: '',
    toLat: 0,
    toLng: 0
  };

  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }

  public componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      this.handleGeoSuccess,
      this.handleGeoError
    );
  }

  public render() {
    const { isMenuOpen, toAddress } = this.state;
    return (
      <ProfileQuery query={USER_PROFILE}>
        {({ loading }) => (
          <HomePresenter
            loading={loading}
            isMenuOpen={isMenuOpen}
            toggleMenu={this.toggleMenu}
            mapRef={this.mapRef}
            toAddress={toAddress}
            onInputChange={this.onInputChange}
            onAddressSubmit={this.onAddressSubmit}
          />
        )}
      </ProfileQuery>
    );
  }

  public toggleMenu = () => {
    this.setState(state => {
      return {
        isMenuOpen: !state.isMenuOpen
      }
    });
  }

  public handleGeoSuccess = (position: Position) => {
    const {
      coords: { latitude, longitude }
    } = position;
    this.setState({
      lat: latitude,
      lng: longitude
    });
    this.loadMap(latitude, longitude);
  }

  public loadMap = (lat, lng) => {
    const { google } = this.props;
    const maps = google.maps;
    const mapNode = ReactDOM.findDOMNode(this.mapRef.current);
    const mapConfig: google.maps.MapOptions = {
      center: {
        lat,
        lng
      },
      disableDefaultUI: true,
      minZoom: 8,
      zoom: 13
    };
    this.map = new maps.Map(mapNode, mapConfig);
    const userMarkerOption: google.maps.MarkerOptions = {
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 7
      },
      position: {
        lat,
        lng
      },
    };
    this.userMarker = new maps.Marker(userMarkerOption);
    this.userMarker.setMap(this.map);
    const watchOptions: PositionOptions = {
      enableHighAccuracy:  true
    };
    navigator.geolocation.watchPosition(
      this.handleGeoWatchSuccess,
      this.handleGeoWatchError,
      watchOptions
    );
  }

  public handleGeoWatchSuccess = (position: Position) => {
    const { coords: { latitude, longitude } } = position;
    this.userMarker.setPosition({ lat: latitude, lng: longitude });
    this.map.panTo({ lat: latitude, lng: longitude });
  }

  public handleGeoWatchError = () => {
    console.log('ERROR watching you');
  }

  public handleGeoError = () => {
    console.log('No location');
  }

  public onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value }
    } = event;
    this.setState({
      [name]: value
    } as any);
  };

  public onAddressSubmit = async () => {
    const { toAddress } = this.state;
    const { google } = this.props;
    const maps = google.maps;
    const result = await geoCode(toAddress);
    if (result !== false) {
      const { lat, lng, formatted_address: formattedAddress } = result;
      this.setState({
        toAddress: formattedAddress,
        toLat: lat,
        toLng: lng
      });
      if (this.toMarker) {
        this.toMarker.setMap(null);
      }
      const toMarkerOptions: google.maps.MarkerOptions = {
        position: {
          lat,
          lng
        }
      };
      this.toMarker = new maps.Marker(toMarkerOptions);
      this.toMarker.setMap(this.map);
    }
  };
}

export default HomeContainer;
