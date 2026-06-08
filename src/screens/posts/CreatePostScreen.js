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
import {useSelector} from 'react-redux';

import {createPost} from '../../services/postService';

const CreatePostScreen = ({navigation}) => {
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

      if (result.assets?.length > 0) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to select image');
    }
  };

  const handleCreatePost = async () => {
    if (!content.trim()) {
      Alert.alert(
        'Validation',
        'Please enter something to post',
      );
      return;
    }

    try {
      setLoading(true);

      await createPost({
        userId: user?.id,
        userName: user?.name,
        content,
        image,
        likes: [],
        comments: [],
      });

      Alert.alert(
        'Success',
        'Post created successfully',
      );

      navigation.goBack();
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
        Create New Post
      </Text>

      <View style={styles.card}>
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
            📷 Add Image
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.postButton}
          disabled={loading}
          onPress={handleCreatePost}>
          <Text style={styles.postButtonText}>
            {loading
              ? 'Posting...'
              : 'Create Post'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F4F6FF',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    elevation: 4,
  },
  input: {
    minHeight: 140,
    textAlignVertical: 'top',
    fontSize: 16,
    color: '#1F2937',
  },
  previewImage: {
    width: '100%',
    height: 220,
    borderRadius: 16,
    marginTop: 15,
  },
  imageButton: {
    marginTop: 16,
    backgroundColor: '#EEF2FF',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  imageButtonText: {
    color: '#6C63FF',
    fontWeight: '700',
  },
  postButton: {
    marginTop: 18,
    backgroundColor: '#FF6584',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  postButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default CreatePostScreen;