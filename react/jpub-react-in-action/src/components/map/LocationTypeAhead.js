import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MapBox from 'mapbox';

export default class LocationTypeAhead extends Component {
    static propTypes = {
        onLocationUpdate: PropTypes.func.isRequired,
        onLocationSelect: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            locations: [],
            selectedLocation: null
        };
        this.mapbox = new MapBox(process.env.MAPBOX_API_TOKEN);
        this.attemptGeoLocation = this.attemptGeoLocation.bind(this);
        this.handleLocationUpdate = this.handleLocationUpdate.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleSelectLocation = this.handleSelectLocation.bind(this);
        this.resetSearch = this.resetSearch.bind(this);
    }

    componentWillMount() {
        this.resetSearch();
    }

    handleLocationUpdate(location) {
        this.setState(() => {
            return {
                text: location.name,
                locations: [],
                selectedLocation: location
            };
        });
        this.props.onLocationUpdate(location);
    }

    handleSearchChange(e) {
        const text = e.target.value;
        this.setState(() => ({ text }));
        if (!text) return;
        this.mapbox.geocodeForward(text, {}).then(loc => {
            if (!loc.entity.features || !loc.entity.features.length) {
                return;
            }
            const locations = loc.entity.features.map(feature => {
                const [lng, lat] = feature.center;
                return {
                    name: feature.place_name,
                    lat,
                    lng
                };
            });
            this.setState(() => ({ locations }));
        });
    }

    attemptGeoLocation() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                ({ coords }) => {
                    const { latitude, longitude } = coords;
                    this.mapbox.geocodeReverse({ latitude, longitude }, {})
                        .then(loc => {
                            if (!loc.entity.features || !loc.entity.features.length) {
                                return;
                            }
                            const feature = loc.entity.features[0];
                            const [lng, lat] = feature.center;
                            const currentLocation = {
                                name: feature.place_name,
                                lat,
                                lng
                            };
                            this.setState(() => ({
                                locations: [currentLocation],
                                selectedLocation: currentLocation,
                                text: currentLocation.name
                            }));
                            this.handleLocationUpdate(currentLocation);
                        })
                },
                null,
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                }
            );
        }
    }

    resetSearch() {
        this.setState(() => {
            return {
                text: '',
                locations: [],
                selectedLocation: null
            }
        });
    }

    handleSelectLocation() {
        this.props.onLocationSelect(this.state.selectedLocation);
    }

    render() {
        return [
            <div key='location-typeahead' className='location-typeahead'>
                <i className='fa fa-location=arrow' onClick={this.attemptGeoLocation} />
                <input
                    onChange={this.handleSearchChange}
                    type='text'
                    placeholder='Enter a location...'
                    value={this.state.text}
                />
                <button
                    disabled={!this.state.selectedLocation}
                    onClick={this.handleSelectLocation}
                    className='open'
                >
                    Select
                </button>
            </div>,
            this.state.text.length && this.state.locations.length ? (
                <div key='location-typeahead-results' className='location-typeahead-results'>
                    {this.state.locations.map(location => {
                        return (
                            <div
                                onClick={e => {
                                    e.preventDefault();
                                    this.handleLocationUpdate(location);
                                }}
                                key={location.name}
                                className='result'
                            >
                                {location.name}
                            </div>
                        )
                    })}
                </div>
            ) : null
        ];
    }
}
