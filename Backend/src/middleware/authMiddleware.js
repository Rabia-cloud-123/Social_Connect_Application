// ─────────────────────────────────────────────
// File: backend/src/middleware/authMiddleware.js
// Verifies the Firebase ID token sent in the
// Authorization header: "Bearer <token>"
// ─────────────────────────────────────────────
const { auth } = require('../config/firebase');

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check header format
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const idToken = authHeader.split('Bearer ')[1];

  try {
    // Firebase Admin verifies the JWT token
    const decodedToken = await auth.verifyIdToken(idToken);
    // Attach user info to request so controllers can use it
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
    };
    next();
  } catch (error) {
    console.error('Token verification failed:', error.message);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = { verifyToken };