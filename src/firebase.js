import firebase from 'firebase';
import 'firebase/firestore';
import "firebase/auth"
import "firebase/database"
import "firebase/storage"

var firebaseConfig = {
    apiKey: "AIzaSyD9zjMROLk7RA7dEQW2sf4Bpa_WwkWxg1E",
    authDomain: "ecommerce-b0fd4.firebaseapp.com",
    databaseURL: "https://ecommerce-b0fd4.firebaseio.com",
    projectId: "ecommerce-b0fd4",
    storageBucket: "ecommerce-b0fd4.appspot.com",
    messagingSenderId: "473555377236",
    appId: "1:473555377236:web:2efe006df1c1369581a1c1",
    measurementId: "G-7L8M3ZE182"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore()