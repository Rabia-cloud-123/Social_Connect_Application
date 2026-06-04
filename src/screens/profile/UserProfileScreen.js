import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import {useSelector} from 'react-redux';

import {
  followUser,
  getUserById,
  unfollowUser,
} from '../../services/userService';

const UserProfileScreen = ({route, navigation}) => {
  const {user: currentUser} = useSelector(state => state.auth);
  const {userId} = route.params;

  const [profileUser, setProfileUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const isFollowing =
    profileUser?.followers?.includes(currentUser?.id) || false;

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const data = await getUserById(userId);
      setProfileUser(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to load user profile');
    }
  };

  const handleFollowToggle = async () => {
    try {
      setLoading(true);

      if (isFollowing) {
        await unfollowUser(currentUser.id, userId);
      } else {
        await followUser(currentUser.id, userId);
      }

      await loadUserProfile();
    } catch (error) {
      Alert.alert('Error', 'Failed to update follow status');
    } finally {
      setLoading(false);
    }
  };

  if (!profileUser) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Loading profile...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileCard}>
        {profileUser.profilePicture ? (
          <Image
            source={{uri: profileUser.profilePicture}}
            style={styles.profileImage}
          />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>
              {profileUser.name?.charAt(0)?.toUpperCase() || 'U'}
            </Text>
          </View>
        )}

        <Text style={styles.name}>{profileUser.name}</Text>
        <Text style={styles.email}>{profileUser.email}</Text>
        <Text style={styles.bio}>
          {profileUser.bio || 'No bio added yet.'}
        </Text>

        <View style={styles.statsRow}>
          <Text style={styles.statText}>
            Followers: {profileUser.followers?.length || 0}
          </Text>
          <Text style={styles.statText}>
            Following: {profileUser.following?.length || 0}
          </Text>
        </View>

        {currentUser?.id !== userId && (
          <>
            <TouchableOpacity
              style={styles.followButton}
              disabled={loading}
              onPress={handleFollowToggle}>
              <Text style={styles.followButtonText}>
                {isFollowing ? 'Unfollow' : 'Follow'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.messageButton}
              onPress={() =>
                navigation.navigate('Chat', {
                  receiver: profileUser,
                })
              }>
              <Text style={styles.messageButtonText}>Message</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    justifyContent: 'center',
    padding: 20,
  },
  loadingText: {
    textAlign: 'center',
    color: '#777777',
    fontSize: 16,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 25,
    alignItems: 'center',
    elevation: 3,
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 15,
  },
  placeholderImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#1877F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  placeholderText: {
    color: '#FFFFFF',
    fontSize: 42,
    fontWeight: '700',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#222222',
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    color: '#777777',
    marginBottom: 15,
  },
  bio: {
    fontSize: 15,
    color: '#444444',
    textAlign: 'center',
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  statText: {
    fontSize: 14,
    color: '#555555',
  },
  followButton: {
    backgroundColor: '#1877F2',
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 10,
    marginBottom: 10,
  },
  followButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  messageButton: {
    backgroundColor: '#F1F3F5',
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 10,
  },
  messageButtonText: {
    color: '#222222',
    fontWeight: '600',
  },
});

export default UserProfileScreen;