// ═══════════════════════════════════════════════════════════
// FILE: backend/src/controllers/userController.js
// FOLDER: backend → src → controllers
// PURPOSE: User profile CRUD, FCM token save, user search
// ═══════════════════════════════════════════════════════════

const { db } = require('../config/firebase');

// ─────────────────────────────────────────────
// GET /api/users/:userId
// Fetch any user's public profile by their UID
// ─────────────────────────────────────────────
const getUserProfile = async (req, res) => {
  const { userId } = req.params;
  try {
    const doc = await db.collection('users').doc(userId).get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Return only public fields — never expose fcmToken to other users
    const { uid, displayName, bio, photoURL, createdAt } = doc.data();
    res.json({ user: { uid, displayName, bio, photoURL, createdAt } });
  } catch (error) {
    console.error('getUserProfile error:', error.message);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
};

// ─────────────────────────────────────────────
// PUT /api/users/me/profile
// Update the currently logged-in user's profile
// Body: { displayName?, bio?, photoURL? }
// ─────────────────────────────────────────────
const updateProfile = async (req, res) => {
  const { uid } = req.user;
  const { displayName, bio, photoURL } = req.body;

  const updates = {};
  if (displayName !== undefined) {
    if (displayName.trim().length < 2) {
      return res.status(400).json({ error: 'Display name must be at least 2 characters' });
    }
    updates.displayName = displayName.trim();
  }
  if (bio !== undefined) {
    if (bio.length > 160) {
      return res.status(400).json({ error: 'Bio must be 160 characters or less' });
    }
    updates.bio = bio;
  }
  if (photoURL !== undefined) updates.photoURL = photoURL;

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ error: 'No valid fields to update' });
  }

  try {
    await db.collection('users').doc(uid).update(updates);

    // If displayName or photoURL changed, propagate to all their posts
    if (updates.displayName || updates.photoURL) {
      const postsSnap = await db.collection('posts').where('authorId', '==', uid).get();
      const batch = db.batch();
      postsSnap.docs.forEach(doc => {
        const postUpdates = {};
        if (updates.displayName) postUpdates.authorName = updates.displayName;
        if (updates.photoURL) postUpdates.authorPhoto = updates.photoURL;
        batch.update(doc.ref, postUpdates);
      });
      await batch.commit();
    }

    res.json({ message: 'Profile updated successfully', updates });
  } catch (error) {
    console.error('updateProfile error:', error.message);
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

// ─────────────────────────────────────────────
// PUT /api/users/me/fcm-token
// Save Firebase Cloud Messaging token for push notifications
// Body: { fcmToken: string }
// ─────────────────────────────────────────────
const updateFcmToken = async (req, res) => {
  const { uid } = req.user;
  const { fcmToken } = req.body;

  if (!fcmToken || typeof fcmToken !== 'string') {
    return res.status(400).json({ error: 'A valid fcmToken string is required' });
  }

  try {
    await db.collection('users').doc(uid).update({ fcmToken });
    res.json({ message: 'FCM token saved successfully' });
  } catch (error) {
    console.error('updateFcmToken error:', error.message);
    res.status(500).json({ error: 'Failed to save FCM token' });
  }
};

// ─────────────────────────────────────────────
// GET /api/users/search?q=john
// Search users by displayName prefix (min 2 chars)
// ─────────────────────────────────────────────
const searchUsers = async (req, res) => {
  const { q } = req.query;
  const { uid } = req.user;

  if (!q || q.trim().length < 2) {
    return res.status(400).json({ error: 'Search query must be at least 2 characters' });
  }

  try {
    const snapshot = await db.collection('users')
      .where('displayName', '>=', q)
      .where('displayName', '<=', q + '\uf8ff')
      .limit(15)
      .get();

    const users = snapshot.docs
      .filter(doc => doc.id !== uid)
      .map(doc => ({
        uid: doc.id,
        displayName: doc.data().displayName,
        photoURL: doc.data().photoURL || '',
        bio: doc.data().bio || '',
      }));

    res.json({ users, count: users.length });
  } catch (error) {
    console.error('searchUsers error:', error.message);
    res.status(500).json({ error: 'Search failed' });
  }
};

// ─────────────────────────────────────────────
// GET /api/users/me/full
// Get full profile of the logged-in user (private fields included)
// ─────────────────────────────────────────────
const getMyFullProfile = async (req, res) => {
  const { uid } = req.user;
  try {
    const doc = await db.collection('users').doc(uid).get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'Profile not found. Please register first.' });
    }
    res.json({ user: doc.data() });
  } catch (error) {
    console.error('getMyFullProfile error:', error.message);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};

module.exports = {
  getUserProfile,
  updateProfile,
  updateFcmToken,
  searchUsers,
  getMyFullProfile,
};