import firebase from "firebase";

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyA1jK4dhuIEURH-Bxb04hbjkZ1Qi8FBx9Y",
  authDomain: "gcb-bank---development.firebaseapp.com",
  projectId: "gcb-bank---development",
  storageBucket: "gcb-bank---development.appspot.com",
  messagingSenderId: "749801242564",
  appId: "1:749801242564:web:589497d15a187d499d2e91",
};

export default function firebaseClient() {
  if (!firebase.apps.length) {
    firebase.initializeApp(FIREBASE_CONFIG);
  }
}
