// ═══════════════════════════════════════════════════════════
// FILE: mobile/src/screens/main/EditProfileScreen.js
// PURPOSE: Edit User Profile Screen
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

import {updateUserProfile} from '../../store/slices/authSlice';

import {
  COLORS,
  FONTS,
  SPACING,
  RADIUS,
  SHADOW,
} from '../../theme';

const EditProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const {user, loading} = useSelector(state => state.auth);

  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [profileImage, setProfileImage] = useState(
    user?.profileImage || '',
  );

  const handleSelectImage = async () => {
    try {
      const selectedImage = await ImagePicker.openPicker({
        width: 500,
        height: 500,
        cropping: true,
        compressImageQuality: 0.8,
      });

      setProfileImage(selectedImage.path);
    } catch (error) {
      console.log('Image Picker Error:', error);
    }
  };

  const handleUpdateProfile = async () => {
    if (!name.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Name is required',
      });

      return;
    }

    const updatedData = {
      name,
      bio,
      profileImage,
    };

    const result = await dispatch(
      updateUserProfile(updatedData),
    );

    if (updateUserProfile.fulfilled.match(result)) {
      Toast.show({
        type: 'success',
        text1: 'Profile Updated Successfully',
      });

      navigation.goBack();
    }

    if (updateUserProfile.rejected.match(result)) {
      Toast.show({
        type: 'error',
        text1: 'Failed to update profile',
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
          Edit Profile
        </Text>

        <Text style={styles.subtitle}>
          Update your personal information
        </Text>
      </View>

      {/* Profile Image */}
      <View style={styles.imageContainer}>

        <Image
          source={{
            uri:
              profileImage ||
              'https://i.pravatar.cc/300',
          }}
          style={styles.profileImage}
        />

        <TouchableOpacity
          style={styles.changePhotoButton}
          activeOpacity={0.8}
          onPress={handleSelectImage}>

          <Text style={styles.changePhotoText}>
            Change Photo
          </Text>
        </TouchableOpacity>

      </View>

      {/* Name */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          Full Name
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          placeholderTextColor={COLORS.textLight}
          value={name}
          onChangeText={setName}
        />
      </View>

      {/* Email */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          Email
        </Text>

        <TextInput
          style={[
            styles.input,
            styles.disabledInput,
          ]}
          value={user?.email}
          editable={false}
        />
      </View>

      {/* Bio */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          Bio
        </Text>

        <TextInput
          style={[styles.input, styles.bioInput]}
          placeholder="Write something about yourself..."
          placeholderTextColor={COLORS.textLight}
          multiline
          value={bio}
          onChangeText={setBio}
        />
      </View>

      {/* Save Button */}
      <TouchableOpacity
        style={styles.saveButton}
        activeOpacity={0.8}
        onPress={handleUpdateProfile}
        disabled={loading}>

        {loading ? (
          <ActivityIndicator color={COLORS.white} />
        ) : (
          <Text style={styles.saveButtonText}>
            Save Changes
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
    paddingBottom: 100,
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

  imageContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },

  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },

  changePhotoButton: {
    marginTop: SPACING.md,
  },

  changePhotoText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: FONTS.sizes.md,
  },

  inputGroup: {
    marginBottom: SPACING.lg,
  },

  label: {
    marginBottom: SPACING.sm,
    color: COLORS.text,
    fontWeight: '600',
  },

  input: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: 14,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOW.sm,
  },

  disabledInput: {
    backgroundColor: '#EAEAEA',
    color: COLORS.textSecondary,
  },

  bioInput: {
    minHeight: 120,
    textAlignVertical: 'top',
  },

  saveButton: {
    marginTop: SPACING.lg,
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    ...SHADOW.md,
  },

  saveButtonText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: FONTS.sizes.md,
  },
});

export default EditProfileScreen;