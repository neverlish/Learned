import React, {
  Component
} from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

class Forecast extends Component {
  render() {
    return (
      <View style={styles.main}>
        <Text style={styles.bigText}>
          {this.props.main}
        </Text>
        <Text style={styles.mainText}>
          Current conditions: {this.props.description}
        </Text>
        <Text style={styles.bigText}>
          {this.props.temp} F
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
  bigText: {
    fontSize: 72,
    textAlign: 'center',
    color: '#FFFFFF'
  },
  mainText: {
    fontSize: 32,
    textAlign: 'center',
    color: '#FFFFFF'
  }
})

export default Forecast;
