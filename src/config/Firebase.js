// Initialize Firebase
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

var config = {
  apiKey: "AIzaSyBaw8nNuZLld5s_jYcBZHePqDDxitn2iVo",
  authDomain: "autora-a1.firebaseapp.com",
  databaseURL: "https://autora-a1.firebaseio.com",
  projectId: "autora-a1",
  storageBucket: "autora-a1.appspot.com",
  messagingSenderId: "107072092595"
};

export let fireB = firebase.initializeApp(config);
export let db = firebase.firestore(); //Database export.
 
