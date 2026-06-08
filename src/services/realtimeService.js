import firestore from '@react-native-firebase/firestore';

/*
|--------------------------------------------------------------------------
| Real-Time Posts Listener
|--------------------------------------------------------------------------
*/

export const subscribeToPosts = callback => {
  return firestore()
    .collection('posts')
    .orderBy('createdAt', 'desc')
    .onSnapshot(
      snapshot => {
        const posts = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        callback(posts);
      },
      error => {
        console.log(
          'Posts subscription error:',
          error,
        );
      },
    );
};

/*
|--------------------------------------------------------------------------
| Real-Time Notifications Listener
|--------------------------------------------------------------------------
*/

export const subscribeToUserNotifications = (
  userId,
  callback,
) => {
  return firestore()
    .collection('notifications')
    .where('receiverId', '==', userId)
    .orderBy('createdAt', 'desc')
    .onSnapshot(
      snapshot => {
        const notifications = snapshot.docs.map(
          doc => ({
            id: doc.id,
            ...doc.data(),
          }),
        );

        callback(notifications);
      },
      error => {
        console.log(
          'Notifications subscription error:',
          error,
        );
      },
    );
};

/*
|--------------------------------------------------------------------------
| Real-Time Comments Listener
|--------------------------------------------------------------------------
*/

export const subscribeToComments = (
  postId,
  callback,
) => {
  return firestore()
    .collection('posts')
    .doc(postId)
    .onSnapshot(
      documentSnapshot => {
        if (documentSnapshot.exists) {
          const data = documentSnapshot.data();

          callback(data.comments || []);
        }
      },
      error => {
        console.log(
          'Comments subscription error:',
          error,
        );
      },
    );
};

/*
|--------------------------------------------------------------------------
| Real-Time User Listener
|--------------------------------------------------------------------------
*/

export const subscribeToUserProfile = (
  userId,
  callback,
) => {
  return firestore()
    .collection('users')
    .doc(userId)
    .onSnapshot(
      documentSnapshot => {
        if (documentSnapshot.exists) {
          callback({
            id: documentSnapshot.id,
            ...documentSnapshot.data(),
          });
        }
      },
      error => {
        console.log(
          'User subscription error:',
          error,
        );
      },
    );
};