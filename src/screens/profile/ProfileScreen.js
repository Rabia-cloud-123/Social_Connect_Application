import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';

import ProfileHeader from '../../components/profile/ProfileHeader';

const ProfileScreen = ({navigation}) => {
  const {user} = useSelector(state => state.auth);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerBox}>
        <Text style={styles.header}>My Profile</Text>
        <Text style={styles.subtitle}>Manage your Social Connect identity</Text>
      </View>

      <ProfileHeader
        name={user?.name || 'Social Connect User'}
        bio={user?.bio || ''}
        profilePicture={user?.profilePicture || ''}
        followers={user?.followers || []}
        following={user?.following || []}
      />

      <TouchableOpacity
        style={styles.editButton}
        activeOpacity={0.85}
        onPress={() => navigation.navigate('EditProfile')}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
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
  editButton: {
    backgroundColor: '#FF6584',
    marginHorizontal: 16,
    padding: 15,
    borderRadius: 14,
    alignItems: 'center',
    elevation: 3,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default ProfileScreen;