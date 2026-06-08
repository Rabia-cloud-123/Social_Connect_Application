import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Alert,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import PostList from '../../components/posts/PostList';
import CreatePostButton from '../../components/posts/CreatePostButton';
import {subscribeToPosts} from '../../services/realtimeService';
import {
  togglePostLike,
  deletePost,
} from '../../services/postService';
import {
  setPosts,
  toggleLike,
  deletePost as deletePostFromStore,
} from '../../store/slices/postSlice';

const demoPosts = [
  {
    id: 'demo_1',
    userId: 'demo_user_1',
    userName: 'Ayesha Khan',
    content: 'Just joined Social Connect! Excited to share updates here 😊',
    image: '',
    likes: ['1', '2', '3'],
    comments: [
      {id: 'c1', text: 'Welcome!', userName: 'Ali'},
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'demo_2',
    userId: 'demo_user_2',
    userName: 'Ali Raza',
    content: 'Working on my React Native project today. Firebase integration is fun!',
    image: '',
    likes: ['1', '2'],
    comments: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'demo_3',
    userId: 'demo_user_3',
    userName: 'Sara Ahmed',
    content: 'Social Connect is looking clean and simple. Great for connecting with friends.',
    image: '',
    likes: ['1'],
    comments: [
      {id: 'c2', text: 'Nice!', userName: 'Hassan'},
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'demo_4',
    userId: 'demo_user_4',
    userName: 'Hassan Malik',
    content: 'Don’t forget to test login, posts, comments, profile, and chat before final submission.',
    image: '',
    likes: [],
    comments: [],
    createdAt: new Date().toISOString(),
  },
];

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const {posts} = useSelector(state => state.posts);
  const {user} = useSelector(state => state.auth);

  useEffect(() => {
    const unsubscribe = subscribeToPosts(firebasePosts => {
      if (firebasePosts.length > 0) {
        dispatch(setPosts(firebasePosts));
      } else {
        dispatch(setPosts(demoPosts));
      }
    });

    return unsubscribe;
  }, [dispatch]);

  const handleLike = async post => {
    if (post.id.startsWith('demo_')) {
      return;
    }

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
    if (post.id.startsWith('demo_')) {
      return;
    }

    navigation.navigate('EditPost', {
      post,
    });
  };

  const handleDelete = post => {
    if (post.id.startsWith('demo_')) {
      return;
    }

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
    if (post.id.startsWith('demo_')) {
      return;
    }

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
      <View style={styles.headerBox}>
        <Text style={styles.header}>Social Connect</Text>
        <Text style={styles.subtitle}>Share your moments with friends</Text>
      </View>

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
    backgroundColor: '#F4F6FF',
  },
  headerBox: {
    backgroundColor: '#6C63FF',
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 4,
  },
  header: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 14,
    color: '#EDEBFF',
    marginTop: 5,
  },
});

export default HomeScreen;