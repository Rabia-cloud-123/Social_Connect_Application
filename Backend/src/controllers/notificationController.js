// ═══════════════════════════════════════════════════════════
// FILE: backend/src/controllers/notificationController.js
// FOLDER: backend → src → controllers
// PURPOSE: Send push notifications via Firebase Cloud Messaging
// ═══════════════════════════════════════════════════════════

const { db, messaging } = require('../config/firebase');

/**
 * POST /api/notifications/send
 * Manually send a notification to a specific user.
 * Body: { targetUserId, title, body, data }
 */
const sendNotification = async (req, res) => {
  const { uid } = req.user; // sender (logged-in user)
  const { targetUserId, title, body, data = {} } = req.body;

  if (!targetUserId || !title || !body) {
    return res.status(400).json({ error: 'targetUserId, title, and body are required' });
  }

  // Don't notify yourself
  if (targetUserId === uid) {
    return res.status(200).json({ message: 'Skipped — cannot notify yourself' });
  }

  try {
    // Fetch the target user's FCM token from Firestore
    const targetDoc = await db.collection('users').doc(targetUserId).get();
    if (!targetDoc.exists) {
      return res.status(404).json({ error: 'Target user not found' });
    }

    const { fcmToken } = targetDoc.data();
    if (!fcmToken) {
      return res.status(200).json({ message: 'User has no FCM token registered' });
    }

    // Build the FCM message payload
    const message = {
      token: fcmToken,
      notification: { title, body },
      // `data` must be string values for FCM
      data: Object.fromEntries(
        Object.entries(data).map(([k, v]) => [k, String(v)])
      ),
      android: {
        priority: 'high',
        notification: { channelId: 'social_connect_default' },
      },
      apns: {
        payload: { aps: { sound: 'default', badge: 1 } },
      },
    };

    const response = await messaging.send(message);
    res.json({ success: true, messageId: response });
  } catch (error) {
    console.error('sendNotification error:', error.message);
    // FCM token invalid/expired — clean it up
    if (error.code === 'messaging/registration-token-not-registered') {
      await db.collection('users').doc(targetUserId).update({ fcmToken: '' });
      return res.status(200).json({ message: 'Token was invalid, cleared from DB' });
    }
    res.status(500).json({ error: 'Failed to send notification' });
  }
};

/**
 * POST /api/notifications/send-multicast
 * Send the same notification to multiple users at once.
 * Body: { userIds: string[], title, body, data }
 */
const sendMulticastNotification = async (req, res) => {
  const { userIds, title, body, data = {} } = req.body;

  if (!Array.isArray(userIds) || userIds.length === 0 || !title || !body) {
    return res.status(400).json({ error: 'userIds[], title, body are required' });
  }

  try {
    // Batch-fetch all user documents
    const userRefs = userIds.map(id => db.collection('users').doc(id));
    const userDocs = await db.getAll(...userRefs);

    // Collect valid FCM tokens
    const tokens = userDocs
      .filter(doc => doc.exists && doc.data().fcmToken)
      .map(doc => doc.data().fcmToken);

    if (tokens.length === 0) {
      return res.status(200).json({ message: 'No valid tokens found' });
    }

    const multicastMessage = {
      tokens,
      notification: { title, body },
      data: Object.fromEntries(
        Object.entries(data).map(([k, v]) => [k, String(v)])
      ),
    };

    const response = await messaging.sendEachForMulticast(multicastMessage);
    res.json({
      successCount: response.successCount,
      failureCount: response.failureCount,
    });
  } catch (error) {
    console.error('sendMulticastNotification error:', error.message);
    res.status(500).json({ error: 'Failed to send multicast notification' });
  }
};

/**
 * GET /api/notifications/test
 * Quick test endpoint — sends a notification to the caller's own device.
 */
const testNotification = async (req, res) => {
  const { uid } = req.user;
  try {
    const userDoc = await db.collection('users').doc(uid).get();
    const { fcmToken, displayName } = userDoc.data();

    if (!fcmToken) {
      return res.status(400).json({ error: 'No FCM token on your account. Open the app first.' });
    }

    await messaging.send({
      token: fcmToken,
      notification: {
        title: '🔔 Test Notification',
        body: `Hi ${displayName}! Push notifications are working.`,
      },
      data: { type: 'test' },
    });

    res.json({ message: 'Test notification sent!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { sendNotification, sendMulticastNotification, testNotification };