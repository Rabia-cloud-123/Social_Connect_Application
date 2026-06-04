import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  SafeAreaView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {addCommentToPost} from '../../services/postService';
import {addComment} from '../../store/slices/postSlice';

const CommentsScreen = ({route}) => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.auth);

  const {post} = route.params;
  const [commentText, setCommentText] = useState('');

  const handleAddComment = async () => {
    if (!commentText.trim()) {
      Alert.alert('Validation', 'Please enter a comment');
      return;
    }

    const newComment = {
      id: Date.now().toString(),
      userId: user?.id,
      userName: user?.name || 'User',
      text: commentText,
      createdAt: new Date().toISOString(),
    };

    try {
      await addCommentToPost(post.id, newComment);

      dispatch(
        addComment({
          postId: post.id,
          comment: newComment,
        }),
      );

      setCommentText('');
    } catch (error) {
      Alert.alert('Error', 'Failed to add comment');
    }
  };

  const renderComment = ({item}) => (
    <View style={styles.commentCard}>
      <Text style={styles.userName}>{item.userName}</Text>
      <Text style={styles.commentText}>{item.text}</Text>
      <Text style={styles.timeText}>
        {new Date(item.createdAt).toLocaleString()}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Comments</Text>

      <FlatList
        data={post.comments || []}
        keyExtractor={item => item.id}
        renderItem={renderComment}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No comments yet.
          </Text>
        }
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Write a comment..."
          value={commentText}
          onChangeText={setCommentText}
        />

        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleAddComment}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 15,
  },
  commentCard: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 1,
  },
  userName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1877F2',
    marginBottom: 4,
  },
  commentText: {
    fontSize: 14,
    color: '#333333',
  },
  timeText: {
    fontSize: 11,
    color: '#999999',
    marginTop: 6,
  },
  emptyText: {
    textAlign: 'center',
    color: '#888888',
    marginTop: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 8,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
  },
  sendButton: {
    backgroundColor: '#1877F2',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default CommentsScreen;