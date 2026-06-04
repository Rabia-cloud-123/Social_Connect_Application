import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import PostList from '../../components/posts/PostList';
import CreatePostButton from '../../components/posts/CreatePostButton';
import {
  getPosts,
  togglePostLike,
  deletePost,
} from '../../services/postService';
import {
  setPosts,
  toggleLike,
  deletePost as deletePostFromStore,
} from '../../store/slices/postSlice';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const {posts} = useSelector(state => state.posts);
  const {user} = useSelector(state => state.auth);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const postList = await getPosts();
      dispatch(setPosts(postList));
    } catch (error) {
      Alert.alert('Error', 'Failed to load posts');
    }
  };

  const handleLike = async post => {
    const isLiked = post.likes?.includes(user.id);

    try {
      await togglePostLike(post.id, user.id, isLiked);

      dispatch(
        toggleLike({
          postId: post.id,
          userId: user.id,
        }),
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to update like');
    }
  };

  const handleComment = post => {
    navigation.navigate('Comments', {
      post,
    });
  };

  const handleEdit = post => {
    navigation.navigate('EditPost', {
      post,
    });
  };

  const handleDelete = post => {
    Alert.alert(
      'Delete Post',
      'Are you sure you want to delete this post?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deletePost(post.id);
              dispatch(deletePostFromStore(post.id));
            } catch (error) {
              Alert.alert('Error', 'Failed to delete post');
            }
          },
        },
      ],
    );
  };

  const handleUserPress = post => {
    if (post.userId === user.id) {
      navigation.navigate('Profile');
      return;
    }

    navigation.navigate('UserProfile', {
      userId: post.userId,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Social Connect</Text>

      <PostList
        posts={posts}
        currentUserId={user?.id}
        onLike={handleLike}
        onComment={handleComment}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onUserPress={handleUserPress}
      />

      <CreatePostButton
        onPress={() => navigation.navigate('CreatePost')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    fontSize: 26,
    fontWeight: '700',
    padding: 20,
    color: '#222222',
  },
});

export default HomeScreen;