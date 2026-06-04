import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useSelector, useDispatch} from 'react-redux';

import {createPost} from '../../services/postService';
import {addPost} from '../../store/slices/postSlice';

const CreatePostScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.auth);

  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSelectImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
      });

      if (result.didCancel) {
        return;
      }

      if (
        result.assets &&
        result.assets.length > 0
      ) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'Failed to select image',
      );
    }
  };

  const handleCreatePost = async () => {
    if (!content.trim()) {
      Alert.alert(
        'Validation',
        'Please enter post content',
      );
      return;
    }

    try {
      setLoading(true);

      const newPost = await createPost({
        userId: user?.id,
        userName: user?.name,
        content,
        image,
      });

      dispatch(addPost(newPost));

      setContent('');
      setImage('');

      Alert.alert(
        'Success',
        'Post created successfully',
      );

      if (navigation) {
        navigation.goBack();
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'Failed to create post',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        Create Post
      </Text>

      <TextInput
        style={styles.input}
        placeholder="What's on your mind?"
        multiline
        value={content}
        onChangeText={setContent}
      />

      {image ? (
        <Image
          source={{uri: image}}
          style={styles.previewImage}
        />
      ) : null}

      <TouchableOpacity
        style={styles.imageButton}
        onPress={handleSelectImage}>
        <Text style={styles.imageButtonText}>
          Select Image
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.postButton,
          loading && styles.disabledButton,
        ]}
        disabled={loading}
        onPress={handleCreatePost}>
        <Text style={styles.postButtonText}>
          {loading ? 'Posting...' : 'Post'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
  },
  input: {
    minHeight: 120,
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: 10,
    padding: 15,
    textAlignVertical: 'top',
    marginBottom: 15,
  },
  previewImage: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 15,
  },
  imageButton: {
    backgroundColor: '#F1F3F5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  imageButtonText: {
    textAlign: 'center',
    fontWeight: '600',
  },
  postButton: {
    backgroundColor: '#1877F2',
    padding: 15,
    borderRadius: 10,
  },
  disabledButton: {
    opacity: 0.7,
  },
  postButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CreatePostScreen;