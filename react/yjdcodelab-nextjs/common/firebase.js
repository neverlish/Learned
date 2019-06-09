import firebase from 'firebase';
import config from '../config/firebase';

try {
  firebase.app();
} catch (error) {
  firebase.initializeApp(config);
}

export default firebase;