import firestore from '@react-native-firebase/firestore';

const NOTIFICATIONS_COLLECTION = 'notifications';

export const createNotification = async ({
  receiverId,
  senderId,
  senderName,
  type,
  postId = '',
  message = '',
}) => {
  const notificationData = {
    receiverId,
    senderId,
    senderName,
    type,
    postId,
    message,
    isRead: false,
    createdAt: firestore.FieldValue.serverTimestamp(),
  };

  const docRef = await firestore()
    .collection(NOTIFICATIONS_COLLECTION)
    .add(notificationData);

  return {
    id: docRef.id,
    ...notificationData,
  };
};

export const getUserNotifications = async userId => {
  const snapshot = await firestore()
    .collection(NOTIFICATIONS_COLLECTION)
    .where('receiverId', '==', userId)
    .orderBy('createdAt', 'desc')
    .get();

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const markNotificationAsRead = async notificationId => {
  await firestore()
    .collection(NOTIFICATIONS_COLLECTION)
    .doc(notificationId)
    .update({
      isRead: true,
    });
};

export const subscribeToNotifications = (userId, callback) => {
  return firestore()
    .collection(NOTIFICATIONS_COLLECTION)
    .where('receiverId', '==', userId)
    .orderBy('createdAt', 'desc')
    .onSnapshot(snapshot => {
      const notifications = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      callback(notifications);
    });
};