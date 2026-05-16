// ═══════════════════════════════════════════════════════════
// FILE: mobile/src/screens/main/HomeScreen.js
// PURPOSE: Home Feed Screen
// ═══════════════════════════════════════════════════════════

import React, {useEffect} from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import {
  fetchPosts,
  toggleLikePost,
} from '../../store/slices/postSlice';

import {
  COLORS,
  FONTS,
  SPACING,
  RADIUS,
  SHADOW,
} from '../../theme';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const {
    posts,
    loading,
    refreshing,
  } = useSelector(state => state.posts);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = () => {
    dispatch(fetchPosts());
  };

  const handleLike = postId => {
    dispatch(toggleLikePost(postId));
  };

  const renderPostItem = ({item}) => {
    return (
      <View style={styles.postCard}>

        {/* User Header */}
        <TouchableOpacity
          style={styles.userInfo}
          onPress={() =>
            navigation.navigate('UserProfile', {
              userId: item.userId,
            })
          }>

          <Image
            source={{
              uri:
                item.userImage ||
                'https://i.pravatar.cc/150?img=12',
            }}
            style={styles.avatar}
          />

          <View>
            <Text style={styles.userName}>
              {item.userName}
            </Text>

            <Text style={styles.timeText}>
              {item.createdAt}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Post Content */}
        <Text style={styles.postText}>
          {item.content}
        </Text>

        {/* Post Image */}
        {item.image ? (
          <Image
            source={{uri: item.image}}
            style={styles.postImage}
            resizeMode="cover"
          />
        ) : null}

        {/* Actions */}
        <View style={styles.actionContainer}>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleLike(item.id)}>

            <Text style={styles.actionText}>
              ❤️ {item.likes}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() =>
              navigation.navigate('PostDetail', {
                postId: item.id,
              })
            }>

            <Text style={styles.actionText}>
              💬 {item.comments?.length || 0}
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    );
  };

  if (loading && posts.length === 0) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator
          size="large"
          color={COLORS.primary}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>

      {/* Feed */}
      <FlatList
        data={posts}
        keyExtractor={item => item.id.toString()}
        renderItem={renderPostItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={loadPosts}
            colors={[COLORS.primary]}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No posts available
            </Text>
          </View>
        }
      />

      {/* Floating Button */}
      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate('CreatePost')
        }>

        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  listContainer: {
    padding: SPACING.md,
    paddingBottom: 100,
  },

  postCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOW.sm,
  },

  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },

  avatar: {
    width: 45,
    height: 45,
    borderRadius: 25,
    marginRight: SPACING.sm,
  },

  userName: {
    fontSize: FONTS.sizes.md,
    fontWeight: '700',
    color: COLORS.text,
  },

  timeText: {
    marginTop: 2,
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
  },

  postText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text,
    lineHeight: 22,
  },

  postImage: {
    width: '100%',
    height: 230,
    borderRadius: RADIUS.md,
    marginTop: SPACING.md,
  },

  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.md,
    borderTopWidth: 1,
    borderColor: COLORS.border,
    paddingTop: SPACING.sm,
  },

  actionButton: {
    marginRight: SPACING.lg,
  },

  actionText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },

  fab: {
    position: 'absolute',
    bottom: 25,
    right: 25,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOW.md,
  },

  fabText: {
    color: COLORS.white,
    fontSize: 32,
    fontWeight: '700',
    marginTop: -2,
  },

  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },

  emptyContainer: {
    marginTop: 100,
    alignItems: 'center',
  },

  emptyText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
  },
});

export default HomeScreen;