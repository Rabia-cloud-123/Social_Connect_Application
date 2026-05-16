// ─────────────────────────────────────────────
// File: backend/src/routes/postRoutes.js
// ─────────────────────────────────────────────
const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const {
  createPost,
  getPosts,
  getUserPosts,
  deletePost,
  toggleLike,
  addComment,
  getComments,
} = require('../controllers/postController');

// All routes require authentication
router.use(verifyToken);

router.post('/', createPost);                        // Create post
router.get('/', getPosts);                           // Get feed
router.get('/user/:userId', getUserPosts);           // Get user's posts
router.delete('/:postId', deletePost);               // Delete post
router.post('/:postId/like', toggleLike);            // Like/unlike
router.post('/:postId/comments', addComment);        // Add comment
router.get('/:postId/comments', getComments);        // Get comments

module.exports = router;