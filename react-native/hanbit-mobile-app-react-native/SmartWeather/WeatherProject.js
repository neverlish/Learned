import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  AsyncStorage
} from 'react-native';

import Forecast from './Forecast';
import LocationButton from './LocationButton';

import PhotoBackdrop from './PhotoBackdrop';

const STORAGE_KEY = '@WeatherProject:zip';
const WEATHER_API_KEY = 'bbeb34ebf60ad50f7893e7440a1e2b0b';
const API_STEM = 'https://api.openweathermap.org/data/2.5/weather?';

export default class WeatherProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zip: '',
      forecast: null
    };

    // ES6 클래스 방식으로 컴포넌트를 작성하면 이벤트 핸들러에 this를 바인딩해야 한다
    this._getForecastForZip = this._getForecastForZip.bind(this);
    this._getForecastForCoords = this._getForecastForCoords.bind(this);
    this._getForecast = this._getForecast.bind(this);
    this._handleTextChange = this._handleTextChange.bind(this);
  }

  componentDidMount() {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((value) => {
        if (value !== null) {
          this._getForecastForZip(value);
        }
      })
      .catch((error) => console.log('AsyncStorage error: ' + errpr.message))
      .done();
  }
  
  _getForecastForZip(zip) {
    // zip 코드를 저장한다
    AsyncStorage.setItem(STORAGE_KEY, zip)
      .then(() => console.log('Saved selection to disk: ' + zip))
      .catch((error) => console.log('AsyncStorage error: ' + error.message))
      .done()

    this._getForecast(`${API_STEM}q=${zip}&units=imperial&APPID=${WEATHER_API_KEY}`);
  }

  _getForecastForCoords(lat, lon) {
    this._getForecast(`${API_STEM}lat=${lat}&lon=${lon}&units=imperial&APPID=${WEATHER_API_KEY}`);
  }

  _getForecast(url, cb) {
    fetch(url)
      .then((response) => response.json())
      .then((responseJSON) => {
        this.setState({
          forecast: {
            main: responseJSON.weather[0].main,
            description: responseJSON.weather[0].description,
            temp: responseJSON.main.temp
          }
        });
      })
      .catch((error) => {
        console.warn(error);
      });
  }

  _handleTextChange(event) {
    var zip = event.nativeEvent.text;
    this.setState({zip:zip});
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + zip + '&units=imperial&APPID=' + WEATHER_API_KEY)
      .then((response) => response.json())
      .then((responseJSON) => {
        this.setState({
          forecast: {
            main: responseJSON.weather[0].main,
            description: responseJSON.weather[0].description,
            temp: responseJSON.main.temp
          }
        })
      })
      .catch((error) => {
        console.warn(error);
      })
  }

  render() {
    var content = null;
    if (this.state.forecast !== null) {
      content = <Forecast
                  main={this.state.forecast.main}
                  description={this.state.forecast.description}
                  temp={this.state.forecast.temp}/>
    }
    return (
      <PhotoBackdrop>
        <View style={styles.overlay}>
          <View style={styles.row}>
            <Text style={styles.mainText}>
              Current weather for
            </Text>
            <View style={styles.zipContainer}>
              <TextInput
                style={[styles.zipCode, styles.mainText]}
                returnKeyType='go'
                onSubmitEditing={(event) => this._handleTextChange(event)}/>
            </View>
          </View>

          <View style={styles.row}>
            <LocationButton onGetCoords={this._getForecastForCoords}/>
          </View>
          {content}
        </View>
      </PhotoBackdrop>
    );
  }
}

const baseFontSize = 16;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    flexDirection: 'column'
  },
  overlay: {
    paddingTop: 5,
    backgroundColor: '#000000',
    opacity: 0.5,
    flexDirection: 'column',
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'flex-start',
    padding: 30
  },
  zipContainer: {
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    marginLeft: 5,
    marginTop: 3,
  },
  zipCode: {
    
    width: 50,
    height: baseFontSize,
    padding: 0
  },
  mainText: {
    fontSize: baseFontSize,
    color: '#FFFFFF'
  }
});
