import React, {Component} from 'react';
import {Image, Platform} from 'react-native';

import ImagePicker from 'react-native-image-picker';
import styles from './style.js';
import Button from './../Button';

class PhotoBackdrop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoSource: require('./flowers.png')
    };
  }

  _pickImage() {
    // 여기서는 안드로이드에서도 동작하는 서드파티 이미지 파커 모듈을 사용했다
    
    var options = {
      title: 'Select Image',
      cancelButtonTitle: 'Cancel',
      chooseFromLibraryButtonTitle: 'Choose From Library...',
      takePhotoButtonTitle: 'Take Photo...',
      cameraType: 'back', // 'front' 혹은 'back'
      mediaType: 'photo' // 'photo' 혹은 'video'
    };

    ImagePicker.showImagePicker(
      options,
      (response) => {
        console.log('response = ', response);

        if (response.didCancel) {
          console.log('Canceled ImagePicker');
        }
        else if (response.error) {
          console.log('ImagePicker error: ', response.error);
        }
        else {
          var source;
          if (Platform.OS == 'ios') {
            source = {uri: response.uri.replace('file://', ''), isStatic: true};
          }
          else {
            source = {uri: response.uri, isStatic: true}
          }
          this.setState({ photoSource: source});
        }

      }
    );
  }

  render() {
    return (
      <Image
        style={styles.backdrop}
        source={this.state.photoSource}
        resizeMode='cover'>
        {this.props.children}
        <Button
          style={styles.button}
          label='Load Image'
          onPress={this._pickImage.bind(this)}/>
      </Image>
    );
  }
}

export default PhotoBackdrop;
