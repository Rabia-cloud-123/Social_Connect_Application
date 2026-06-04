import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import {useSelector} from 'react-redux';

import ProfileHeader from '../../components/profile/ProfileHeader';

const ProfileScreen = ({navigation}) => {
  const {user} = useSelector(state => state.auth);

  return (
    <SafeAreaView style={styles.container}>
      <ProfileHeader
        name={user?.name || 'Social Connect User'}
        bio={user?.bio || ''}
        profilePicture={user?.profilePicture || ''}
        followers={user?.followers || []}
        following={user?.following || []}
      />

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('EditProfile')}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  editButton: {
    backgroundColor: '#1877F2',
    marginHorizontal: 16,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileScreen;