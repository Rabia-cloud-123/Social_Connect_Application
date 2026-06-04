import React, {useState} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import {useDispatch} from 'react-redux';

import {updatePost as updatePostInStore} from '../../store/slices/postSlice';
import {updatePost} from '../../services/postService';

const EditPostScreen = ({route, navigation}) => {
  const dispatch = useDispatch();
  const {post} = route.params;

  const [content, setContent] = useState(post.content || '');
  const [loading, setLoading] = useState(false);

  const handleUpdatePost = async () => {
    if (!content.trim()) {
      Alert.alert('Validation', 'Post content cannot be empty');
      return;
    }

    try {
      setLoading(true);

      await updatePost(post.id, content);

      dispatch(
        updatePostInStore({
          ...post,
          content,
          updatedAt: new Date().toISOString(),
        }),
      );

      Alert.alert('Success', 'Post updated successfully');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to update post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Edit Post</Text>

      <TextInput
        style={styles.input}
        placeholder="Edit your post"
        multiline
        value={content}
        onChangeText={setContent}
      />

      <TouchableOpacity
        style={[
          styles.updateButton,
          loading && styles.disabledButton,
        ]}
        disabled={loading}
        onPress={handleUpdatePost}>
        <Text style={styles.updateButtonText}>
          {loading ? 'Updating...' : 'Update Post'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
  },
  input: {
    minHeight: 150,
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: 10,
    padding: 15,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  updateButton: {
    backgroundColor: '#1877F2',
    padding: 15,
    borderRadius: 10,
  },
  disabledButton: {
    opacity: 0.7,
  },
  updateButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EditPostScreen;