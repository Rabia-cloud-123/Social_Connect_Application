// ─────────────────────────────────────────────
// File: backend/src/config/firebase.js
// Initializes Firebase Admin SDK (server-side)
// ─────────────────────────────────────────────
const admin = require('firebase-admin');

// serviceAccountKey.json is downloaded from:
// Firebase Console → Project Settings → Service Accounts → Generate new private key
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // Replace with your Realtime Database URL from Firebase Console
  databaseURL: `https://socialconnect-a8898-default-rtdb.firebaseio.com`,
});

// Export the three services we'll use throughout the app
const db = admin.firestore();          // Firestore (documents & collections)
const rtdb = admin.database();         // Realtime Database (live like counts)
const auth = admin.auth();             // Auth (verify tokens)
const messaging = admin.messaging();   // FCM push notifications

module.exports = { admin, db, rtdb, auth, messaging };