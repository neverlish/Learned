import React from 'react';
import { graphql, Mutation, MutationFn, Query } from 'react-apollo';
import ReactDOM from "react-dom";
import { RouteComponentProps } from 'react-router';
import { toast } from 'react-toastify';
import { geoCode, reverseGeocode } from '../../mapHelpers';
import { USER_PROFILE } from '../../sharedQueries';
import {
  acceptRide,
  acceptRideVariables,
  getDrivers,
  getRides,
  reportMovement,
  requestRide,
  requestRideVariables,
  userProfile
} from '../../types/api';
import HomePresenter from './HomePresenter';
import {
  ACCEPT_RIDE,
  GET_NEARBY_DRIVERS,
  GET_NEARBY_RIDE,
  REPOLRT_LOCATION,
  REQUEST_RIDE
} from './HomeQueries';

interface IState {
  isMenuOpen: boolean;
  toAddress: string;
  toLat: number;
  toLng: number;
  lat: number;
  lng: number;
  distance: string;
  duration?: string;
  price?: string;
  fromAddress: string;
  isDriving: boolean;
}

interface IProps extends RouteComponentProps<any> {
  google: any;
  reportLocation: MutationFn;
}

class ProfileQuery extends Query<userProfile> {}
class NearbyQueries extends Query<getDrivers> {}
class RequestRideMutation extends Mutation<requestRide, requestRideVariables> {}
class GetNearbyRides extends Query<getRides> {}
class AcceptRide extends Mutation<acceptRide, acceptRideVariables> {}

class HomeContainer extends React.Component<IProps, IState> {
  public mapRef: any;
  public map: google.maps.Map;
  public userMarker: google.maps.Marker;
  public toMarker: google.maps.Marker;
  public directions: google.maps.DirectionsRenderer;
  public drivers: google.maps.Marker[];

  public state = {
    distance: '',
    duration: undefined,
    fromAddress: '',
    isDriving: false,
    isMenuOpen: false,
    lat: 0,
    lng: 0,
    price: undefined,
    toAddress: '',
    toLat: 0,
    toLng: 0
  };

  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.drivers = [];
  }

  public componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      this.handleGeoSuccess,
      this.handleGeoError
    );
  }

  public render() {
    const {
      distance,
      duration,
      fromAddress,
      isMenuOpen,
      isDriving,
      lat,
      lng,
      toAddress,
      toLat,
      toLng,
      price
    } = this.state;
    return (
      <ProfileQuery query={USER_PROFILE} onCompleted={this.handleProfileQuery}>
        {({ data, loading }) => (
          <NearbyQueries
            query={GET_NEARBY_DRIVERS}
            pollInterval={5000}
            skip={isDriving}
            onCompleted={this.handleNearbyDrivers}
          >
            {() => (
              <RequestRideMutation
                mutation={REQUEST_RIDE}
                onCompleted={this.handleRideRequest}
                variables={{
                  distance,
                  dropOffAddress: toAddress,
                  dropOffLat: toLat,
                  dropOffLng: toLng,
                  duration: duration || '',
                  pickUpAddress: fromAddress,
                  pickUpLat: lat,
                  pickUpLng: lng,
                  price: price || 0,
                }}
              >
                {requestRideFn => (
                  <GetNearbyRides query={GET_NEARBY_RIDE} skip={!isDriving}>
                    {({ data: nearbyRide }) => (
                      <AcceptRide mutation={ACCEPT_RIDE}>
                        {(acceptRideFn) => (
                          <HomePresenter
                            loading={loading}
                            isMenuOpen={isMenuOpen}
                            price={price}
                            toggleMenu={this.toggleMenu}
                            mapRef={this.mapRef}
                            toAddress={toAddress}
                            onInputChange={this.onInputChange}
                            onAddressSubmit={this.onAddressSubmit}
                            data={data}
                            requestRideFn={requestRideFn}
                            nearbyRide={nearbyRide}
                            acceptRideFn={acceptRideFn}
                          />
                        )}
                      </AcceptRide>
                    )}
                  </GetNearbyRides>
                )}
              </RequestRideMutation>
            )}
          </NearbyQueries>
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
    this.getFromAddress(latitude, longitude);
    this.loadMap(latitude, longitude);
  }

  public getFromAddress = async (lat: number, lng: number) => {
    const address = await reverseGeocode(lat, lng);
    if (address) {
      this.setState({
        fromAddress: address
      });
    }
  }

  public loadMap = (lat, lng) => {
    const { google } = this.props;
    const maps = google.maps;
    const mapNode = ReactDOM.findDOMNode(this.mapRef.current);
    if (!mapNode) {
      this.loadMap(lat, lng);
      return;
    }
    const mapConfig: google.maps.MapOptions = {
      center: {
        lat,
        lng
      },
      disableDefaultUI: true,
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
    const { reportLocation } = this.props;
    const { coords: { latitude, longitude } } = position;
    this.userMarker.setPosition({ lat: latitude, lng: longitude });
    this.map.panTo({ lat: latitude, lng: longitude });
    reportLocation({
      variables: {
        lat: parseFloat(latitude.toFixed(10)),
        lng: parseFloat(longitude.toFixed(10))
      }
    });
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
      const bounds = new maps.LatLngBounds();
      bounds.extend({ lat, lng });
      bounds.extend({ lat: this.state.lat, lng: this.state.lng });
      this.map.fitBounds(bounds);
      this.setState({
        toAddress: formattedAddress,
        toLat: lat,
        toLng: lng
      }, this.createPath);
    }
  };

  public createPath = () => {
    const { toLat, toLng, lat, lng } = this.state;
    if (this.directions) {
      this.directions.setMap(null);
    }
    const renderOptions: google.maps.DirectionsRendererOptions = {
      polylineOptions: {
        strokeColor: '#000'
      },
      suppressMarkers: true
    };
    this.directions = new google.maps.DirectionsRenderer(renderOptions);
    const directionService: google.maps.DirectionsService = new google.maps.DirectionsService();
    const to = new google.maps.LatLng(toLat, toLng);
    const from = new google.maps.LatLng(lat, lng);
    const directionOptions: google.maps.DirectionsRequest = {
      destination: to,
      origin: from,
      travelMode: google.maps.TravelMode.TRANSIT
    };
    directionService.route(directionOptions, this.handleRouteRequest);
  };

  public handleRouteRequest =(
    result: google.maps.DirectionsResult,
    status: google.maps.DirectionsStatus
  ) => {
    if (status === google.maps.DirectionsStatus.OK) {
      const { routes } = result;
      const {
        distance: { text: distance },
        duration: { text: duration }
      } = routes[0].legs[0];
      this.directions.setDirections(result);
      this.directions.setMap(this.map);
      this.setState({
        distance,
        duration
      }, this.setPrice);
    } else {
      toast.error('There is no route there, you have to ');
    }
  };

  public setPrice = () => {
    const { distance } = this.state;
    if (distance) {
      this.setState({
        price: Number(parseFloat(distance.replace(',', '')) * 3).toFixed(2),
      });
    }
  };

  public handleNearbyDrivers = (data: {} | getDrivers) => {
    if ('GetNearbyDrivers' in data) {
      const { 
        GetNearbyDrivers: { drivers, ok } 
      } = data;
      if (ok && drivers) {
        for (const driver of drivers) {
          if (driver && driver.lastLat && driver.lastLng) {
            const existingDriver: 
              | google.maps.Marker 
              | undefined 
              = this.drivers.find(
              (driverMarker: google.maps.Marker) => {
                const markerID = driverMarker.get('ID');
                return markerID === driver.id;
              }
            );

            if (existingDriver) {
              existingDriver.setPosition({
                lat:driver.lastLat, 
                lng: driver.lastLng
              });
              existingDriver.setMap(this.map);
            } else {
              const markerOptions: google.maps.MarkerOptions = {
                icon: {
                  path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                  scale: 5
                },
                position: {
                  lat: driver.lastLat,
                  lng: driver.lastLng
                }
              };
              const newMarker: google.maps.Marker = new google.maps.Marker(markerOptions);
              newMarker.set('ID', driver.id);
              newMarker.setMap(this.map);
              this.drivers.push(newMarker);
            }
          }
        }
        this.drivers = [];
      }
    }
  }

  public handleRideRequest = (data: requestRide) => {
    const { RequestRide } = data;
    if (RequestRide.ok) {
      toast.success('Drive requested, finding a driver');
    } else {
      toast.error(RequestRide.error);
    }    
  };

  public handleProfileQuery = (data: userProfile) => {
    const { GetMyProfile } = data;
    if (GetMyProfile.user) {
      const {
        user: { isDriving }
      } = GetMyProfile
      if (isDriving) {
        this.setState({
          isDriving
        });
      }
    }
  }
}

export default graphql<any, reportMovement>(
  REPOLRT_LOCATION, 
  {
    name: 'reportLocation'
  }
)(HomeContainer);
