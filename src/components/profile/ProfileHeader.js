import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';

const ProfileHeader = ({
  name = 'User',
  bio = '',
  profilePicture = '',
  followers = [],
  following = [],
}) => {
  const followersCount = Array.isArray(followers)
    ? followers.length
    : 0;

  const followingCount = Array.isArray(following)
    ? following.length
    : 0;

  return (
    <View style={styles.container}>
      {profilePicture ? (
        <Image
          source={{uri: profilePicture}}
          style={styles.profileImage}
        />
      ) : (
        <View style={styles.placeholderImage}>
          <Text style={styles.placeholderText}>
            {name.charAt(0).toUpperCase()}
          </Text>
        </View>
      )}

      <Text style={styles.name}>{name}</Text>

      <Text style={styles.bio}>
        {bio || 'No bio available'}
      </Text>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {followersCount}
          </Text>
          <Text style={styles.statLabel}>
            Followers
          </Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {followingCount}
          </Text>
          <Text style={styles.statLabel}>
            Following
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 22,
    borderRadius: 24,
    alignItems: 'center',
    elevation: 4,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#6C63FF',
  },
  placeholderImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#6C63FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#FFFFFF',
    fontSize: 42,
    fontWeight: '800',
  },
  name: {
    marginTop: 14,
    fontSize: 24,
    fontWeight: '800',
    color: '#1F2937',
  },
  bio: {
    marginTop: 8,
    textAlign: 'center',
    color: '#6B7280',
    fontSize: 14,
    lineHeight: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 24,
  },
  statCard: {
    backgroundColor: '#F4F6FF',
    width: 120,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: '800',
    color: '#6C63FF',
  },
  statLabel: {
    marginTop: 4,
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '600',
  },
});

export default ProfileHeader;