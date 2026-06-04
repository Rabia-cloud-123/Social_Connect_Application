import firestore from '@react-native-firebase/firestore';

export const getUserById = async userId => {
  const userDoc = await firestore()
    .collection('users')
    .doc(userId)
    .get();

  if (!userDoc.exists) {
    return null;
  }

  return userDoc.data();
};

export const updateUserProfileData = async (userId, profileData) => {
  await firestore()
    .collection('users')
    .doc(userId)
    .update(profileData);

  return {
    id: userId,
    ...profileData,
  };
};

export const followUser = async (currentUserId, targetUserId) => {
  await firestore()
    .collection('users')
    .doc(currentUserId)
    .update({
      following: firestore.FieldValue.arrayUnion(targetUserId),
    });

  await firestore()
    .collection('users')
    .doc(targetUserId)
    .update({
      followers: firestore.FieldValue.arrayUnion(currentUserId),
    });
};

export const unfollowUser = async (currentUserId, targetUserId) => {
  await firestore()
    .collection('users')
    .doc(currentUserId)
    .update({
      following: firestore.FieldValue.arrayRemove(targetUserId),
    });

  await firestore()
    .collection('users')
    .doc(targetUserId)
    .update({
      followers: firestore.FieldValue.arrayRemove(currentUserId),
    });
};