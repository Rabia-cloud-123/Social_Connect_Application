import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const registerUser = async ({name, email, password}) => {
  const userCredential = await auth().createUserWithEmailAndPassword(
    email,
    password,
  );

  const user = userCredential.user;

  const userData = {
    id: user.uid,
    name,
    email: user.email,
    bio: '',
    profilePicture: '',
    followers: [],
    following: [],
    createdAt: firestore.FieldValue.serverTimestamp(),
  };

  await firestore()
    .collection('users')
    .doc(user.uid)
    .set(userData);

  return userData;
};

export const loginUser = async ({email, password}) => {
  const userCredential = await auth().signInWithEmailAndPassword(
    email,
    password,
  );

  const user = userCredential.user;

  const userDoc = await firestore()
    .collection('users')
    .doc(user.uid)
    .get();

  if (userDoc.exists) {
    return userDoc.data();
  }

  return {
    id: user.uid,
    name: 'Social Connect User',
    email: user.email,
    bio: '',
    profilePicture: '',
    followers: [],
    following: [],
  };
};

export const logoutCurrentUser = async () => {
  await auth().signOut();
};

export const resetUserPassword = async email => {
  await auth().sendPasswordResetEmail(email);
};