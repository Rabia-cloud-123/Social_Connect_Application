// ═══════════════════════════════════════════════════════════
// FILE: mobile/src/screens/main/UserProfileScreen.js
// PURPOSE: Other User Profile Screen
// ═══════════════════════════════════════════════════════════

import React, {useMemo} from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';

import {useSelector} from 'react-redux';

import {
  COLORS,
  FONTS,
  SPACING,
  RADIUS,
  SHADOW,
} from '../../theme';

const UserProfileScreen = ({route}) => {
  const {userId} = route.params;

  const {posts} = useSelector(state => state.posts);

  // Get user posts
  const userPosts = useMemo(() => {
    return posts.filter(
      item => item.userId === userId,
    );
  }, [posts, userId]);

  // Get user data from first post
  const userData = useMemo(() => {
    if (userPosts.length > 0) {
      return {
        name: userPosts[0].userName,
        profileImage: userPosts[0].userImage,
      };
    }

    return null;
  }, [userPosts]);

  // Total Likes
  const totalLikes = useMemo(() => {
    return userPosts.reduce(
      (acc, item) => acc + (item.likes || 0),
      0,
    );
  }, [userPosts]);

  const renderPostItem = ({item}) => {
    return (
      <View style={styles.postCard}>

        {/* Post Content */}
        <Text style={styles.postText}>
          {item.content}
        </Text>

        {/* Post Image */}
        {item.image ? (
          <Image
            source={{uri: item.image}}
            style={styles.postImage}
          />
        ) : null}

        {/* Footer */}
        <View style={styles.postFooter}>

          <Text style={styles.footerText}>
            ❤️ {item.likes}
          </Text>

          <Text style={styles.footerText}>
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
            {/* Header */}
            <View style={styles.profileContainer}>

              <Image
                source={{
                  uri:
                    userData?.profileImage ||
                    'https://i.pravatar.cc/300',
                }}
                style={styles.profileImage}
              />

              <Text style={styles.userName}>
                {userData?.name || 'Unknown User'}
              </Text>

              <Text style={styles.userBio}>
                Social Connect User 🚀
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

            {/* Section Title */}
            <Text style={styles.sectionTitle}>
              User Posts
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
    paddingBottom: 80,
  },

  profileContainer: {
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

  userBio: {
    marginTop: SPACING.sm,
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
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

  sectionTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.lg,
  },

  postCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOW.sm,
  },

  postText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text,
    lineHeight: 22,
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
    borderTopWidth: 1,
    borderColor: COLORS.border,
    paddingTop: SPACING.sm,
  },

  footerText: {
    color: COLORS.textSecondary,
    fontWeight: '600',
  },

  emptyContainer: {
    marginTop: 50,
    alignItems: 'center',
  },

  emptyText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
  },
});

export default UserProfileScreen;