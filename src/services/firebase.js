import {initializeApp} from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

/*
|--------------------------------------------------------------------------
| Firebase Configuration
|--------------------------------------------------------------------------
|
| Replace the values below with your Firebase project configuration.
| Android configuration is usually handled automatically through:
| android/app/google-services.json
|
| iOS configuration is handled through:
| ios/GoogleService-Info.plist
|
*/

const firebaseConfig = {
  apiKey: 'AIzaSyC7KshDMP3fC36cIGVdVsHXpyOH_11QYrY',
  authDomain: 'YOUR_PROJECT.firebaseapp.com',
  projectId: 'socialconnect-a8898',
  storageBucket: 'socialconnect-a8898.firebasestorage.app',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

let app;

try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  // Firebase already initialized
}

export {auth, firestore};

export default app;