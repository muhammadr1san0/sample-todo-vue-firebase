import firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCZCwrBhdRp5qqaLiPsoAmC5Z2TgPnYnK0',
  authDomain: 'week8fullstackweb-b1525.firebaseapp.com',
  databaseURL: 'https://week8fullstackweb-b1525.firebaseio.com',
  projectId: 'week8fullstackweb-b1525',
  storageBucket: 'week8fullstackweb-b1525.appspot.com',
  messagingSenderId: '992162595778',
  appId: '1:992162595778:web:cb2ea8b01dec1fcd888c5b'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
const firestore = firebase.firestore()
firestore.settings({ timestampsInSnapshots: true })
export default firestore
