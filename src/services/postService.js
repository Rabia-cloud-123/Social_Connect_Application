import firestore from '@react-native-firebase/firestore';

const POSTS_COLLECTION = 'posts';

export const createPost = async ({
  userId,
  userName,
  content,
  image = '',
}) => {
  const postData = {
    userId,
    userName,
    content,
    image,
    likes: [],
    comments: [],
    createdAt: firestore.FieldValue.serverTimestamp(),
  };

  const docRef = await firestore()
    .collection(POSTS_COLLECTION)
    .add(postData);

  return {
    id: docRef.id,
    ...postData,
  };
};

export const getPosts = async () => {
  const snapshot = await firestore()
    .collection(POSTS_COLLECTION)
    .orderBy('createdAt', 'desc')
    .get();

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const updatePost = async (
  postId,
  updatedContent,
) => {
  await firestore()
    .collection(POSTS_COLLECTION)
    .doc(postId)
    .update({
      content: updatedContent,
      updatedAt: firestore.FieldValue.serverTimestamp(),
    });
};

export const deletePost = async postId => {
  await firestore()
    .collection(POSTS_COLLECTION)
    .doc(postId)
    .delete();
};

export const togglePostLike = async (
  postId,
  userId,
  isLiked,
) => {
  await firestore()
    .collection(POSTS_COLLECTION)
    .doc(postId)
    .update({
      likes: isLiked
        ? firestore.FieldValue.arrayRemove(userId)
        : firestore.FieldValue.arrayUnion(userId),
    });
};

export const addCommentToPost = async (
  postId,
  comment,
) => {
  await firestore()
    .collection(POSTS_COLLECTION)
    .doc(postId)
    .update({
      comments: firestore.FieldValue.arrayUnion(comment),
    });
};

export const getUserPosts = async userId => {
  const snapshot = await firestore()
    .collection(POSTS_COLLECTION)
    .where('userId', '==', userId)
    .get();

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};