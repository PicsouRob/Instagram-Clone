import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage';

const config = {
    apiKey: "AIzaSyByyqCUywwdnCgDDl6YOEfxD2V2P0okZCM",
    authDomain: "instagram-db850.firebaseapp.com",
    projectId: "instagram-db850",
    storageBucket: "instagram-db850.appspot.com",
    messagingSenderId: "305171910841",
    appId: "1:305171910841:web:a39c588648ebf53ab10b68"
};

const firebaseApp = firebase.initializeApp(config);
const { FieldValue } = firebase.firestore;

export { firebaseApp, FieldValue };