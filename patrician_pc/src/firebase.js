// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from 'firebase/app';
// Add the Firebase products that you want to use
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyA5NISDZy9kL1ivasCILb1aUDBDhhLsdtk',
  authDomain: 'patrician3-pc.firebaseapp.com',
  databaseURL:
    'https://patrician3-pc-default-rtdb.europe-west1.firebasedatabase.app/',
  projectId: 'patrician3-pc',
  storageBucket: 'patrician3-pc.appspot.com',
  messagingSenderId: '56549888874',
  appId: '1:56549888874:web:0f63a238c0bd7d2551cb13',
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const database = app.database();
