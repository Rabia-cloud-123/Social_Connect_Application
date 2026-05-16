// ═══════════════════════════════════════════════════════════
// FILE: mobile/src/screens/main/CreatePostScreen.js
// PURPOSE: Create New Post Screen
// ═══════════════════════════════════════════════════════════

import React, {useState} from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import Toast from 'react-native-toast-message';

import ImagePicker from 'react-native-image-crop-picker';

import {createPost} from '../../store/slices/postSlice';

import {
  COLORS,
  FONTS,
  SPACING,
  RADIUS,
  SHADOW,
} from '../../theme';

const CreatePostScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const {loading} = useSelector(state => state.posts);

  const {user} = useSelector(state => state.auth);

  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handleSelectImage = async () => {
    try {
      const selectedImage = await ImagePicker.openPicker({
        width: 800,
        height: 800,
        cropping: true,
        compressImageQuality: 0.8,
      });

      setImage(selectedImage.path);
    } catch (error) {
      console.log('Image Picker Error:', error);
    }
  };

  const handleCreatePost = async () => {
    if (!content.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Post content is required',
      });

      return;
    }

    const postData = {
      userId: user?.uid,
      userName: user?.name || 'Unknown User',
      userImage: user?.profileImage || '',
      content,
      image,
      createdAt: new Date().toLocaleString(),
      likes: 0,
      comments: [],
    };

    const result = await dispatch(createPost(postData));

    if (createPost.fulfilled.match(result)) {
      Toast.show({
        type: 'success',
        text1: 'Post Created Successfully',
      });

      navigation.goBack();
    }

    if (createPost.rejected.match(result)) {
      Toast.show({
        type: 'error',
        text1: 'Failed to create post',
      });
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>
          Create Post
        </Text>

        <Text style={styles.subtitle}>
          Share your thoughts with friends ✨
        </Text>
      </View>

      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="What's on your mind?"
          placeholderTextColor={COLORS.textLight}
          multiline
          value={content}
          onChangeText={setContent}
        />
      </View>

      {/* Image Preview */}
      {image ? (
        <View style={styles.imageContainer}>
          <Image
            source={{uri: image}}
            style={styles.previewImage}
          />

          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => setImage(null)}>

            <Text style={styles.removeButtonText}>
              Remove Image
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {/* Image Picker */}
      <TouchableOpacity
        style={styles.imageButton}
        onPress={handleSelectImage}>

        <Text style={styles.imageButtonText}>
          📷 Select Image
        </Text>
      </TouchableOpacity>

      {/* Post Button */}
      <TouchableOpacity
        style={styles.postButton}
        activeOpacity={0.8}
        onPress={handleCreatePost}
        disabled={loading}>

        {loading ? (
          <ActivityIndicator color={COLORS.white} />
        ) : (
          <Text style={styles.postButtonText}>
            Post Now
          </Text>
        )}
      </TouchableOpacity>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  contentContainer: {
    padding: SPACING.lg,
  },

  header: {
    marginBottom: SPACING.xl,
  },

  title: {
    fontSize: FONTS.sizes.xxxl,
    fontWeight: '700',
    color: COLORS.text,
  },

  subtitle: {
    marginTop: SPACING.sm,
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
  },

  inputContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    minHeight: 180,
    ...SHADOW.sm,
  },

  input: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text,
    textAlignVertical: 'top',
  },

  imageContainer: {
    marginTop: SPACING.lg,
  },

  previewImage: {
    width: '100%',
    height: 250,
    borderRadius: RADIUS.lg,
  },

  removeButton: {
    marginTop: SPACING.md,
    alignSelf: 'center',
  },

  removeButtonText: {
    color: COLORS.error,
    fontWeight: '600',
  },

  imageButton: {
    marginTop: SPACING.xl,
    backgroundColor: COLORS.surface,
    paddingVertical: 15,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    ...SHADOW.sm,
  },

  imageButtonText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: FONTS.sizes.md,
  },

  postButton: {
    marginTop: SPACING.xl,
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    ...SHADOW.md,
  },

  postButtonText: {
    color: COLORS.white,
    fontSize: FONTS.sizes.md,
    fontWeight: '700',
  },
});

export default CreatePostScreen;