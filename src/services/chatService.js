import firestore from '@react-native-firebase/firestore';

const CHATS_COLLECTION = 'chats';

export const sendMessage = async ({
  senderId,
  receiverId,
  text,
}) => {
  const message = {
    senderId,
    receiverId,
    text,
    createdAt: firestore.FieldValue.serverTimestamp(),
  };

  await firestore()
    .collection(CHATS_COLLECTION)
    .add(message);

  return message;
};

export const getMessages = async (
  currentUserId,
  otherUserId,
) => {
  const snapshot = await firestore()
    .collection(CHATS_COLLECTION)
    .orderBy('createdAt', 'asc')
    .get();

  const messages = snapshot.docs
    .map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))
    .filter(
      item =>
        (item.senderId === currentUserId &&
          item.receiverId === otherUserId) ||
        (item.senderId === otherUserId &&
          item.receiverId === currentUserId),
    );

  return messages;
};

export const subscribeToMessages = (
  currentUserId,
  otherUserId,
  callback,
) => {
  return firestore()
    .collection(CHATS_COLLECTION)
    .orderBy('createdAt', 'asc')
    .onSnapshot(snapshot => {
      const messages = snapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter(
          item =>
            (item.senderId === currentUserId &&
              item.receiverId === otherUserId) ||
            (item.senderId === otherUserId &&
              item.receiverId === currentUserId),
        );

      callback(messages);
    });
};