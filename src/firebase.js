import firebase from 'firebase/app';
import 'firebase/firestore';

const config = {
  apiKey: "AIzaSyAcOzyZAAG2euE_aSp2A0OEjG-_q9olRTQ",
  authDomain: "todos-2240f.firebaseapp.com",
  projectId: "todos-2240f",
  storageBucket: "todos-2240f.appspot.com",
  messagingSenderId: "461644525046",
  appId: "1:461644525046:web:2e30bb2af220d34c0a6bd7"
}

firebase.initializeApp(config)
firebase.firestore()

export default firebase;