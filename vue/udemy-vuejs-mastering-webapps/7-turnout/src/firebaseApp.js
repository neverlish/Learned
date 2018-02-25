import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyAScvXt8CvQT0d2uDHr293O2T5DZ65xKNU",
  authDomain: "urnout-267d4.firebaseapp.com",
  databaseURL: "https://urnout-267d4.firebaseio.com",
  projectId: "urnout-267d4",
  storageBucket: "",
  messagingSenderId: "1007492358046"
};

export const firebaseApp = firebase.initializeApp(config)
export const eventsRef = firebaseApp.database().ref().child('events')
