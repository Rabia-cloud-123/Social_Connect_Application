import firestore from '@react-native-firebase/firestore';

export const getUserById = async userId => {
  if (!userId) {
    return null;
  }

  const userDoc = await firestore()
    .collection('users')
    .doc(String(userId))
    .get();

  if (!userDoc.exists) {
    return null;
  }

  return {
    id: userDoc.id,
    ...userDoc.data(),
  };
};

export const updateUserProfileData = async (userId, profileData) => {
  if (!userId) {
    throw new Error('User ID is missing');
  }

  const cleanData = {
    name: profileData.name || '',
    bio: profileData.bio || '',
    profilePicture: profileData.profilePicture || '',
    updatedAt: firestore.FieldValue.serverTimestamp(),
  };

  await firestore()
    .collection('users')
    .doc(String(userId))
    .set(cleanData, {merge: true});

  return {
    id: String(userId),
    ...cleanData,
  };
};

export const followUser = async (currentUserId, targetUserId) => {
  await firestore()
    .collection('users')
    .doc(String(currentUserId))
    .set(
      {
        following: firestore.FieldValue.arrayUnion(String(targetUserId)),
      },
      {merge: true},
    );

  await firestore()
    .collection('users')
    .doc(String(targetUserId))
    .set(
      {
        followers: firestore.FieldValue.arrayUnion(String(currentUserId)),
      },
      {merge: true},
    );
};

export const unfollowUser = async (currentUserId, targetUserId) => {
  await firestore()
    .collection('users')
    .doc(String(currentUserId))
    .update({
      following: firestore.FieldValue.arrayRemove(String(targetUserId)),
    });

  await firestore()
    .collection('users')
    .doc(String(targetUserId))
    .update({
      followers: firestore.FieldValue.arrayRemove(String(currentUserId)),
    });
};