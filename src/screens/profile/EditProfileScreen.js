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
import {useDispatch, useSelector} from 'react-redux';

import {updateUserProfile} from '../../store/slices/authSlice';
import {updateUserProfileData} from '../../services/userService';

const EditProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.auth);

  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [profilePicture, setProfilePicture] = useState(
    user?.profilePicture || '',
  );
  const [loading, setLoading] = useState(false);

  const handleSelectImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
      });

      if (
        result.assets &&
        result.assets.length > 0
      ) {
        setProfilePicture(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to select image');
    }
  };

  const handleSaveProfile = async () => {
    if (!name.trim()) {
      Alert.alert('Validation', 'Name is required');
      return;
    }

    try {
      setLoading(true);

      const updatedData = {
        name,
        bio,
        profilePicture,
      };

      await updateUserProfileData(
        user.id,
        updatedData,
      );

      dispatch(updateUserProfile(updatedData));

      Alert.alert(
        'Success',
        'Profile updated successfully',
      );

      navigation.goBack();
    } catch (error) {
      Alert.alert(
        'Error',
        'Failed to update profile',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        Edit Profile
      </Text>

      {profilePicture ? (
        <Image
          source={{uri: profilePicture}}
          style={styles.profileImage}
        />
      ) : (
        <View style={styles.placeholderImage}>
          <Text style={styles.placeholderText}>
            {name?.charAt(0)?.toUpperCase() || 'U'}
          </Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.imageButton}
        onPress={handleSelectImage}>
        <Text style={styles.imageButtonText}>
          Change Profile Picture
        </Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={[styles.input, styles.bioInput]}
        placeholder="Bio"
        multiline
        value={bio}
        onChangeText={setBio}
      />

      <TouchableOpacity
        style={[
          styles.saveButton,
          loading && styles.disabledButton,
        ]}
        disabled={loading}
        onPress={handleSaveProfile}>
        <Text style={styles.saveButtonText}>
          {loading ? 'Saving...' : 'Save Changes'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  placeholderImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#1877F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  placeholderText: {
    color: '#FFFFFF',
    fontSize: 40,
    fontWeight: '700',
  },
  imageButton: {
    marginBottom: 20,
  },
  imageButtonText: {
    color: '#1877F2',
    fontWeight: '600',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  bioInput: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  saveButton: {
    width: '100%',
    backgroundColor: '#1877F2',
    padding: 15,
    borderRadius: 10,
  },
  disabledButton: {
    opacity: 0.7,
  },
  saveButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default EditProfileScreen;