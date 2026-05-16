// ─────────────────────────────────────────────
// File: backend/src/controllers/authController.js
// Handles creating the Firestore user document
// after Firebase client-side auth succeeds
// ─────────────────────────────────────────────
const { db } = require('../config/firebase');

/**
 * POST /api/auth/register
 * Called after successful Firebase signup.
 * Creates a user document in Firestore.
 */
const registerUser = async (req, res) => {
  const { uid, email } = req.user; // populated by verifyToken middleware
  const { displayName } = req.body;

  try {
    const userRef = db.collection('users').doc(uid);
    const existing = await userRef.get();

    if (existing.exists) {
      // User already registered — return their data
      return res.status(200).json({ user: existing.data() });
    }

    // Create new user document
    const userData = {
      uid,
      email,
      displayName: displayName || 'New User',
      bio: '',
      photoURL: '',
      fcmToken: '',
      createdAt: new Date().toISOString(),
    };

    await userRef.set(userData);
    res.status(201).json({ user: userData });
  } catch (error) {
    console.error('registerUser error:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
};

/**
 * GET /api/auth/me
 * Returns the current authenticated user's profile.
 */
const getMe = async (req, res) => {
  const { uid } = req.user;
  try {
    const doc = await db.collection('users').doc(uid).get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ user: doc.data() });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

module.exports = { registerUser, getMe };