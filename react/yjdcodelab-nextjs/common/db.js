import firebase from '../common/firebase';

const db = firebase.firestore();
const settings = { timestampsInSnapshots: true };
db.settings(settings);

export default db;