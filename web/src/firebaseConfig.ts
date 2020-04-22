import * as firebase from 'firebase/app'
import 'firebase/firestore'

// firebase init goes here
const config = {
    apiKey: 'AIzaSyCc0IZmGnwe4zxsW8VrRq9-ujM6wP-bcCw',
    authDomain: 'mykotlinfirebaseproject.firebaseapp.com',
    databaseURL: 'https://mykotlinfirebaseproject.firebaseio.com',
    projectId: 'mykotlinfirebaseproject',
    storageBucket: 'mykotlinfirebaseproject.appspot.com',
    messagingSenderId: '322067682532',
    appId: '1:322067682532:web:363f71c8a4c2606b',
    // UH oh
}
firebase.initializeApp(config)

// firebase utils
const db = firebase.firestore()

const Timestamp = firebase.firestore.Timestamp
// firebase collections
const pastesCollection = db.collection('pastes')

export { Timestamp, db, pastesCollection }
