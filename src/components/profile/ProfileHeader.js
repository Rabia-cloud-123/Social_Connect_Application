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
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {followersCount}
          </Text>
          <Text style={styles.statLabel}>
            Followers
          </Text>
        </View>

        <View style={styles.statItem}>
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
    alignItems: 'center',
    padding: 20,
    borderRadius: 15,
    margin: 16,
    elevation: 2,
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 12,
  },
  placeholderImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#1877F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  placeholderText: {
    color: '#FFFFFF',
    fontSize: 40,
    fontWeight: '700',
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222222',
  },
  bio: {
    marginTop: 8,
    textAlign: 'center',
    color: '#666666',
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  statItem: {
    alignItems: 'center',
    marginHorizontal: 25,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222222',
  },
  statLabel: {
    fontSize: 13,
    color: '#777777',
    marginTop: 3,
  },
});

export default ProfileHeader;