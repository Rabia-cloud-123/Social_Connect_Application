// ─────────────────────────────────────────────
// File: mobile/src/config/firebase.js
// Firebase client SDK — used directly in the app
// for Auth and real-time operations
// ─────────────────────────────────────────────

// @react-native-firebase auto-reads google-services.json (Android)
// and GoogleService-Info.plist (iOS). No manual init needed.
// These imports just give us typed references to each service.

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import messaging from '@react-native-firebase/messaging';

export { auth, firestore, database, storage, messaging };