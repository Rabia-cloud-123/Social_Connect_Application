// ─────────────────────────────────────────────
// File: backend/src/controllers/postController.js
// Handles all post operations: create, fetch,
// delete, like/unlike, and comments
// ─────────────────────────────────────────────
const { db, rtdb, messaging } = require('../config/firebase');
const admin = require('firebase-admin');

// ── Create Post ──────────────────────────────
const createPost = async (req, res) => {
  const { uid } = req.user;
  const { text, imageURL } = req.body;

  if (!text && !imageURL) {
    return res.status(400).json({ error: 'Post must have text or image' });
  }

  try {
    // Fetch author's profile
    const userDoc = await db.collection('users').doc(uid).get();
    const user = userDoc.data();

    const postData = {
      authorId: uid,
      authorName: user.displayName,
      authorPhoto: user.photoURL || '',
      text: text || '',
      imageURL: imageURL || null,
      likesCount: 0,
      commentsCount: 0,
      createdAt: new Date().toISOString(),
    };

    const postRef = await db.collection('posts').add(postData);

    // Also mirror likesCount in Realtime DB for live updates
    await rtdb.ref(`likes/${postRef.id}`).set({ count: 0 });

    res.status(201).json({ post: { id: postRef.id, ...postData } });
  } catch (error) {
    console.error('createPost error:', error);
    res.status(500).json({ error: 'Failed to create post' });
  }
};

// ── Get All Posts (Feed) ─────────────────────
const getPosts = async (req, res) => {
  const { uid } = req.user;
  const { limit = 20, startAfter } = req.query;

  try {
    let query = db.collection('posts')
      .orderBy('createdAt', 'desc')
      .limit(parseInt(limit));

    // Pagination: startAfter is a post document ID
    if (startAfter) {
      const startDoc = await db.collection('posts').doc(startAfter).get();
      query = query.startAfter(startDoc);
    }

    const snapshot = await query.get();
    const posts = [];

    // For each post, check if current user liked it
    for (const doc of snapshot.docs) {
      const likeId = `${doc.id}_${uid}`;
      const likeDoc = await db.collection('likes').doc(likeId).get();
      posts.push({
        id: doc.id,
        ...doc.data(),
        likedByMe: likeDoc.exists,
      });
    }

    const lastDoc = snapshot.docs[snapshot.docs.length - 1];
    res.json({
      posts,
      nextCursor: lastDoc ? lastDoc.id : null,
    });
  } catch (error) {
    console.error('getPosts error:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

// ── Get Posts by User ────────────────────────
const getUserPosts = async (req, res) => {
  const { userId } = req.params;
  const { uid } = req.user;

  try {
    const snapshot = await db.collection('posts')
      .where('authorId', '==', userId)
      .orderBy('createdAt', 'desc')
      .get();

    const posts = await Promise.all(snapshot.docs.map(async (doc) => {
      const likeId = `${doc.id}_${uid}`;
      const likeDoc = await db.collection('likes').doc(likeId).get();
      return { id: doc.id, ...doc.data(), likedByMe: likeDoc.exists };
    }));

    res.json({ posts });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user posts' });
  }
};

// ── Delete Post ──────────────────────────────
const deletePost = async (req, res) => {
  const { uid } = req.user;
  const { postId } = req.params;

  try {
    const postRef = db.collection('posts').doc(postId);
    const post = await postRef.get();

    if (!post.exists) return res.status(404).json({ error: 'Post not found' });
    if (post.data().authorId !== uid) {
      return res.status(403).json({ error: 'Not your post' });
    }

    await postRef.delete();
    await rtdb.ref(`likes/${postId}`).remove();
    res.json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
};

// ── Like / Unlike Post ───────────────────────
const toggleLike = async (req, res) => {
  const { uid } = req.user;
  const { postId } = req.params;

  // Flat like document ID: "postId_userId"
  const likeId = `${postId}_${uid}`;
  const likeRef = db.collection('likes').doc(likeId);
  const postRef = db.collection('posts').doc(postId);

  try {
    const [likeDoc, postDoc] = await Promise.all([
      likeRef.get(),
      postRef.get(),
    ]);

    if (!postDoc.exists) return res.status(404).json({ error: 'Post not found' });

    const batch = db.batch();
    let liked;

    if (likeDoc.exists) {
      // Unlike: remove like doc, decrement counter
      batch.delete(likeRef);
      batch.update(postRef, { likesCount: admin.firestore.FieldValue.increment(-1) });
      await rtdb.ref(`likes/${postId}/count`).transaction(c => Math.max(0, (c || 0) - 1));
      liked = false;
    } else {
      // Like: create like doc, increment counter
      batch.set(likeRef, { postId, userId: uid, createdAt: new Date().toISOString() });
      batch.update(postRef, { likesCount: admin.firestore.FieldValue.increment(1) });
      await rtdb.ref(`likes/${postId}/count`).transaction(c => (c || 0) + 1);
      liked = true;

      // Send push notification to post author
      const post = postDoc.data();
      if (post.authorId !== uid) {
        const authorDoc = await db.collection('users').doc(post.authorId).get();
        const fcmToken = authorDoc.data()?.fcmToken;
        if (fcmToken) {
          await messaging.send({
            token: fcmToken,
            notification: {
              title: '❤️ New Like',
              body: `${(await db.collection('users').doc(uid).get()).data()?.displayName} liked your post`,
            },
            data: { postId, type: 'like' },
          }).catch(e => console.log('FCM error:', e.message)); // Non-fatal
        }
      }
    }

    await batch.commit();
    const updatedPost = await postRef.get();
    res.json({ liked, likesCount: updatedPost.data().likesCount });
  } catch (error) {
    console.error('toggleLike error:', error);
    res.status(500).json({ error: 'Failed to toggle like' });
  }
};

// ── Add Comment ──────────────────────────────
const addComment = async (req, res) => {
  const { uid } = req.user;
  const { postId } = req.params;
  const { text } = req.body;

  if (!text?.trim()) return res.status(400).json({ error: 'Comment cannot be empty' });

  try {
    const userDoc = await db.collection('users').doc(uid).get();
    const user = userDoc.data();

    const commentData = {
      authorId: uid,
      authorName: user.displayName,
      authorPhoto: user.photoURL || '',
      text: text.trim(),
      createdAt: new Date().toISOString(),
    };

    const commentRef = await db
      .collection('posts').doc(postId)
      .collection('comments').add(commentData);

    // Increment comment count on the parent post
    await db.collection('posts').doc(postId).update({
      commentsCount: admin.firestore.FieldValue.increment(1),
    });

    // Notify post author
    const postDoc = await db.collection('posts').doc(postId).get();
    const post = postDoc.data();
    if (post.authorId !== uid) {
      const authorDoc = await db.collection('users').doc(post.authorId).get();
      const fcmToken = authorDoc.data()?.fcmToken;
      if (fcmToken) {
        await messaging.send({
          token: fcmToken,
          notification: {
            title: '💬 New Comment',
            body: `${user.displayName}: ${text.trim().substring(0, 50)}`,
          },
          data: { postId, type: 'comment' },
        }).catch(e => console.log('FCM error:', e.message));
      }
    }

    res.status(201).json({ comment: { id: commentRef.id, ...commentData } });
  } catch (error) {
    console.error('addComment error:', error);
    res.status(500).json({ error: 'Failed to add comment' });
  }
};

// ── Get Comments ─────────────────────────────
const getComments = async (req, res) => {
  const { postId } = req.params;
  try {
    const snapshot = await db
      .collection('posts').doc(postId)
      .collection('comments')
      .orderBy('createdAt', 'asc')
      .get();

    const comments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json({ comments });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
};

module.exports = { createPost, getPosts, getUserPosts, deletePost, toggleLike, addComment, getComments };