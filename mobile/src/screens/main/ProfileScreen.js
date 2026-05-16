// ═══════════════════════════════════════════════════════════
// FILE: mobile/src/screens/main/ProfileScreen.js
// PURPOSE: User Profile Screen
// ═══════════════════════════════════════════════════════════

import React, {useMemo} from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';

import {
  COLORS,
  FONTS,
  SPACING,
  RADIUS,
  SHADOW,
} from '../../theme';

import {logoutUser} from '../../store/slices/authSlice';

const ProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const {user} = useSelector(state => state.auth);

  const {posts} = useSelector(state => state.posts);

  // User Posts
  const userPosts = useMemo(() => {
    return posts.filter(
      item => item.userId === user?.uid,
    );
  }, [posts, user]);

  // Total Likes
  const totalLikes = useMemo(() => {
    return userPosts.reduce(
      (acc, item) => acc + (item.likes || 0),
      0,
    );
  }, [userPosts]);

  const handleLogout = async () => {
    dispatch(logoutUser());
  };

  const renderPostItem = ({item}) => {
    return (
      <View style={styles.postCard}>

        <Text style={styles.postContent}>
          {item.content}
        </Text>

        {item.image ? (
          <Image
            source={{uri: item.image}}
            style={styles.postImage}
          />
        ) : null}

        <View style={styles.postFooter}>
          <Text style={styles.postFooterText}>
            ❤️ {item.likes}
          </Text>

          <Text style={styles.postFooterText}>
            💬 {item.comments?.length || 0}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>

      <FlatList
        data={userPosts}
        keyExtractor={item => item.id.toString()}
        renderItem={renderPostItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={
          <>
            {/* Profile Header */}
            <View style={styles.profileHeader}>

              <Image
                source={{
                  uri:
                    user?.profileImage ||
                    'https://i.pravatar.cc/300',
                }}
                style={styles.profileImage}
              />

              <Text style={styles.userName}>
                {user?.name || 'Unknown User'}
              </Text>

              <Text style={styles.userEmail}>
                {user?.email}
              </Text>

              <Text style={styles.userBio}>
                {user?.bio ||
                  'Welcome to Social Connect 🚀'}
              </Text>

            </View>

            {/* Stats */}
            <View style={styles.statsContainer}>

              <View style={styles.statCard}>
                <Text style={styles.statNumber}>
                  {userPosts.length}
                </Text>

                <Text style={styles.statLabel}>
                  Posts
                </Text>
              </View>

              <View style={styles.statCard}>
                <Text style={styles.statNumber}>
                  {totalLikes}
                </Text>

                <Text style={styles.statLabel}>
                  Likes
                </Text>
              </View>

            </View>

            {/* Buttons */}
            <View style={styles.buttonContainer}>

              <TouchableOpacity
                style={styles.editButton}
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate('EditProfile')
                }>

                <Text style={styles.editButtonText}>
                  Edit Profile
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.logoutButton}
                activeOpacity={0.8}
                onPress={handleLogout}>

                <Text style={styles.logoutButtonText}>
                  Logout
                </Text>
              </TouchableOpacity>

            </View>

            {/* Section Title */}
            <Text style={styles.sectionTitle}>
              My Posts
            </Text>
          </>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No posts available
            </Text>
          </View>
        }
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  listContainer: {
    padding: SPACING.lg,
    paddingBottom: 100,
  },

  profileHeader: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },

  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: SPACING.md,
  },

  userName: {
    fontSize: FONTS.sizes.xxl,
    fontWeight: '700',
    color: COLORS.text,
  },

  userEmail: {
    marginTop: 4,
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
  },

  userBio: {
    marginTop: SPACING.md,
    textAlign: 'center',
    color: COLORS.textSecondary,
    lineHeight: 22,
    paddingHorizontal: SPACING.md,
  },

  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xl,
  },

  statCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    paddingVertical: SPACING.lg,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
    marginHorizontal: 5,
    ...SHADOW.sm,
  },

  statNumber: {
    fontSize: FONTS.sizes.xxl,
    fontWeight: '700',
    color: COLORS.primary,
  },

  statLabel: {
    marginTop: 4,
    color: COLORS.textSecondary,
  },

  buttonContainer: {
    flexDirection: 'row',
    marginBottom: SPACING.xl,
  },

  editButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    marginRight: 10,
    ...SHADOW.sm,
  },

  editButtonText: {
    color: COLORS.white,
    fontWeight: '700',
  },

  logoutButton: {
    flex: 1,
    backgroundColor: COLORS.error,
    paddingVertical: 14,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    ...SHADOW.sm,
  },

  logoutButtonText: {
    color: COLORS.white,
    fontWeight: '700',
  },

  sectionTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.lg,
  },

  postCard: {
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.md,
    ...SHADOW.sm,
  },

  postContent: {
    color: COLORS.text,
    lineHeight: 22,
    fontSize: FONTS.sizes.md,
  },

  postImage: {
    width: '100%',
    height: 220,
    borderRadius: RADIUS.md,
    marginTop: SPACING.md,
  },

  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.md,
  },

  postFooterText: {
    color: COLORS.textSecondary,
    fontWeight: '600',
  },

  emptyContainer: {
    marginTop: 40,
    alignItems: 'center',
  },

  emptyText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
  },
});

export default ProfileScreen;