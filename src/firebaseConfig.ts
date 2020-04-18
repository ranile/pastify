import * as firebase from 'firebase/app';
import 'firebase/firestore';

// firebase init goes here
const config = {
}
firebase.initializeApp(config)

// firebase utils
const db = firebase.firestore()
// const auth = firebase.auth()

const Timestamp = firebase.firestore.Timestamp
// firebase collections
const pastesCollection = db.collection('pastes')

export {
    Timestamp,
    db,
    // auth,
    pastesCollection,
}
