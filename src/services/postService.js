import firestore from '@react-native-firebase/firestore';

const POSTS_COLLECTION = 'posts';

export const createPost = async ({
  userId,
  userName,
  content,
  image = '',
}) => {
  if (!userId) {
    throw new Error('User ID is missing');
  }

  if (!content || !content.trim()) {
    throw new Error('Post content is required');
  }

  const postData = {
    userId: String(userId),
    userName: userName || 'Social Connect User',
    content: content.trim(),
    image: image || '',
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

export const updatePost = async (postId, updatedContent) => {
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

export const togglePostLike = async (postId, userId, isLiked) => {
  await firestore()
    .collection(POSTS_COLLECTION)
    .doc(postId)
    .update({
      likes: isLiked
        ? firestore.FieldValue.arrayRemove(String(userId))
        : firestore.FieldValue.arrayUnion(String(userId)),
    });
};

export const addCommentToPost = async (postId, comment) => {
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
    .where('userId', '==', String(userId))
    .get();

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};