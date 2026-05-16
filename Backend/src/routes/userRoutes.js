// ─────────────────────────────────────────────
// File: backend/src/routes/userRoutes.js
// ─────────────────────────────────────────────
const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const {
  getUserProfile,
  updateProfile,
  updateFcmToken,
  searchUsers,
} = require('../controllers/userController');

router.use(verifyToken);

router.get('/search', searchUsers);                  // Search users by name
router.get('/:userId', getUserProfile);              // Get any user profile
router.put('/me/profile', updateProfile);            // Update own profile
router.put('/me/fcm-token', updateFcmToken);         // Save push notification token

module.exports = router;