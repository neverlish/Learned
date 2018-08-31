import { GoogleApiWrapper } from 'google-maps-react';

import FindAddressContainer from './FindAddressContainer';
export default GoogleApiWrapper({ 
  apiKey: 'AIzaSyCcSbi344Vmou325UWfAGqENHv5PliGY3k' 
})(FindAddressContainer);
