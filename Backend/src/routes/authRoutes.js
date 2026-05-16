// ─────────────────────────────────────────────
// File: backend/src/routes/authRoutes.js
// ─────────────────────────────────────────────
const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const { registerUser, getMe } = require('../controllers/authController');

// POST /api/auth/register — create Firestore profile after signup
router.post('/register', verifyToken, registerUser);

// GET /api/auth/me — get current user's profile
router.get('/me', verifyToken, getMe);

module.exports = router;